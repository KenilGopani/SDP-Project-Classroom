import React,{ useState } from 'react'
import CreateAssignment from '../Assignment/CreateAssignment'
import Navbar from '../main/Navbar'
import ClassroomInfo from './ClassroomInfo'
import AssignmentItem from '../Assignment/AssignmentItem'

const Classroom = () => {
  const [showProfile,setShowProfile] = useState(false);

  const toggle = () =>{
    setShowProfile(prev => !prev);
    console.log(showProfile);
  }
  return (
    <div>
      <Navbar />
      <div className="container-fluid overflow-hidden p-0" style={{height:'92vh'}}>
        <div className='row h-100 m-0'>

          {showProfile == true ? <ClassroomInfo closeFunction={toggle}/> :
            (<div className='col-8 h-100 p-0'>
              <div className='row mx-4 my-1 w-100' >
                <button type="button" className="btn btn-primary w-25 m-1" data-bs-toggle="modal" data-bs-target="#createAssignmentModal">Add Assignment</button>
                <CreateAssignment />
                <button className="btn btn-primary w-25 m-1" onClick={toggle}>Classroom Profile</button>
              </div>
              <ul style={{overflowY:'auto',height:'88%'}}>
                <AssignmentItem />
                <AssignmentItem />
                <AssignmentItem />
                <AssignmentItem />
                <AssignmentItem />
                <AssignmentItem />
                <AssignmentItem />
                <AssignmentItem />
                <AssignmentItem />
                <AssignmentItem />
                <AssignmentItem />
                <AssignmentItem />
              </ul>
            </div>)
          }
          <div className='col-4 h-100 p-0'>
            <textarea className='h-100 w-100' />
          </div>
        </div>
      </div>
      </div>
  )
}

export default Classroom;