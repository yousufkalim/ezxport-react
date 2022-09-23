import React from "react";
import InputField from "../../../../components/Common/InputField";
import { useTranslation } from "react-i18next";

const UserInformation = () => {
  const { t } = useTranslation();
  const userData = localStorage.getItem("userData");
  const user = JSON.parse(userData);

  return (
    <div className="emailAddress_div">
      <label className="email_input_label" htmlFor="">
        {t("E-mail address")}
      </label>
      <InputField
        disabled
        value={user.email}
        type="text"
        className="email_input"
        placeholder="mail@mail.com"
      />
    </div>
  );
};

export default UserInformation;
