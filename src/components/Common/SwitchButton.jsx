import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const SwitchButton = (props) => {
  return (
    <>
      <div className="Switches">
        <p className="switch_p">{props.text}</p>
        {props?.item?.url?.map((item) => {
          var filename = item.split('-').pop()
          return <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <p className="switch_p2" >{filename}</p>
          </div>
        })}
        &nbsp; {props.pdfText} &nbsp; {props.pdfText2}
        <FormControlLabel
          onChange={props.onChange}
          checked={props.checked}
          value="Valid"
          control={<Switch color="secondary" />}
          label={props.label}
          labelPlacement="Valid"
        />
      </div>
    </>
  );
};

export default SwitchButton;
