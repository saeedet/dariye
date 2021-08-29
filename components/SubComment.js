import { Avatar, makeStyles } from "@material-ui/core";
import fromnow from "fromnow";
import React, { forwardRef } from "react";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "24px",
    height: "24px",
    marginTop: "2px",
  },
}));

const SubComment = forwardRef(
  (
    { name, message, image, postId, likes, timestamp, displayReplyHandler },
    ref
  ) => {
    const classes = useStyles();
    return (
      <div ref={ref} className="flex pt-[6px] px-[16px] max-w-full">
        <Avatar src={image} className={classes.avatar} />
        <div className="flex-grow ml-[7px] flex flex-col">
          <div className=" bg-gray-100 px-[12px] py-[8px] rounded-[20px] self-start ">
            <div className="font-semibold text-sm">{name}</div>
            <div>{message}</div>
          </div>
          <div className="flex text-xs pt-[1px]">
            <div className="font-bold text-gray-500 ml-[12px] cursor-pointer hover:underline">
              Like
            </div>
            <div className="mx-1 flex  items-center">
              <span className="mt-[-5px]">.</span>
            </div>
            <div
              onClick={displayReplyHandler}
              className="font-bold text-gray-500 cursor-pointer hover:underline"
            >
              Reply
            </div>
            <div className="mx-1 flex  items-center">
              <span className="mt-[-5px]">.</span>
            </div>
            <div className=" cursor-pointer hover:underline">
              {fromnow(new Date(timestamp?.toDate()).toLocaleString(), {
                max: 1,
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default SubComment;
