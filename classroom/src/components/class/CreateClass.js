import React from "react";
import Navbar from "../main/Navbar";

const CreateClass = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("hello");
  };
  return (
    <>
      <Navbar />
      <div
        className="container card mt-5 shadow rounded"
        style={{ maxWidth: "720px" }}
      >
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
                <input type="text" className="form-control"></input>
              </div>
              <div className="form-group m-5">
                <label className="form-label">ClassRoom Description : </label>
                <textarea type="text" className="form-control"></textarea>
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
