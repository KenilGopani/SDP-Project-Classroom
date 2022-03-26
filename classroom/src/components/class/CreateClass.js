import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserAuthContext from "../../context/userContext/UserAuthContext";
import Navbar from "../main/Navbar";

const CreateClass = () => {
  const { user } = useContext(UserAuthContext);
  const navigate = useNavigate();
  const [className, setclassName] = useState("");
  const [error, setError] = useState("");
  const [classDescription, setclassDescription] = useState("");
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

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // console.log(className);
    // console.log(classDescription);
    // console.log(user.email);
    // console.log(user.uid);
    try {
      const response = await fetch(
        "http://localhost:4099/api/classroom/createClassroom",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            className: className,
            description: classDescription,
            owner: user.uid,
            emailList: list,
          }),
        }
      );
    } catch (err) {
      setError(err);
      console.log(err);
    }
    navigate('/home');
  };
  return (
    <>
      <Navbar />
      <div className="container mt-5 w-50">
        <div className='row m-0'>
          <Link to={'/home'} className='col-2 fa fa-arrow-left my-auto ' style={{ fontSize: '30px', color: 'black' }} />
          <h1 className="col-8 my-auto">Create ClassRoom</h1>
        </div>
        <hr />
        <div>
          <form onSubmit={onSubmitHandler}>
            <div className="form-group m-4">
              <label className="form-label" htmlFor="cname">ClassRoom Name : </label>
              <input
                id="cname"
                name="className"
                type="text"
                className="form-control"
                value={className}
                onChange={(event) => setclassName(event.target.value)}
                required
              />
            </div>
            <div className="form-group m-4">
              <label className="form-label" htmlFor="cDesc">ClassRoom Description : </label>
              <textarea name="className" type="text" className="form-control" id="cDesc" value={classDescription} onChange={(event) => setclassDescription(event.target.value)} />
            </div>
            <div className="form-group m-4">
              <label className="form-label ml-3 d-block" htmlFor="cEmail"> Send classroom code via mail : </label>
              <input name="className" type="email" className="form-control w-75 d-inline" value={email} onChange={(event) => setEmail(event.target.value)} id="cEmail" />
              <button className="btn btn-primary mx-3" type="button" onClick={emailListHandler}>Add</button>
              <ul className="list-group overflow-auto p-0 w-50 mt-1" id="emailList" style={{ maxHeight: '150px' }}></ul>
            </div>
            <div className=" form-group m-4 ">
              <button className="btn btn-primary" type="submit">Create Class</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateClass;
