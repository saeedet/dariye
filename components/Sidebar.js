import { useSession } from "next-auth/client";
import React from "react";
import { useSelector } from "react-redux";
import { selectMasks } from "../redux/features/memberSlice";
import SidebarRow from "./SidebarRow";

function Sidebar() {
  const [session] = useSession();

  const masks = useSelector(selectMasks);

  return (
    <div className="mt-5 max-w-[600px] xl:min-w-[300px] flex flex-col ">
      <SidebarRow src={session.user.image} title={session.user.name} />
      <div className=" flex space-x-4 items-center mt-4">
        <div className="border-b flex-grow"></div>
        <div>Masks</div>
        <div className="border-b flex-grow"></div>
      </div>
      {masks?.map((mask) => (
        <SidebarRow src={mask.src} title={mask.name} />
      ))}
    </div>
  );
}

export default Sidebar;
