import React from 'react';
import EzxportIcon from '../../assets/EzxportIcon.svg';
import SendIcon from '../../assets/SendIcon.svg';
import { useHistory } from 'react-router-dom';
import Button from "./Button"

const RequestDocuments = () => {
    const history = useHistory(null)
    const handleReturn = () => {
        history.push("/Admin/Dashboard/Requests")
    }
    return (
        <>
            <div className="SendDocuments_main">
                <div className="Reference_logo_div">
                    <img src={EzxportIcon} alt="" className="header_center_div" />
                </div>
                <div className="SendDocuments_second">
                    <img src={SendIcon} alt="" className="SendDocuments_img" />
                    <p className="SendDocuments_P">

                        Nous avons demandé <span style={{ fontWeight: 'bold' }}>les documents manquants</span> à l’entreprise
                    </p>
                    <Button text="Return to Requests" onClick={handleReturn} className="return_btn" />
                </div>
            </div>
        </>
    );
};

export default RequestDocuments;
