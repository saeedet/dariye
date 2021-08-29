import { Avatar, makeStyles } from "@material-ui/core";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import { selectSelectedMask } from "../redux/features/memberSlice";
import firebase from "firebase";

// Material ui styles
const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "32px",
    height: "32px",
  },
}));

function CommentInput({ id, user, inputViewRef }) {
  const classes = useStyles();
  const inputRef = useRef(null);
  const selectedMask = useSelector(selectSelectedMask);

  const sendComment = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;

    // Switching the mask
    let name = user.displayName;
    let image = user.photoURL;
    if (selectedMask) {
      name = selectedMask.name;
      image = selectedMask.image;
    }

    // Injecting the post into our database
    db.collection("posts").doc(id).collection("comments").add({
      message: inputRef.current.value,
      name: name,
      image: image,
      email: user.email,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      likes: 0,
    });

    inputRef.current.value = "";
  };

  return (
    <div className="flex px-[16px] py-[4px] items-center my-[4px]">
      <Avatar
        src={!selectedMask ? user.photoURL : selectedMask.image}
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
