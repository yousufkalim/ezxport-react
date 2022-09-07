import React from 'react';
import PlusButton from '../../assets/PlusButton.svg';

const AddProduct = (props) => {
    return (
        <>
            <div className="request_documents">
                <p className="request_documents_title">{props.title}</p>
                <div className="request_documents_input_div" style={{ display: !props.addProduct ? "none" : "" }}>
                    <label htmlFor="" className="request_documents_label">
                        Document name
                    </label>
                    <input type="text" className="request_documents_input" placeholder="Enter Document name" />
                </div>
                <div className="add_ducoment_div" style={{ cursor: "pointer" }}>
                    <img src={PlusButton} alt="" onClick={() => props?.setAddProduct(true)} />
                    <p className="add_ducoment_p">Request another document</p>
                </div>
            </div>
        </>
    );
};

export default AddProduct;