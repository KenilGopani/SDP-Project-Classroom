import React from "react";

const ClassCard = ({classroom}) => {

  return (
    <>
      <div className={`card myCard shadow p-3 m-1 bg-body`} style={{ height: '300px', minWidth: '300px',borderRadius:'20px' }} onClick={null}>
        <div className="container text-white" style={{backgroundColor:'yellowgreen',borderRadius:'4% 4% 45% 45%',transform:'scaleY(1.125)'}}>
          <div className="row align-items-center" >
            <div className="col-8 fs-4 card-title text-uppercase" style={{ fontWeight: '700'}}>{classroom.className}</div>
            <div className="col-4 card-title">
              <img src={require("../../static/classroom.png")} className="img-fluid rounded m-2" alt="Not Found" />
            </div>
          </div>
        </div>
        <div className="card-body d-flex align-items-end justify-content-end" style={{ maxHeight: "550px" }}>
          <h4 className="card-title">{classroom.owner.name}</h4>
        </div>
      </div>
    </>
  );
};

export default ClassCard;
