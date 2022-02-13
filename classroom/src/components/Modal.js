import React from 'react'

export default function Modal(props) {
  return (
    <>
      <div className="modal fade" id={props.id} tabIndex="-1" aria-labelledby={`${props.id}Label`} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id={`${props.id}Label`}>{props.title}</h5>
                    <button type="button" ref={props.BtnRef}  className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    {props.children}
                </div>
            </div>
        </div>
    </div> 
    </>
  )
}
