import { Card } from "@material-ui/core";
import React from "react";
import { useRef } from "react";
import { db } from "../firebase";
import firebase from "firebase";

function AddGhost() {
  const nameInputRef = useRef(null);
  const srcInputRef = useRef(null);

  const submitFormHandler = (e) => {
    e.preventDefault();
    if (!nameInputRef.current.value || !srcInputRef.current.value) return;

    db.collection("ghosts").add({
      name: nameInputRef.current.value,
      src: srcInputRef.current.value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    nameInputRef.current.value = "";
    srcInputRef.current.value = "";
  };

  return (
    <Card className="mt-4">
      <div className="flex justify-center items-center text-gray-500 mb-5 mx-4 p-2 border-b-2">
        <h2 className="text-xl">Add Ghost</h2>
      </div>
      <div className="flex w-full flex-wrap p-2">
        <form
          className="flex flex-col space-y-2 px-[8px] pb-[8px]"
          onSubmit={submitFormHandler}
        >
          <input
            ref={nameInputRef}
            className="rounded-full h-10 placeholder-gray-500 placeholder-opacity-100 bg-gray-100 flex-grow px-5 focus:outline-none w-full"
            type="text"
            placeholder="Full name"
          />
          <input
            ref={srcInputRef}
            className="rounded-full h-10 placeholder-gray-500 placeholder-opacity-100 bg-gray-100 flex-grow px-5 focus:outline-none w-full"
            type="text"
            placeholder="Photo URL"
          />
          <button
            type="submit"
            onClick={submitFormHandler}
            className="bg-green-100 hover:bg-green-200 active:bg-green-300 text-green-900 font-semibold rounded-full h-10"
          >
            Add
          </button>
        </form>
      </div>
    </Card>
  );
}

export default AddGhost;
