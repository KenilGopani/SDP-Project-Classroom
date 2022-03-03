import { useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    sendEmailVerification
} from "firebase/auth";
import { auth } from "../../firebase"
import UserAuthContext from "./UserAuthContext";

const UserAuthProvider = (props) => {

    const [user, setUser] = useState(null);
    const SignUp = async (email, password) => {

            const currentUser = await createUserWithEmailAndPassword(auth, email, password);
            sendEmailVerification(auth.currentUser)
            .then(() => {
            // Email verification sent!
            // ...
            // console.log("+++")
            // console.log(auth.currentUser)
            })
        return currentUser;
    }
    const LogIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    const LogOut = () => {
        return signOut(auth);
    }
    const googleSignIn = () => {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            // console.log(currentUser);
        });
        return () => { unsubscribe(); }
    }, [])

    return (
        <UserAuthContext.Provider value={{ user, setUser, SignUp, LogIn, LogOut, googleSignIn }}>
            {props.children}
        </UserAuthContext.Provider>
    )
}
export default UserAuthProvider;