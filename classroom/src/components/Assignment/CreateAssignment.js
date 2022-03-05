import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ClassroomContext from '../../context/classContext/ClassroomContext'
import UserAuthContext from "../../context/userContext/UserAuthContext";
import Navbar from "../main/Navbar";
import ViewFile from "./ViewFile";

import { storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
const CreateAssignment = () => {

  const { currentClassroom } = useContext(ClassroomContext)
  const { user } = useContext(UserAuthContext)

  const [progress, setProgress] = useState(0);
  const [uploadState, setUploadState] = useState(0);

  const [assignmentName, setAssignmetName] = useState("")
  const [assignmentDescription, setAssignmetDescription] = useState("")
  const navigate = useNavigate()

  const [allMaterials, setAllMaterials] = useState([]);
  const [currentFile,setCurrentFile] = useState(null);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      // console.log(user.uid)
      // console.log(currentClassroom._id)

      let res = await fetch('http://localhost:4099/api/assignment/createAssignment',
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            assignmentName: assignmentName,
            assignmentDescription: assignmentDescription,
            UID: user.uid,
            classroomId: currentClassroom._id,
            materials: allMaterials,
          }),
        })
      // console.log(res)
      navigate('/home/classroom')
    }
    catch (err) {
      console.log(err);
    }
    // console.log('done');
  }

  const uploadFile = () => {
    if(currentFile.length === 0)
      return;
    setUploadState(1);
    console.log(currentFile[0]);
    upload(currentFile[0]);
    document.getElementById('formFile').value = '';
  }
  const upload = async (file) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `/Materials/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed", (snapshot) => {
      const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress(prog);
    }, err => console.log(err), () => {
      getDownloadURL(uploadTask.snapshot.ref)
        .then((url) => {
          setAllMaterials((obj) => [...obj, { materialLink: url, materialName: file.name }]);
          setUploadState(0);
        })
    });
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5 w-50" >
        <div className="row">
          <div className="col">
            <h1 className="text-center fw-bold">Create Assignment</h1>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col">
            <form onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label className="form-label required">Title</label>
                <input type="text" className="form-control" name="title" value={assignmentName} onChange={(event) => setAssignmetName(event.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label required">Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="description" value={assignmentDescription} onChange={(event) => setAssignmetDescription(event.target.value)}
                />
              </div>
              <div className="m-2 ">
                <div className="row">
                  <label htmlFor="formFile" className="form-label col-12">Attach Materials : </label>
                  <input className="form-control w-50 col-6" id="formFile" type="file" onChange={(e)=>setCurrentFile(e.target.files)} />
                  <button className='btn btn-primary mx-1 col-2 w-auto' type='button' disabled={uploadState === 1 ? true : false} onClick={uploadFile}><i className="fa fa-upload" /></button>
                  <span className="col-2 border-0" hidden={uploadState === 1 ? false : true}>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    &nbsp; {progress}%
                  </span>
                </div>
                <div className="d-flex">
                  {allMaterials.map((material) => <ViewFile subName={material.materialName} subLink={material.materialLink} />)}
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Create</button>
              <Link to={'/home/classroom'} className="btn btn-danger m-1" >Cancel</Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAssignment;
