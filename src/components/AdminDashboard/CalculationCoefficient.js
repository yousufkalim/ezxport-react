import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CalculationCoefficient = () => {
  const [dropdown, setDropdown] = React.useState('default');

  const handleChange = (event) => {
    setDropdown(event.target.value);
  };
  return (
    <>
      <div className="Coefficient_main">
        <div className="Coefficient_input_div">
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                Selectionner un pays
              </label>
              <Select
                id="demo-simple-select"
                defaultValue={dropdown}
                onChange={handleChange}
                className="buyer_input"
              >
                <MenuItem value="default">3,000</MenuItem>
                <MenuItem value={10}>3,000</MenuItem>
                <MenuItem value={20}>3,000</MenuItem>
                <MenuItem value={30}>3,000</MenuItem>
              </Select>
              <span className="rightText">USD</span>
            </FormControl>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalculationCoefficient;
