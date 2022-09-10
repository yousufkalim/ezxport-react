import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const SwitchButton = (props) => {
  return (
    <>
      <div className="Switches">
        <p className="switch_p">{props.text}</p>
        {props?.item?.url?.map((item) => {
          var filename = item.split('-').slice(-3).reverse().pop();
          return <p className="switch_p2">{filename}</p>;
        })}
        &nbsp; {props.pdfText} &nbsp; {props.pdfText2}
        <FormControlLabel
          name={props.name}
          onChange={props.onChange}
          checked={props.checked}
          control={<Switch color="secondary" />}
          label={props.label}
          labelPlacement="Valid"
          value={props.value}
        />
      </div>
    </>
  );
};

export default SwitchButton;
