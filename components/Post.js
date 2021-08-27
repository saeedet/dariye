import React, { forwardRef, useEffect, useState } from "react";
import { ChatAltIcon, ShareIcon, ThumbUpIcon } from "@heroicons/react/outline";
import { db } from "../firebase";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import firebase from "firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { MoreHorizOutlined } from "@material-ui/icons";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

// Card style
const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "7px",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    padding: "12px 16px 0 16px",
    marginBottom: "12px",
  },
  content: {
    padding: "4px 16px 16px 16px",
  },
  headerTitle: {
    fontWeight: "bold",
  },
}));

const Post = forwardRef(
  (
    { name, message, postImage, image, timestamp, id, user, userLikes },
    ref
  ) => {
    const classes = useStyles();
    //-------------------------------------------POST LIKES ---------------------//
    // the state of the UI post like number
    const [likesCount, setLikesCount] = useState(0);

    // Keep tracking of the post likes number LIVE
    const [likes, loading, error] = useDocument(
      firebase.firestore().doc(`posts/${id}`)
    );

    // changing the like number whenever it changes in database
    useEffect(() => {
      setLikesCount(likes?.data().likes);
    }, [likes?.data().likes]);

    //Check if the post is already liked
    const [liked, setLiked] = useState(false);

    useEffect(() => {
      if (userLikes.includes(id)) {
        setLiked(true);
      }
    }, [userLikes]);

    // Function for inserting or removing likes to/from database
    const likePost = (id) => {
      if (!liked) {
        // if the post is not liked
        db.collection("users")
          .doc(user.uid)
          .collection("likes")
          .doc(id)
          .set({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(setLikesCount((prevCount) => prevCount + 1))
          .then(setLiked(true));
      } else {
        // if the post is already liked
        db.collection("users")
          .doc(user.uid)
          .collection("likes")
          .doc(id)
          .delete()
          .then(setLikesCount((prevCount) => prevCount - 1))
          .then(setLiked(false));
      }
    };
    //-------------------------------------------POST LIKES ---------------------//

    // switching the post title phont size
    function countWords(str) {
      str = str.replace(/(^\s*)|(\s*$)/gi, "");
      str = str.replace(/[ ]{2,}/gi, " ");
      str = str.replace(/\n /, "\n");
      return str.split(" ").length;
    }

    return (
      <Card ref={ref} className={classes.root}>
        {/* ---------------------------Header-------------------- */}
        <CardHeader
          className={classes.header}
          avatar={
            <Avatar src={image} className={classes.avatar}>
              {user?.displayName}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreHorizOutlined />
            </IconButton>
          }
          title={name}
          classes={{
            title: classes.headerTitle,
          }}
          subheader={new Date(timestamp?.toDate()).toLocaleString()}
        />
        {/* ---------------------------Content------------------ */}
        <CardContent className={classes.content}>
          <Typography
            variant={countWords(message) === 1 ? "h6" : "body1"}
            color="textPrimary"
            component="p"
          >
            {message}
          </Typography>
        </CardContent>
        {/* ---------------------------Image------------------- */}
        {postImage && (
          <CardMedia className="h-56 md:h-96" image={postImage} title={name} />
        )}

        {/* ----------------Footer__likes---------------------- */}
        {likesCount !== 0 && (
          <div className="mx-[16px] py-[10px] px-1 border-t flex justify-between text-gray-500">
            <div className="flex">
              <ThumbUpAltIcon className="text-blue-500 pr-1" />
              <div className="ml-1">{likesCount}</div>
            </div>
            <div>0 Comments</div>
          </div>
        )}

        {/* ----------------Footer__Buttons---------------------- */}
        <div className="mx-[16px]">
          <CardActions className="flex space-x-2 items-center  border-t">
            <Button
              size="small"
              color="primary"
              className={`flex-1 `}
              onClick={() => likePost(id)}
            >
              <ThumbUpIcon
                className={`h-4 ${liked ? "text-blue-500" : "text-gray-600"}`}
              />
              <p
                className={`text-xs capitalize pl-1 font-semibold ${
                  liked ? "text-blue-500" : "text-gray-600"
                } sm:text-sm xl:text-base`}
              >
                Like
              </p>
            </Button>
            <Button size="small" color="primary" className="flex-1">
              <ChatAltIcon className="h-4 text-gray-600" />
              <p className="text-xs capitalize pl-1 font-semibold text-gray-600 sm:text-sm xl:text-base">
                Comment
              </p>
            </Button>
            <Button size="small" color="primary" className="flex-1">
              <ShareIcon className="h-4 text-gray-600" />
              <p className="text-xs capitalize pl-1 font-semibold text-gray-600 sm:text-sm xl:text-base">
                Share
              </p>
            </Button>
          </CardActions>
        </div>
        {/* <div ">
          <div className="inputIcon rounded-none " onClick={() => likePost(id)}>
            <p>{likesCount}</p>
            <ThumbUpIcon className={`h-4 ${liked && "text-blue-500"}`} />
            <p className={`text-xs sm:text-base ${liked && "text-blue-500"}`}>
              {liked ? "Liked" : "Like"}
            </p>
          </div>
          <div className="inputIcon rounded-none ">
            <ChatAltIcon className="h-4" />
            <p className="text-xs sm:text-base">Comment</p>
          </div>
          <div className="inputIcon rounded-none">
            <ShareIcon className="h-4" />
            <p className="text-xs sm:text-base">Share</p>
          </div>
        </div> */}
      </Card>
    );
  }
);

export default Post;
