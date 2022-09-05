import React from 'react';
import PlusButton from '../../assets/PlusButton.svg';
import { ReactComponent as Delete } from "../../assets/DeleteIcon.svg"
const AddDocument = (props) => {
  return (
    <>
      <div className="request_documents">
        <p className="request_documents_title">{props.title}</p>
        <div className="request_documents_input_div" style={{ display: !props.addDocument ? "none" : "" }}>
          <label htmlFor="" className="request_documents_label" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            Document name
            <Delete onClick={props.onDelete} />
          </label>
          <input type="text" className="request_documents_input" placeholder="Enter Document name" />
        </div>
        <div className="add_ducoment_div" style={{ cursor: "pointer" }}>
          <img src={PlusButton} alt="" onClick={() => props?.setAddDocument(true)} />
          <p className="add_ducoment_p">Request another document</p>
        </div>
      </div>
    </>
  );
};

export default AddDocument;
