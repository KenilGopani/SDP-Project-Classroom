import React from 'react'
import { useParams } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'

const ViewUser = () => {
    const {id} = useParams();

    const fetchUser = async () =>{
        try{
            let response = await fetch('http://localhost:4099/api/admin/fetchAllUser', {
                method: 'GET',
                headers : {
                    'id' : id,
                }
            })
        }
        catch(err){
            console.log(err)
        }
    }
  return (
      <>
      <AdminNavbar/>
      Helloooooo
      </>
  )
}

export default ViewUser