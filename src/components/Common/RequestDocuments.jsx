import React from "react";
import EzxportIcon from "../../assets/EzxportIcon.svg";
import SendIcon from "../../assets/SendIcon.svg";
import { useHistory } from "react-router-dom";
import Button from "./Button";
import { useTranslation } from "react-i18next";

const RequestDocuments = () => {
  const {t} = useTranslation();
  const history = useHistory(null);
  const handleReturn = () => {
    history.push("/Admin/Dashboard/Requests");
  };
  return (
    <>
      <div className="SendDocuments_main">
        <div className="Reference_logo_div">
          <img src={EzxportIcon} alt="" className="header_center_div" />
        </div>
        <div className="SendDocuments_second">
          <img src={SendIcon} alt="" className="SendDocuments_img" />
          <p className="SendDocuments_P">
            {t("We asked")} <span style={{ fontWeight: "bold" }}>{t("the missing documents")} </span>
            {t("to the company")}
          </p>
          <Button text={t("Return to Requests")} onClick={handleReturn} className="return_btn" />
        </div>
      </div>
    </>
  );
};

export default RequestDocuments;
