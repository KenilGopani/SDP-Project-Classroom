import React from 'react'
import classes from './Profile.module.css';

const Profile = () => {
    return (
        <>
            <div className="container border border-dark rounded" >
                <div className={classes.mainBody}>
                    <div className={`row ${classes.guttersSm}`} >
                        <div className={`col-md-4 ${classes.mb3}`} >
                            <div className={classes.card}>
                                <div className={classes.cardBody}>
                                    <div className={"d-flex flex-column align-items-center text-center"} >
                                        <img src={require("../../static/img.jpg")} alt="Admin" className={"rounded-circle"} width="150" height="150" />
                                        <div className={"mt-3"}>
                                            <h4>John Doe</h4>
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
                                            Kenneth Valdez
                                        </div>
                                    </div>
                                    <hr />
                                    <div className={"row"}>
                                        <div className={"col-sm-3"}>
                                            <h6 className={"mb-0"}>Email</h6>
                                        </div>
                                        <div className={"col-sm-9 text-secondary"}>
                                            fip@jukmuh.al
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
                                            <a className={"btn btn-info"} target="__blank" href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills">Edit</a>
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