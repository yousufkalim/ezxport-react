import React from "react";
import Spinner from "../../../../components/Common/Spinner";
import InputField from "../../../../components/Common/InputField";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useTranslation, Trans } from "react-i18next";

const societyType = [
  {
    name: "Test",
  },
  {
    name: "testing",
  },
  {
    name: "IT",
  },
  {
    name: "4",
  },
];

const CompanyInformation = ({ formData, setFormData, loading }) => {
  const companyTypeHandler = (e) => {
    setFormData({ ...formData, type: e.target.value });
  };

  const { t, i18n } = useTranslation();
  const { language } = i18n;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div>
        <div className="company_input_div">
          <div className="company_input_col">
            <label className="email_input_label" htmlFor="">
              {t("Last name")}
            </label>
            <InputField
              value={formData.name}
              name="name"
              onChange={(e) => handleChange(e)}
              type="text"
              className="company_input"
              placeholder={t("Last name")}
            />
          </div>
          <div className="company_input_society">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                {t("Type of society")}
              </label>
              <Select
                id="demo-simple-select"
                name="type"
                value={formData.type}
                onChange={(e) => companyTypeHandler(e)}
                className="buyer_input"
              >
                {societyType?.map(({ name }) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="company_input_div">
          <div className="company_input_col">
            <label className="email_input_label" htmlFor="">
              {t("VAT number")}
            </label>
            <InputField
              value={formData.vat}
              name="vat"
              onChange={(e) => handleChange(e)}
              type="text"
              className="company_input"
              placeholder="6372890367849"
            />
          </div>
        </div>
      </div>
    );
  }
};

export default CompanyInformation;
