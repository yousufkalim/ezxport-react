import React from "react";
import { ReactComponent as Arrow } from "../../assets/arrow.svg";
import { useTranslation, Trans } from "react-i18next";

const ValidateButton = (props) => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  return (
    <>
      <div className="import_dcuments">
        <p className="ExportDocuments_p">{props.text}</p>
        {props.text1 && <div className={props.className} onClick={props.onClick} style={{ cursor: "pointer" }}>
          <p >{t(props.text1)} <Arrow /> </p>
        </div>}


      </div>
    </>
  );
};

export default ValidateButton;
