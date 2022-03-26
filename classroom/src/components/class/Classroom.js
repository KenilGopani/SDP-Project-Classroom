import React, { useContext, useState, useEffect } from 'react'
import Navbar from '../main/Navbar'
import ClassroomInfo from './ClassroomInfo'
import AssignmentItem from '../assignment/AssignmentItem'
import { Link, useNavigate, useParams,useLocation } from 'react-router-dom'
import ClassroomContext from '../../context/classContext/ClassroomContext'
import UserAuthContext from '../../context/userContext/UserAuthContext'

const Classroom = (props) => {
  const {classId} = useParams();

  const { currentClassroom,setCurrentClassroom } = useContext(ClassroomContext);
  const { user } = useContext(UserAuthContext);
  const [assignments, setAssignments] = useState({})
  
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
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

  const fetchClassroom = async () => {
    if(currentClassroom == null)
    {
      try {
        fetch(`http://localhost:4099/api/classroom/${classId}`, {
          method: 'GET',
        }).then(async(res) => {
          res.json().then((response)=>{
            console.log(response)
            setCurrentClassroom(response.classroom);
          });
          
        })
      }
      catch (err) {
        console.log(err)
      } 
    }
  }

  useEffect(() => {
    if(currentClassroom == null)
      fetchClassroom();
  },[])
  useEffect(() => {
    // (user != null) ? fetchAllAssignment() : navigate('/')
    if(currentClassroom != null)
      fetchAllAssignment();
    // eslint-disable-next-line
  }, [currentClassroom])


  return (
    <>
      {/* {((user == null) ? navigate('/') : */}
      { currentClassroom &&
        (<div className='overflow-hidden' style={{ maxHeight: '100vh' }}>
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
                {user !==null && user.uid === currentClassroom.owner.UID && (
                  <Link to={`${location.pathname}/createAss`} className=" position-fixed bottom-0 end-0 mb-5" data-bs-toggle="tooltip" data-bs-placement="top" title="Add assignment">
                    <img src={require("../../static/add.png")} className="h-25 w-25" />
                    {/* <i className="fa fa-plus mr-5" style={{fontSize:'48px',color:'blue'}} /> */}
                  </Link>)}
              </div>
              {/* <div className='col-4 h-100 p-0'>
            <textarea className='h-100 w-100' />
          </div> */}
            </div>
          </div>
        </div>)}
      {/* )} */}
    </>
  )
}

export default Classroom;