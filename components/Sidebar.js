import React from "react";
import { useSelector } from "react-redux";
import { selectGhosts } from "../redux/features/ghostSlice";
import { selectUser } from "../redux/features/userSlice";
import SidebarRow from "./SidebarRow";

function Sidebar() {
  const ghosts = useSelector(selectGhosts);
  const user = useSelector(selectUser);

  return (
    <div className="flex flex-col items-center sm:items-stretch overscroll-y-scroll sm:border sm:p-1 mb-3 sm:ml-4 rounded-[7px] mt-5 max-w-[600px] xl:min-w-[300px] overflow-scroll scrollbar-hide ">
      <SidebarRow src={user?.photoURL} title={user?.displayName} />
      <div className=" flex items-center m-4">
        <div className="border-b hidden sm:inline-flex flex-grow "></div>
        <div className="text-gray-500 sm:mx-3">Ghosts</div>
        <div className="border-b hidden sm:inline-flex flex-grow"></div>
      </div>
      {ghosts?.map((ghost) => (
        <SidebarRow src={ghost.src} title={ghost.name} key={ghost.src} />
      ))}
    </div>
  );
}

export default Sidebar;
