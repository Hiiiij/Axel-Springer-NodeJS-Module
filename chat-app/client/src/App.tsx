import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import { useSockets } from './context/socket-context';
import {Messages, Rooms} from './containers'

function App() {
  const { SocketServer } = useSockets(); //connection to server using context to get value
  const [socketId, setSocketId] = useState<string | undefined>("");

  const [userNameInput, setUserNameInput] = useState<string | undefined>("")

  const handleSetUserName = () => {
    if (!userNameInput)
    {
      return
    }
    localStorage.setItem("userName", userNameInput )
  };

  useEffect(() => {

    SocketServer.on("connect", () => setSocketId(SocketServer.id));
    return () => {
      SocketServer.off("connect", () => setSocketId(SocketServer.id));
    };
  }, [SocketServer]);
  
  return <>
    <div>
      <input type="text" placeholder="User Name" value={userNameInput} onChange={(e) => setUserNameInput(e.target.value)} />
      <button onClick={handleSetUserName}>Log In</button>
    </div>
    {socketId}
    <Messages />
    <Rooms />
    
  </>
}
  
export default App;
