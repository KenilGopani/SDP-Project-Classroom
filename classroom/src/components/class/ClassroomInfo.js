import React, { useContext } from 'react'
import ClasroomContext from '../../context/classContext/ClassroomContext'

const ClassroomInfo = () => {

    const {currentClassroom} = useContext(ClasroomContext)

    return (
        <div className='col-3 h-100 p-0' style={{ border: '2px solid green' }}>
            <div className='row p-0 m-0'>
                <img src={require("../../img.jpg")} className="img-fluid rounded-circle m-auto mt-2" alt="image" style={{ height: '200px', width: '270px' }} />
            </div>
            <hr />
            <div className='row p-0 m-0'>
                <p className='fs-3 fw-bold'>{currentClassroom.className}</p>
            </div>
            <hr />
            <div className='row p-0 m-0'>
                <p className='fs-5'>{currentClassroom.description}</p>
            </div>
            <hr />
            <div className='row p-0 m-0'>
                <p className='fs-5'>{currentClassroom.classCode}</p>
            </div>
        </div>
    )
}

export default ClassroomInfo