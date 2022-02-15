import React from 'react';
import { Routes, Route} from "react-router-dom";
import UserAuthProvider from "./context/user/UserAuthProvider";
// import ProtectedRoutes from "./components/ProtectedRoutes";
import LogIn from "./components/userAccount/LogIn";
import SignUp from "./components/userAccount/SignUp";
import Home from "./components/main/Home";
import Classroom from './components/Classroom/Classroom.js'
import CreateClass from './components/class/CreateClass';
import JoinClass from './components/class/JoinClass';

function App() {
  return (
      <UserAuthProvider>
      <Routes>
        <Route path="/" element={<LogIn/>} />
        <Route path="/signUp" element={<SignUp/>} />
        {/* <Route path="/home" element = {<ProtectedRoutes><Home/></ProtectedRoutes>}/> */}
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/home/classroom" element={<Classroom/>} />
        <Route exact path="/createClass" element={<CreateClass/>} />
        <Route exact path="/joinClass" element={<JoinClass/>} />
      </Routes>
      </UserAuthProvider>
  );
}

export default App;
