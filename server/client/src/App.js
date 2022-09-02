import { useEffect } from "react";
import io from "socket.io-client";
import './App.css';
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from "./utils/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";


function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route exact path="/login" element={<Login />} />
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
