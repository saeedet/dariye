import { Avatar, makeStyles } from "@material-ui/core";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import { selectSelectedGhost } from "../redux/features/ghostSlice";
import firebase from "firebase";
import { selectUser } from "../redux/features/userSlice";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "24px",
    height: "24px",
    marginTop: "2px",
  },
}));

function SubCommentInput({ postId, commentInputRef, commentId }) {
  const user = useSelector(selectUser);
  const classes = useStyles();
  const subCommentInputRef = useRef(null);
  const selectedGhost = useSelector(selectSelectedGhost);

  const sendSubComment = (e) => {
    e.preventDefault();
    if (!subCommentInputRef.current.value) return;

    // Switching the mask
    let name = user?.displayName;
    let image = user?.photoURL;
    if (selectedGhost) {
      name = selectedGhost.name;
      image = selectedGhost.image;
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
        user: user?.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        likes: 0,
      });

    subCommentInputRef.current.value = "";
  };

  return (
    <div className="flex px-[16px] py-[4px] items-center my-[4px]">
      <Avatar
        src={!selectedGhost ? user?.photoURL : selectedGhost.image}
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
