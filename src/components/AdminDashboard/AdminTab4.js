import React, { useState } from 'react';
import CalculationCoefficient from './CalculationCoefficient';
import CalculationRange from './CalculationRange';
import DownArrow from '../../assets/TitleDownArrow.svg';
import DeleteIcon from '../../assets/DeleteIcon.svg';
import EditIcon from '../../assets/EditIcon.svg';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

function createData(name, calories, fat, carbs, protein, protein2) {
  return { name, calories, fat, carbs, protein, protein2 };
}
const rows = [
  createData('500 €', '999 €', '300 €', '22'),
  createData('500 €', '999 €', '300 €', '22'),
  createData('500 €', '999 €', '300 €', '22'),
];
const AdminTab4 = (props) => {
  console.log('TAB 4', props);
  const [currentRadioValue, setCurrentValue] = useState('on');
  const [dropdown, setDropdown] = useState('default');

  const handleRadioChange = (value) => {
    setCurrentValue(value);
  };

  const handleChange = (event) => {
    setDropdown(event.target.value);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "2% 0",
        }}
      >
        <input
          name="radio-item-1"
          value="on"
          type="radio"
          onChange={(e) => setCurrentValue(e.target.value)}
          defaultChecked={currentRadioValue === "on"}
        />
        <label
          htmlFor="radio-item-1"
          style={{
            paddingLeft: "5px",
          }}
        >
          Calculation by coefficient
        </label>

        <input
          style={{
            marginLeft: "20px",
          }}
          name="radio-item-1"
          value="off"
          type="radio"
          onChange={(e) => setCurrentValue(e.target.value)}
          defaultChecked={currentRadioValue === "off"}
        />
        <label
          style={{
            paddingLeft: "5px",
          }}
          htmlFor="radio-item-2"
        >
          Calculation by range
        </label>
      </div>
      {/* {currentRadioValue === 'on' && <CalculationCoefficient />} */}
      {currentRadioValue === "off" && <CalculationRange rows={rows} img={DownArrow} DltIcon={DeleteIcon} editIcon={EditIcon} />}
      {currentRadioValue === "on" && (
        <>
          <div className="Coefficient_main">
            <div className="Coefficient_input_div">
              <div className="luyer_input_field">
                <FormControl fullWidth>
                  <label htmlFor="" className="buyer_label">
                    Minimum threshold
                  </label>
                  <Select id="demo-simple-select" defaultValue={dropdown} onChange={handleChange} className="buyer_input">
                    <MenuItem value="default"> {"$" + props?.calculation?.min_threshold?.value}</MenuItem>
                    <MenuItem value={10}>3,000</MenuItem>
                    <MenuItem value={20}>3,000</MenuItem>
                    <MenuItem value={30}>3,000</MenuItem>
                  </Select>
                  <span className="rightText"> {props?.calculation?.min_threshold?.currency}</span>
                </FormControl>
              </div>
              <div className="luyer_input_field">
                <FormControl fullWidth>
                  <label htmlFor="" className="buyer_label">
                    Coefficient
                  </label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    value={props?.calculation?.coefficient}
                    sx={{
                      ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                        height: "1rem !important",
                      },
                    }}
                  />
                  {/* <span className="rightText">{props.calculation.min_threshold.currency}</span> */}
                </FormControl>
              </div>
              <div className="luyer_input_field">
                <FormControl fullWidth>
                  <label htmlFor="" className="buyer_label">
                    minimum cost
                  </label>
                  <Select id="demo-simple-select" defaultValue={dropdown} onChange={handleChange} className="buyer_input">
                    <MenuItem value="default">{"$" + props.calculation?.min_cost?.value}</MenuItem>
                    <MenuItem value={10}>3,000</MenuItem>
                    <MenuItem value={20}>3,000</MenuItem>
                    <MenuItem value={30}>3,000</MenuItem>
                  </Select>
                  <span className="rightText">{props.calculation?.min_cost?.currency}</span>
                </FormControl>
              </div>
              <div className="luyer_input_field">
                <FormControl fullWidth>
                  <label htmlFor="" className="buyer_label">
                    Coût maximum
                  </label>
                  <Select id="demo-simple-select" defaultValue={dropdown} onChange={handleChange} className="buyer_input">
                    <MenuItem value="default">{"$" + props?.calculation?.max_cost?.value}</MenuItem>
                    <MenuItem value={10}>3,000</MenuItem>
                    <MenuItem value={20}>3,000</MenuItem>
                    <MenuItem value={30}>3,000</MenuItem>
                  </Select>
                  <span className="rightText">{props.calculation?.max_cost?.currency}</span>
                </FormControl>
              </div>
            </div>
          </div>
        </>
      )}
      {/* {currentRadioValue === "off" && <CalculationRange />} */}
    </>
  );
};

export default AdminTab4;
