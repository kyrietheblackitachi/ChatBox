import React from "react";
import { Box } from "@mui/system";
import { Card,TextField } from "@mui/material";
import "./style.css";
import { useState,useParams, useEffect, useRef } from "react";
import ReactDOM from 'react-dom/client';
import { initializeApp } from "firebase/app";
import { Link,Outlet,useNavigate, useOutletContext } from "react-router-dom";
import { getAuth,onAuthStateChanged,signOut   } from "firebase/auth";
import { orderBy,arrayUnion,updateDoc,collectionGroup,setDoc,doc,collection, addDoc,getFirestore,getDoc,getDocs
, query, where,serverTimestamp }from "firebase/firestore"; 


const Message=()=>{ 
    const [usernameInChat,username]=useOutletContext()
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
    // Initialize Firestore
    const db = getFirestore(app);

    //state message
    const [message,setMessage]=useState('')
    const [messageSent,setMessageSent]=useState(false)
    const [messageArray,setMessageArray]=useState([])
    const [anotherArray,setAnotherArray]=useState([])
    const [checkMessage,setCheckMessage]=useState([])
    const [docId,setDocId]=useState(false)
    //function to set Message state with text value
    const getMessage=(e)=>{
       setMessage(e.target.value)
    }

    // const shuffleId=()=> {
    //     const a = userInfo.split(""),
    //         n = a.length;
    
    //     for(let i = n - 1; i > 0; i--) {
    //         let j = Math.floor(Math.random() * (i + 1));
    //         let tmp = a[i];
    //         a[i] = a[j];
    //         a[j] = tmp;
    //     }
    //     setChatId(a.join(""))
    // }

    //function to send Message

    const sendMessage=async()=>{
        const docRef = await addDoc(collection(db,'messages'),{
            messages:{message},
            createdAt:serverTimestamp(),
            participants:[username,usernameInChat,], 
            chatId:username+usernameInChat
        },);
        setMessageSent(i=>!i) 
        
    }

    const showMessage=async()=>{
        const newArray=[]
        const messages = collection(db, "messages");
        const q = query(messages, where("participants", 'array-contains-any',[username,usernameInChat]),orderBy("createdAt"));
        const querySnapshot = await getDocs(q)
       
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
            if(doc.data().chatId.includes(String(username))&&doc.data().chatId.includes(String(usernameInChat))){
            newArray.push(doc.data())}
            setMessageArray(newArray)
        })
        setDocId(i=>!i) 
        console.log(anotherArray)   
    }
    console.log(username,usernameInChat)
    useEffect(()=>{
        console.log(username,usernameInChat)
        setMessage('')
        showMessage()  
    },[messageSent,usernameInChat])
    useEffect(()=>{
        console.log(messageArray)  
    },[docId])
    const navigate=useNavigate()



return(
    <Box className='text'>
        <Box className='chat-username-box'>
            <h1>{usernameInChat}</h1>
        </Box>
        <Box className='messages-box'>
            <Box >
                {messageArray.map((item,index)=>{
                    const fireBaseTime = new Date(item.createdAt.seconds * 1000)
                    const date = fireBaseTime.toDateString();
                    const atTime = fireBaseTime.toLocaleTimeString('en-US');
                    const sender=item.participants[0]
                    return(
                    <div key={index}className={username==sender?'invinsible-div-sender':'invinsible-div-receiver'}>
                    <div  className={username==sender?'my-message':'your-message'}>
                        <h4> {item.messages.message}</h4>
                        <h6 className='time'> {atTime}</h6>
                            
                    </div>
                    </div>)
                })}     
            </Box>
        </Box>
        <Box className='message'>
            <TextField value={message} onChange={e=>{getMessage(e)}} className='input'label='Type your message here'></TextField>
            <button className='send'onClick={()=>{sendMessage()}}>Send</button>
        </Box>
        
    </Box>

)}
export default Message