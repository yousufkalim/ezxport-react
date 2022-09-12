import React from 'react';

const BuyerTab = ({ buyer }) => {
  return (
    <>
      <div className="InformationTab">
        <div className="InformationTab_col">
          <div className="requestDate_tab">
            <p className="requestData_p">Company Name</p>
            <p className="requestData_date">{buyer?.company_name}</p>
          </div>
          <div className="requestDate_tab">
            <p className="requestData_p">Email</p>
            <p className="requestData_date">{buyer?.email}</p>
          </div>
          <div className="requestDate_tab">
            <p className="requestData_p">Full address</p>
            <p className="requestData_date">{buyer?.address}</p>
          </div>
        </div>
        <div className="InformationTab_col">
          <div className="requestDate_tab">
            <p className="requestData_p">Country</p>
            <p className="requestData_date">{buyer?.country?.name}</p>
          </div>
          <div className="requestDate_tab">
            <p className="requestData_p">Telephone</p>
            <p className="requestData_date">{buyer?.phone_number}</p>
          </div>
          <div className="requestDate_tab" style={{ display: 'flex' }}>
            <div className="SellerTab_postalAndTown">
              <p className="requestData_p">Code postal</p>
              <p className="requestData_date">{buyer?.zipcode}</p>
            </div>
            <div className="SellerTab_div SellerTab_postalAndTown">
              <p className="requestData_p ">Town</p>
              <p className="requestData_date">{buyer?.city}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerTab;
