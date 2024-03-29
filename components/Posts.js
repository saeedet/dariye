import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Post from "./Post";
import FlipMove from "react-flip-move";

function Posts({ posts }) {
  const [realtimePosts] = useCollection(
    db.collection("posts").orderBy("timestamp", "desc").limit(10)
  );

  return (
    <div>
      <FlipMove>
        {realtimePosts
          ? realtimePosts?.docs.map((post) => (
              <Post
                key={post.id}
                postId={post.id}
                name={post.data().name}
                message={post.data().message}
                timestamp={post.data().timestamp}
                image={post.data().image}
                postImage={post.data().postImage}
              />
            ))
          : posts.map((post) => (
              <Post
                key={post.id}
                postId={post.id}
                name={post.name}
                message={post.message}
                timestamp={post.timestamp}
                image={post.image}
                postImage={post.postImage}
              />
            ))}
      </FlipMove>
    </div>
  );
}

export default Posts;
