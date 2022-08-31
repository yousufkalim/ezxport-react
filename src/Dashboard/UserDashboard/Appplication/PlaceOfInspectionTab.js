import React from 'react';

const PlaceOfInspectionTab = () => {
  return (
    <>
      <div className="InformationTab">
        <div className="InformationTab_col">
          <div className="requestDate_tab">
            <p className="requestData_p">Company Name</p>
            <p className="requestData_date">Galadrim</p>
          </div>
          <div className="requestDate_tab">
            <p className="requestData_p">Email</p>
            <p className="requestData_date">mail@galadrim.fr</p>
          </div>
          <div className="requestDate_tab">
            <p className="requestData_p">Full address</p>
            <p className="requestData_date">90 road of rouvroy</p>
          </div>
        </div>
        <div className="InformationTab_col">
          <div className="requestDate_tab">
            <p className="requestData_p">Country</p>
            <p className="requestData_date">France</p>
          </div>
          <div className="requestDate_tab">
            <p className="requestData_p">Telephone</p>
            <p className="requestData_date">33 03 93 93 29 30</p>
          </div>
          <div className="requestDate_tab" style={{ display: 'flex' }}>
            <div className="SellerTab_postalAndTown">
              <p className="requestData_p">Code postal</p>
              <p className="requestData_date">80100</p>
            </div>
            <div className="SellerTab_div SellerTab_postalAndTown">
              <p className="requestData_p ">Town</p>
              <p className="requestData_date">Abbeville</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOfInspectionTab;
