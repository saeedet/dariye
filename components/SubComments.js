import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import SubComment from "./SubComment";
import FlipMove from "react-flip-move";
import CommentInput from "./CommentInput";
import SubCommentInput from "./SubCommentInput";

function SubComments({
  postId,
  displayReplyHandler,
  commentInputRef,
  commentId,
}) {
  const [realtimeSubComments] = useCollection(
    db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(commentId)
      .collection("comments")
      .orderBy("timestamp", "asc")
    //   .limit(10)
  );
  return (
    <div className="pl-[54px]">
      <FlipMove>
        {realtimeSubComments &&
          realtimeSubComments.docs.map((comment) => (
            <SubComment
              commentId={commentId}
              displayReplyHandler={displayReplyHandler}
              postId={postId}
              key={comment.id}
              createrId={comment.data().user}
              replyId={comment.id}
              name={comment.data().name}
              message={comment.data().message}
              timestamp={comment.data().timestamp}
              image={comment.data().image}
            />
          ))}
      </FlipMove>
      <SubCommentInput
        subComment={true}
        postId={postId}
        commentInputRef={commentInputRef}
        commentId={commentId}
      />
    </div>
  );
}

export default SubComments;
