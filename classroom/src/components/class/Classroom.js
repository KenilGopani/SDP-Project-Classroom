import React, { useContext, useState, useEffect } from 'react'
import Navbar from '../main/Navbar'
import ClassroomInfo from './ClassroomInfo'
import AssignmentItem from '../assignment/AssignmentItem'
import { Link } from 'react-router-dom'
import ClassroomContext from '../../context/classContext/ClassroomContext'
import UserAuthContext from '../../context/userContext/UserAuthContext'


const Classroom = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [assignments, setAssignments] = useState({})
  const { currentClassroom } = useContext(ClassroomContext)
  const { user } = useContext(UserAuthContext)

  const toggle = () => {
    setShowProfile(prev => !prev);
    console.log(showProfile);
  }

  const fetchAllAssignment = async () => {
    try {
      let response = await fetch('http://localhost:4099/api/assignment/fetchAllAssignment', {
        method: 'GET',
        headers: {
          'classroomId': currentClassroom._id
        }
      })
      response = await response.json();
      console.log("+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+")
      setAssignments(response.assignments)
      // console.log(response.assignments)
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchAllAssignment()
    // eslint-disable-next-line

  }, [])


  return (
    <div>
      <Navbar />
      <div className="container-fluid overflow-hidden p-0" style={{ height: '92vh' }}>
        <div className='row h-100 m-2'>

          {showProfile === true ? <ClassroomInfo closeFunction={toggle} /> :
            (<div className='col-12  h-100 p-0'>
              <div className='row mx-4 my-1 w-100' >
                {
                console.log("1 user ",user.uid,"class own ", currentClassroom.owner.UID )
                }
                {user.uid === currentClassroom.owner.UID && (
                <Link to={'/home/classroom/assignment'} className="btn btn-primary w-25 m-1" >Add Assignment</Link>)}
                <button className="btn btn-primary w-25 m-1" onClick={toggle}>Classroom Profile</button>
              </div>
              <ul style={{ overflowY: 'auto', height: '88%' }}>

                {assignments.length === 0 && (
                  <div>No Assignments </div>
                )}
                {assignments.length > 0 && assignments.map((assignment) => {

                  return (
                    <div key={assignment._id}>
                      <AssignmentItem assignment={assignment} />
                    </div>
                  )
                }
                )}
              </ul>
            </div>)
          }
          {/* <div className='col-4 h-100 p-0'>
            <textarea className='h-100 w-100' />
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Classroom;