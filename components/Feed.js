import React from "react";
import InputBox from "./InputBox";
import Posts from "./Posts";
// import Stories from "./Stories";

function Feed({ posts }) {
  return (
    <div className="flex-grow max-h-screen pb-44   overflow-y-auto scrollbar-hide">
      <div className="mx-auto max-w-md md:max-w-lg lg:max-w-xl 2xl:max-w-2xl">
        {/* <Stories /> */}
        <InputBox />
        <Posts posts={posts} />
      </div>
    </div>
  );
}

export default Feed;
