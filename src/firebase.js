import React from "react";

import { initializeApp } from "firebase/app";
import { getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged 
} from "firebase/auth";
const firebase=()=>{
  const firebaseConfig = {
    apiKey: "AIzaSyBzbXHHtIDTIhXbD6Vtt3V5zqQlLXJqiLQ",
    authDomain: "chat-app-a250f.firebaseapp.com",
    projectId: "chat-app-a250f",
    storageBucket: "chat-app-a250f.appspot.com",
    messagingSenderId: "940040987557",
    appId: "1:940040987557:web:9d042cd4c026a2aa88be4c"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  //SIGN UP
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  //SIGN IN
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  //CHANGE AUTH STATE
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
}
export default firebase
