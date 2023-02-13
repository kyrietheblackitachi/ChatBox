import React from 'react'
import { useState, useEffect, useRef,createContext } from "react";
import Home from './Home.js'
import Message from './Message.js';
import { Box } from '@mui/system'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Chat from './Chat'



function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/chat",
      element:<Chat />,
      children: [
        {
          path: "/chat/:message",
          element: <Message/>,
        },
      ],
    },
  ]);
  return (
      <Box>
        <RouterProvider router={router} />
      </Box>
  )
}

export default App