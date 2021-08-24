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

export default function Home({ session, posts }) {
  if (!session) return <Login />;
  const masks = useSelector(selectMasks);
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
    <div className="flex flex-col min-h-screen bg-gray-100 scrollbar-hide">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header session={session} />
      <div className="flex justify-center ">
        {/* <div className="shadow-md"></div>  */}
        <main className="flex flex-grow max-w-6xl px-5">
          <Sidebar />
          <Feed posts={posts} />
          <Widgets />
        </main>
        {/* <div className="shadow-md"></div> */}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Get the user
  const session = await getSession(context);

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
      session,
      posts: docs,
    },
  };
}
