import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../main/Navbar'

const Assignment = () => {
    const { id } = useParams();
    const [assignment, setAssignment] = useState();
    useEffect(async () => {
        try {
            let response = await fetch(`http://localhost:4099/api/assignment/${id}`, {
                method: 'GET',
            })
            response = await response.json();
            setAssignment(response.assignment);
        }
        catch (err) {
            console.log(err)
        }
    }, []);
    return (
        <>
            <Navbar />
            <div className='container mt-3 p-5'>
                <div className='p-3'>
                    <div className='row m-0'>
                        <Link to={'/home/classroom'} className='col-2 fa fa-arrow-left my-auto ' style={{ fontSize: '30px',color:'black' }} />
                        <h1 className='col-8 m-0 p-0 text-secondary text-center'><i className="fas fa-file-alt col-2 m-auto" style={{ fontSize: '50px' }} />{assignment && assignment.assignmentName} </h1>
                    </div>
                    <hr />
                    <h4>Description : </h4>
                    <div className='row m-0 p-3 overflow-auto' style={{ height: '250px' }}>
                        {assignment && assignment.assignmentDescription}
                    </div>
                    <hr className='mx-0' />
                    <div className="row mb-3">
                        <h5 htmlFor="formFile" className="form-label">Submission Link : </h5>
                        <input className="form-control w-50" type="file" id="formFile" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Assignment