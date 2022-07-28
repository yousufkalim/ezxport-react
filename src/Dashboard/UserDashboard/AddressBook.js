import React, { useState } from 'react';
import SearchField from '../../components/SearchField';
import Modal from '../../components/Modal';

// table

// import SearchIcon from '@mui/icons-material/Search';
import TabMenu from '../../components/TabMenu';
import Button from '../../components/Button';

const AddressBook = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Modal open={open} setOpen={setOpen} title="Ajouter un acheteur"></Modal>

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
            <TabMenu />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressBook;
