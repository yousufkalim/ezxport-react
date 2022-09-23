import React from "react";
import { useTranslation } from "react-i18next";

const PlaceOfInspectionTab = ({ place }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="InformationTab">
        <div className="InformationTab_col">
          <div className="requestDate_tab">
            <p className="requestData_p">{t("Company name")}</p>
            <p className="requestData_date">{place?.company_name}</p>
          </div>
          <div className="requestDate_tab">
            <p className="requestData_p">{t("Email")}</p>
            <p className="requestData_date">{place?.email}</p>
          </div>
          <div className="requestDate_tab">
            <p className="requestData_p">{t("Last name")}</p>
            <p className="requestData_date">{place?.contact_lname}</p>
          </div>
          <div className="requestDate_tab">
            <p className="requestData_p">{t("Full address")}</p>
            <p className="requestData_date">{place?.address}</p>
          </div>
        </div>
        <div className="InformationTab_col">
          <div className="requestDate_tab">
            <p className="requestData_p">{t("Country")}</p>
            <p className="requestData_date">{t(place?.country)}</p>
          </div>

          <div className="requestDate_tab">
            <p className="requestData_p">{t("Telephone")}</p>
            <p className="requestData_date">{place?.phone_number}</p>
          </div>
          <div className="requestDate_tab">
            <p className="requestData_p">{t("First name")}</p>
            <p className="requestData_date">{place?.contact_fname}</p>
          </div>
          <div className="requestDate_tab" style={{ display: "flex" }}>
            <div className="SellerTab_postalAndTown">
              <p className="requestData_p">{t("Postal code")}</p>
              <p className="requestData_date">{place?.zipcode}</p>
            </div>
            <div className="SellerTab_div SellerTab_postalAndTown">
              <p className="requestData_p ">{t("Town")}</p>
              <p className="requestData_date">{place?.city}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOfInspectionTab;
