import Head from "next/head";
import { useDispatch } from "react-redux";
import { db } from "../firebase";
import { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";
import { setGhosts } from "../redux/features/ghostSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import Auth from "../components/Auth";
import firebase from "firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  setUser,
  setUserCommentLikes,
  setUserLikes,
} from "../redux/features/userSlice";

export default function Home({ posts, ghosts }) {
  const [user, loading, error] = useAuthState(firebase.auth());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setGhosts(ghosts));
  }, []);

  if (user) {
    dispatch(
      setUser({
        uid: user.uid,
        photoURL: user.photoURL,
        displayName: user.displayName,
        email: user.email,
      })
    );
  }

  // Updating goasts in realtime
  const [realtimeGhosts] = useCollection(
    db.collection("ghosts").orderBy("timestamp", "desc")
  );

  useEffect(() => {
    const ghostsDocs = realtimeGhosts?.docs.map((ghost) => ({
      id: ghost.id,
      name: ghost.data().name,
      src: ghost.data().src,
    }));
    dispatch(setGhosts(ghostsDocs));
  }, [realtimeGhosts]);

  // Updating user likes in realtime
  const [realtimeUserLikes] = useCollection(
    db.collection("users").doc(user?.uid).collection("likes")
  );
  useEffect(() => {
    let userLikes = [];
    realtimeUserLikes?.docs.map((doc) => {
      userLikes.push(doc.id);
    });
    dispatch(setUserLikes(userLikes));
  }, [realtimeUserLikes]);

  // Updating user comment likes in realtime
  const [realtimeUserCommentLikes] = useCollection(
    db.collection("users").doc(user?.uid).collection("commentLikes")
  );
  useEffect(() => {
    let userCommentLikes = [];
    realtimeUserCommentLikes?.docs.map((doc) => {
      userCommentLikes.push(doc.id);
    });
    dispatch(setUserCommentLikes(userCommentLikes));
  }, [realtimeUserCommentLikes]);
  return (
    <div className="flex flex-col max-h-screen bg-gray-100 relative">
      <Head>
        <title>GhostBook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!user && <Auth loading={loading} />}
      {user && (
        <>
          <Header />
          <div className="flex pl-0 pr-2 sm:px-2 pt-[70px] max-h-screen ">
            <Sidebar />
            <Feed posts={posts} />
            <Widgets />
          </div>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  // Get the user
  // const session = await getSession(context);

  // Get ghosts data
  const ghosts = await db.collection("ghosts").get();

  const ghostsDocs = ghosts.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    timestamp: null,
  }));

  // Get the posts
  const posts = await db
    .collection("posts")
    .orderBy("timestamp", "desc")
    .limit(10)
    .get();

  const postsDocs = posts.docs.map((post) => ({
    id: post.id,
    ...post.data(),
    timestamp: null,
  }));
  return {
    props: {
      ghosts: ghostsDocs,
      posts: postsDocs,
    },
  };
}
