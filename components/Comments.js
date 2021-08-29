import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import FlipMove from "react-flip-move";
import Comment from "./Comment";
import CommentInput from "./CommentInput";

function Comments({ postId, displayComments, inputViewRef }) {
  const [realtimeComments] = useCollection(
    db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy("timestamp", "asc")
    //   .limit(10)
  );

  return (
    <>
      <div className={`w-full  ${displayComments ? "pt-1" : "hidden"}`}>
        <FlipMove>
          {realtimeComments &&
            realtimeComments.docs.map((comment) => (
              <Comment
                postId={postId}
                key={comment.id}
                commentId={comment.id}
                name={comment.data().name}
                message={comment.data().message}
                timestamp={comment.data().timestamp}
                image={comment.data().image}
              />
            ))}
        </FlipMove>
      </div>
      <div className={displayComments ? "" : "hidden"}>
        <CommentInput postId={postId} inputViewRef={inputViewRef} />
      </div>
    </>
  );
}

export default Comments;
