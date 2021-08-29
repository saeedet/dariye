import { Avatar, makeStyles } from "@material-ui/core";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import fromnow from "fromnow";
import Comments from "./Comments";
import SubComments from "./SubComments";
import { db } from "../firebase";
import firebase from "firebase";
import { useDocument } from "react-firebase-hooks/firestore";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "32px",
    height: "32px",
    marginTop: "2px",
  },
}));
// reusable
const Comment = forwardRef(
  (
    { userLikes, postId, commentId, image, message, name, timestamp, user },
    ref
  ) => {
    const classes = useStyles();
    const [displayReply, setDisplayReply] = useState(false);

    const commentInputRef = useRef(null);

    //-------------------POST LIKES ---------------------//
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
      if (userLikes.includes(commentId)) {
        setLiked(true);
      }
    }, [userLikes]);
    // Function for inserting or removing likes to/from database
    const likeComment = (id) => {
      if (!liked) {
        // if the post is not liked
        db.collection("users")
          .doc(user.uid)
          .collection("likes")
          .doc(id)
          .set({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(setLikesCount((prevCount) => prevCount + 1))
          .then(setLiked(true));
      } else {
        // if the post is already liked
        db.collection("users")
          .doc(user.uid)
          .collection("likes")
          .doc(id)
          .delete()
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
            <div className=" bg-gray-100 px-[12px] py-[8px] rounded-[20px] self-start ">
              <div className="font-semibold text-sm">{name}</div>
              <div>{message}</div>
              <div>{likesCount}</div>
            </div>
            <div className="flex text-xs pt-[1px]">
              <div
                onClick={() => likeComment(commentId)}
                className="font-bold text-gray-500 ml-[12px] cursor-pointer hover:underline"
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
          </div>
        </div>
        {displayReply && (
          <SubComments
            displayReplyHandler={displayReplyHandler}
            commentInputRef={commentInputRef}
            user={user}
            postId={postId}
            commentId={commentId}
          />
        )}
      </>
    );
  }
);

export default Comment;
