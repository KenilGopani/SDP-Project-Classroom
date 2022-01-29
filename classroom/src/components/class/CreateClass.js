import React, { useContext, useState } from "react";
import UserAuthContext from "../../context/user/UserAuthContext";
import Navbar from "../main/Navbar";

const CreateClass = () => {

  const { user } = useContext(UserAuthContext);
  const [className, setclassName] = useState("");
  const [error, setError] = useState("");
  const [classDescription, setclassDescription] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // console.log(className);
    // console.log(classDescription);
    console.log(user.email)
    console.log(user.uid)

    try {
      const response = await fetch("http://localhost:4099/api/classroom/createClassroom",
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ className: className, description: classDescription, owner: user.uid })
        })
    } catch (err) {
      setError(err);
      console.log(err)
    }
  };
  return (
    <>
      <Navbar />
      <div className="container card mt-5 shadow rounded" style={{ maxWidth: "720px" }}>
        <div className="row">
          <div className="col bg-primary text-white p-3">
            <h3 className="text-center fw-bold">Create ClassRoom</h3>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <form onSubmit={onSubmitHandler}>
              <div className="form-group m-5">
                <label className="form-label">ClassRoom Name : </label>
                <input name="className" type="text" className="form-control" value={className} onChange={(event) => setclassName(event.target.value)} />
              </div>
              <div className="form-group m-5">
                <label className="form-label">ClassRoom Description : </label>
                <textarea name="className" type="text" className="form-control" value={classDescription} onChange={(event) => setclassDescription(event.target.value)} />
              </div>
              <div className="col-12 m-5">
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
