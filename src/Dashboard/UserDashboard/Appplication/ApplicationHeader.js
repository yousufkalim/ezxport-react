import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ApplicationHeader = (props) => {
  const { t } = useTranslation();
  return (
    <div>
      <div className="List_heading_div">
        <p className="list_h1_app">
          <Link to="/User/Dashboard/ListOfRequests" style={{ textDecoration: "none" }}>
            <ArrowBackIcon className="leftArrowIcon" />
          </Link>
          &nbsp; {t(props.title)}

          {props?.status === "Sent" ? (
            <p className="send_p2">{t(props?.status)}</p>
          ) : props?.status === "Missing documents" ? (
            <p className="send_p4">{t(props?.status)}</p>
          ) : props?.status === "Validated" ? (
            <p className="send_p3">{t(props?.status)}</p>
          ) : props?.status === "Being checked by an expert" ? (
            <p className="send_p6">{t(props?.status)}</p>
          ) : props?.status === "Documents to be checked"
            ? (
              <p className="send_p3">{t(props?.status)}</p>
            ) : "--"}
        </p>
      </div>
    </div>
  );
};

export default ApplicationHeader;
