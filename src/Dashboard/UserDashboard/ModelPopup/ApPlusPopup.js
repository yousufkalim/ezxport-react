import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import ClearIcon from '@mui/icons-material/Clear';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ApPlusPopup = ({ open, setOpen }) => {
  const [dropdown, setDropdown] = useState('default');

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setDropdown(event.target.value);
  };
  return (
    <>
      <div className="ApPlus_popup">
        <Dialog open={open} onClose={handleClose} fullWidth>
          <div className="ApPlus_popup_form">
            <div className="ApPlus_popup_ha">
              <h3 className="ApPlus_popup_h2">AP Plus</h3>
              <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
            </div>
            {/* inputs  */}
            <div className="buyer_socond">
              <div className="luyer_input_field">
                <FormControl fullWidth>
                  <label htmlFor="" className="buyer_label">
                    Associated countries
                  </label>
                  <Select
                    id="demo-simple-select"
                    defaultValue={dropdown}
                    onChange={handleChange}
                    className="buyer_input"
                  >
                    <MenuItem value="default" style={{ color: '#667085' }}>
                      Cameroon, Ivory Coast
                    </MenuItem>
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
                      Last name
                    </label>
                    <input type="text" className="buyer_input" placeholder="Last name" />
                  </div>
                  <div className="input_fields">
                    <label htmlFor="" className="buyer_label">
                      First name
                    </label>
                    <input type="text" className="buyer_input" placeholder="First name" />
                  </div>
                </div>
              </div>
              <div className="luyer_input_field">
                <div className="luyer_input_field">
                  <label htmlFor="" className="buyer_label">
                    E-mail address
                  </label>
                  <input type="email" className="buyer_input" placeholder="E-mail address" />
                </div>
              </div>
              <div className="luyer_input_field"></div>
              <button className="luyer_button">Confirmer</button>
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default ApPlusPopup;
