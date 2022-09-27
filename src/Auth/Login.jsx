import React, { useState, useEffect } from "react";
import LoginIcon from "../assets/LoginIcon.svg";
import { Link } from "react-router-dom";
import Header from "../components/Common/Header";
import API from "../api/index";
import InputField from "../components/Common/InputField";
import Button from "../components/Common/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import validate from "validate.js";
import { useTranslation } from "react-i18next";
import toaster from "../utils/toaster";

const schema = {
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      minimum: 6,
    },
  },
};
const Login = () => {
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      email: "",
      password: "",
    },
    touched: {},
    errors: {},
  });
  const [showPassword, setShowPassword] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [name]: value,
      },
      touched: { ...formState.touched, [name]: true },
    }));
  };
  const handleLoggin = async () => {
    try {
      await API("post", "/auth/login", {
        email: formState.values.email,
        password: formState.values.password,
      })
        .then((res) => {
          if (res?.data?.role === "user") {
            localStorage.setItem("userData", JSON.stringify(res.data.user));
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", JSON.stringify(res.data.role));
            window.location = "/User/Dashboard/ListOfRequests";
          } else if (res?.data?.role === "admin") {
            localStorage.setItem("userData", JSON.stringify(res.data.admin));
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", JSON.stringify(res.data.role));

            window.location = "/admin/Dashboard/Country";
          }
        })
        .catch((err) => {
          toaster("Failed", t("Email or password is incorrect"));
        });
    } catch (err) {
      toaster("Failed", t("Something went wrong"));
    }
  };

  const handleShowPassword = () => setShowPassword(!showPassword);
  const hasError = (field) => (formState.touched[field] && formState.errors[field] ? true : false);

  return (
    <>
      <Header />
      <div className="login_mainDiv">
        <form autoComplete="off" className="loginCenterDiv">
          {/* HEADING  */}
          <div className="login_icon_div">
            <img src={LoginIcon} alt="" className="login_icons" />
            <h2 className="login_h2">{t("Login")}</h2>
          </div>
          {/* LOGIN INPUTS  */}
          <div className="email_inputs_div">
            <InputField
              label={t("E-mail address")}
              isError={hasError("email")}
              error={[t(formState.errors.email)]}
              name="email"
              // role="presentation"
              autoComplete="off"
              type="text"
              placeholder={t("E-mail address")}
              value={formState.values.email}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <br />
          {/* PASSWORD  */}
          <div className="email_inputs_div">
            <InputField
              label={t("Password")}
              isError={hasError("password")}
              error={[t(formState.errors.password)]}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder={t("Password")}
              onChange={(e) => handleChange(e)}
              autoComplete="newPassword"
              value={formState.values.password}
              visibleEye
              icon2={showPassword ? VisibilityIcon : VisibilityOffIcon}
              onClick={() => handleShowPassword()}
            />
            <div className="forgot_p-div">
              <Link to="/forgetpassword" className="forgot_p">
                {t("Forgot your password ?")}
              </Link>
            </div>
          </div>
          <Button
            className={formState.isValid ? "logingbtn" : "logingbtn_disabled"}
            onClick={handleLoggin}
            text={t("To log in")}
            disabled={!formState.isValid ? true : false}
          />
          <div className="register-div">
            <Link to="/registration" className="regBtn">
              {t("Register")}
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
