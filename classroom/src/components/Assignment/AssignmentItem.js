import React from 'react'
import fileLogo from '../../static/file-lines-solid.svg'

const AssignmentItem = () => {
  return (
    <li className='row border border-primary rounded m-2 assignment w-75' style={{backgroundColor:'#D8DFF2'}}>
        <div className='col-2'>
            <img src={fileLogo} className="img-thumbnail rounded" alt="Not Found"  style={{backgroundColor:'#D8DFF2',height:'70px'}}/>
        </div>
        <div className='col-10 d-flex align-items-center'>
            <p className='fw-bolder'>Assignment: Machine learning</p>
        </div>
    </li>
  )
}

export default AssignmentItem;