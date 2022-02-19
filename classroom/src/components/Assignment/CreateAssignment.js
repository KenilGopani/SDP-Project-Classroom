import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const CreateAssignment = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log('done');
  }
  return (
    <div className="container mt-5 border border-dark rounded" style={{ maxWidth: "720px" }}>
      <div className="row border-bottom border-dark">
        <div className="col bg-primary text-white p-3">
          <h3 className="text-center fw-bold">Create ClassRoom</h3>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <form onSubmit={onSubmitHandler}>
            <div className="mb-3">
              <label className="form-label required">Title</label>
              <input type="text" className="form-control" name="title" />
            </div>
            <div className="mb-3">
              <label className="form-label required">Description</label>
              <input type="text" className="form-control" name="description" />
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
            <Link to={'/home/classroom'} className="btn btn-danger m-1" >Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignment;
