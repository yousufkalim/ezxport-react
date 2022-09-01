import React, { useState } from 'react';
import Modal from '../../../components/Common/Modal';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const EdditBuyer = ({ open, setOpen }) => {
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
        title="Ajouter un acheteur"
        handleClose={handleClose}
        Closebtn={true}
      >
        <div className="buyer_socond">
          <div className="luyer_input_field">
            <label htmlFor="" className="buyer_label">
              Nom société
            </label>
            <input type="text" className="buyer_input" placeholder="Société 1" />
          </div>
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
                <MenuItem value="default">Gabon</MenuItem>
                <MenuItem value={10}>Une demande</MenuItem>
                <MenuItem value={20}>Une demande</MenuItem>
                <MenuItem value={30}>Une demande</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="luyer_input_field">
            <div className="second_input_field">
              <div className="input_fields">
                <label htmlFor="" className="buyer_label">
                  Adresse email
                </label>
                <input type="email" className="buyer_input" placeholder="mail@mail.com" />
              </div>
              <div className="input_fields">
                <label htmlFor="" className="buyer_label">
                  Téléphone
                </label>
                <input type="number" className="buyer_input" placeholder="+33 03 32 32 42 42" />
              </div>
            </div>
          </div>
          <div className="luyer_input_field">
            <div className="luyer_input_field">
              <label htmlFor="" className="buyer_label">
                Adresse
              </label>
              <input type="text" className="buyer_input" placeholder="97 chaussée de rouvroy" />
            </div>
          </div>
          <div className="luyer_input_field">
            <div className="second_input_field">
              <div className="input_fields">
                <label htmlFor="" className="buyer_label">
                  Code postal
                </label>
                <input type="number" className="buyer_input" placeholder="34 832" />
              </div>
              <div className="input_fields">
                <label htmlFor="" className="buyer_label">
                  Ville
                </label>
                <input type="text" className="buyer_input" placeholder="Congo" />
              </div>
            </div>
          </div>
          <button className="luyer_button">Confirmer</button>
          <button className="luyer_button2">Delete buyer</button>
        </div>
      </Modal>
    </>
  );
};

export default EdditBuyer;
