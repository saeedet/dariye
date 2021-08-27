import React from "react";
import InputBox from "./InputBox";
import Posts from "./Posts";
// import Stories from "./Stories";

function Feed({ posts, user }) {
  return (
    <div className="flex-grow h-screen pb-44  mx-2 overflow-y-auto scrollbar-hide">
      <div className="mx-auto max-w-md md:max-w-lg lg:max-w-xl 2xl:max-w-2xl">
        {/* <Stories /> */}
        <InputBox user={user} />
        <Posts posts={posts} user={user} />
      </div>
    </div>
  );
}

export default Feed;
