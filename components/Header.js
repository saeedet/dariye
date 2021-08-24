import React from "react";
import { Avatar } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useSession, signOut } from "next-auth/client";

import { LogoutIcon } from "@heroicons/react/outline";

function Header() {
  const [session] = useSession();
  const dispatch = useDispatch();
  return (
    <div className="w-screen h-[70px] flex  justify-center items-center shadow-md bg-white">
      <div className="max-w-6xl h-full flex flex-grow justify-between items-center px-1">
        <div>
          <p className="text-red-400 font-bold pl-5 sm:font-extrabold text-2xl sm:text-4xl">
            DARIYE
          </p>
        </div>
        <div
          onClick={signOut}
          className="group flex cursor-pointer items-center space-x-2 "
        >
          <p className="hidden sm:inline-flex font-semibold text-gray-600 text-xl pr-1 group-hover:text-red-300  group-active:scale-90">
            Exit
          </p>
          <Avatar
            className="object-contain w-10 h-10  transform group-hover:scale-90 transition duration-75"
            src={session.user.image}
          >
            {session.user.name}
          </Avatar>
          <LogoutIcon className="w-10 h-10 text-gray-400 group-hover:text-red-400  group-active:scale-90" />
        </div>
      </div>
    </div>
  );
}

export default Header;
