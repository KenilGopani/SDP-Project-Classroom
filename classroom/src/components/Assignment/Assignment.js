import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { auth, storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import Navbar from '../main/Navbar'
import UserAuthContext from '../../context/userContext/UserAuthContext'
import ClassroomContext from '../../context/classContext/ClassroomContext'

const Assignment = () => {
    const [assignmentUrl, setAssignmentUrl] = useState('');
    const { id } = useParams();
    const [assignment, setAssignment] = useState({});
    const [progress, setProgress] = useState(0);
    const [uploadState, setUploadState] = useState(0);

    const {user} = useContext(UserAuthContext)
    const {currentClassroom} = useContext(ClassroomContext)

    useEffect(async () => {
        try {
            let response = await fetch(`http://localhost:4099/api/assignment/${id}`, {
                method: 'GET',
            })
            response = await response.json();
            setAssignment(response.assignment);
        }
        catch (err) {
            console.log(err)
        }
    }, []);

    const submitHandler = (event) => {
        event.preventDefault();
        setUploadState(1);
        const file = event.target[0].files[0];
        uploadFile(file);
    }

    const uploadFile = async (file) => {
        if (!file) {
            setUploadState(0);
            return;
        }

        const storageRef = ref(storage, `/assignments/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(prog);
        }, err => console.log(err), () => {
            getDownloadURL(uploadTask.snapshot.ref)
                .then((url) => {
                    setAssignmentUrl(url);
                    setUploadState(2);
                    uploadAssignmentInMongo(url); //own function (use 'url' insted setAssignmentUrl )

                })
        });
    }

    const uploadAssignmentInMongo = async (url) => {
        try {
            let response = await fetch('http://localhost:4099/api/assignment/submitAssignment',{
                method : 'PUT',
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                        userUID : user.uid,
                        classroomId : currentClassroom._id,
                        assignmentId : id, //id that came from params
                        SubmissionLink : url, // from the firebase
                        points : 0
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
                            <input className="form-control w-50 col-8" type="file" id="formFile" />
                            <button className='btn btn-primary ml-5 col-2' type='submit'>Upload</button>
                            <span class="col-2 border-0" hidden={uploadState === 1 ? false : true}>
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                &nbsp; {progress}%
                            </span>
                        </form>
                        <a className='btn btn-secondary m-1 w-25' hidden={uploadState === 2 ? false : true} href={assignmentUrl} target='_blank'>View Uploaded file</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Assignment