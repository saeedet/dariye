import { Avatar, makeStyles } from "@material-ui/core";
import React, { forwardRef } from "react";
import fromnow from "fromnow";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "32px",
    height: "32px",
    marginTop: "2px",
  },
}));

const Comment = forwardRef(
  ({ id, email, image, likes, message, name, timestamp }, ref) => {
    const classes = useStyles();

    return (
      <div ref={ref} className="flex pt-[6px] px-[16px]">
        <Avatar src={image} className={classes.avatar} />
        <div className="flex-grow ml-[7px]">
          <div className=" bg-gray-100 px-[12px] py-[8px] rounded-[20px] w-max">
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
            <div className="font-bold text-gray-500 cursor-pointer hover:underline">
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

export default Comment;
