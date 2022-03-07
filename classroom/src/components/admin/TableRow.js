import React from 'react'
import {Link} from 'react-router-dom'

export default function TableRow({ user, index }) {
    return (
        <tr>
            <th scope="row">{}</th>
            <td>{user?.UID}</td>
            <td>{user?.name}</td>
            <td>{user?.email}</td>
            <td><Link to={`/admin/viewuser/${user._id}`}><i style={{fontSize:"24px"}} className="fa">&#xf06e;</i></Link></td>
        </tr>
    )
}
