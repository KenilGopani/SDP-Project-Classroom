import React, { useContext, useState } from "react";
import UserAuthContext from "../../context/user/UserAuthContext";
import Navbar from "../main/Navbar";

const CreateClass = () => {
  const { user } = useContext(UserAuthContext);
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
    console.log(user.email);
    console.log(user.uid);
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
  };
  return (
    <>
      <Navbar />
      <div
        className="container mt-5 border border-dark rounded"
        style={{ maxWidth: "720px" }}
      >
        <div className="row border-bottom border-dark">
          <div className="col bg-primary text-white p-3">
            <h3 className="text-center fw-bold">Create ClassRoom</h3>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <form onSubmit={onSubmitHandler}>
              <div className="form-group m-5">
                <label className="form-label">ClassRoom Name : </label>
                <input
                  name="className"
                  type="text"
                  className="form-control"
                  value={className}
                  onChange={(event) => setclassName(event.target.value)}
                />
              </div>
              <div className="form-group m-5">
                <label className="form-label">ClassRoom Description : </label>
                <textarea
                  name="className"
                  type="text"
                  className="form-control"
                  value={classDescription}
                  onChange={(event) => setclassDescription(event.target.value)}
                />
              </div>
              {/* <div className="container"> */}
              <div className="row">
                <div className="col-7">
                  <div className="form-group m-5">
                    <label className="form-label">
                      Send classroom code via mail :
                    </label>
                    <input
                      name="className"
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <button
                      className="btn btn-primary mt-2"
                      type="button"
                      onClick={emailListHandler}
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="col-5">
                  <ul class="list-group h-75 overflow-auto" id="emailList">
                  </ul>
                </div>
              </div>
              {/* </div> */}
              <div className="col-12 ml-2">
                <button className="btn btn-primary" type="submit">
                  Create Class
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateClass;
