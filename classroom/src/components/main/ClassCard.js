import React from "react";

const ClassCard = (props) => {
  return (
    <div>
      <div className={`card card shadow p-3 m-1 bg-body rounded`} style={{height:'300px',minWidth:'300px'}} onClick={null}>
        <div className="container rounded bg-primary text-white">
          <div className="row align-items-center" >
            <div className="col-8 fs-4 card-title" >{props.roomName}</div>
            <div className="col-4 card-title">
              <img src={require("../../img.jpg")} className="img-fluid rounded m-2" alt="image"  />
            </div>
          </div>
        </div>
        <div className="card-body" style={{ maxHeight: "550px" }}>
          <h4 className="card-title">{props.ownerName}</h4>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
