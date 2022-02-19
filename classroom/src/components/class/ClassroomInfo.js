import React, { useContext, useState } from 'react'
import ClasroomContext from '../../context/classContext/ClassroomContext'

const ClassroomInfo = (props) => {

    const { currentClassroom } = useContext(ClasroomContext)
    console.log(currentClassroom)
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
    const sendEmailHandler = async() => {
        try {
            const response = await fetch(
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
            setTimeout(()=>{
                msg.style.display = 'none';
            },2000);
          } catch (err) {
            console.log(err);
          }
    }

    return (
        <div className='col-8 h-100 p-2' style={{ overflowY: 'auto', height: '92%' }}>
            <div className='row p-0 m-0'>
                <img src={require("../../static/group.ico")} className="img-fluid rounded-circle m-auto mt-2 col-11" alt="image" style={{ height: '200px', width: '270px' }} />
                <button className="btn btn-danger col-1 h-25" onClick={props.closeFunction} ><span>&times;</span></button>
                <h2 className='fs-5'>{currentClassroom.owner._id}</h2>
            </div>
            <hr />
            <div className='row p-0 m-0'>
                <label className="col-4 h5 m-auto">Name : </label>
                <h2 className='col-8 fw-bold m-auto'>{currentClassroom.className}</h2>
            </div>
            <hr />
            <div className='row p-0 m-0'>
                <label className="col-4 h5 m-auto">Description : </label>
                <h4 className='col-8 fs-5 m-auto fw-normal'>{currentClassroom.description}</h4>
            </div>
            <hr />
            
            <div>
                <div className='row p-0 m-0'>
                    <label className="col-4 h5 m-auto">Class Code : </label>
                    <p className='col-8 fs-5 m-auto fw-normal'>{currentClassroom.classCode}</p>
                </div>
                <hr />
                <div className='row p-2 m-0'>
                    <label className="form-label">Send classroom code via mail :</label>
                    <div className='d-flex justify-content-between'>
                        <input name="className" type="email" className="w-75" value={email} onChange={(event) => setEmail(event.target.value)} />
                        <button className="btn btn-primary m-auto p-6" style={{width:'100px'}} type="button" onClick={emailListHandler}>Add</button>
                        <button className="btn btn-primary m-auto p-6" style={{width:'100px'}} type="button" onClick={sendEmailHandler}>Send</button>
                    </div>
                    <div className='d-flex flex-column'>
                        <ul class="list-group overflow-auto p-0" id="emailList" style={{maxHeight:'200px'}}>
                        </ul>
                        <p className='alert alert-success' id='msg' style={{display : 'none'}}>Success</p>
                    </div>
                </div>
                <hr />
            </div>
            <div className='row p-2 m-0'>
                <img src={require("../../static/members.png")} className="img-fluid rounded-circle m-1 col-12" alt="image" style={{ height: '50px', width: '75px' }} />
                <ul class="list-group h-75 overflow-auto m-auto p-0">
                    {currentClassroom.members.length === 0 && <div>No members</div>}
                    {currentClassroom.members.length > 0 && currentClassroom.members.map((member) => <li className="list-group-item" >{member}</li>)}
                </ul>
            </div>
        </div>
    )
}

export default ClassroomInfo