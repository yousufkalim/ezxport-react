import React from 'react';
import { ReactComponent as Arrow } from '../../assets/arrow.svg';
const ValidateButton = (props) => {
  return (
    <>
      <div className="import_dcuments">
        <p className="ExportDocuments_p">{props.text}</p>
        {props.text1 && <div className={props.className} onClick={props.onClick} style={{ cursor: "pointer" }}>
          <p >{props.text1} <Arrow /> </p>
        </div>}


      </div>
    </>
  );
};

export default ValidateButton;
