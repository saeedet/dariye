import { Avatar, makeStyles } from "@material-ui/core";
import fromnow from "fromnow";
import React, { forwardRef, useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import firebase from "firebase";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import {
  selectUser,
  selectUserCommentLikes,
} from "../redux/features/userSlice";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "24px",
    height: "24px",
    marginTop: "2px",
  },
}));

const SubComment = forwardRef(
  (
    {
      name,
      message,
      image,
      postId,
      timestamp,
      displayReplyHandler,
      commentId,
      replyId,
    },
    ref
  ) => {
    const userCommentLikes = useSelector(selectUserCommentLikes);
    const user = useSelector(selectUser);
    const classes = useStyles();

    //-------------------Comment LIKES ---------------------//
    const [likes, loading, error] = useDocument(
      firebase
        .firestore()
        .doc(`posts/${postId}/comments/${commentId}/comments/${replyId}`)
    );
    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false);

    // changing the likes count whenever it changes in database
    useEffect(() => {
      setLikesCount(likes?.data().likes);
    }, [likes?.data().likes]);

    //Check if the post is already liked

    useEffect(() => {
      if (userCommentLikes.includes(replyId)) {
        setLiked(true);
      }
    }, [userCommentLikes]);
    // Function for inserting or removing likes to/from database
    const likeReply = (id) => {
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
              .collection("comments")
              .doc(replyId)
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
              .collection("comments")
              .doc(replyId)
              .update({
                likes: firebase.firestore.FieldValue.increment(-1),
              })
          )
          .then(setLikesCount((prevCount) => prevCount - 1))
          .then(setLiked(false));
      }
    };

    return (
      <div ref={ref} className="flex pt-[6px] px-[16px] max-w-full">
        <Avatar src={image} className={classes.avatar} />
        <div className="flex-grow ml-[7px] flex flex-col">
          <div className=" bg-gray-100 px-[12px] py-[8px] rounded-[20px] self-start relative">
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
              onClick={() => likeReply(replyId)}
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
        </div>
      </div>
    );
  }
);

export default SubComment;
