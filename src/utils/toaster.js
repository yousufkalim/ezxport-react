import { toast } from "react-toastify";
import {ReactComponent as Success} from "../assets/success-icon.svg"
import {ReactComponent as Failed} from "../assets/failed.svg"


const toaster = (type, msg, title) => {
    const icon = type === 'success' ? <Success /> : type === 'failed' && <Failed />
    return toast(<div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
        <div>{icon}</div>
        <div>
            <div className='toaster-title'>{title}</div>
            <div className='toaster-msg'>{msg}</div>
        </div>
    </div>)
}

export default toaster