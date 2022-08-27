import { useEffect } from "react";
import io from "socket.io-client";
import './App.css';
import Chat from "./pages/Chat";
import Login from "./pages/Login";


function App() {
  const socket = io.connect("http://localhost:5000");

 

  return (
    <>
      {/* <Chat/> */}
      <Login/>
    </>
  );
}

export default App;
