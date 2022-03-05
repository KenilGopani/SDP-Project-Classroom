import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import Navbar from '../main/Navbar'
import UserAuthContext from '../../context/userContext/UserAuthContext'
import ClassroomContext from '../../context/classContext/ClassroomContext'
import MailModal from '../assignment/MailModal';

const Assignment = () => {
    const { user } = useContext(UserAuthContext)
    const { currentClassroom } = useContext(ClassroomContext)

    const [tipTitle, setTipTitle] = useState('');
    const [assignmentUrl, setAssignmentUrl] = useState('');
    const { id } = useParams();
    const [assignment, setAssignment] = useState(undefined);
    const [progress, setProgress] = useState(0);

    // const [allUser, setAllUser] = useState(currentClassroom.members);
    const [submittedUsers, setSubmittedUsers] = useState([]);
    const [notSubmittedUsers, setNotSubmittedUsers] = useState([]);

    const [currentSelectedMail, setCurrentSelectedMail] = useState('');
    /**
     * 0 - not uploaded
     * 1 - uploading
     * 2 - uploaded
     */
    const [uploadState, setUploadState] = useState(0);

    function getDifference(array1, array2) {
        return array1.filter(object1 => {
            return !array2.some(object2 => {
                return object1._id === object2.user._id;
            });
        });
    }
    // function getDifference(array1, array2) {
    //     let mySet1 = new Set();
    //     for (let i = 0; i < array1.length; i++) {
    //         const id = array1[i]._id;
    //         mySet1.add({ id: array1[i] })
    //     }
    //     let mySet2 = new Set();
    //     for (let i = 0; i < array2.length; i++) {
    //         const id = array2[i]._id;
    //         if(mySet1.has(id))
    //         {
    //             console.log(mySet1.delete(id));
    //         }
    //     }
    //     console.log(mySet1)
    //     // return mySet1;
    // }

    let fetchAssignment = async () => {
        try {
            let response = await fetch(`http://localhost:4099/api/assignment/${id}`, {
                method: 'GET',
            })
            response = await response.json();
            // console.log(response.assignment);
            const submission = response.assignment.submissions.find(submission => { return submission.userId.UID === user.uid ? submission : null; });
            // console.log(submission);
            if (submission) {
                setAssignmentUrl(submission.SubmissionLink);
                setUploadState(2);
                setTipTitle('You have already submitted, Please cancel the previous submission to submit new assignment.');
            }
            setAssignment(response.assignment);
            // console.log(response.assignment);
            let doneUser = response.assignment.submissions.map(submission => {
                return { user: submission.userId, submissionLink: submission.SubmissionLink }
            });
            setSubmittedUsers(doneUser);
            // const notDoneUser = getDifference(currentClassroom.members, doneUser);
            // setNotSubmittedUsers(notDoneUser);
            // console.log(allUser)
            // console.log(doneUser);
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchAssignment();
    }, []);
    const submitHandler = (event) => {
        event.preventDefault();
        setUploadState(1);
        const file = event.target[0].files[0];
        uploadFile(file);
        document.getElementById('formFile').value = '';
    }
    const uploadFile = async (file) => {
        if (!file) {
            setUploadState(0);
            return;
        }
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, `/assignments/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(prog);
        }, err => console.log(err), () => {
            getDownloadURL(uploadTask.snapshot.ref)
                .then((url) => {
                    setAssignmentUrl(url);
                    setUploadState(2);
                    setTipTitle('You have already submitted, Please cancel the previous submission to submit new assignment.');
                    uploadAssignmentInMongo(url); //own function (use 'url' insted setAssignmentUrl )
                })
        });
    }
    const uploadAssignmentInMongo = async (url) => {
        try {
            let response = await fetch('http://localhost:4099/api/assignment/submitAssignment', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userUID: user.uid,
                    classroomId: currentClassroom._id,
                    assignmentId: id, //id that came from params
                    SubmissionLink: url, // from the firebase
                    points: 0
                })
            })
            response = await response.json()
            // console.log(response)
        }
        catch (err) {
            console.log(err)
        }
    }

    const reminderHandler = async () => {
        const list = notSubmittedUsers.map(user => user.email);
        try {
            let response = await fetch('http://localhost:4099/api/assignment/reminder', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    list: list,
                    assignmentName: assignment.assignmentName,
                    className: currentClassroom.className,
                })
            })
            // console.log("Mail send................")
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleXYZ = () => {
        const notDoneUser = getDifference(currentClassroom.members, submittedUsers);
        setNotSubmittedUsers(notDoneUser);
        // console.log(notDoneUser);
    }

    return (
        <>
            <MailModal mailTo={currentSelectedMail} />
            <Navbar />
            <div className='container mt-3 p-5'>
                <div className='p-3'>
                    <div className='row m-0'>
                        <Link to={'/home/classroom'} className='col-2 fa fa-arrow-left my-auto ' style={{ fontSize: '30px', color: 'black' }} />
                        <h1 className='col-8 m-0 p-0 text-secondary text-center fw-bold'><i className="fas fa-file-alt col-2 m-auto" style={{ fontSize: '50px' }} />{assignment && assignment.assignmentName} </h1>
                    </div>
                    <hr />
                    <h4 className="text-uppercase fs-5" style={{ fontWeight: '900'}}>Description : </h4>
                    <div className='row m-0 p-3 overflow-auto fs-5' style={{ maxHeight: '250px', fontWeight: '500'}}>
                        {assignment && assignment.assignmentDescription}
                    </div>
                    <hr className='mx-0' />
                    {currentClassroom.owner.UID != user.uid && <div className="row">
                        <form onSubmit={submitHandler} className="row">
                            <h5 htmlFor="formFile" className="form-label col-12">Submit Here : </h5>
                            <input className="form-control w-50 col-6" type="file" id="formFile" />
                            <span className='mx-1 col-2 w-auto' data-toggle="tooltip" data-html="true" title={tipTitle}>
                                <button className='btn btn-primary' type='submit' disabled={uploadState === 2 ? true : false} ><i className="fa fa-upload" /></button>
                            </span>
                            <span className='mx-1 col-2 w-auto' data-toggle="tooltip" data-html="true" title="Cancel submission">
                                <button className='btn btn-primary' ><i className="fa fa-close" /></button>
                            </span>
                            <a className='btn btn-secondary mx-1 col-2' hidden={uploadState !== 2 ? true : false} href={assignmentUrl} target='_blank'><i className='fas fa-file-alt' />&nbsp; View</a>
                            <span className="col-2 border-0" hidden={uploadState === 1 ? false : true}>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                &nbsp; {progress}%
                            </span>
                        </form>
                    </div>}
                    {currentClassroom.owner.UID == user.uid && <div className="row mt-3 ">
                        <div className="card p-0">
                            <div className="card-header" id="headingOne">
                                <h2 className="mb-0">
                                    <a className="btn btn-primary" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1" onClick={handleXYZ}>Submission Status</a>
                                </h2>
                            </div>
                            <div className="collapse multi-collapse" id="multiCollapseExample1">
                                <div className="card card-body">
                                    <div className='row'>
                                        <ul className='list-group'>
                                            <h4 className="list-group-item list-group-item-dark"><em>Submitted List :</em></h4>
                                            {submittedUsers.map(sUser => (
                                                <li className='list-group-item row m-0 p-0' key={sUser.user._id}>
                                                    <p className='col-8 d-inline-block' >{sUser.user.name}</p>
                                                    <a href={sUser.submissionLink} className="fa fa-file-text col-2 link-secondary" style={{ fontSize: '24px' }} target='_blank' />
                                                    <i className="fa fa-envelope col-2 link-secondary" data-bs-toggle="modal" data-bs-target="#mail" style={{ fontSize: '24px' }} onClick={() => setCurrentSelectedMail(sUser.user.email)} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <br />
                                    <div className='row'>
                                        <ul className='list-group'>
                                            <div className='row m-0 p-0 list-group-item list-group-item-dark'>
                                                <h4 className='col-10 d-inline-block'><em>Pending List :</em></h4>
                                                <button className='btn btn-primary col-2 w-auto my-1' onClick={reminderHandler}>Reminder</button>
                                            </div>
                                            {notSubmittedUsers.map(nUser => (
                                                <li className='list-group-item row m-0 p-0' key={nUser._id}>
                                                    <p className='col-10 d-inline-block' >{nUser.name}</p>
                                                    <i className="fa fa-envelope link-secondary col-2" data-bs-toggle="modal" data-bs-target="#mail" style={{ fontSize: '24px' }} onClick={() => setCurrentSelectedMail(nUser.user.email)} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default Assignment