import React, { useEffect, useState, useContext } from 'react'
import classes from './Profile.module.css';
import UserAuthContext from "../../context/userContext/UserAuthContext";
import Navbar from '../main/Navbar';
const Profile = () => {
    const [userMongo, setUserMongo] = useState({});
    const { user } = useContext(UserAuthContext);

    const fetchUserDetails = async () => {
        try {
            let response = await fetch(
                "http://localhost:4099/api/auth/getProfile",
                {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'userId': user.uid,
                    }),
                }
            );
            response = await response.json();
            setUserMongo(response.user);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchUserDetails();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container border border-dark rounded mt-5" >
                <div className={classes.mainBody}>
                    <div className={`row ${classes.guttersSm}`} >
                        <div className={`col-md-4 ${classes.mb3}`} >
                            <div className={classes.card}>
                                <div className={classes.cardBody}>
                                    <div className={"d-flex flex-column align-items-center text-center"} >
                                        <img src={require("../../static/user.png")} alt="Admin" className={"rounded-circle"} width="150" height="150" />
                                        <div className={"mt-3"}>
                                            <h4>{userMongo.name}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"col-md-8"} >
                            <div className={`${classes.card} ${classes.mb3}`}>
                                <div className={classes.cardBody}>
                                    <div className={"row"}>
                                        <div className={"col-sm-3"}>
                                            <h6 className={"mb-0"}>Full Name</h6>
                                        </div>
                                        <div className={"col-sm-9 text-secondary"}>
                                            {userMongo.name}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className={"row"}>
                                        <div className={"col-sm-3"}>
                                            <h6 className={"mb-0"}>Email</h6>
                                        </div>
                                        <div className={"col-sm-9 text-secondary"}>
                                            {userMongo.email}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className={"row"}>
                                        <div className={"col-sm-3"}>
                                            <h6 className={"mb-0"}>Phone</h6>
                                        </div>
                                        <div className={"col-sm-9 text-secondary"}>
                                            (239) 816-9029
                                        </div>
                                    </div>
                                    <hr />
                                    <div className={"row"}>
                                        <div className={"col-sm-3"}>
                                            <h6 className={"mb-0"}>Mobile</h6>
                                        </div>
                                        <div className={"col-sm-9 text-secondary"}>
                                            (320) 380-4539
                                        </div>
                                    </div>
                                    <hr />
                                    <div className={"row"}>
                                        <div className={"col-sm-3"}>
                                            <h6 className={"mb-0"}>Address</h6>
                                        </div>
                                        <div className={"col-sm-9 text-secondary"}>
                                            Bay Area, San Francisco, CA
                                        </div>
                                    </div>
                                    <hr />
                                    <div className={"row"}>
                                        <div className={"col-sm-12"}>
                                            <button className={"btn btn-info"} >Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Profile