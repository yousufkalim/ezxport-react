import React from "react";
import { useTranslation } from "react-i18next";

const Button = (props) => {
  const { t } = useTranslation();

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
