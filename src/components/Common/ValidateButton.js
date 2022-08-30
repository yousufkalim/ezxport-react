import React from 'react';

const ValidateButton = (props) => {
  return (
    <>
      <div className="import_dcuments">
        <p className="ExportDocuments_p">{props.text}</p>
        <div className={`Validator_document_btn_div ${props.redclass}`}>
          <select name="cars" id="cars" className={`ExportDocuments_btn ${props.redclass2}`}>
            <option value="volvo">Validated documents</option>
            <option value="saab">Validated documents</option>
            <option value="mercedes">Validated documents</option>
            <option value="audi">Validated documents</option>
          </select>
        </div>
        {/* <button className={`ExportDocuments_btn ${props.redclass}`}>
          Validated documents &nbsp; ⮟
        </button> */}
      </div>
    </>
  );
};

export default ValidateButton;
