import React from 'react';

const SellerTab = ({ seller }) => {
  return (
    <>
      <div className="InformationTab">
        <div className="InformationTab_col">
          <div className="requestDate_tab">
            <p className="requestData_p">Company Name</p>
            <p className="requestData_date">{seller?.company_name}</p>
          </div>
          <div className="requestDate_tab">
            <p className="requestData_p">Email</p>
            <p className="requestData_date">{seller?.email}</p>
          </div>
          <div className="requestDate_tab">
            <p className="requestData_p">Full address</p>
            <p className="requestData_date">{seller?.address}</p>
          </div>
        </div>
        <div className="InformationTab_col">
          <div className="requestDate_tab">
            <p className="requestData_p">Country</p>
            <p className="requestData_date">{seller?.country?.name}</p>
          </div>
          <div className="requestDate_tab">
            <p className="requestData_p">Telephone</p>
            <p className="requestData_date">{seller?.phone_number}</p>
          </div>
          <div className="requestDate_tab" style={{ display: 'flex' }}>
            <div className="SellerTab_postalAndTown">
              <p className="requestData_p">Code postal</p>
              <p className="requestData_date">{seller?.zipcode}</p>
            </div>
            <div className="SellerTab_div SellerTab_postalAndTown">
              <p className="requestData_p ">Town</p>
              <p className="requestData_date">{seller?.city}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerTab;
