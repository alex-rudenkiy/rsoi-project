import { useToasts } from 'react-toast-notifications'

const {useState, useRef, useEffect} = require("react");
const React = require("react");
const {useListener} = require("react-bus");

export function ToastDemo() {
    // var [toast, setToast] = useState(false);
    // const toastRef = useRef();
    //
    // const [isOpen, setIsOpen] = React.useState(false)
    // const [msg, setMsg] = useState("");
    const { addToast } = useToasts()

    const onOpenToast = React.useCallback(function (data) {
        console.log('clicked', data.msg);
        // setMsg(data.msg);
        // setIsOpen(true);
        addToast(data.msg, {
            appearance: data.style || "info",
            autoDismiss: true,
        });
    }, [])

    useListener('openToast', onOpenToast);

/*    return (
        <div className="py-2" style={{zIndex:"3"}}>
            <div className=" position-absolute top-0 end-0 m-4" style={{zIndex:"2"}} role="alert" ref={toastRef}>
                {/!*<div className="toast-header">
                    <strong className="me-auto">Bootstrap 5</strong>
                    <small>4 mins ago</small>
                    <button type="button" className="btn-close" onClick={() => setToast(false)} aria-label="Close"></button>
                </div>
                <div className="toast-body">
                    {msg}
                </div>*!/}
                <Toast show={isOpen} autohide={true} onClose={()=>setIsOpen(false)}>
                    <Toast.Header>
{/!*                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />*!/}
                        <strong className="me-auto">Bootstrap</strong>
                        <small>11 mins ago</small>
                    </Toast.Header>
                    <Toast.Body>{msg}</Toast.Body>
                </Toast>
            </div>
        </div>
    )*/
}