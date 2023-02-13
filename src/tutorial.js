/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/heading-has-content */
import React from "react";
import { Box } from "@mui/system";
import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import "./style.css";
import { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom/client';
import { initializeApp } from '@firebase/app';
import{
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,where,orderBy,serverTimestamp,getDoc,
  updateDoc
} from 'firebase/firestore'

import{
  getAuth,
  createUserWithEmailAndPassword
}from 'firebase/auth';
const tut =()=>{
  const firebaseConfig = {
    apiKey: "AIzaSyBzbXHHtIDTIhXbD6Vtt3V5zqQlLXJqiLQ",
    authDomain: "chat-app-a250f.firebaseapp.com",
    projectId: "chat-app-a250f",
    storageBucket: "chat-app-a250f.appspot.com",
    messagingSenderId: "940040987557",
    appId: "1:940040987557:web:9d042cd4c026a2aa88be4c"
  };
  //init firebase app
  initializeApp(firebaseConfig);
  //init services
  const db = getFirestore();
  const auth=getAuth()
  //collection ref
  const colRef = collection(db,'books')

  //queries
  const q=query(colRef,orderBy('createdAt'))

  //real time collection data
  // onSnapshot(q,(snapshot)=>{
  //   let books=[]
  //   snapshot.docs.forEach((doc)=>{
  //     books.push({...doc.data(),id:doc.id})
  //   })
  //   console.log(books)
  // })

  //adding docs
  // const addBookForm=useRef(null)

  // const addingDoc=()=>{
  //     addDoc(
  //     colRef,{
  //       title:addBookForm.current.title.value,
  //       author:addBookForm.current.author.value,
  //       createdAt:serverTimestamp()
  //     }
  //   ).then(()=>{addBookForm.current.reset()})
  // }

  //deleting docs
//   const removeBookForm=useRef(null)
//   const deletingDoc=()=>{
//     const docRef=doc(db,'books',removeBookForm.current.id.value )
//     deleteDoc(docRef).then(()=>{removeBookForm.current.reset()})

// }
  //updating docs
  // const updateBookForm=useRef(null)
  // const updatingDoc=()=>{
  //   const docRef=doc(db,'books',updateBookForm.current.id.value )
  //   updateDoc(docRef,{
  //     title:'updated title'
  //   }).then(()=>{updateBookForm.current.reset()})}
//get a single doc
// const docRef=doc(db,'books','JWTMK5RnvyXFvJWMsN6V')
// getDoc(docRef).then((doc)=>{console.log(doc.data(),doc.id)})

// onSnapshot(docRef,(doc)=>{console.log(doc.data(),doc.id)})
const signupForm=useRef(null)
const signUp=()=>{
  const email=signupForm.current.email.value
  const password=signupForm.current.password.value
  createUserWithEmailAndPassword(auth,email,password).then((cred)=>{
    console.log('user created:',cred.user);
    signupForm.reset()
  }).catch((err)=>{console.log(err.message)})
}
  return(
    <Box>
      <form ref={signupForm} className='add' onSubmit={e=>{e.preventDefault();signUp()}}>
        <label>email</label>
        <input  name='email'input/>
        <label>password</label>
        <input type='password' name='password'input/>
        <button>signup</button>
      </form>

      <button>Logout</button>
    </Box>
  )
}
export default tut