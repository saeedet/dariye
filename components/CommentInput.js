import { Avatar, makeStyles } from "@material-ui/core";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import { selectSelectedGhost } from "../redux/features/ghostSlice";
import firebase from "firebase";
import { selectUser } from "../redux/features/userSlice";

// Material ui styles
const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "32px",
    height: "32px",
  },
}));

function CommentInput({ postId, inputViewRef }) {
  const user = useSelector(selectUser);
  const classes = useStyles();
  const inputRef = useRef(null);
  const selectedGhost = useSelector(selectSelectedGhost);

  const sendComment = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;

    // Switching the mask
    let name = user?.displayName;
    let image = user?.photoURL;
    if (selectedGhost) {
      name = selectedGhost.name;
      image = selectedGhost.image;
    }

    // Injecting the comment into our database

    db.collection("posts").doc(postId).collection("comments").add({
      message: inputRef.current.value,
      name,
      image,
      user: user?.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      likes: 0,
      postId,
    });

    inputRef.current.value = "";
  };

  return (
    <div className="flex px-[16px] py-[4px] items-center my-[4px]">
      <Avatar
        src={!selectedGhost ? user?.photoURL : selectedGhost.image}
        className={classes.avatar}
      />
      <form
        onSubmit={sendComment}
        className="flex-grow ml-[7px]"
        ref={inputViewRef}
      >
        <input
          ref={inputRef}
          className="rounded-full h-[36px] w-full placeholder-gray-500 placeholder-opacity-100 bg-gray-100 flex-grow px-5 focus:outline-none"
          type="text"
          placeholder="Write a comment..."
        />
        <button className="hidden" onClick={sendComment}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default CommentInput;
