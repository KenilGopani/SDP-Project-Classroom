import React, { useContext} from 'react';
import { Link, useNavigate } from "react-router-dom";
import UserAuthContext from '../../context/user/UserAuthContext';

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
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{"backgroundColor" : "#e3f2fd"}}>
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
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/createclass">Create</Link></li>
                                    <li><Link className="dropdown-item" to="#">Join</Link></li>
                                    {/* <li><hr className="dropdown-divider"></li> */}
                                    {/* <li><Link className="dropdown-item" to="#">Something else here</Link></li> */}
                                </ul>
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link disabled">Disabled</a>
                            </li> */}
                        </ul>
                        {/* <form className="d-flex"> */}
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                                <button onClick={logoutHandler}> LogOut</button>
                        {/* </form> */}
                    </div>
                </div>
            </nav>
        </>
    );
}
