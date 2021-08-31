import { Avatar, makeStyles } from "@material-ui/core";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import fromnow from "fromnow";
import Comments from "./Comments";
import SubComments from "./SubComments";
import { db } from "../firebase";
import firebase from "firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import {
  selectUser,
  selectUserCommentLikes,
} from "../redux/features/userSlice";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ReplyIcon from "@material-ui/icons/Reply";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "32px",
    height: "32px",
    marginTop: "2px",
  },
}));
// reusable
const Comment = forwardRef(
  ({ postId, commentId, image, message, name, timestamp }, ref) => {
    const userCommentLikes = useSelector(selectUserCommentLikes);
    const user = useSelector(selectUser);
    const classes = useStyles();
    const [displayReply, setDisplayReply] = useState(false);

    const commentInputRef = useRef(null);

    // Realtime replys count
    const [realtimeReplysCount] = useCollection(
      db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .doc(commentId)
        .collection("comments")
    );

    //-------------------Comment LIKES ---------------------//
    const [likes, loading, error] = useDocument(
      firebase.firestore().doc(`posts/${postId}/comments/${commentId}`)
    );
    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false);
    // changing the likes count whenever it changes in database
    useEffect(() => {
      setLikesCount(likes?.data().likes);
    }, [likes?.data().likes]);

    //Check if the post is already liked

    useEffect(() => {
      if (userCommentLikes.includes(commentId)) {
        setLiked(true);
      }
    }, [userCommentLikes]);
    // Function for inserting or removing likes to/from database
    const likeComment = (id) => {
      if (!liked) {
        // if the comment is not liked
        db.collection("users")
          .doc(user?.uid)
          .collection("commentLikes")
          .doc(id)
          .set({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(
            db
              .collection("posts")
              .doc(postId)
              .collection("comments")
              .doc(commentId)
              .update({
                likes: firebase.firestore.FieldValue.increment(1),
              })
          )
          .then(setLikesCount((prevCount) => prevCount + 1))
          .then(setLiked(true));
      } else {
        // if the comment is already liked
        db.collection("users")
          .doc(user?.uid)
          .collection("commentLikes")
          .doc(id)
          .delete()
          .then(
            db
              .collection("posts")
              .doc(postId)
              .collection("comments")
              .doc(commentId)
              .update({
                likes: firebase.firestore.FieldValue.increment(-1),
              })
          )
          .then(setLikesCount((prevCount) => prevCount - 1))
          .then(setLiked(false));
      }
    };

    const displayReplyHandler = () => {
      if (!displayReply) {
        setDisplayReply(true);
        setTimeout(() => {
          commentInputRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          setTimeout(() => {
            commentInputRef.current[0].focus();
          }, 200);
        }, 180);
      } else {
        commentInputRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        setTimeout(() => {
          commentInputRef.current[0].focus();
        }, 200);
      }
    };

    return (
      <>
        <div ref={ref} className="flex pt-[6px] px-[16px] max-w-full">
          <Avatar src={image} className={classes.avatar} />
          <div className="flex-grow ml-[7px] flex flex-col">
            <div className=" bg-gray-100 px-[12px] py-[8px] rounded-[20px] self-start relative ">
              <div className="font-semibold text-sm">{name}</div>
              <div>{message}</div>
              {likesCount !== 0 && (
                <div className="absolute right-[-32px] bottom-1 bg-white rounded-full shadow-md px-1 flex items-center">
                  <ThumbUpAltIcon className="text-blue-500 pr-1" />
                  {likesCount}
                </div>
              )}
            </div>
            <div className="flex text-xs pt-[1px]">
              <div
                onClick={() => likeComment(commentId)}
                className={`font-bold ${
                  liked ? "text-blue-500" : "text-gray-500"
                }  ml-[12px] cursor-pointer hover:underline`}
              >
                Like
              </div>
              <div className="mx-1 flex  items-center">
                <span className="mt-[-5px]">.</span>
              </div>
              <div
                onClick={displayReplyHandler}
                className="font-bold text-gray-500 cursor-pointer hover:underline"
              >
                Reply
              </div>
              <div className="mx-1 flex  items-center">
                <span className="mt-[-5px]">.</span>
              </div>
              <div className=" cursor-pointer hover:underline">
                {fromnow(new Date(timestamp?.toDate()).toLocaleString(), {
                  max: 1,
                })}
              </div>
            </div>
            {realtimeReplysCount?.docs.length !== 0 && !displayReply && (
              <div
                className="flex items-center cursor-pointer group text-gray-500 pl-[6px] mt-1"
                onClick={displayReplyHandler}
              >
                <ReplyIcon className="pr-1 transform scale-[-1]" />
                <div className="flex space-x-1 items-center group-hover:underline font-semibold ml-1">
                  {realtimeReplysCount?.docs.length} Reply
                </div>
              </div>
            )}
          </div>
        </div>
        {displayReply && (
          <SubComments
            displayReplyHandler={displayReplyHandler}
            commentInputRef={commentInputRef}
            postId={postId}
            commentId={commentId}
          />
        )}
      </>
    );
  }
);

export default Comment;
