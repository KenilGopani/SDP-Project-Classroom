import React, { useEffect } from "react";

const CreateAssignment = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log('done');
  }
  return (
    <div className="modal fade" id="createAssignmentModal">
      <div className="modal-dialog modal-dialog-scollable">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">Create Assignment</h3>
            <button className="btn btn-danger close" data-bs-dismiss="modal"><span>&times;</span></button>
          </div>
          <div className="modal-body">
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAssignment;
