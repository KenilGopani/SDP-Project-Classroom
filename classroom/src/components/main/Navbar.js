import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import UserAuthContext from '../../context/userContext/UserAuthContext';
import JoinClass from '../class/JoinClass';

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
            <JoinClass/>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ "backgroundColor": "#e3f2fd" }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Klassroom</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li> */}
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle w-25" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    +
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/createclass">Create classroom</Link></li>
                                    <li><span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#join">Join Classroom</span></li>
                                </ul>
                            </li>
                        </ul>
                        {/* <form className="d-flex"> */}
                        <input className="form-control me-2 w-25" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-primary" onClick={logoutHandler}> LogOut</button>
                        {/* </form> */}
                    </div>
                </div>
            </nav>
        </>
    );
}
