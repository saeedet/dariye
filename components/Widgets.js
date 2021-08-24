import { useSession } from "next-auth/client";
import React from "react";
import { useSelector } from "react-redux";
import { selectMasks } from "../redux/features/memberSlice";
import Member from "./Member";

function Widgets() {
  const masks = useSelector(selectMasks);
  const [session] = useSession();
  return (
    <div className="hidden lg:flex flex-col w-60 mt-5 p-2">
      <div className="flex justify-between items-center text-gray-500 mb-5 pb-2 border-b-2">
        <h2 className="text-xl">Online Members</h2>
        {/* <div className="flex space-x-2"></div> */}
      </div>
      <div className="flex w-full flex-wrap">
        <Member src={session.user.image} key={session.user.image} />
        {masks?.map((item) => (
          <Member key={item.src} src={item.src} />
        ))}
      </div>
    </div>
  );
}

export default Widgets;
