import React from "react";
import { useSelector } from "react-redux";
import { selectMasks } from "../redux/features/memberSlice";
import SidebarRow from "./SidebarRow";

function Sidebar({ user }) {
  const masks = useSelector(selectMasks);

  return (
    <div className="pt-5 max-w-[600px] xl:min-w-[300px] flex flex-col ">
      <SidebarRow src={user.photoURL} title={user.displayName} user={user} />
      <div className=" flex space-x-4 items-center mt-4">
        <div className="border-b hidden sm:inline-flex flex-grow "></div>
        <div className="text-gray-500">Ghosts</div>
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
