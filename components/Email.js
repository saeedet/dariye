import { useRef, useState } from "react";
import { auth } from "../firebase";
import { login } from "../redux/features/userSlice";
import { useDispatch } from "react-redux";

function Email({ setEmailLogin }) {
  const [signUp, setSignUp] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const profilePicRef = useRef();
  const dispatch = useDispatch();

  // Login function
  const loginToApp = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            profileUrl: userAuth.user.photoURL,
          })
        );
      })
      .catch((err) => alert(err.message));
  };

  // Register function
  const register = (e) => {
    e.preventDefault();
    if (!nameRef.current.value) {
      return alert("Please enter your name!");
    }

    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: nameRef.current.value,
            photoURL: profilePicRef.current.value,
          })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                photoUrl: userAuth.user.photoURL,
              })
            );
          });
      })
      .catch((err) => alert(err.message));
  };
  return (
    <>
      {!signUp ? (
        <>
          <div className="flex justify-start w-60 mb-1">
            <p
              onClick={() => setEmailLogin(false)}
              className="cursor-pointer text-blue-900"
            >
              {"<"} Back
            </p>
          </div>
          <form
            onSubmit={loginToApp}
            className="border border-gray-400 rounded-md p-4 bg-red-200 font-semibold shadow-md  w-60 flex flex-col items-center justify-center"
          >
            <input
              ref={emailRef}
              type="email"
              placeholder="Email"
              className="bg-red-100 rounded-xl px-4 py-1 outline-none mt-2"
            />
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              className="bg-red-100 rounded-xl px-4 py-1 outline-none mt-2"
            />
            <button
              onClick={loginToApp}
              type="submit"
              className="mx-auto text-green-500 font-semibold w-full py-1 border border-transparent hover:border-red-100 rounded-xl shadow-sm active:shadow-inner active:border-transparent mt-4"
            >
              Login
            </button>
          </form>
          <div className="flex justify-end w-60 mt-1">
            <p
              onClick={() => setSignUp(true)}
              className="cursor-pointer text-blue-900"
            >
              Don't have an account?{" >"}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-start w-60 mb-1">
            <p
              onClick={() => setSignUp(false)}
              className="cursor-pointer text-blue-900"
            >
              {"<"} Back
            </p>
          </div>
          <form
            onSubmit={register}
            className="border border-gray-400 rounded-md p-4 bg-red-200 font-semibold shadow-md  w-60 flex flex-col items-center justify-center"
          >
            <input
              ref={nameRef}
              required
              type="text"
              placeholder="Display name"
              className="bg-red-100 rounded-xl px-4 py-1 outline-none"
            />
            <input
              ref={emailRef}
              type="email"
              placeholder="Email"
              className="bg-red-100 rounded-xl px-4 py-1 outline-none mt-2"
            />
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              className="bg-red-100 rounded-xl px-4 py-1 outline-none mt-2"
            />
            <input
              ref={profilePicRef}
              type="text"
              placeholder="Profile pic URL (optional)"
              className="bg-red-100 rounded-xl px-4 py-1 outline-none mt-2"
            />
            <button
              onClick={register}
              type="submit"
              className="mx-auto text-green-500 font-semibold w-full py-1 border border-transparent hover:border-red-100 rounded-xl shadow-sm active:shadow-inner active:border-transparent mt-4"
            >
              Join
            </button>
          </form>
        </>
      )}
    </>
  );
}

export default Email;
