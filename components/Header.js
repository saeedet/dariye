import React from "react";
import { Avatar } from "@material-ui/core";
import firebase from "firebase";

import { LogoutIcon } from "@heroicons/react/outline";

function Header({ user }) {
  return (
    <div className="w-full h-[70px] flex  justify-center items-center shadow-md bg-white z-10 absolute top-0 px-[8px]">
      <div className=" h-full flex flex-grow justify-between items-center ">
        <div>
          <p className="text-red-400 font-bold pl-[8px] sm:font-extrabold text-2xl sm:text-4xl">
            GhostBook
          </p>
        </div>
        <div
          onClick={() => firebase.auth().signOut()}
          className="group flex cursor-pointer items-center space-x-2 pr-[8px]"
        >
          <p className="hidden sm:inline-flex font-semibold text-gray-600 text-xl group-hover:text-red-300  group-active:scale-90">
            Exit
          </p>
          <Avatar
            className="object-contain w-10 h-10  transform group-hover:scale-90 transition duration-75"
            src={user.photoURL}
          >
            {user.displayName}
          </Avatar>
          <LogoutIcon className="w-10 h-10 text-gray-400 group-hover:text-red-400  group-active:scale-90" />
        </div>
      </div>
    </div>
  );
}

export default Header;
