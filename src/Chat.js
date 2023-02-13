
import React from "react";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import "./style.css";
import logo from './image/logo.png'
import { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import { Outlet,useNavigate } from "react-router-dom";
import { getAuth,onAuthStateChanged,signOut   } from "firebase/auth";
import { updateDoc ,onSnapshot ,doc,collection, addDoc,getFirestore,getDoc,getDocs
, query, where }from "firebase/firestore"; 
const Chat=()=>{
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

    //fire store
    const db = getFirestore(app);
    

     //useREf for search
     const searchRef=useRef(null)
     // state hooks
    const [username,setUsername]=useState(null)
     const [name, setName] = useState('');
     const [results, setResults] = useState(true);
     const [empty, setEmpty] = useState(false);
     const [change, setChange] = useState(false);
     const [self, setSelf] = useState(true);
     const [toMessages, setToMessages] = useState(false);
     const [receiverId, setReceiverId] = useState('');
     const [userInfo, setUserInfo] = useState(null);
     const [userId, setUserId] = useState(null);
     const [showSearch, setShowSearch] = useState(true);
     const [random, setRandom] = useState(false);

    //navigate hooks
    const navigate=useNavigate()

    //user check
    const auth = getAuth()
    const [check,setCheck]=useState(false)

    const authChange=async()=>{
        onAuthStateChanged(auth, (user) => {
        if (user) {
            setCheck(true)
            setUserId(user.uid)

        }});
     
    }

   
    const addUserId =()=>{
        // const id=await updateDoc(userInfo, {id: userId });

    }
    useEffect(()=>{
       addUserId()
    },[userInfo])


    const displayUsername=async()=> {

        // Create a query against the collection.
        const userRef = collection(db, "users");
        const q = query(userRef, where("email", "==", auth.currentUser.email));
        const results =async()=>{
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((dox) => {
            setUsername(dox.data().username)
            });
        }

        results()
    }
    useEffect(()=>{authChange()
        if(check){
        displayUsername()}
    },[check])
    
    //log out
    const logOut=()=>{
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate('/');
          }).catch((error) => {
            // An error happened.
          });
    }
   
    //search for user via username

    const userArray=[]
    const [newArray,setNewArray]=useState([])
    
    const searchViaUsername =async()=>{
        const users = collection(db, "users");
        const q = query(users, where("username", "==", name));
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
            userArray.push(doc.data().username)
            setNewArray(userArray)
            setReceiverId(doc.id)
        })   
    }

    const getUserInfo =async()=>{
        const users = collection(db, "users");
        const q = query(users, where("username", "==", username));
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            setUserInfo(doc.id)  
        }) 
        if(userInfo==null){setChange(i=>!i)}      
    }
    useEffect(()=>{
        getUserInfo()
    },[change])

    const checkList=(e)=>{
        setName(e.target.value)   
    } 
    useEffect(()=>{
        if(name===newArray[0]){setEmpty(true)}else{setEmpty(false)}
        if(name===username){setSelf(false)}else{setSelf(true)}
    },[newArray])

    useEffect(()=>{
        searchViaUsername()
    },[results])

    //navigation
    const navigateToMessage=()=>{
        setToMessages(true)
        setEmpty(false)  
        setRandom(true)  
        navigate('/chat/:message')
        setUsernameInChat(name)  
        setName('')
    }


    //chat username state
    const [usernameInChat,setUsernameInChat]=useState('')
   
    return(
        <Box className='chat'>
            <Box className='chat-list'>
                
                <Box className='flex'>
                    <h2>{username}</h2>
                    <button className='logout' onClick={logOut}>Signout</button>
                </Box>
               <TextField    onChange={e=>{checkList(e);setResults(i=>!i)}}  value={name} helperText="Please enter username you want to chat with" ></TextField>
                <Box className='chat-div'>
                    { self && empty && newArray.map((user,index) =>{
                        return(
                        <div key={index}className='chats' onClick={navigateToMessage}><h5>@{user}</h5></div>
                    )
                    })}
                </Box> 
            </Box>
            <Box className='message-box-chat'>
                {!toMessages&&
                <Box className='chat-logo-div'>
                    <img className='chat-logo'src={logo} alt='logo'/>
                    <h2>ChatBox</h2>
                    <h4>Search for username and send a message...</h4>
                </Box>}

                {toMessages &&< Outlet  context={[usernameInChat,username,setShowSearch]}/>}

            </Box>
            
        </Box>
    )
}
export default Chat
