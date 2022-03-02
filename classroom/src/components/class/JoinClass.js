import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAuthContext from '../../context/userContext/UserAuthContext';
import ClassroomContext from '../../context/classContext/ClassroomContext';
import Modal from '../Modal'


export default function JoinClass() {

  const [classroomCode, setclassroomCode] = useState("");
  const { user } = useContext(UserAuthContext)
  const { setCurrentClassroom } = useContext(ClassroomContext)
  const closeBtnRef = useRef(null);
  const navigate = useNavigate();

  var handleOnChange = (event) => {
    setclassroomCode(event.target.value);
  }

  const handleOnClick = async (event) => {
    event.preventDefault()
    try {
      let response = await fetch("http://localhost:4099/api/classroom/joinClassroom",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            UID: user.uid,
            classCode: classroomCode,
          }),
        }
      );
      response = await response.json();
      console.log(response)
      console.log(response.classroom)
      setCurrentClassroom(response.classroom)
    }
    catch (err) {
      console.log(err);
    }

    setclassroomCode(event.target.value);
    closeBtnRef.current.click();
    navigate('/home/classroom')
  }

  return (
    <>
      <Modal title="Join Classroom" id="join" BtnRef={closeBtnRef}>
        <div className="mb-3">
          <label htmlFor="classroomCode" className="form-label">Classroom Code</label>
          <input type="text" className="form-control" value={classroomCode} onChange={handleOnChange} id="classroomCode" />
          <small className="mt-2 text-muted">Classroom Code must be exactly 7 character long</small>
        </div>
        <button type="button" disabled={classroomCode.length !== 7} className="btn btn-primary shadow-none" onClick={handleOnClick}>Join</button>
      </Modal>
    </>
  )
}
