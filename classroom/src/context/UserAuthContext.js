import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";


const userAuthContext = createContext();
export function UserAuthContextProvider({ children }) {

    const [user, setUser] = useState("");
    function SignUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    function SignIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log(currentUser);
        });
        return () => { unsubscribe(); }
    }, [])

    return (
        <userAuthContext.Provider value={{user,SignUp}} >{children}</userAuthContext.Provider>)
}

export function useUserAuth() {
    return useContext(userAuthContext);
}