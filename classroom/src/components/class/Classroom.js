import React from 'react'
import CreateAssignment from '../assignment/CreateAssignment'
import fileLogo from '../../file-lines-solid.svg'
import Navbar from '../main/Navbar'
import ClassroomInfo from './ClassroomInfo'

const Classroom = () => {
  return (
    <div>
      <Navbar />
      <div className="container-fluid vh-100 overflow-hidden p-0" style={{border:'2px solid red'}}>
        <div className='row h-100 m-0' style={{border:'2px solid red'}}>

         <ClassroomInfo/>

          <div className='col-6 h-100 p-0' style={{border:'2px solid red'}}>
            <div className='row mx-4 my-1 w-100' >
              <button type="button" className="btn btn-primary w-25" data-bs-toggle="modal" data-bs-target="#createAssignmentModal">Add Assignment</button>
              <CreateAssignment />
            </div>
            <ul style={{overflowY:'auto',height:'92%'}}>
              <li className='row border border-primary rounded m-2 assignment' style={{backgroundColor:'#D8DFF2'}}>
                <div className='col-2'>
                  <img src={fileLogo} className="img-thumbnail rounded" alt="image"  style={{backgroundColor:'#D8DFF2',height:'70px'}}/>
                </div>
                <div className='col-10 d-flex align-items-center'>
                  <p className='fw-bolder'>Assignment: Machine learning</p>
                </div>
              </li>

              <li className='row border border-primary rounded m-2 assignment' style={{backgroundColor:'#D8DFF2'}}>
                <div className='col-2'>
                  <img src={fileLogo} className="img-thumbnail rounded" alt="image"  style={{backgroundColor:'#D8DFF2',height:'70px'}}/>
                </div>
                <div className='col-10 d-flex align-items-center'>
                  <p className='fw-bolder'>Assignment: Machine learning</p>
                </div>
              </li>

              <li className='row border border-primary rounded m-2 assignment' style={{backgroundColor:'#D8DFF2'}}>
                <div className='col-2'>
                  <img src={fileLogo} className="img-thumbnail rounded" alt="image"  style={{backgroundColor:'#D8DFF2',height:'70px'}}/>
                </div>
                <div className='col-10 d-flex align-items-center'>
                  <p className='fw-bolder'>Assignment: Machine learning</p>
                </div>
              </li>

              <li className='row border border-primary rounded m-2 assignment' style={{backgroundColor:'#D8DFF2'}}>
                <div className='col-2'>
                  <img src={fileLogo} className="img-thumbnail rounded" alt="image"  style={{backgroundColor:'#D8DFF2',height:'70px'}}/>
                </div>
                <div className='col-10 d-flex align-items-center'>
                  <p className='fw-bolder'>Assignment: Machine learning</p>
                </div>
              </li>

              <li className='row border border-primary rounded m-2 assignment' style={{backgroundColor:'#D8DFF2'}}>
                <div className='col-2'>
                  <img src={fileLogo} className="img-thumbnail rounded" alt="image"  style={{backgroundColor:'#D8DFF2',height:'70px'}}/>
                </div>
                <div className='col-10 d-flex align-items-center'>
                  <p className='fw-bolder'>Assignment: Machine learning</p>
                </div>
              </li>

              <li className='row border border-primary rounded m-2 assignment' style={{backgroundColor:'#D8DFF2'}}>
                <div className='col-2'>
                  <img src={fileLogo} className="img-thumbnail rounded" alt="image"  style={{backgroundColor:'#D8DFF2',height:'70px'}}/>
                </div>
                <div className='col-10 d-flex align-items-center'>
                  <p className='fw-bolder'>Assignment: Machine learning</p>
                </div>
              </li>

              <li className='row border border-primary rounded m-2 assignment' style={{backgroundColor:'#D8DFF2'}}>
                <div className='col-2'>
                  <img src={fileLogo} className="img-thumbnail rounded" alt="image"  style={{backgroundColor:'#D8DFF2',height:'70px'}}/>
                </div>
                <div className='col-10 d-flex align-items-center'>
                  <p className='fw-bolder'>Assignment: Machine learning</p>
                </div>
              </li>

              <li className='row border border-primary rounded m-2 assignment' style={{backgroundColor:'#D8DFF2'}}>
                <div className='col-2'>
                  <img src={fileLogo} className="img-thumbnail rounded" alt="image"  style={{backgroundColor:'#D8DFF2',height:'70px'}}/>
                </div>
                <div className='col-10 d-flex align-items-center'>
                  <p className='fw-bolder'>Assignment: Machine learning</p>
                </div>
              </li>

              <li className='row border border-primary rounded m-2 assignment' style={{backgroundColor:'#D8DFF2'}}>
                <div className='col-2'>
                  <img src={fileLogo} className="img-thumbnail rounded" alt="image"  style={{backgroundColor:'#D8DFF2',height:'70px'}}/>
                </div>
                <div className='col-10 d-flex align-items-center'>
                  <p className='fw-bolder'>Assignment: Machine learning</p>
                </div>
              </li>

              <li className='row border border-primary rounded m-2 assignment' style={{backgroundColor:'#D8DFF2'}}>
                <div className='col-2'>
                  <img src={fileLogo} className="img-thumbnail rounded" alt="image"  style={{backgroundColor:'#D8DFF2',height:'70px'}}/>
                </div>
                <div className='col-10 d-flex align-items-center'>
                  <p className='fw-bolder'>Assignment: Machine learning</p>
                </div>
              </li>

              <li className='row border border-primary rounded m-2 assignment' style={{backgroundColor:'#D8DFF2'}}>
                <div className='col-2'>
                  <img src={fileLogo} className="img-thumbnail rounded" alt="image"  style={{backgroundColor:'#D8DFF2',height:'70px'}}/>
                </div>
                <div className='col-10 d-flex align-items-center'>
                  <p className='fw-bolder'>Assignment: Machine learning</p>
                </div>
              </li>

              <li className='row border border-primary rounded m-2 assignment' style={{backgroundColor:'#D8DFF2'}}>
                <div className='col-2'>
                  <img src={fileLogo} className="img-thumbnail rounded" alt="image"  style={{backgroundColor:'#D8DFF2',height:'70px'}}/>
                </div>
                <div className='col-10 d-flex align-items-center'>
                  <p className='fw-bolder'>Assignment: Machine learning</p>
                </div>
              </li>
            </ul>
            

          </div>
          <div className='col-3 h-100 p-0'>
            <textarea className='h-100 w-100' />
          </div>
        </div>
      </div>
      </div>
  )
}

export default Classroom;