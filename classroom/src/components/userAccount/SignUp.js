import React, { useState, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import UserAuthContext from "../../context/userContext/UserAuthContext";


export default function SignUp() {

    const ctx = useContext(UserAuthContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        // setError("");
        try {
            const currentUser = await ctx.SignUp(email, password);
            // console.log("++");
            // console.log(currentUser.user.email);
            const response = await fetch("http://localhost:4099/api/auth/createUser",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ UID: currentUser.user.uid, name: name, email: currentUser.user.email })
                });
            navigate("/");
        }
        catch (err) {
            // setError(err.message);
            alert(err.message);
            // console.log(err.message);
        }
    }

    return (
        <>
            <div className="acontainer ">
                <form className="form d-flex flex-column align-items-center " method="post" onSubmit={handleSubmit} style={{background:'transparent'}}>
                    <h1>Sign Up</h1>
                    <input type="text" id="name" name="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Name" required />
                    <input type="email" id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" required />
                    <input type="password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" required />                
                    <div>Already have an account ? &nbsp;<Link to="/">Log in</Link></div>
                    <input type="submit" value="Sign Up" className="btn-small m-4" />
                </form>
            </div>
        </>
    );
}
