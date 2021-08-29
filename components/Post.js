import React, { forwardRef, useEffect, useRef, useState } from "react";
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
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { MoreHorizOutlined } from "@material-ui/icons";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import CommentInput from "./CommentInput";
import Comments from "./Comments";
import fromnow from "fromnow";

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
  buttonHolder: {
    display: "flex",
    alignItems: "center",
    borderTop: "1px solid rgb(229, 231, 235)",
    borderBottom: "1px solid rgb(229, 231, 235)",
    padding: "5px 0",
  },
}));

const Post = forwardRef(
  (
    { name, message, postImage, image, timestamp, id, user, userLikes },
    ref
  ) => {
    const inputViewRef = useRef(null);

    const executeScroll = () =>
      inputViewRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

    //-------------
    const [renderComments, setRenderComments] = useState(false);
    const [displayComments, setDisplayComments] = useState(false);

    const commentsDisplayHandler = () => {
      setDisplayComments(!displayComments);
      if (!renderComments) {
        setRenderComments(true);
      }
    };

    // ------Comments count realtime hook
    const [realtimeCommentsCount] = useCollection(
      db.collection("posts").doc(id).collection("comments")
    );
    // material ui style
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
          subheader={fromnow(new Date(timestamp?.toDate()).toLocaleString(), {
            max: 1,
          })}
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

        {/* ----------------Footer__likes/Comments---------------------- */}
        {(likesCount !== 0 || realtimeCommentsCount?.docs.length !== 0) && (
          <div className="mx-[16px] py-[10px] px-1 flex justify-between text-gray-500">
            <div className="flex">
              <ThumbUpAltIcon className="text-blue-500 pr-1" />
              <div className="ml-1">{likesCount}</div>
            </div>
            <div
              className="hover:underline cursor-pointer"
              onClick={commentsDisplayHandler}
            >
              {realtimeCommentsCount?.docs.length} Comments
            </div>
          </div>
        )}

        {/* ----------------Footer__Buttons---------------------- */}
        <div className="mx-[16px]">
          <CardActions className={classes.buttonHolder}>
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
            <Button
              size="small"
              color="primary"
              className="flex-1"
              onClick={executeScroll}
            >
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
        {renderComments && (
          <Comments id={id} displayComments={displayComments} />
        )}
        <CommentInput id={id} user={user} inputViewRef={inputViewRef} />
      </Card>
    );
  }
);

export default Post;
