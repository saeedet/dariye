import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import FlipMove from "react-flip-move";
import Comment from "./Comment";

function Comments({ id, displayComments }) {
  const [realtimeComments] = useCollection(
    db
      .collection("posts")
      .doc(id)
      .collection("comments")
      .orderBy("timestamp", "asc")
      .limit(10)
  );
  return (
    <div className={`w-full pt-1 ${displayComments ? "" : "hidden"}`}>
      <FlipMove>
        {realtimeComments &&
          realtimeComments.docs.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              name={comment.data().name}
              message={comment.data().message}
              email={comment.data().email}
              timestamp={comment.data().timestamp}
              image={comment.data().image}
              likes={comment.data().likes}
            />
          ))}
      </FlipMove>
    </div>
  );
}

export default Comments;
