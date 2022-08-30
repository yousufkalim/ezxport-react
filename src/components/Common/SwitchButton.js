import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const SwitchButton = (props) => {
  return (
    <>
      <div className="Switches">
        <p className="switch_p">{props.text}</p>
        <p className="switch_p2">
          Document.pdf &nbsp; {props.pdfText} &nbsp; {props.pdfText2}
        </p>
        <FormControlLabel
          value="Valid"
          control={<Switch color="secondary" />}
          label="Valid"
          labelPlacement="Valid"
          // checked
        />
      </div>
    </>
  );
};

export default SwitchButton;
