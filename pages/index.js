import Head from "next/head";
import Login from "../components/Login";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { auth, db } from "../firebase";
import { login, logout, selectUser } from "../redux/features/userSlice";
import { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { getSession } from "next-auth/client";
import Feed from "../components/Feed";

export default function Home({ session, posts }) {
  if (!session) return <Login />;
  // const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   auth.onAuthStateChanged((userAuth) => {
  //     if (userAuth) {
  //       //user is logged in
  //       dispatch(
  //         login({
  //           email: userAuth.email,
  //           uid: userAuth.uid,
  //           displayName: userAuth.displayName,
  //           photoUrl: userAuth.photoURL,
  //         })
  //       );
  //     } else {
  //       //user is logged out
  //       dispatch(logout());
  //     }
  //   });
  // }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header session={session} />
      <div className="flex justify-center ">
        {/* <div className="shadow-md"></div>  */}
        <main className="flex flex-grow max-w-5xl  px-5">
          <Sidebar />
          <Feed posts={posts} />
        </main>
        {/* <div className="shadow-md"></div> */}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Get the user
  const session = await getSession(context);
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
