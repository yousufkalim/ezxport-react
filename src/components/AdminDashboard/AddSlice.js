import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AddSlice = () => {
  const [dropdown, setDropdown] = React.useState('default');

  const handleChange = (event) => {
    setDropdown(event.target.value);
  };
  return (
    <>
      <div className="AddSlice_main">
        <div className="AddSlice_senter">
          <h2 className="AddSlice_title">Ajouter une tranche</h2>
          <div className="AddSlice_inputs_div">
            <div className="AddSlice_input_fields">
              <FormControl fullWidth>
                <label htmlFor="" className="buyer_label">
                  Minimum
                </label>
                <Select
                  id="demo-simple-select"
                  defaultValue={dropdown}
                  onChange={handleChange}
                  className="buyer_input"
                >
                  <MenuItem value="default">€ 12 000</MenuItem>
                  <MenuItem value={10}>€ 12 000</MenuItem>
                  <MenuItem value={20}>€ 12 000</MenuItem>
                  <MenuItem value={30}>€ 12 000</MenuItem>
                </Select>
                <span className="rightText">EUR</span>
              </FormControl>
            </div>
            <div className="AddSlice_input_fields">
              <FormControl fullWidth>
                <label htmlFor="" className="buyer_label">
                  Maximum
                </label>
                <Select
                  id="demo-simple-select"
                  defaultValue={dropdown}
                  onChange={handleChange}
                  className="buyer_input"
                >
                  <MenuItem value="default">€ 12 000</MenuItem>
                  <MenuItem value={10}>€ 12 000</MenuItem>
                  <MenuItem value={20}>€ 12 000</MenuItem>
                  <MenuItem value={30}>€ 12 000</MenuItem>
                </Select>
                <span className="rightText">EUR</span>
              </FormControl>
            </div>
            <div className="AddSlice_input_fields">
              <FormControl fullWidth>
                <label htmlFor="" className="buyer_label">
                  Coût certificat
                </label>
                <Select
                  id="demo-simple-select"
                  defaultValue={dropdown}
                  onChange={handleChange}
                  className="buyer_input"
                >
                  <MenuItem value="default">€ 12 000</MenuItem>
                  <MenuItem value={10}>€ 12 000</MenuItem>
                  <MenuItem value={20}>€ 12 000</MenuItem>
                  <MenuItem value={30}>€ 12 000</MenuItem>
                </Select>
                <span className="rightText">EUR</span>
              </FormControl>
            </div>
          </div>
          <button className="AddSlice_button">Ajouter la ligne</button>
        </div>
      </div>
    </>
  );
};

export default AddSlice;
