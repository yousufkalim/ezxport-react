import React from "react";
import { Link } from "react-router-dom";
import Form from "./RequestForms/Form";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation, Trans } from "react-i18next";

const RequestForm = () => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "space-between" }}>
      <div className="left_back_side">
        <Link to="/User/Dashboard/ListOfRequests" style={{ textDecoration: "none" }}>
          <p className="return_back">{t("Return to Dashboard")}</p>
          <ArrowBackIcon className="leftArrowIcon back_dashboard" />
        </Link>
      </div>
      <div className="rqst_form_div">
        <Form />
      </div>
    </div>
  );
};

export default RequestForm;
