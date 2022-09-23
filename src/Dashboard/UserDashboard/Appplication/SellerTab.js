import React from "react";
import { useTranslation } from "react-i18next";

const SellerTab = ({ seller }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="InformationTab">
        <div className="InformationTab_col">
          <div className="requestDate_tab">
            <p className="requestData_p">{t("Company name")}</p>
            <p className="requestData_date">{seller?.company_name}</p>
          </div>
          <div className="requestDate_tab">
            <p className="requestData_p">{t("Email")}</p>
            <p className="requestData_date">{seller?.email}</p>
          </div>
          <div className="requestDate_tab">
            <p className="requestData_p">{t("Full address")}</p>
            <p className="requestData_date">{seller?.address}</p>
          </div>
        </div>
        <div className="InformationTab_col">
          <div className="requestDate_tab">
            <p className="requestData_p">{t("Country")}</p>
            <p className="requestData_date">{t(seller?.country)}</p>
          </div>
          <div className="requestDate_tab">
            <p className="requestData_p">{t("Telephone")}</p>
            <p className="requestData_date">{seller?.phone_number}</p>
          </div>
          <div className="requestDate_tab" style={{ display: "flex" }}>
            <div className="SellerTab_postalAndTown">
              <p className="requestData_p">{t("Postal code")}</p>
              <p className="requestData_date">{seller?.zipcode}</p>
            </div>
            <div className="SellerTab_div SellerTab_postalAndTown">
              <p className="requestData_p ">{t("Town")}</p>
              <p className="requestData_date">{seller?.city}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerTab;
