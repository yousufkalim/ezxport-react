import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useTranslation } from "react-i18next";
import { mediaUrl } from "../../config";

const SwitchButton = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="Switches">
        <p className="switch_p">{props.text}</p>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start",flexDirection:"column" }}>
          {props?.item?.url?.map((item, index) => {
            var filename = item.split("-").slice(-3).reverse().pop();
            return (
              <a className="switch_p2" style={{ marginLeft: index !== 0 ? "5px" : "none", textDecoration: "none" }} target="_blank" href={`${mediaUrl}${item}`}>
                {filename}
              </a>
            );
          })}
        </div>
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
