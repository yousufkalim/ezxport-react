import React from 'react';
import { ReactComponent as Arrow } from '../../assets/arrow.svg';
const ValidateButton = (props) => {
  return (
    <>
      <div className="import_dcuments">
        <p className="ExportDocuments_p">{props.text}</p>
        <div className={`Validator_document_btn_div ${props.redclass}`} onClick={props.onClick} style={{ cursor: "pointer" }}>
          <p className={`ExportDocuments_btn ${props.redclass2}`}>Validated documents <Arrow /></p>
        </div>

      </div>
    </>
  );
};

export default ValidateButton;
