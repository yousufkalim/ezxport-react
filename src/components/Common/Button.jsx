import React from "react";
import { useTranslation, Trans } from "react-i18next";

const Button = (props) => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <button
        className={`${props.className} primary-button`}
        onClick={props.onClick}
        type="button"
        disabled={props.disabled}
      >
        <img src={props.Imgsrc} alt="" />
        &nbsp;
        {t(props.text)}
      </button>
    </>
  );
};

export default Button;
