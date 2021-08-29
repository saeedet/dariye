import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Post from "./Post";
import FlipMove from "react-flip-move";

function Posts({ posts, user }) {
  const [realtimePosts] = useCollection(
    db.collection("posts").orderBy("timestamp", "desc").limit(10)
  );

  const [realtimeUserLikes] = useCollection(
    db.collection("users").doc(user.uid).collection("likes")
  );

  let userLikes = [];
  if (realtimeUserLikes) {
    realtimeUserLikes.docs.map((doc) => userLikes.push(doc.id));
  }

  return (
    <div>
      <FlipMove>
        {realtimePosts
          ? realtimePosts?.docs.map((post) => (
              <Post
                user={user}
                key={post.id}
                id={post.id}
                name={post.data().name}
                message={post.data().message}
                email={post.data().email}
                timestamp={post.data().timestamp}
                image={post.data().image}
                postImage={post.data().postImage}
                likes={post.data().likes}
                userLikes={userLikes}
              />
            ))
          : posts.map((post) => (
              <Post
                user={user}
                key={post.id}
                id={post.id}
                name={post.name}
                message={post.message}
                email={post.email}
                timestamp={post.timestamp}
                image={post.image}
                postImage={post.postImage}
                likes={post.likes}
                userLikes={userLikes}
              />
            ))}
      </FlipMove>
    </div>
  );
}

export default Posts;
