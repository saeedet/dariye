import { useSession } from "next-auth/client";
import React, { useRef, useState } from "react";
import { CameraIcon } from "@heroicons/react/solid";
import { db, storage } from "../firebase";
import firebase from "firebase";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectSelectedMask } from "../redux/features/memberSlice";
import SendIcon from "@material-ui/icons/Send";

function InputBox() {
  const [session] = useSession();
  const inputRef = useRef(null);
  const fileRef = useRef(null);
  const [postImage, setPostImage] = useState();
  const selectedMask = useSelector(selectSelectedMask);

  const sendPost = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;

    // Switching the mask
    let name = session.user.name;
    let image = session.user.image;
    if (selectedMask) {
      name = selectedMask.name;
      image = selectedMask.image;
    }

    // Injecting the post into our database
    db.collection("posts")
      .add({
        message: inputRef.current.value,
        name: name,
        image: image,
        email: session.user.email,
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
    <div className="bg-white px-2 rounded-2xl shadow-md text-gray-500 font-medium ">
      <div className="flex space-x-4 p-4 items-center">
        <Avatar
          src={!selectedMask ? session.user.image : selectedMask.image}
          className="h-8 w-8"
        />
        <form className="flex flex-1" onSubmit={sendPost}>
          <input
            ref={inputRef}
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            type="text"
            placeholder={`What's on your mind, ${session.user.name}`}
          />
          <button className="hidden" onClick={sendPost}>
            Submit
          </button>
        </form>

        {postImage && (
          <div
            onClick={removeImage}
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
          >
            <img
              src={postImage}
              alt="post-image"
              className="h-10 object-contain"
            />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>
      <div className="flex justify-between w-full p-4 border-t">
        <div
          className="inputIcon flex justify-start pl-6 rounded-l-full w-[50%]"
          onClick={() => fileRef.current.click()}
        >
          <CameraIcon className="h-7 text-green-400" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input type="file" hidden onChange={addImageToPost} ref={fileRef} />
        </div>
        <div
          className="inputIcon rounded-r-full flex justify-end pr-6  w-[50%]"
          onClick={sendPost}
        >
          <p className="text-xs sm:text-sm xl:text-base">Send</p>
          <SendIcon className="h-7 text-red-400" />
        </div>
      </div>
    </div>
  );
}

export default InputBox;
