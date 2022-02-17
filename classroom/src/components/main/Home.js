import React, { useContext, useState, useEffect } from 'react';
import ClassCard from '../class/ClassCard';
import Navbar from './Navbar';
import UserAuthContext from '../../context/userContext/UserAuthContext';
import ClassroomContext from '../../context/classContext/ClassroomContext';
import { useNavigate } from 'react-router-dom';


export default function Home() {
    const navigate = useNavigate();
    const { user } = useContext(UserAuthContext)
    const { setCurrentClassroom } = useContext(ClassroomContext)
    const [classrooms, setClassrooms] = useState({});

    const fetchAllGroups = async () => {
        try {
            let response = await fetch('http://localhost:4099/api/classroom/fetchAllClassrooms',
                {
                    method: 'GET',
                    headers: {
                        'UID': user.uid
                    }
                })
            response = await response.json();
            // console.log(response)
            setClassrooms(response.classrooms)
        }
        catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        fetchAllGroups();
        // console.log(classrooms)
        // eslint-disable-next-line
    },[]);

    const handleOnClick = (classroom) => {
        setCurrentClassroom(classroom)
        console.log(classroom)
        navigate('/home/classroom');
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row flex-wrap">
                    {classrooms.length === 0 && (
                        <div>
                            <span>You haven't joined any Classroom</span>
                        </div>
                    )}
                    {classrooms.length > 0 && classrooms.map((classroom) => {

                        return (
                            <div className="col-lg-4 col-md-6 col-12" onClick={() => handleOnClick(classroom)} key={classroom._id}>
                                <ClassCard classroom = {classroom}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
}