import React from 'react'

const ViewFile = (props) => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center mt-3'>
        <a href={props.subLink} target='_blank'><img src={require("../../static/viewFile.jpeg")} className="img-thumbnail " style={{width:'70px'}} /></a>
        <span style={{maxWidth:'100px', wordWrap:'break-word',textAlign:'center'}}>{props.subName}</span>
    </div>
  )
}

export default ViewFile;