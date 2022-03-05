import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ClassroomContext from '../../context/classContext/ClassroomContext'
import UserAuthContext from "../../context/userContext/UserAuthContext";
import Navbar from "../main/Navbar";
const CreateAssignment = () => {

  const { currentClassroom } = useContext(ClassroomContext)
  const { user } = useContext(UserAuthContext)
  const [assignmentName, setAssignmetName] = useState("")
  const [assignmentDescription, setAssignmetDescription] = useState("")
  const navigate = useNavigate()

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
