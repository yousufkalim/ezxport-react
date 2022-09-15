import React from "react";
import { useTranslation, Trans } from "react-i18next";

const BuyerTab = ({ buyer }) => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  return (
    <>
      <div className="InformationTab">
        <div className="InformationTab_col">
          <div className="requestDate_tab">
            <p className="requestData_p">{t("Company Name")}</p>
            <p className="requestData_date">{buyer?.company_name}</p>
          </div>
          <div className="requestDate_tab">
            <p className="requestData_p">{t("Email")}</p>
            <p className="requestData_date">{buyer?.email}</p>
          </div>
          <div className="requestDate_tab">
            <p className="requestData_p">{t("Full address")}</p>
            <p className="requestData_date">{buyer?.address}</p>
          </div>
        </div>
        <div className="InformationTab_col">
          <div className="requestDate_tab">
            <p className="requestData_p">{t("Country")}</p>
            <p className="requestData_date">{t(buyer?.country?.name)}</p>
          </div>
          <div className="requestDate_tab">
            <p className="requestData_p">{t("Telephone")}</p>
            <p className="requestData_date">{buyer?.phone_number}</p>
          </div>
          <div className="requestDate_tab" style={{ display: "flex" }}>
            <div className="SellerTab_postalAndTown">
              <p className="requestData_p">{t("Code postal")}</p>
              <p className="requestData_date">{buyer?.zipcode}</p>
            </div>
            <div className="SellerTab_div SellerTab_postalAndTown">
              <p className="requestData_p ">{t("Town")}</p>
              <p className="requestData_date">{buyer?.city}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerTab;
