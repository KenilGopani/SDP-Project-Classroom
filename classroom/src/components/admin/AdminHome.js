import React from 'react'
import { useEffect, useState } from 'react';
import TableRow from './TableRow';

const AdminHome = () => {

    const [users, setUsers] = useState()
    const [index, setIndex] = useState(0)
    const fetchAllUser = async () => {
        try {
            let response = await fetch('http://localhost:4099/api/admin/fetchAllUser', {
                method: 'GET'
            })
            response = await response.json()
            // console.log(response.Users)
            setUsers(response.Users)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchAllUser()
        // eslint-disable-next-line
    }, [])


    return (
        <>
            <div className='container'>
                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">UID</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.length === 0 && (
                            <div>
                                <span>No Users</span>
                            </div>
                        )}
                        {users?.length > 0 && users.map((user) => {
                            return <TableRow  user={user} key={user.uid}/>
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default AdminHome;
