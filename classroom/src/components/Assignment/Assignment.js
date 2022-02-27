import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { auth, storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import Navbar from '../main/Navbar'
import UserAuthContext from '../../context/userContext/UserAuthContext'
import ClassroomContext from '../../context/classContext/ClassroomContext'

const Assignment = () => {
    const { user } = useContext(UserAuthContext)
    const { currentClassroom } = useContext(ClassroomContext)


    const [tipTitle, setTipTitle] = useState('');
    const [assignmentUrl, setAssignmentUrl] = useState('');
    const { id } = useParams();
    const [assignment, setAssignment] = useState(undefined);
    const [progress, setProgress] = useState(0);

    const [allUser, setAllUser] = useState(currentClassroom.members);
    const [allDoneUser, setAllDoneUser] = useState([]);
    const [allNotDoneUser, setAllNotDoneUser] = useState([]);
    /**
     * 0 - not uploaded
     * 1 - uploading
     * 2 - uploaded
     */
    const [uploadState, setUploadState] = useState(0);

    function getDifference(array1, array2) {
        return array1.filter(object1 => {
          return !array2.some(object2 => {
            return object1._id === object2._id;
          });
        });
      }
    useEffect(async () => {
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

            let doneUser = response.assignment.submissions.map(submission => submission.userId);
            setAllDoneUser(doneUser);
            const notDoneUser = getDifference(allUser,doneUser);
            setAllNotDoneUser(notDoneUser);
        }
        catch (err) {
            console.log(err)
        }
    }, []);

    // useEffect(() => {
    //     if (assignment !== undefined) {
    //         let doneUser = assignment.submissions.map(submission => submission.userId);
    //         setAllDoneUser(doneUser);
    //         console.log(allUser);
    //     }
    // }, [assignment]);
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
            // response = await response.json()
            // console.log(response)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Navbar />
            <div className='container mt-3 p-5'>
                <div className='p-3'>
                    <div className='row m-0'>
                        <Link to={'/home/classroom'} className='col-2 fa fa-arrow-left my-auto ' style={{ fontSize: '30px', color: 'black' }} />
                        <h1 className='col-8 m-0 p-0 text-secondary text-center'><i className="fas fa-file-alt col-2 m-auto" style={{ fontSize: '50px' }} />{assignment && assignment.assignmentName} </h1>
                    </div>
                    <hr />
                    <h4>Description : </h4>
                    <div className='row m-0 p-3 overflow-auto' style={{ maxHeight: '250px' }}>
                        {assignment && assignment.assignmentDescription}
                    </div>
                    <hr className='mx-0' />
                    <div className="row mb-3">
                        <form onSubmit={submitHandler} className="row">
                            <h5 htmlFor="formFile" className="form-label col-12">Submit Here : </h5>
                            <input className="form-control w-50 col-6" type="file" id="formFile" />
                            <span className='mx-1 col-2 w-auto' data-toggle="tooltip" data-html="true" title={tipTitle}>
                                <button className='btn btn-primary' type='submit' disabled={uploadState === 2 ? true : false} ><i className="fa fa-upload" /></button>
                            </span>
                            <span className='mx-1 col-2 w-auto' data-toggle="tooltip" data-html="true" title="Cancel submission">
                                <button className='btn btn-primary' ><i className="fa fa-close" /></button>
                            </span>
                            <a className='btn btn-secondary mx-1 w-auto col-2' hidden={uploadState !== 2 ? true : false} href={assignmentUrl} target='_blank'><i className='fas fa-file-alt' />&nbsp; View</a>
                            <span className="col-2 border-0" hidden={uploadState === 1 ? false : true}>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                &nbsp; {progress}%
                            </span>
                        </form>
                    </div>
                    <div className="row">
                        <div className="card">
                            <div className="card-header" id="headingOne">
                                <h2 className="mb-0">
                                    <a className="btn btn-primary" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Submission Status</a>
                                </h2>
                            </div>
                            <div className="collapse multi-collapse" id="multiCollapseExample1">
                                <div className="card card-body">
                                    <div className='row'>
                                        <h4><em>Submitted List :</em></h4>
                                        <hr />
                                        <ul className='list-group'>
                                            {allDoneUser.map(user => (
                                                <li className='list-group-item'>{user.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className='row'>
                                        <h4><em>Pending List :</em></h4>
                                        <hr />
                                        <ul className='list-group'>
                                            {allNotDoneUser.map(user => (
                                                <li className='list-group-item'>{user.name}</li>
                                            ))}
                                        </ul>
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

export default Assignment