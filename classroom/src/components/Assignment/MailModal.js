import React, { useRef, useState } from 'react';
import Modal from '../Modal'

const MailModal = (props) => {
    const [message, setMessage] = useState("");
    const closeBtnRef = useRef(null);

    const handleOnClick = async (event) => {
        event.preventDefault();
        // console.log(props);
        try {
            await fetch("http://localhost:4099/api/assignment/personalMail",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        list: [props.mailTo],
                        message : message,
                    }),
                }
            );
        }
        catch (err) {
            console.log(err);
        }
        closeBtnRef.current.click();
    }

    return (
        <>
            <Modal title="Message" id="mail" BtnRef={closeBtnRef}>
                <div className="mb-3 h-75">
                    <label htmlFor="mailMsg" className="form-label">Enter a Message : </label>
                    <textarea className="form-control h-auto" value={message} onChange={e => {setMessage(e.target.value)}} id="mailMsg" />
                </div>
                {console.log(props)}
                <button type="button" disabled={message.length === 0} className="btn btn-primary shadow-none" onClick={handleOnClick}>Send</button>
            </Modal>
        </>
    )
}
export default MailModal;