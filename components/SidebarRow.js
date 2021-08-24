// import Image from "next/image";
import { Avatar } from "@material-ui/core";
import { useSession } from "next-auth/client";
import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedMask } from "../redux/features/memberSlice";

function SidebarRow({ src, title }) {
  const dispatch = useDispatch();
  const [session] = useSession();

  const clickHandler = (name, image) => {
    if (session.user.name == name) {
      dispatch(setSelectedMask(null));
    } else {
      dispatch(
        setSelectedMask({
          name,
          image,
        })
      );
    }
  };

  return (
    <div
      onClick={() => clickHandler(title, src)}
      className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-xl cursor-pointer"
    >
      <Avatar src={src} className="h-8 w-8" />
      <p className="hidden sm:inline-flex font-medium">{title}</p>
    </div>
  );
}

export default SidebarRow;
