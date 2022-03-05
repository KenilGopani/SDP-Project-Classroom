import React from 'react'

const ViewFile = (props) => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center mt-3'>
        <a href={props.subLink} target='_blank'><img src={require("../../static/viewFile.jpeg")} className="img-thumbnail " style={{width:'70px'}} /></a>
        <span style={{maxWidth:'120px',textAlign:'center',whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis'}}>{props.subName}</span>
    </div>
  )
}

export default ViewFile;