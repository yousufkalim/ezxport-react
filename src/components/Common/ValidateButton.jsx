import React from 'react';
import { ReactComponent as Arrow } from '../../assets/arrow.svg';
const ValidateButton = (props) => {
  return (
    <>
      <div className="import_dcuments">
        <p className="ExportDocuments_p">{props.text}</p>
        <div className={props.className} onClick={props.onClick} style={{ cursor: "pointer" }}>
          <p >Validated documents <Arrow /></p>
        </div>

      </div>
    </>
  );
};

export default ValidateButton;
