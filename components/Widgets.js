import { Card } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { selectGhosts } from "../redux/features/ghostSlice";
import { selectUser } from "../redux/features/userSlice";
import AddGhost from "./AddGhost";
import Member from "./Member";

function Widgets() {
  const user = useSelector(selectUser);
  const ghosts = useSelector(selectGhosts);
  return (
    <div className="hidden lg:flex flex-col w-60  p-2 pt-5 h-full max-h-screen overflow-scroll scrollbar-hide mr-4 ">
      <Card>
        <div className="flex justify-center items-center text-gray-500 mb-5 mx-4 p-2 border-b-2">
          <h2 className="text-xl">Online Ghosts</h2>
        </div>
        <div className="flex w-full flex-wrap p-2">
          <Member src={user?.photoURL} key={user?.photoURL} />
          {ghosts?.map((item) => (
            <Member key={item.src} src={item.src} />
          ))}
        </div>
      </Card>
      <AddGhost />
    </div>
  );
}

export default Widgets;
