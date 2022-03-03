import React, { useContext, useState } from 'react'
import UserAuthContext from '../../context/userContext/UserAuthContext'
import ClasroomContext from '../../context/classContext/ClassroomContext'

const ClassroomInfo = (props) => {

    const { currentClassroom } = useContext(ClasroomContext)
    const { user } = useContext(UserAuthContext)
    const [className, setClassName] = useState(currentClassroom.className);
    const [classDescription, setClassDescription] = useState(currentClassroom.description);
    // console.log(currentClassroom)
    // console.log("+++--")
    // console.log(currentClassroom.owner.UID)

    const [email, setEmail] = useState("");
    const [list, setList] = useState([]);

    const emailListHandler = () => {
        if (email.length > 0) {
            setList((prevState) => [...prevState, email]);
            const ul = document.getElementById('emailList');
            var li = document.createElement('li');
            li.innerHTML = email;
            li.setAttribute('class', 'list-group-item');
            ul.appendChild(li);
        }
        setEmail("");
    };
    const sendEmailHandler = async () => {
        if (email.length === 0 && list.length === 0)
            return;
        if (list.length === 0)
            setList(email);
        try {
            await fetch(
                "http://localhost:4099/api/classroom/sendMail",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        className: currentClassroom.className,
                        classCode: currentClassroom.classCode,
                        emailList: list,
                    }),
                }
            );
            setList([]);
            const msg = document.getElementById('msg');
            document.getElementById('emailList').innerHTML = "";
            msg.style.display = 'block';
            setTimeout(() => {
                msg.style.display = 'none';
            }, 2000);
        } catch (err) {
            console.log(err);
        }
    }
    const saveClickHandler = async () => {
        // console.log(`hit1`);
        // console.log(className);
        // console.log(classDescription);
        if (currentClassroom.className === className && currentClassroom.description === classDescription)
            return;
        // console.log(`hit2`);
        try {
            await fetch(
                "http://localhost:4099/api/classroom/updateClassroomInfo",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        classId: currentClassroom._id,
                        className: className,
                        classDescription: classDescription,
                    }),
                }
            );
            const msg = document.getElementById('savemsg');
            msg.style.display = 'block';
            setTimeout(() => {
                msg.style.display = 'none';
            }, 2000);
            document.getElementById('close').style.display = 'none';
            document.getElementById('save').style.display = 'none';
            document.getElementById('cName').readOnly = true;
            document.getElementById('cDesc').readOnly = true;
        } catch (err) {
            console.log(err);
        }
    }

    const closeClickHandler = () => {
        setClassName(currentClassroom.className);
        setClassDescription(currentClassroom.description);
        // console.log(className);
        // console.log(classDescription);
        document.getElementById('close').style.display = 'none';
        document.getElementById('save').style.display = 'none';
        document.getElementById('cName').readOnly = true;
        document.getElementById('cDesc').readOnly = true;
        document.getElementById('cName').value = className;
        document.getElementById('cDesc').value = classDescription;
    }

    return (
        <div className='col-12 h-100 p-2' style={{ overflowY: 'auto', height: '92%' }}>
            <div className='row p-0 m-0'>
                <img src={require("../../static/group.ico")} className="img-fluid rounded-circle m-auto mt-2 col-11" alt="Not Found!" style={{ height: '200px', width: '270px' }} />
                <button className="btn btn-danger col-1 h-25" onClick={props.closeFunction} ><span>&times;</span></button>
                <h2 className='fs-5'>{currentClassroom.owner.name}</h2>
            </div>
            <hr />
            <div className='container'>
                <div className='row p-0 m-0'>
                    <label className="col-2 h5 m-auto">Name : </label>
                    <input className='col-8 m-auto w-75 form-control' id='cName' onChange={(event) => {
                        setClassName(event.target.value);
                    }} readOnly={true} value={className} style={{background:'transparent'}}/>
                    <i className="fa fa-edit col-1 m-auto" style={{ fontSize: '24px' }} onClick={() => {
                        const cName = document.getElementById('cName');
                        document.getElementById('close').style.display = 'block';
                        document.getElementById('save').style.display = 'block';
                        cName.readOnly = false;
                        cName.focus();
                    }} />
                </div>
                <hr />
                <div className='row p-0 m-0 form-group'>
                    <label className="col-2 h5 m-auto">Description : </label>
                    <textarea className='col-8 fs-5 m-auto fw-normal w-75 form-control' id='cDesc' onChange={(event) => {
                        setClassDescription(event.target.value)
                    }} readOnly={true} value={classDescription} style={{height:'120px',background:'transparent'}}/>
                    <i className="fa fa-edit col-1 m-auto" style={{ fontSize: '24px' }} onClick={() => {
                        const cDesc = document.getElementById('cDesc');
                        document.getElementById('close').style.display = 'block';
                        document.getElementById('save').style.display = 'block';
                        cDesc.readOnly = false;
                        cDesc.focus();
                    }} />
                </div>
                <div className='d-flex justify-content-end m-5' >
                    <i className="fa fa-save m-2" id='save' style={{ fontSize: '26px', display: 'none' }} onClick={saveClickHandler} />
                    <i className="fa fa-close m-2" id='close' style={{ fontSize: '26px', display: 'none' }} onClick={closeClickHandler} />
                </div>
                <p className='alert alert-success' id='savemsg' style={{ display: 'none' }}>Updated...</p>
            </div>
            <hr />
            <div>
                <div className='row p-0 m-0'>
                    <label className="col-4 h5 m-auto">Class Code : </label>
                    <p className='col-8 fs-5 m-auto fw-normal'>{currentClassroom.classCode}</p>
                </div>
                <hr />
                {/* {console.log("user")}
                {console.log(user.uid)} 
                {console.log("class ow")}
                {console.log(currentClassroom.owner.UID)} */}
                {user.uid === currentClassroom.owner.UID && <div className='row p-2 m-0'>
                    <button className="btn btn-secondary w-25 mb-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        Send Invitation
                    </button>
                    <div className="collapse" id="collapseExample">
                        {/* <div class="card card-body"> */}
                        {/* <label className="form-label">Send classroom code via mail :</label> */}
                        <div className='d-flex justify-content-between'>
                            <input name="className" type="email" className="w-75" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter email..." />
                            <button className="btn btn-primary m-auto p-6" style={{ width: '100px' }} type="button" onClick={emailListHandler}>Add</button>
                            <button className="btn btn-primary m-auto p-6" style={{ width: '100px' }} type="button" onClick={sendEmailHandler}>Send</button>
                        </div>
                        <div className='d-flex flex-column'>
                            <ul className="list-group overflow-auto p-0" id="emailList" style={{ maxHeight: '200px' }}>
                            </ul>
                            <p className='alert alert-success' id='msg' style={{ display: 'none' }}>Success</p>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
                }
            </div>
            <hr />
            <div className='row p-2 m-0'>
                <img src={require("../../static/members.png")} className="img-fluid rounded-circle m-1 col-12" alt="Not Found!" style={{ height: '50px', width: '75px' }} />
                <ul className="list-group h-75 overflow-auto m-auto p-0">
                    {currentClassroom.members.length === 0 && <div>No members</div>}
                    {currentClassroom.members.length > 0 && currentClassroom.members.map((member) => <li className="list-group-item" key={member.email}>{member.name}</li>)}
                </ul>
            </div>
        </div>
    )
}

export default ClassroomInfo