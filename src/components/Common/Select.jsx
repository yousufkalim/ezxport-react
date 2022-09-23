import React from "react";
import { useTranslation } from "react-i18next";

const Select = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <select
        defaultValue={props.defaultValue}
        name={props.name}
        className={props.className}
        onChange={props.onChange}
      >
        <option value={true}>{t("Not subject")}</option>
        <option value={false}>{t("Subject to inspection")}</option>
      </select>
    </>
  );
};

export default Select;
