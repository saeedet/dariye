import { useState } from "react";
import Email from "./Email";
import { signIn } from "next-auth/client";

function Login() {
  const [emailLogin, setEmailLogin] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-red-400  w-full">
      {emailLogin ? (
        // IF EMAIL IS CLICKED RENDER THIS
        <Email setEmailLogin={setEmailLogin} />
      ) : (
        <>
          <button className="border border-gray-400 rounded-md p-4 bg-red-200 font-semibold shadow-md active:shadow-none w-60">
            YOU NEED TO LOGIN FIRST!
          </button>
          <button
            onClick={() => setEmailLogin(true)}
            className="border border-gray-400 rounded-md p-4 bg-gray-200 font-semibold shadow-md active:shadow-none mt-2 w-60"
          >
            EMAIL
          </button>
          <button
            onClick={signIn}
            className="border border-gray-400 rounded-md p-4 bg-blue-200 font-semibold shadow-md active:shadow-none mt-2 w-60"
          >
            Facebook
          </button>
          <button className="border border-gray-400 rounded-md p-4 bg-green-100 font-semibold shadow-md active:shadow-none mt-2 w-60">
            Google
          </button>
        </>
      )}
    </div>
  );
}

export default Login;
