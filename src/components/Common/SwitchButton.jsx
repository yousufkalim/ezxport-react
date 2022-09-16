import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useTranslation, Trans } from "react-i18next";

const SwitchButton = (props) => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  return (
    <>
      <div className="Switches">
        <p className="switch_p">{props.text}</p>
        {props?.item?.url?.map((item) => {
          var filename = item.split("-").slice(-3).reverse().pop();
          return <p className="switch_p2">{filename}</p>;
        })}
        {props.pdfText} &nbsp; {props.pdfText2}
        <FormControlLabel
          name={props.name}
          onChange={props.onChange}
          checked={props.checked}
          control={<Switch color="secondary" />}
          label={t(props.label)}
          labelPlacement="Valid"
          value={props.value}
        />
      </div>
    </>
  );
};

export default SwitchButton;
