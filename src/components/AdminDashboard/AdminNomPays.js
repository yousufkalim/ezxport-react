import React from 'react';
import SearchField from "../../components/Common/SearchField";
import Button from "../../components/Common/Button";
import AdminTabMenu from './AdminTabMenu';

const AdminNomPays = () => {
  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          {/* list head  */}
          <div className="List_heading_div">
            <h1 className="list_h1">NomPays</h1>
            <div className="searching">
              <SearchField placeholder="Searching" />
              <Button text="Edit" className="list_reqst_btn2" />
            </div>
          </div>
          {/* list table   */}
          <div className="list_table">
            <AdminTabMenu />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNomPays;
