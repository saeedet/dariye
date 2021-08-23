import { useSession } from "next-auth/client";
import React from "react";
import SidebarRow from "./SidebarRow";

function Sidebar() {
  const [session] = useSession();
  // console.log(session.user.image);
  return (
    <div className="mt-5 max-w-[600px] xl:min-w-[300px] flex flex-col ">
      <SidebarRow src={session.user.image} title={session.user.name} />
      <SidebarRow src={""} title="Friends" />
      <SidebarRow src={""} title="Groups" />
      <SidebarRow src={""} title="Marketplace" />
      <SidebarRow src={""} title="Watch" />
      <SidebarRow src={""} title="Events" />
      <SidebarRow src={""} title="Memories" />
      <SidebarRow src={""} title="See More" />
    </div>
  );
}

export default Sidebar;
