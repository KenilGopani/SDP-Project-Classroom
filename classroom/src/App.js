import React from 'react';
import { Routes, Route} from "react-router-dom";
import UserAuthProvider from "./context/user/UserAuthProvider";
import ProtectedRoutes from "./components/ProtectedRoutes";
import LogIn from "./components/userAccount/LogIn";
import SignUp from "./components/userAccount/SignUp";
import Home from "./components/main/Home";
import CreateClass from './components/class/CreateClass';

function App() {
  return (
      <UserAuthProvider>
      <Routes>
        <Route path="/" element={<LogIn/>} />
        <Route path="/signUp" element={<SignUp/>} />
        {/* <Route path="/home" element = {<ProtectedRoutes><Home/></ProtectedRoutes>}/> */}
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/createClass" element={<CreateClass/>} />

      </Routes>
      </UserAuthProvider>
  );
}

export default App;
