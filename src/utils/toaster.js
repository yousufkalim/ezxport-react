import { toast } from "react-toastify";
import {ReactComponent as Success} from "../assets/success-icon.svg"
import quiz from "../assets/Quiz.png"


const toaster = (type, msg, title) => {
    const icon = type === 'success' ? <Success /> : "test"
    return toast(<div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
        <div>{icon}</div>
        <div>
            <div>{title}</div>
            <div>{msg}</div>
        </div>
    </div>)
}

export default toaster