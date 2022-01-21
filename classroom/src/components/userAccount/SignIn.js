import React from 'react'
import { Link, useHistory } from "react-router-dom";


export default function SignIn() {
    return (
        <div>
            <div className="acontainer">
                {/* <div>hi</div> */}
                <form className="form">
                    <h1>Sign In</h1>
                    <h5 style={{ color: 'red', textAlign: 'center' }}>{ }</h5>
                    <input type="email" id="email" name="email" value={""} onChange={""} placeholder="Email" required />
                    <input type="password" id="password" name="password" value={""} onChange={""} placeholder="Password" required />
                    <div className="link">
                        {/* <Link to="/abc">Forgot Password ?</Link> */}
                    </div>
                    <input type="submit" value="Sign In" className="btn-large" onClick={""} />
                    <div className="link">
                        New Here ? &nbsp;<Link to="/signup">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
