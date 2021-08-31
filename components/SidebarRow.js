// import Image from "next/image";
import { Avatar } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedGhost,
  setSelectedGhost,
} from "../redux/features/ghostSlice";
import { selectUser } from "../redux/features/userSlice";

function SidebarRow({ src, title }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const selectedGhost = useSelector(selectSelectedGhost);

  let bg = "";
  const clickHandler = (name, image) => {
    if (user?.displayName == name) {
      dispatch(setSelectedGhost(null));
    } else {
      dispatch(
        setSelectedGhost({
          name,
          image,
        })
      );
    }
  };
  if (!selectedGhost && user?.displayName == title) {
    bg = "bg-gray-200";
  }
  return (
    <div
      onClick={() => clickHandler(title, src)}
      className={`flex items-center space-x-2 p-2 ${bg}  ${
        selectedGhost?.name == title && "bg-gray-200"
      } hover:bg-gray-200 rounded-[7px] cursor-pointer`}
    >
      <Avatar src={src} className="h-8 w-8" />
      <p className="hidden sm:inline-flex font-medium">{title}</p>
    </div>
  );
}

export default SidebarRow;
