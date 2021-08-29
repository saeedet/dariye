import { Avatar, makeStyles } from "@material-ui/core";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import { selectSelectedMask } from "../redux/features/memberSlice";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "24px",
    height: "24px",
    marginTop: "2px",
  },
}));

function SubCommentInput({ postId, user, commentInputRef, commentId }) {
  const classes = useStyles();
  const subCommentInputRef = useRef(null);
  const selectedMask = useSelector(selectSelectedMask);

  const sendSubComment = (e) => {
    e.preventDefault();
    if (!subCommentInputRef.current.value) return;

    // Switching the mask
    let name = user.displayName;
    let image = user.photoURL;
    if (selectedMask) {
      name = selectedMask.name;
      image = selectedMask.image;
    }

    // Injecting the comment into our database

    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(commentId)
      .collection("comments")
      .add({
        postId: postId,
        message: subCommentInputRef.current.value,
        name: name,
        image: image,
        user: user.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        likes: 0,
      });

    subCommentInputRef.current.value = "";
  };

  return (
    <div className="flex px-[16px] py-[4px] items-center my-[4px]">
      <Avatar
        src={!selectedMask ? user.photoURL : selectedMask.image}
        className={classes.avatar}
      />
      <form
        onSubmit={sendSubComment}
        className="flex-grow ml-[7px]"
        ref={commentInputRef}
      >
        <input
          ref={subCommentInputRef}
          className="rounded-full h-[36px] w-full placeholder-gray-500 placeholder-opacity-100 bg-gray-100 flex-grow px-5 focus:outline-none"
          type="text"
          placeholder="Write a comment..."
        />
        <button className="hidden" onClick={sendSubComment}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default SubCommentInput;
