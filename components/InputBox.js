import React, { useRef, useState } from "react";
import { CameraIcon } from "@heroicons/react/solid";
import { db, storage } from "../firebase";
import firebase from "firebase";
import { Avatar, Card, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectSelectedGhost } from "../redux/features/ghostSlice";
import SendIcon from "@material-ui/icons/Send";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { selectUser } from "../redux/features/userSlice";

// Card styles
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "12px  16px 10px 16px",
    borderRadius: "7px",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
  },
}));

function InputBox() {
  const user = useSelector(selectUser);
  const selectedGhost = useSelector(selectSelectedGhost);
  const inputRef = useRef(null);
  const fileRef = useRef(null);
  const [postImage, setPostImage] = useState();
  const classes = useStyles();

  const sendPost = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;

    // Switching the mask
    let name = user?.displayName;
    let image = user?.photoURL;
    if (selectedGhost) {
      name = selectedGhost.name;
      image = selectedGhost.image;
    }

    // Injecting the post into our database
    db.collection("posts")
      .add({
        message: inputRef.current.value,
        name: name,
        image: image,
        user: user?.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        likes: 0,
      })
      .then((doc) => {
        if (postImage) {
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(postImage, "data_url");

          removeImage();

          uploadTask.on(
            "state_change",
            null,
            (error) => console.log(error),
            () => {
              storage
                .ref("posts")
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  db.collection("posts").doc(doc.id).set(
                    {
                      postImage: url,
                    },
                    { merge: true }
                  );
                });
            }
          );
        }
      });

    inputRef.current.value = "";
    setPostImage(null);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setPostImage(readerEvent.target.result);
    };
  };
  const removeImage = () => {
    setPostImage(null);
  };

  return (
    <Card className={classes.root}>
      <div className="flex space-x-4 items-center">
        <Avatar
          src={!selectedGhost ? user?.photoURL : selectedGhost.image}
          className="h-8 w-8"
        />
        <form className="flex flex-1 " onSubmit={sendPost}>
          <input
            ref={inputRef}
            className="rounded-full h-10 placeholder-gray-500 placeholder-opacity-100 bg-gray-100 flex-grow px-5 focus:outline-none w-full"
            type="text"
            placeholder={
              selectedGhost
                ? `What you would say if you were, ${selectedGhost.name}`
                : `What's on your mind, ${user?.displayName}`
            }
          />
          <button className="hidden" onClick={sendPost}>
            Submit
          </button>
        </form>

        {postImage && (
          <div
            onClick={removeImage}
            className="flex flex-col filter hover:brightness-90 transition duration-150 transform hover:scale-95 cursor-pointer"
          >
            <img
              loading="lazy"
              src={postImage}
              alt="post-image"
              className="h-9 object-contain "
            />
          </div>
        )}
      </div>
      <div className="flex justify-between w-full pt-[8px] border-t mt-[12px]">
        <div
          className="inputIcon flex justify-center p-[8px]  w-[33.33%] "
          onClick={() => fileRef.current.click()}
        >
          <CameraIcon className="h-7 text-green-400" />
          <p className="hidden sm:inline-flex text-xs font-semibold text-gray-600 sm:text-sm xl:text-base">
            Photo/Video
          </p>
          <input type="file" hidden onChange={addImageToPost} ref={fileRef} />
        </div>
        <div className="inputIcon flex p-[8px] w-[33.33%] justify-center ">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="hidden sm:inline-flex text-xs font-semibold text-gray-600 sm:text-sm xl:text-base">
            Feeling/Activity
          </p>
        </div>
        <div
          className="inputIcon  flex justify-center p-[8px] w-[33.33%]  "
          onClick={sendPost}
        >
          <SendIcon className="h-7 text-red-400" />
          <p className="hidden sm:inline-flex text-xs font-semibold text-gray-600 sm:text-sm xl:text-base">
            Send post
          </p>
        </div>
      </div>
    </Card>
  );
}

export default InputBox;
