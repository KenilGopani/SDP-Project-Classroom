import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import UserAuthContext from '../../context/userContext/UserAuthContext';

export default function Navbar() {

    const ctx = useContext(UserAuthContext);
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            await ctx.LogOut();
            console.log('logout');
            ctx.setUser({});
            navigate('/');
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top mb-3" style={{ "backgroundColor": "#e3f2fd" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/home">Klassroom</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/admin">Home</Link>
                            </li>
                        </ul>
                        {/* <form className="d-flex"> */}
                        <input className="form-control me-2 w-25" type="search" placeholder="Search" aria-label="Search" />
                        <Link to={'/profile'} className="fas fa-user-circle display-6 mx-2" />
                        <button className="btn btn-primary fas fa-sign-out-alt" onClick={logoutHandler}> LogOut</button>
                        {/* </form> */}
                    </div>
                </div>
            </nav>
        </>
    );
}
