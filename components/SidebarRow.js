// import Image from "next/image";
import { Avatar } from "@material-ui/core";
import React from "react";

function SidebarRow({ src, title }) {
  return (
    <div className="flex items-center space-x-2 p-4 hover:bg-gray-200 rounded-xl cursor-pointer">
      <Avatar src={src} className="h-8 w-8" />
      <p className="hidden sm:inline-flex font-medium">{title}</p>
    </div>
  );
}

export default SidebarRow;
