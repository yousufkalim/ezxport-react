import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

const ApplicationHeader = (props) => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  return (
    <div>
      <div className="List_heading_div">
        <p className="list_h1_app">
          <Link to="/User/Dashboard/ListOfRequests" style={{ textDecoration: "none" }}>
            <ArrowBackIcon className="leftArrowIcon" />
          </Link>
          &nbsp; {t(props.title)}
          {props.status === "sent" ? (
            <p className="send_p2">{t("Sent")}</p>
          ) : props.status === "Validate By Admin" || props.status === "Validated" ? (
            <p className="send_p5">File validated</p>
          ) : props.status === "missing documents" || props.status === "Missing Documents" ? (
            <p className="send_p4">{t("Missing documents")}</p>
          ) : props.status === "Benig Checked By Expert" ? (
            <p className="send_p3">Receipt being processed</p>
          ) : (
            <p className="send_p6">Contract to be signed</p>
          )}
        </p>
      </div>
    </div>
  );
};

export default ApplicationHeader;
