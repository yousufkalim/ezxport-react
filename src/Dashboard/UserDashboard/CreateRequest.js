import React from "react";
import RequestIcon from "../../assets/RequestIcon.svg";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

const CreateRequest = () => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;

  return (
    <>
      <div className="CreateRequest">
        <div className="CreateRequest_center">
          <img src={RequestIcon} alt="" className="create_request_icon" />
          <p className="create_request_title">{t("Follow-up of requests")}</p>
          <p className="create_request_p">
            {t("Make your first certification request on Ezxport")}
          </p>
          <Link to="/User/RequestForm">
            <button className="create_request_btn">{t("Create a first request")}</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CreateRequest;
