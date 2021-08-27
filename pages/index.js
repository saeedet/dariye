import Head from "next/head";
import Login from "../components/Login";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { getSession } from "next-auth/client";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";
import { selectMasks, setMasks } from "../redux/features/memberSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import Auth from "../components/Auth";
import firebase from "firebase";

export default function Home({ posts }) {
  // if (!session) return <Login />;
  // const masks = useSelector(selectMasks);
  const [user, loading, error] = useAuthState(firebase.auth());

  const dispatch = useDispatch();

  // console.log(masks);

  useEffect(() => {
    fetch("/dariyeData.json")
      .then((data) => data.json())
      .then((data) => {
        dispatch(setMasks(data.masks));
      });
  }, []);

  return (
    <div className="flex flex-col h-full bg-gray-100 scrollbar-hide relative">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading && (
        <p className="text-3xl font-semibold absolute top-5">Loading...</p>
      )}
      {!user && <Auth />}
      {user && (
        <>
          <Header user={user} />
          <div className="flex px-2 mt-[70px] ">
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

  // Get the masks data
  // const masks = await fetch("/dariyeData.json").then((data) => data.json());

  // Get the posts
  const posts = await db.collection("posts").orderBy("timestamp", "desc").get();

  const docs = posts.docs.map((post) => ({
    id: post.id,
    ...post.data(),
    timestamp: null,
  }));
  return {
    props: {
      // session,
      posts: docs,
    },
  };
}
