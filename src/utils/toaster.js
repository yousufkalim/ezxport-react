import { toast } from "react-toastify";
import {ReactComponent as Success} from "../assets/success-icon.svg"
import quiz from "../assets/Quiz.png"


const toaster = (type, msg, title) => {
    const icon = type === 'success' ? <Success /> : "test"
    return toast(<div style={{display: 'flex', alignItems: 'flex-start', gap: '10px'}}>
        <div>{icon}</div>
        <div>
            <div className='toaster-title'>{title}</div>
            <div className='toaster-msg'>{msg}</div>
        </div>
    </div>)
}

export default toaster