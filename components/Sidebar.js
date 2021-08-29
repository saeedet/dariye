import React from "react";
import { useSelector } from "react-redux";
import { selectMasks } from "../redux/features/memberSlice";
import SidebarRow from "./SidebarRow";

function Sidebar({ user }) {
  const masks = useSelector(selectMasks);

  return (
    <div className="flex flex-col items-center sm:items-stretch overscroll-y-scroll sm:border sm:p-1 mb-3 sm:ml-4 rounded-[7px] mt-5 max-w-[600px] xl:min-w-[300px] overflow-scroll scrollbar-hide ">
      <SidebarRow src={user.photoURL} title={user.displayName} user={user} />
      <div className=" flex items-center m-4">
        <div className="border-b hidden sm:inline-flex flex-grow "></div>
        <div className="text-gray-500 sm:mx-3">Ghosts</div>
        <div className="border-b hidden sm:inline-flex flex-grow"></div>
      </div>
      {masks?.map((mask) => (
        <SidebarRow
          src={mask.src}
          title={mask.name}
          user={user}
          key={mask.src}
        />
      ))}
    </div>
  );
}

export default Sidebar;
