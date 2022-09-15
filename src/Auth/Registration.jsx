import React, { useState, useEffect } from "react";
import Header from "../components/Common/Header";
import { Link, useHistory } from "react-router-dom";
import BackArrow from "../assets/BackArrow.svg";
import API from "../api";
import { toast } from "react-toastify";
import Button from "../components/Common/Button";
import validate from "validate.js";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputField from "../components/Common/InputField";
import { useTranslation, Trans } from "react-i18next";

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
    equality: "password",
  },
  companyLastName: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32,
    },
  },
  vatNumber: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      minimum: 8,
      maximum: 8,
    },
  },
};

const Registration = () => {
  const history = useHistory();

  // const [form, setForm] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   phone: "",
  //   fullAddress: "",
  //   postelCode: "",
  //   town: "",
  //   password: "",
  //   confirmPassword: "",
  //   companyLastName: "",
  //   typeOfSociety: "",
  //   vatNumber: "",
  // });

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { t, i18n } = useTranslation();
  const { language } = i18n;

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = (event) => {
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  // handle change for phone number
  const handlePhnChange = (event) => {
    if (!event.target.value.match(/[^0-9]/)) {
      setFormState((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          [event.target.name]: event.target.value,
        },
        touched: {
          ...formState.touched,
          [event.target.name]: true,
        },
      }));
    }
  };
  const handleNameChange = (event) => {
    if (!event.target.value.match(/[^a-zA-Z0-9]/)) {
      setFormState((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          [event.target.name]: event.target.value,
        },
        touched: {
          ...formState.touched,
          [event.target.name]: true,
        },
      }));
    }
  };
  // const handleFormData = (name, value) => {
  //   setForm({ ...form, [name]: value });
  // };
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
        toast.success("User created successfully");
        history.push("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
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
        <div className="registration_div">
          {/* first input fields  */}
          <h2 className="user_info">User information</h2>
          <div className="regist_form">
            <div className="regist_input_div">
              <div className="regist_col1">
                <label htmlFor="">Last name</label>
                <input
                  type="text"
                  className={
                    hasError("lastName") && formState.errors.lastName
                      ? "reg_input_red"
                      : "reg_input"
                  }
                  placeholder="Last name"
                  value={formState.values.lastName}
                  name="lastName"
                  onChange={handleNameChange}
                />
                <div className="error-format">
                  {hasError("lastName") ? formState.errors.lastName[0] : null}
                </div>
              </div>
              <div className="regist_col1">
                <label htmlFor="firstName">{t("First name")}</label>
                <input
                  type="text"
                  className={
                    hasError("firstName") && formState.errors.firstName
                      ? "reg_input_red"
                      : "reg_input"
                  }
                  placeholder={t("First name")}
                  required
                  value={formState.values.firstName}
                  name="firstName"
                  onChange={handleNameChange}
                />
                <div className="error-format">
                  {hasError("firstName") ? formState.errors.firstName[0] : null}
                </div>
              </div>
            </div>
            <div className="regist_input_div">
              <div className="regist_col1">
                <label htmlFor="">E-mail address</label>
                <input
                  type="text"
                  className={
                    hasError("email") && formState.errors.email ? "reg_input_red" : "reg_input"
                  }
                  placeholder="mail@mail.com"
                  required
                  value={formState.values.email}
                  name="email"
                  onChange={handleChange}
                />
                <div className="error-format">
                  {hasError("email") ? formState.errors.email[0] : null}
                </div>
              </div>
              <div className="regist_col1">
                <label htmlFor="">{t("Telephone")}</label>
                <input
                  type="string"
                  className={
                    hasError("phone") && formState.errors.phone ? "reg_input_red" : "reg_input"
                  }
                  placeholder="33 07 86 36 02 20"
                  required
                  value={formState.values.phone}
                  name="phone"
                  onChange={handlePhnChange}
                />
                <div className="error-format">
                  {hasError("phone") ? formState.errors.phone[0] : null}
                </div>
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
                  <label htmlFor="">Code postal</label>
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
                    onChange={handleChange}
                  />
                  <div className="error-format">{hasError("town") && formState.errors.town}</div>
                </div>
              </div>
            </div>
            <div className="regist_input_div">
              <div className="regist_col1">
                <label htmlFor="">Password</label>
                <InputField
                  className={
                    hasError("password") && formState.errors.password
                      ? "reg_input_red"
                      : "reg_input"
                  }
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleChange}
                  value={formState.values.password}
                  visibleEye
                  icon2={showPassword ? VisibilityIcon : VisibilityOffIcon}
                  onClick={handleShowPassword}
                />
                <div className="error-format">
                  {hasError("password") ? formState.errors.password[0] : null}
                </div>
              </div>
              <div className="regist_col1">
                <label htmlFor="">Confirming your password</label>
                <InputField
                  type={showConfirmPassword ? "text" : "password"}
                  className={
                    hasError("confirmPassword") && formState.errors.confirmPassword
                      ? "reg_input_red"
                      : "reg_input"
                  }
                  placeholder="Confirm password"
                  required
                  value={formState.values.confirmPassword}
                  name="confirmPassword"
                  onChange={handleChange}
                  visibleEye
                  icon2={showConfirmPassword ? VisibilityIcon : VisibilityOffIcon}
                  onClick={handleShowConfirmPassword}
                />
                <div className="error-format">
                  {hasError("confirmPassword") ? formState.errors.confirmPassword[0] : null}
                </div>
              </div>
            </div>
          </div>
          {/* second input fields  */}
          <h2 className="user_info">{t("Company information")}</h2>
          {/* ///  */}
          <div className="regist_form">
            <div className="regist_input_div">
              <div className="regist_col1">
                <label htmlFor="">Last name</label>
                <input
                  type="text"
                  className={
                    hasError("companyLastName") && formState.errors.companyLastName
                      ? "reg_input_red"
                      : "reg_input"
                  }
                  placeholder="Last name"
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
                    Select your type
                  </option>
                  <option value="1">Type 1</option>
                  <option value="2">Type 2</option>
                  <option value="3">Type 3</option>
                  <option value="4">Type 4</option>
                  <option value="5">Type 5</option>
                </select>
              </div>
            </div>
            {/* {console.log("ts", formState.values.typeOfSociety)} */}
            <div className="regist_input_div">
              <div className="regist_col1">
                <label htmlFor="">{t("VAT number")}</label>
                <input
                  type="text"
                  className={
                    hasError("vatNumber") && formState.errors.vatNumber
                      ? "reg_input_red"
                      : "reg_input"
                  }
                  placeholder="VAT number"
                  required
                  value={formState.values.vatNumber.toUpperCase()}
                  name="vatNumber"
                  onChange={handleChange}
                />
                <div className="error-format">
                  {hasError("vatNumber") ? formState.errors.vatNumber[0] : null}
                </div>
              </div>
            </div>
          </div>
          {/* ///  */}
          <div className="btn_div">
            <Button
              className={
                formState.isValid && formState.values.typeOfSociety != "default"
                  ? "register_fm"
                  : "register_fm_disabled"
              }
              onClick={handleSubmit}
              text="Register"
              disabled={
                !formState.isValid || formState.values.typeOfSociety === "default" ? true : false
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
