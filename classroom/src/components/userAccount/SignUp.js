import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";

export default function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const ctx = useUserAuth();
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        try{
            await ctx.SignUp(email, password);
            navigate("/");
        }
        catch(err){
            setError(err.message);
            console.log(err.message);
        }
    }

    return (
        <div>
            <div className="acontainer">
                <form className="form" method="post" onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>
                    {/* {error &&  <Alert varient="danger">{error}</Alert> } */}
                    <input type="email" id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" required />
                    <input type="password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" required />
                    <input type="submit" value="Sign Up" className="btn-small" />
                    <div className="link">
                        Already have an account ? &nbsp;<Link to="/">Log in</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
