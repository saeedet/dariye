import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";

// Config FirebaseUI
const uiConfig = {
  // Redirecting to "/" after sign in is successfull
  //   signInSuccessUrl: "/",
  // Providers
  signInOptions: [
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  ],
};

function Auth() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-blue-200 p-5">
      <h1 className="text-xl mb-2 font-semibold text-red-400">Dariye</h1>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

export default Auth;
