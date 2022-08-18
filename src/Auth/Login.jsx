import React, { useState } from "react";
import LoginIcon from "../assets/LoginIcon.svg";
import Quiz from "../assets/Quiz.png";
import { Link } from "react-router-dom";
import Header from "../components/Common/Header";
import API from "../api/index";
import { toast } from "react-toastify";
import InputField from "../components/Common/InputField";
import Button from "../components/Common/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  // ts@admin.com
  // 12345678
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLoggin = async () => {
    await API("post", "/auth/login", {
      email: email,
      password: password,
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
  const handleShowPassword = () => setShowPassword(!showPassword);
  return (
    <>
      <Header />
      <div className="login_mainDiv">
        <div className="loginCenterDiv">
          {/* HEADING  */}
          <div className="login_icon_div">
            <img src={LoginIcon} alt="" className="login_icons" />
            <h2 className="login_h2">Login</h2>
          </div>
          {/* LOGIN INPUTS  */}
          <div className="email_inputs_div">
            <label htmlFor="E-mail address">E-mail address</label>
            <InputField
              className="input_email"
              type="email"
              placeholder="mail@mail.com"
              onChange={handleEmail}
              value={email}
            />
          </div>
          {/* PASSWORD  */}
          <div className="email_inputs_div">
            <label htmlFor="Password">Password</label>
            <InputField
              className="input_email"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handlePassword}
              value={password}
              visibleEye
              icon2={showPassword ? VisibilityIcon : VisibilityOffIcon}
              onClick={handleShowPassword}
            />
            <div className="forgot_p-div">
              <Link to="/forgetpassword" className="forgot_p">
                Forgot your password ?
              </Link>
            </div>
          </div>
          <Button
            className={email && password ? "logingbtn" : "logingbtn_disabled"}
            onClick={handleLoggin}
            text="To log in"
            disabled={(!email || !password) == true}
          />
          <div className="register-div">
            <Link to="/registration" className="regBtn">
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
