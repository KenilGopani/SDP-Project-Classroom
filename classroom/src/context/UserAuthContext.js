import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";


const userAuthContext = createContext();
export function UserAuthContextProvider({ children }) {

    const [user, setUser] = useState(null);
    function SignUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    function LogIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    function LogOut() {
        return signOut(auth);
    }
    function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth,googleAuthProvider);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log(currentUser);
        });
        return () => { unsubscribe(); }
    }, [])

    return (
        <userAuthContext.Provider value={{user,SignUp,LogIn,LogOut,googleSignIn}} >{children}</userAuthContext.Provider>)
}

export function useUserAuth() {
    return useContext(userAuthContext);
}