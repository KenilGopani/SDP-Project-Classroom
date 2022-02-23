import React from "react";

const ClassCard = ({classroom}) => {

  return (
    <>
      <div className={`card myCard shadow p-3 m-1 bg-body rounded`} style={{ height: '300px', minWidth: '300px' }} onClick={null}>
        <div className="container rounded bg-primary text-white">
          <div className="row align-items-center" >
            <div className="col-8 fs-4 card-title" >{classroom.className}</div>
            <div className="col-4 card-title">
              <img src={require("../../static/classroom.png")} className="img-fluid rounded m-2" alt="Not Found" />
            </div>
          </div>
        </div>
        <div className="card-body" style={{ maxHeight: "550px" }}>
          <h4 className="card-title">{classroom.owner._id}</h4>
        </div>
      </div>
    </>
  );
};

export default ClassCard;
