import React, { useState } from 'react';
import SearchField from '../../Components/SearchField';
// table

// import SearchIcon from '@mui/icons-material/Search';
import TabMenu from '../../Components/TabMenu';
import Button from '../../Components/Button';

const AddressBook = () => {
  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          {/* list head  */}
          <div className="List_heading_div">
            <h1 className="list_h1">Address Book</h1>
            <div className="searching">
              <SearchField placeholder="Searching" />
              <Button text="Ajouter un acheteur" className="list_reqst_btn2" />
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
