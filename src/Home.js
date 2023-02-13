
import React from "react";
import { Box,} from "@mui/system";
import { Card, MenuItem, Select, TextField,Tabs,Tab, } from "@mui/material";
import "./style.css";
import { useState, useEffect, useRef,createContext } from "react";
import ReactDOM from 'react-dom/client';
import logo from './image/logo.png'
import { Link,Outlet,useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged, 
  checkActionCode
} from "firebase/auth";

import { query,where,collection, addDoc,getFirestore,getDocs 
}from "firebase/firestore"; 

const Home=({setUsername})=>{
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

  //fire store
  const db = getFirestore(app);


  //state hooks

  const [signIn,setSignIn]=useState(true)
  const [signUp,setSignUp]=useState(false)
  const [error,setError]=useState(false)
  const [taken,setTaken]=useState(false)
  const [check,setCheck]=useState(false)


  const signInRef=useRef(null)
  const signUpRef=useRef(null)

  //effect hooks

  //navigate hooks
  const navigate=useNavigate()


  //sign in authentication
  const authIn=()=>{
    const email=signInRef.current.sign_in_email.value
    const password=signInRef.current.sign_in_password.value
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      navigate('/chat');
      console.log('logged in');

    }).catch((error) => {const errorCode = error.code;const errorMessage = error.message;});
  }
  //username check

  const [unusedUsername,setUnusedUsername] = useState(null)
  const [run,setRun]=useState(false)

  const searchViaUsername =async()=>{
    const users = collection(db, "users");
    const q = query(users, where("username", "==", signUpRef.current.sign_up_username.value));
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
        console.log(doc.data()) 
        setUnusedUsername(doc.data().username)
    })
    setCheck(true)
    console.log(signUpRef.current.sign_up_username.value)
  }

  const addUsername=async()=>{
      const docRef = await addDoc(collection(db, "users"), {
          username: signUpRef.current.sign_up_username.value,
          email: signUpRef.current.sign_up_email.value,
      });
      console.log('added')
  }

  useEffect(()=>{
    if(check){
      if(unusedUsername===signUpRef.current.sign_up_username.value){setCheck(false);setTaken(true)} 
    else{setTaken(false);setRun(true)}
    }
    console.log('ran')
  },[check,unusedUsername])

  console.log(taken)
  console.log(check)
  

  //sign up authentication

  const authUp=()=>{
    console.log('gg')
    const email=signUpRef.current.sign_up_email.value
    const password1=signUpRef.current.sign_up_password1.value
    const password2=signUpRef.current.sign_up_password2.value
    if(!error && !taken){
    createUserWithEmailAndPassword(auth, email, password2)
    .then((userCredential) => {
      addUsername()
      const user = userCredential.user;
      navigate('/chat')
    })
    .catch((error) => {
      console.log('error')
    });
  }
  }
  

  useEffect(()=>{
    if(check){
      const email=signUpRef.current.sign_up_email.value
      const password1=signUpRef.current.sign_up_password1.value
      const password2=signUpRef.current.sign_up_password2.value
    if(password1===password2 && password2.length>=6){
      setError(false)
    }else{setError(true)}
  }
  },[check,error])

  useEffect(()=>{
    if(check){
    if(run){authUp()}}
  },[check,run])

 
  return(

      <Box className='login-page'>
        
        <Card className='login'>
        

            <div className='logo-div'>
              <h1>ChatBox</h1><img className='logo'src={logo} alt='logo'/>
            </div>

            <Tabs className='tab'value={0}>
              <Tab label="Sign In"  value={0} onClick={()=>{setSignIn(true);setSignUp(false)}}/>
              <Tab label="Sign Up"  value={1} onClick={()=>{setSignIn(false);setSignUp(true)}}/>
            </Tabs>

            <form ref={signInRef} onSubmit={e=>{e.preventDefault();authIn();console.log('clicked')}}>
              {signIn &&<Box className='sign'>
                <TextField name='sign_in_email'type='email' label='email'></TextField>
                <TextField  error={error} helperText={error?"Please enter a valid and password":null} name='sign_in_password'type='password' label='password'></TextField>
                <button>Sign in</button>
              </Box>}
            </form>

            <form ref={signUpRef} onSubmit={e=>{e.preventDefault();searchViaUsername()}}>
              {signUp&&<Box className='sign'>
                <TextField  name='sign_up_email' type='email' label='email'></TextField>
                <TextField   error={taken} helperText={taken?"Username has been taken,try another one":null}name='sign_up_username' type='username' label='username'></TextField>
                <TextField  name='sign_up_password1' type='password' label='password'></TextField>
                <TextField  error={error} helperText={error?"Password should be at least 6 characters":null} name='sign_up_password2' type='password' label='confirm password'></TextField>
                <button >Sign up</button>
              </Box>}
            </form>
        </Card>
      </Box>

  )
}
export default Home