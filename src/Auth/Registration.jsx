import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import { Link, useHistory } from "react-router-dom";
import BackArrow from "../assets/BackArrow.svg";
import API from "../api";
import Button from "../components/Common/Button";
import validate from "validate.js";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputField from "../components/Common/InputField";
import { useTranslation, i18n } from "react-i18next";
import toaster from "../utils/toaster";

const schema = {
  firstName: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32,
    },
  },
  lastName: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32,
    },
  },
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64,
    },
  },
  phone: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 10,
      minimum: 10,
    },
  },
  fullAddress: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },
  postelCode: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 5,
      minimum: 5,
    },
  },
  town: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32,
    },
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      minimum: 6,
      maximum: 32,
    },
  },
  confirmPassword: {
    presence: { allowEmpty: false, message: "is required" },
    equality: {
      attribute: "password",
      message: "is not same as password",
    },
  },
  companyLastName: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32,
    },
  },
  typeOfSociety: {
    presence: { allowEmpty: false, message: "is required" },
  },
  vatNumber: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      minimum: 13,
      maximum: 13,
    },
  },
};

const Registration = () => {
  const history = useHistory();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      fullAddress: "",
      postelCode: "",
      town: "",
      password: "",
      confirmPassword: "",
      companyLastName: "",
      typeOfSociety: "default",
      vatNumber: "",
    },
    touched: {},
    errors: {},
  });

  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [name]: value,
      },
      touched: { ...formState.touched, [name]: true },
    }));
  };

  // handle change for phone number
  const handlePhnChange = (event) => {
    const {name, value} = event.target;
    if (!value.match(/[^0-9]/)) {
      setFormState((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          [name]: value,
        },
        touched: { ...formState.touched, [name]: true },
      }));
    }
  };
  const handleNameChange = (event) => {
    const {name, value} = event.target;
    if (!value.match(/[^a-zA-Z0-9]/)) {
      setFormState((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          [name]: value,
        },
        touched: { ...formState.touched, [name]: true },
      }));
    }
  };
  const handleSubmit = async () => {
    await API("post", "/users/", {
      first_name: formState.values.firstName,
      last_name: formState.values.lastName,
      email: formState.values.email,
      password: formState.values.password,
      confirm_password: formState.values.confirmPassword,
      phone_number: formState.values.phone,
      address: formState.values.fullAddress,
      city: formState.values.town,
      zipcode: formState.values.postelCode,
      company: {
        name: formState.values.companyLastName,
        type: formState.values.typeOfSociety,
        vat: formState.values.vatNumber,
      },
    })
      .then(() => {
        toaster("success", t("User created successfully"), t("Createed User"));

        history.push("/");
      })
      .catch((err) => {
        toaster("Failed", t(err.response.data.message));
      });
  };

  const hasError = (field) => (formState.touched[field] && formState.errors[field] ? true : false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <>
      <Header />
      <div className="login_mainDiv">
        <div className="backArrow_div">
          <Link to="/">
            <img src={BackArrow} alt="back" className="backArrow" />
          </Link>
        </div>
        <form autoComplete="off" className="registration_div">
          {/* first input fields  */}
          <h2 className="user_info">{t("User information")}</h2>
          <div className="regist_form">
            <div className="regist_input_div">
              <div className="regist_col1">
                <InputField
                  label={t("Last name")}
                  type="text"
                  placeholder={t("Last name")}
                  value={formState.values.lastName}
                  name="lastName"
                  isError={hasError("lastName")}
                  error={formState.errors.lastName}
                  onChange={handleNameChange}
                />
              </div>
              <div className="regist_col1">
                <InputField
                  type="text"
                  label={t("First name")}
                  placeholder={t("First name")}
                  required
                  value={formState.values.firstName}
                  isError={hasError("firstName")}
                  error={formState.errors.firstName}
                  name="firstName"
                  onChange={handleNameChange}
                />
              </div>
            </div>
            <div className="regist_input_div">
              <div className="regist_col1">
                <InputField
                  type="text"
                  label={t("E-mail address")}
                  placeholder="mail@mail.com"
                  required
                  isError={hasError("email")}
                  error={formState.errors.email}
                  value={formState.values.email}
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="regist_col1">
                <InputField
                  label={t("Telephone")}
                  type="number"
                  isError={hasError("phone")}
                  error={formState.errors.phone}
                  placeholder="33 07 86 36 02 20"
                  required
                  value={formState.values.phone}
                  name="phone"
                  onChange={handlePhnChange}
                />
              </div>
            </div>
            <div className="regist_input_div">
              <div className="regist_col1">
                <label htmlFor="">{t("Full address")}</label>
                <input
                  type="text"
                  className={
                    hasError("fullAddress") && formState.errors.fullAddress
                      ? "reg_input_red"
                      : "reg_input"
                  }
                  placeholder="90 road of rouvroy"
                  required
                  value={formState.values.fullAddress}
                  name="fullAddress"
                  onChange={handleChange}
                />
                <div className="error-format">
                  {hasError("fullAddress") && formState.errors.fullAddress}
                </div>
              </div>
              <div className="regist_col2">
                <div className="city_inputs">
                  <label htmlFor="">{t("Postal code")}</label>
                  <input
                    type="string"
                    className={
                      hasError("postelCode") && formState.errors.postelCode
                        ? "reg_input_red2"
                        : "reg_input2"
                    }
                    placeholder="80100"
                    required
                    value={formState.values.postelCode}
                    name="postelCode"
                    onChange={handlePhnChange}
                  />
                  <div className="error-format">
                    {hasError("postelCode") ? formState.errors.postelCode[0] : null}
                  </div>
                </div>
                <div className="city_inputs2">
                  <label htmlFor="">{t("Town")}</label>
                  <input
                    type="text"
                    className={
                      hasError("town") && formState.errors.town ? "reg_input_red3" : "reg_input3"
                    }
                    placeholder="Abbeville"
                    required
                    value={formState.values.town}
                    name="town"
                    onChange={(e) => handleChange(e)}
                  />
                  <div className="error-format">{hasError("town") && formState.errors.town}</div>
                </div>
                {/* <div className="city_inputs2">
                  <InputField
                    type="text"
                    label="Town"
                    isError={hasError("town")}
                    error={formState.errors.town}
                    placeholder="Abbeville"
                    required
                    value={formState.values.town}
                    name="town"
                    onChange={handleChange}
                  />
                </div> */}
              </div>
            </div>
            <div className="regist_input_div">
              <div className="regist_col1">
                <InputField
                  label={t("Password")}
                  isError={hasError("password")}
                  error={formState.errors.password}
                  name="password"
                  autoComplete="new-password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("Password")}
                  onChange={(e) => handleChange(e)}
                  value={formState.values.password}
                  visibleEye
                  icon2={showPassword ? VisibilityIcon : VisibilityOffIcon}
                  onClick={handleShowPassword}
                />
              </div>
              <div className="regist_col1">
                <InputField
                  type={showConfirmPassword ? "text" : "password"}
                  label={t("Confirming your password")}
                  isError={hasError("confirmPassword")}
                  error={formState.errors.confirmPassword}
                  placeholder={t("Confirm password")}
                  required
                  autoComplete={false}
                  value={formState.values.confirmPassword}
                  name="confirmPassword"
                  onChange={handleChange}
                  visibleEye
                  icon2={showConfirmPassword ? VisibilityIcon : VisibilityOffIcon}
                  onClick={handleShowConfirmPassword}
                />
              </div>
            </div>
          </div>
          {/* second input fields  */}
          <h2 className="user_info">{t("Company information")}</h2>
          {/* ///  */}
          <div className="regist_form">
            <div className="regist_input_div">
              <div className="regist_col1">
              <label htmlFor="">{t("Last name")}</label>
                <InputField
                  type="text"
                  className={
                    hasError("companyLastName") && formState.errors.companyLastName
                      ? "reg_input_red"
                      : "reg_input"
                  }
                  placeholder={t("Last name")}
                  required
                  value={formState.values.companyLastName}
                  name="companyLastName"
                  onChange={handleNameChange}
                />
                <div className="error-format">
                  {hasError("companyLastName") ? formState.errors.companyLastName[0] : null}
                </div>
              </div>
              <div className="regist_col1">
                <label htmlFor="">{t("Type of society")}</label>
                <select
                  name="typeOfSociety"
                  id=""
                  className="reg_input"
                  defaultValue={"default"}
                  onChange={handleChange}
                  value={formState.values.typeOfSociety}
                >
                  <option disabled value="default">
                    {t("Select your type")}
                  </option>
                  <option value="1">Type 1</option>
                  <option value="2">Type 2</option>
                  <option value="3">Type 3</option>
                  <option value="4">Type 4</option>
                  <option value="5">Type 5</option>
                </select>
                <div className="error-format">
                  {hasError("typeOfSociety") && formState.touched.typeOfSociety
                    ? formState.errors.typeOfSociety[0]
                    : null}
                </div>
              </div>
            </div>
            <div className="regist_input_div">
              <div className="regist_col1">
                <InputField
                  type="text"
                  label="VAT number"
                  isError={hasError("vatNumber")}
                  error={formState.errors.vatNumber}
                  placeholder="6372890367849"
                  required
                  value={formState.values.vatNumber.toUpperCase()}
                  name="vatNumber"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          {/* ///  */}
          <div div className="btn_div">
            <Button
              className={
                formState.isValid && formState.values.typeOfSociety != "default"
                  ? "register_fm"
                  : "register_fm_disabled"
              }
              onClick={(e) => handleSubmit(e)}
              text={t("Register")}
              disabled={
                !formState.isValid || formState.values.typeOfSociety === "default" ? true : false
              }
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;
