import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import ClearIcon from "@mui/icons-material/Clear";
import FormControl from "@mui/material/FormControl";
import MultiSelect from "../../components/Common/MultiSelect";
import API from "../../api/index";
import { useTranslation } from "react-i18next";
import toaster from "../../utils/toaster";


import { validate } from "validate.js";
import InputField from "../Common/InputField";


const schema = {
  firstName: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },
  lastName: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },
  email: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 64 },
    email: true,
  }
};



const ProvidersModal = ({ open, setOpen, data, getProviders, isEdit }) => {
  const [formData, setFormData] = useState({
    isValid: false,
   values: {
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    countries: [],
   },
   errors: {},
   touched: {}
  });
  const [allCountries, setAllCountries] = useState([]);
  const [countryNames, setCountryNames] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    fetchCountries();
  }, []);


  useEffect(() => {
    const errors = validate(formData.values, schema);
    setFormData((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formData.values, setFormData]);

  useEffect(() => {
    if (data) {
      const count = data?.countries
        ?.map((item) => allCountries.find((country) => country?._id === item))
        .map((c) => c?.name);
      const splitName = data?.name?.split(" ");
      setFormData({...formData, values: {...formData.values,
        name: data.name,
        firstName: splitName[0],
        lastName: splitName[1],
        email: data?.sending_email,
        countries: count,
      }});
    }
  }, [data]);

  const fetchCountries = async () => {
    await API("get", "/countries")
      .then((res) => {
        let country_name = [];
        setAllCountries(res?.data?.countries);
        res?.data?.countries?.map((item) => {
          country_name.push(item.name);
        });
        setCountryNames(country_name);
      })
      .catch((err) => {
        toaster("Failed", "Something went wrong!");
      });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, values: {...formData.values, [name]: value }, touched: {...formData.touched, [name]: true}});
  };

  const handleChangeCountry = (e) => {
    const {
      target: { value },
    } = e;

    setFormData({ ...formData, values: {...formData.values, countries: typeof value === "string" ? value.split(",") : value}, touched: {...formData.touched, country: true} });
  };

  const trimName = (item) => {
    return item ? item?.trim() : "";
  };

  const getEditData = () => {
    const { firstName, lastName, email, countries } = formData.values;
    const { contact_email, phone_number } = data;
    const countryIds = countries
      ?.map((item) => allCountries.find((el) => el.name === item))
      .map((country) => country._id);
    const fname = trimName(firstName);
    const lname = trimName(lastName);
    const name = fname.concat(` ${lname}`);
    const obj = {
      name,
      countries: countryIds,
      sending_email: email,
      contact_email: contact_email,
      phone_number: phone_number,
    };

    return obj;
  };

  const editProvider = async (e) => {
    e.preventDefault();
    const editData = getEditData();
    await API("put", `/vendors/${data._id}`, editData)
      .then((res) => {
        toaster("success", "User created successfully");

        getProviders();
        setOpen(false);
      })
      .catch((err) => {
        toaster("Failed", "Something went wrong!");
      });
  };

  const hasError = (field) => (formData.touched[field] && formData.errors[field] ? true : false);

  const {values, errors} = formData;

  return (
    <>
      <div className="ApPlus_popup">
        <Dialog open={open} onClose={handleClose} fullWidth>
          <div className="ApPlus_popup_form">
            <div className="ApPlus_popup_ha">
              <h3 className="ApPlus_popup_h2">{values.name}</h3>
              <ClearIcon onClick={handleClose} style={{ cursor: "pointer" }} />
            </div>
            {/* inputs  */}
            <div className="buyer_socond">
              <div className="luyer_input_field">
                <FormControl fullWidth>
                  <label htmlFor="" className="buyer_label">
                    {t("Associated countries")}
                  </label>
                  <MultiSelect
                    disabled={!isEdit}
                    name="country"
                    onChange={(e) => handleChangeCountry(e)}
                    value={values?.countries ?? []}
                    names={countryNames}
                    select={values?.countries}
                  />
                </FormControl>
              </div>
              <div className="luyer_input_field">
                <div className="second_input_field">
                  <div className="input_fields">
                    <InputField
                      disabled={!isEdit}
                      label="First name"
                      name="firstName"
                      error={errors.firstName}
                      isError={hasError('firstName')}
                      onChange={(e) => handleChange(e)}
                      value={values?.firstName}
                      type="text"
                      className="buyer_input"
                      placeholder={t("First name")}
                    />
                  </div>
                  <div className="input_fields">
                    <InputField
                      disabled={!isEdit}
                      name="lastName"
                      label="Last name"
                      error={errors.lastName}
                      isError={hasError('lastName')}
                      onChange={(e) => handleChange(e)}
                      value={values?.lastName}
                      type="text"
                      className="buyer_input"
                      placeholder={t("First name")}
                    />
                  </div>
                </div>
                <div className="luyer_input_field">
                  <InputField
                    label="E-mail address"
                    disabled={!isEdit}
                    name="email"
                    error={errors.email}
                      isError={hasError('email')}
                    onChange={(e) => handleChange(e)}
                    value={values?.email}
                    type="email"
                    className="buyer_input"
                    placeholder={t("E-mail address")}
                  />
                </div>
              </div>
              {isEdit && (
                <button onClick={(e) => editProvider(e)} className="luyer_button">
                  {t("To Confirm")}
                </button>
              )}
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default ProvidersModal;
