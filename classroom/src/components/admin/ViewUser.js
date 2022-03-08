import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'

const ViewUser = () => {
    const { id } = useParams();

    const [user, setUser] = useState({});
    const [createdClassrooms, setCreatedClassrooms] = useState([]);
    const [joinedClassrooms, setJoinedClassrooms] = useState([]);


    const fetchUser = async () => {
        try {
            let response = await fetch('http://localhost:4099/api/admin/fetchUser', {
                method: 'GET',
                headers: {
                    'id': id,
                }
            })
            response = await response.json()
            setUser({
                name: response.user.name,
                _id: response.user._id,
                UID: response.user.UID,
                email: response.user.email,
            });
            let createdClass = [];
            response.user.classrooms.forEach(c => {
                if (c.owner === response.user._id)
                    createdClass.push(c);
            });
            let joinedClass = [];
            response.user.classrooms.forEach(c => {
                if (c.owner !== response.user._id)
                    joinedClass.push(c);
            });
            setJoinedClassrooms(joinedClass);
            setCreatedClassrooms(createdClass);
            // console.log(response.user);
            // console.log(createdClass);
            // console.log(joinedClass);
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchUser();
    }, [])

    const deleteHandler = async(id) => {
        try {
            let response = await fetch('http://localhost:4099/api/admin/deleteClassroom', 
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id : id,
                }),
            });
            console.log(response.json().res);
            fetchUser();
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <AdminNavbar />
            <div className="container mt-5 w-50">
                <div className='row m-0'>
                    <h1 className="col-8 my-auto">User Profile</h1>
                </div>
                <hr />
                <div className='row'>
                    <div className='col-4'>
                        <label className="form-label">Name : </label>
                    </div>
                    <div className='col-8'>
                        <input name="uame" type="text" className="form-control" value={user.name} disabled />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4'>
                        <label className="form-label">Email : </label>
                    </div>
                    <div className='col-8'>
                        <input name="uame" type="text" className="form-control" value={user.email} disabled />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-4'>
                        <label className="form-label">UID : </label>
                    </div>
                    <div className='col-8'>
                        <input name="uame" type="text" className="form-control" value={user.UID} disabled />
                    </div>
                </div>
            </div>

            <br />

            <div className='container'>
                <div className='row m-0'>
                    <h4 className="col-8 my-auto">Created classrooms</h4>
                </div>
                <hr />
                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Class Id</th>
                            <th scope="col">Class Name</th>
                            <th scope="col">Members</th>
                        </tr>
                    </thead>
                    <tbody>
                        {createdClassrooms?.length === 0 && (
                            <div>
                                <span>No Classroom</span>
                            </div>
                        )}
                        {createdClassrooms?.length > 0 && createdClassrooms.map(c => {
                            return (
                                <tr key={c?._id}>
                                    
                                    <th scope="row">{ }</th>
                                    <td>{c?._id}</td>
                                    <td>{c?.className}</td>
                                    <td>{c.members?.length}</td>
                                    <td><button onClick={()=>deleteHandler(c._id)}><i style={{ fontSize: "24px" }} className="fa fa-tra\sh" /></button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <br />

            <div className='container'>
                <div className='row m-0'>
                    <h4 className="col-8 my-auto">Joined classrooms</h4>
                </div>
                <hr />
                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Class Id</th>
                            <th scope="col">Class Name</th>
                            <th scope="col">Members</th>
                        </tr>
                    </thead>
                    <tbody>
                        {joinedClassrooms?.length === 0 && (
                            <div>
                                <span>No Classroom</span>
                            </div>
                        )}
                        {joinedClassrooms?.length > 0 && joinedClassrooms.map(c => {
                            return (
                                <tr key={c?._id}>
                                    <th scope="row">{ }</th>
                                    <td>{c?._id}</td>
                                    <td>{c?.className}</td>
                                    <td>{c?.members.length}</td>
                                    <td><Link to={``}><i style={{ fontSize: "24px" }} className="fa">&#xf06e;</i></Link></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>


        </>
    )
}

export default ViewUser