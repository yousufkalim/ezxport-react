import React, { useState, useEffect } from "react";
import LoginIcon from "../assets/LoginIcon.svg";
import { Link } from "react-router-dom";
import Header from "../components/Common/Header";
import API from "../api/index";
import { toast } from "react-toastify";
import InputField from "../components/Common/InputField";
import Button from "../components/Common/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import validate from "validate.js";
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
  // ts@admin.com
  // 12345678
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

  //checks which field is selected
  const handleChange = (event) => {
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value,
      }
    }));
  };
  const handleLoggin = async () => {
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
        toast.error(err.response.data.message);
      });
  };

  const handleBlur = (e) => {
    e.preventDefault();
    const {name} = e.target;
    const errors = validate(formState.values, schema);
    console.log("Errors ", errors );
    console.log("Lastest state  ", formState);
    setFormState((formState) => ({
      ...formState,
      errors: errors ?? {},
      touched: {...formState.touched, [name]: true},
      isValid: errors ? false : true

    }))
  }

  console.log("Formm state ", formState);

  const handleShowPassword = () => setShowPassword(!showPassword);

  //checks error in the selected field
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;
  return (
    <>
      <Header />
      <div className="login_mainDiv">
        <form autoComplete="off" className="loginCenterDiv">
          {/* HEADING  */}
          <div className="login_icon_div">
            <img src={LoginIcon} alt="" className="login_icons" />
            <h2 className="login_h2">Login</h2>
          </div>
          {/* LOGIN INPUTS  */}
          <div className="email_inputs_div">
            <InputField
              label="E-mail address"
              isError={hasError("email")}
              error={formState.errors.email}
              name="email"
              onBlur={(e) => handleBlur(e)}
              // role="presentation" 
              autoComplete="off"
              type="text"
              placeholder="mail@mail.com"
              value={formState.values.email}
              onChange={(e) =>handleChange(e)}
            />
          </div>
          {/* PASSWORD  */}
          <div className="email_inputs_div">
            <InputField
              label="Password"
              isError={hasError("password")}
              error={formState.errors.password}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onBlur={(e) => handleBlur(e)}
              onChange={(e) => handleChange(e)}
              autoComplete="newPassword"
              value={formState.values.password}
              visibleEye
              icon2={showPassword ? VisibilityIcon : VisibilityOffIcon}
              onClick={() => handleShowPassword()}
            />
            <div className="forgot_p-div">
              <Link to="/forgetpassword" className="forgot_p">
                Forgot your password ?
              </Link>
            </div>
          </div>
          <Button
            className={formState.isValid ? "logingbtn" : "logingbtn_disabled"}
            onClick={handleLoggin}
            text="To log in"
            disabled={!formState.isValid ? true : false}
          />
          {console.log(
            "🚀 ~ file: Login.jsx ~ line 161 ~ Login ~ formState.isValid",
            formState.isValid
          )}{" "}
          <div className="register-div">
            <Link to="/registration" className="regBtn">
              Register
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
