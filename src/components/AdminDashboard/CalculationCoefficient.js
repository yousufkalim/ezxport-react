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
                Minimum threshold
              </label>
              <Select
                id="demo-simple-select"
                defaultValue={dropdown}
                onChange={handleChange}
                className="buyer_input"
              >
                <MenuItem value="default">$ 3,000</MenuItem>
                <MenuItem value={10}>$ 3,000</MenuItem>
                <MenuItem value={20}>$ 3,000</MenuItem>
                <MenuItem value={30}>$ 3,000</MenuItem>
              </Select>
              <span className="rightText">USD</span>
            </FormControl>
          </div>
        </div>
        <div className="Coefficient_input_div">
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                Coefficient
              </label>
              <Select
                id="demo-simple-select"
                defaultValue={dropdown}
                onChange={handleChange}
                className="buyer_input"
              >
                <MenuItem value="default">$ 0.45%</MenuItem>
                <MenuItem value={10}>$ 0.45%</MenuItem>
                <MenuItem value={20}>$ 0.45%</MenuItem>
                <MenuItem value={30}>$ 0.45%</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="Coefficient_input_div">
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                minimum cost
              </label>
              <Select
                id="demo-simple-select"
                defaultValue={dropdown}
                onChange={handleChange}
                className="buyer_input"
              >
                <MenuItem value="default">$ 3,000</MenuItem>
                <MenuItem value={10}>$ 3,000</MenuItem>
                <MenuItem value={20}>$ 3,000</MenuItem>
                <MenuItem value={30}>$ 3,000</MenuItem>
              </Select>
              <span className="rightText">USD</span>
            </FormControl>
          </div>
        </div>
        <div className="Coefficient_input_div">
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                Coût maximum
              </label>
              <Select
                id="demo-simple-select"
                defaultValue={dropdown}
                onChange={handleChange}
                className="buyer_input"
              >
                <MenuItem value="default">$ 12,000</MenuItem>
                <MenuItem value={10}>$ 12,000</MenuItem>
                <MenuItem value={20}>$ 12,000</MenuItem>
                <MenuItem value={30}>$ 12,000</MenuItem>
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
