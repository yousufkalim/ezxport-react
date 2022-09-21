import React, { useEffect, useState } from "react";
import SearchField from "../../../components/Common/SearchField";
import TabMenu from "./TabMenu";
import Button from "../../../components/Common/Button";
import TitleDownArrow from "../../../assets/TitleDownArrow.svg";
import { useTranslation } from "react-i18next";

const title = [
  { heading: "Company name", sortIcon: true, key: "company_name", imgSrc: TitleDownArrow },
  { heading: "Country" },
  { heading: "E-mail address" },
  { heading: "Telephone" },
  { heading: "Address" },
  { heading: "" },
];

const schema = {
  companyName: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },
  email: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 64 },
    email: true,
  },
  telephone: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 10, minimum: 10 },
  },
};

const AddressBook = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const { t, i18n } = useTranslation();
  const { language } = i18n;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const buttonTitle = value === 0 ? "Add buyer" : value === 1 ? "Add seller" : "Add location";

  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          {/* list head  */}
          <div className="List_heading_div4">
            <h1 className="list_h1_address">{t("Address Book")}</h1>
            <div className="searching5">
              <SearchField placeholder={t("Searching")} />
              <Button text={t("Add")} className="list_reqst_btn3" onClick={handleClickOpen} />
            </div>
          </div>
          {/* list table   */}
          <div className="list_table">
            <TabMenu
              t={t}
              handleChange={handleChange}
              value={value}
              setOpen={setOpen}
              open={open}
              title={t("title")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressBook;
