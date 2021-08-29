import Head from "next/head";
import { useDispatch } from "react-redux";
import { db } from "../firebase";
import { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";
import { setMasks } from "../redux/features/memberSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import Auth from "../components/Auth";
import firebase from "firebase";

export default function Home({ posts, ghosts }) {
  const [user, loading, error] = useAuthState(firebase.auth());

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setMasks(ghosts));
  }, []);

  return (
    <div className="flex flex-col max-h-screen bg-gray-100 relative">
      <Head>
        <title>GhostBook</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading && (
        <p className="text-3xl font-semibold absolute top-5">Loading...</p>
      )}
      {!user && <Auth />}
      {user && (
        <>
          <Header user={user} />
          <div className="flex px-2 pt-[70px] max-h-screen ">
            <Sidebar user={user} />
            <Feed posts={posts} user={user} />
            <Widgets user={user} />
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
