import React, { useState } from 'react';
import SearchField from "../../components/Common/SearchField";
import Modal from "../../components/Common/Modal";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FilePicker from "../../components/Common/FilePicker";
import Icon from "../../assets/Quiz.png";
// table

// import SearchIcon from '@mui/icons-material/Search';
import TabMenu from "../../components/Common/TabMenu";
import Button from "../../components/Common/Button";
const title = [
  { heading: "Nom société" },
  { heading: "Pays" },
  { heading: "Adresse email" },
  { heading: "Téléphone" },
  { heading: "Adresse" },
  { heading: "" },
];

const AddressBook = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState("default");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    setDropdown(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          {/* list head  */}
          <div className="List_heading_div">
            <h1 className="list_h1">Address Book</h1>
            <div className="searching">
              <SearchField placeholder="Searching" />
              <Button
                text="Ajouter un acheteur"
                className="list_reqst_btn2"
                open={open}
                setOpen={setOpen}
                onClick={handleClickOpen}
              />
            </div>
          </div>
          {/* list table   */}
          <div className="list_table">
            <TabMenu title={title} />
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen} title="Ajouter un acheteur" handleClose={handleClose} Closebtn={true}>
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
              <Select id="demo-simple-select" defaultValue={dropdown} onChange={handleChange} className="buyer_input">
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
        </div>
      </Modal>
      {/* BOM's Modal */}
      {/* <Modal open={open} setOpen={setOpen} title="Actualiser les nomenclatures" handleClose={handleClose} Closebtn={true}>
        <div className="buyer_socond">
          <div className="luyer_input_field">
            <label htmlFor="" className="bom_popup_label">
              Télécharger votre fichier nomenclature <img src={Icon} alt="" className="quiz_icon" />
            </label>
            <Button text="Télécharger le fichier actuel" className="bom_downloadFile_btn" />
          </div>
          <label htmlFor="" className="bom_popup_label" style={{ paddingBottom: "10px" }}>
            Télécharger votre fichier nomenclature <img src={Icon} alt="" className="quiz_icon" />
          </label>
          <FilePicker />
          <Button text="Actualiser" className="bom_downloadFile_btn" />
        </div>
      </Modal> */}
    </>
  );
};

export default AddressBook;

