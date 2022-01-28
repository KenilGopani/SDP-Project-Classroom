import React,{useContext } from 'react'
import { Navigate } from 'react-router-dom';
import  UserAuthContext  from "../context/user/UserAuthContext";

const ProtectedRoutes = (props) => {

    let { user } = useContext(UserAuthContext);
    // let { user } = useUserAuth(); 
    if(!user)
        return <Navigate to="/" />;
  return props.children;
};

export default ProtectedRoutes;
