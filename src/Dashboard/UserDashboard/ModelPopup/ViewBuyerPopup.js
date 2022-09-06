import React, { useState } from 'react';
import Modal from '../../../components/Common/Modal';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ViewBuyerPopup = ({ open, setOpen }) => {
  const [dropdown, setDropdown] = useState('default');

  const handleChange = (event) => {
    setDropdown(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        title="Add a buyer"
        handleClose={handleClose}
        Closebtn={true}
      >
        <div className="buyer_socond">
          <div className="luyer_input_field">
            <label htmlFor="" className="buyer_label">
              Company Name
            </label>
            <input type="text" className="buyer_input" placeholder="Company 1" />
          </div>
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                Select a country
              </label>
              <Select
                id="demo-simple-select"
                defaultValue={dropdown}
                onChange={handleChange}
                className="buyer_input"
              >
                <MenuItem value="default">Gabon</MenuItem>
                <MenuItem value={10}>A demand</MenuItem>
                <MenuItem value={20}>A demand</MenuItem>
                <MenuItem value={30}>A demand</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="luyer_input_field">
            <div className="second_input_field">
              <div className="input_fields">
                <label htmlFor="" className="buyer_label">
                  E-mail address
                </label>
                <input type="email" className="buyer_input" placeholder="mail@mail.com" />
              </div>
              <div className="input_fields">
                <label htmlFor="" className="buyer_label">
                  Telephone
                </label>
                <input type="number" className="buyer_input" placeholder="+33 03 32 32 42 42" />
              </div>
            </div>
          </div>
          <div className="luyer_input_field">
            <div className="luyer_input_field">
              <label htmlFor="" className="buyer_label">
                Address
              </label>
              <input type="text" className="buyer_input" placeholder="97 road of rouvroy" />
            </div>
          </div>
          <div className="luyer_input_field">
            <div className="second_input_field">
              <div className="input_fields">
                <label htmlFor="" className="buyer_label">
                  Postal code
                </label>
                <input type="number" className="buyer_input" placeholder="34 832" />
              </div>
              <div className="input_fields">
                <label htmlFor="" className="buyer_label">
                  Town
                </label>
                <input type="text" className="buyer_input" placeholder="Congo" />
              </div>
            </div>
          </div>
          <button className="luyer_button">To Confirm</button>
        </div>
      </Modal>
    </>
  );
};

export default ViewBuyerPopup;
