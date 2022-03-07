import React, { useContext, useState, useEffect } from 'react'
import Navbar from '../main/Navbar'
import ClassroomInfo from './ClassroomInfo'
import AssignmentItem from '../assignment/AssignmentItem'
import { Link } from 'react-router-dom'
import ClassroomContext from '../../context/classContext/ClassroomContext'
import UserAuthContext from '../../context/userContext/UserAuthContext'


const Classroom = () => {
  const [assignments, setAssignments] = useState({})
  const { currentClassroom } = useContext(ClassroomContext)
  const { user } = useContext(UserAuthContext);

  const fetchAllAssignment = async () => {
    try {
      let response = await fetch('http://localhost:4099/api/assignment/fetchAllAssignment', {
        method: 'GET',
        headers: {
          'classroomId': currentClassroom._id
        }
      })
      response = await response.json();
      // console.log("+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+")
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

  })


  return (
    <div className='overflow-hidden' style={{maxHeight:'100vh'}}>
      <Navbar />
      <div className="container-fluid overflow-hidden p-0" >
        <div className='row h-100 m-2'>
          <div className='col-md-4 col-12 h-100 p-0'>
            <ClassroomInfo />
          </div>
          <div className='col-md-8 col-12 h-100 p-0'>
            <ul style={{ overflowY: 'auto', height: '88vh' }}>
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
            {user.uid === currentClassroom.owner.UID && (
              <Link to={'/home/classroom/assignment'} className=" position-fixed bottom-0 end-0 mb-5" data-bs-toggle="tooltip" data-bs-placement="top" title="Add assignment">
                <img src={require("../../static/add.png")} className="h-25 w-25" /></Link>)}
          </div>
          {/* <div className='col-4 h-100 p-0'>
            <textarea className='h-100 w-100' />
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Classroom;