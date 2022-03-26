import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import fileLogo from '../../static/file-lines-solid.svg'

const AssignmentItem = (props) => {
  const location = useLocation();
  return (
    // <li className='row border border-primary rounded m-2 assignment w-75' style={{backgroundColor:'#D8DFF2'}} >
      <Link to={`${location.pathname}/viewassignment/${props.assignment._id}`} className='row border border-primary rounded m-2 assignment w-75' style={{backgroundColor:'#D8DFF2'}}>
        <div className='col-2'>
            <img src={fileLogo} className="img-thumbnail rounded" alt="Not Found"  style={{backgroundColor:'#D8DFF2',height:'65px'}}/>
        </div>
        <div className='col-10 d-flex align-items-center'>
            <p className='fw-bolder'>{props.assignment.assignmentName}</p>
        </div>
      </Link>
    // </li>
  )
}

export default AssignmentItem;