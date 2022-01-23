import { async } from '@firebase/util';
import React,{ useState } from 'react'
import GoogleButton from 'react-google-button';
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { auth } from '../../firebase';


export default function LogIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const ctx = useUserAuth();
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        try {
            setEmail("test@gmail.com");
            setPassword("test123");
            const temp = await ctx.LogIn(email,password);
            console.log(temp);
            navigate('/home');
        } catch (err) {
            setError(err.message);
            console.log(err.message);
        }
    }
    const handleGoogleSign = async (event) => {
        event.preventDefault();
        try {
            await ctx.googleSignIn();
            navigate('/home');
        } catch (err) {
            console.log(err.message);
        }
    }
    return (
        <div>
            <div className="acontainer">
                {/* <div>hi</div> */}
                <form className="form" method="post" onSubmit={handleSubmit} >
                    <h1>Log In</h1>
                    <h5 style={{ color: 'red', textAlign: 'center' }}>{ }</h5>
                    <input type="email" id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" required />
                    <input type="password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" required />
                    <div className="link">
                        {/* <Link to="/abc">Forgot Password ?</Link> */}
                    </div>
                    <input type="submit" value="Log In" className="btn-large" />
                    <div className="link">
                        New Here ? &nbsp;<Link to="/signup">Sign Up</Link>
                    </div>
                    <hr />
                    <div>
                        <GoogleButton onClick={handleGoogleSign} style={{'margin':'auto'}}/>
                    </div>
                </form>
            </div>
        </div>
    )
}
