import React from 'react'
import {Link} from 'react-router-dom'

export default function TableRow({ user, index }) {

    const deleteHandler = async(id) => {
        try {
            let response = await fetch('http://localhost:4099/api/admin/deleteUser', 
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
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <tr>
            <th scope="row">{}</th>
            <td>{user?.UID}</td>
            <td>{user?.name}</td>
            <td>{user?.email}</td>
            <td className='container d-flex justify-content-center'>
                <Link to={`/admin/viewuser/${user._id}`}><i style={{fontSize:"24px"}} className="fa">&#xf06e;</i></Link>
                {/* <i className='fa fa-trash m-1' onClick={()=>deleteHandler(user._id)} /> */}
            </td>
        </tr>
    )
}
