import React from 'react';
import { Routes, Route } from "react-router-dom";
// import ProtectedRoutes from "./components/ProtectedRoutes";
import LogIn from "./components/userAccount/LogIn";
import SignUp from "./components/userAccount/SignUp";
import Profile from "./components/userAccount/Profile";
import Home from "./components/main/Home";
import Classroom from './components/class/Classroom.js'
import CreateClass from './components/class/CreateClass';
import JoinClass from './components/class/JoinClass';
import UserAuthProvider from "./context/userContext/UserAuthProvider";
import ClassroomProvider from './context/classContext/ClassroomProvider'
import CreateAssignment from './components/assignment/CreateAssignment';
import Assignment from './components/assignment/Assignment';
import Admin from './components/admin/Admin';
import ViewUser from './components/admin/ViewUser';

function App() {
  return (
    <UserAuthProvider>
      <ClassroomProvider>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/signUp" element={<SignUp />} />
          {/* <Route path="/home" element = {<ProtectedRoutes><Home/></ProtectedRoutes>}/> */}
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/home/classroom" element={<Classroom />} />
          <Route exact path="/home/classroom/assignment" element={<CreateAssignment/>} />
          <Route exact path="/home/classroom/viewassignment/:id" element={<Assignment />} />
          <Route exact path="/createClass" element={<CreateClass />} />
          <Route exact path="/joinClass" element={<JoinClass />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/admin/viewuser/:id" element={<ViewUser/>}/>
        </Routes>
      </ClassroomProvider>
    </UserAuthProvider>
  );
}

export default App;
