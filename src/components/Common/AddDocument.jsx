import React from 'react';
import PlusButton from '../../assets/PlusButton.svg';

const AddDocument = (props) => {
  return (
    <>
      <div className="request_documents">
        <p className="request_documents_title">{props.title}</p>
        <div className="request_documents_input_div">
          <label htmlFor="" className="request_documents_label">
            Document name
          </label>
          <input type="text" className="request_documents_input" placeholder="Document name" />
        </div>
        <div className="add_ducoment_div">
          <img add_ducoment_btn src={PlusButton} alt="" />
          <p className="add_ducoment_p">Request another document</p>
        </div>
      </div>
    </>
  );
};

export default AddDocument;
