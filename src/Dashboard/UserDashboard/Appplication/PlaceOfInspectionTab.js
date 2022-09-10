import React from 'react';

const PlaceOfInspectionTab = ({ place }) => {
  return (
    <>
      <div className="InformationTab">
        <div className="InformationTab_col">
          <div className="requestDate_tab">
            <p className="requestData_p">Company Name</p>
            <p className="requestData_date">{place?.company_name}</p>
          </div>
          <div className="requestDate_tab">
            <p className="requestData_p">Email</p>
            <p className="requestData_date">{place?.email}</p>
          </div>
          <div className="requestDate_tab">
            <p className="requestData_p">Last Name</p>
            <p className="requestData_date">{place?.contact_lname}</p>
          </div>
          <div className="requestDate_tab">
            <p className="requestData_p">Full address</p>
            <p className="requestData_date">{place?.address}</p>
          </div>
        </div>
        <div className="InformationTab_col">
          <div className="requestDate_tab">
            <p className="requestData_p">Country</p>
            <p className="requestData_date">{place?.country?.name}</p>
          </div>

          <div className="requestDate_tab">
            <p className="requestData_p">Telephone</p>
            <p className="requestData_date">{place?.phone_number}</p>
          </div>
          <div className="requestDate_tab">
            <p className="requestData_p">First Name</p>
            <p className="requestData_date">{place?.contact_fname}</p>
          </div>
          <div className="requestDate_tab" style={{ display: 'flex' }}>
            <div className="SellerTab_postalAndTown">
              <p className="requestData_p">Code postal</p>
              <p className="requestData_date">{place?.zipcode}</p>
            </div>
            <div className="SellerTab_div SellerTab_postalAndTown">
              <p className="requestData_p ">Town</p>
              <p className="requestData_date">{place?.city}</p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOfInspectionTab;
