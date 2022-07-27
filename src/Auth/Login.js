import React, { useState } from "react";
import "../../css/Screen.css";
import LoginIcon from "../../assets/LoginIcon.svg";
import Quiz from "../../assets/Quiz.png";
import { NavLink } from "react-router-dom";
import Header from "../Header";
import API from "../../api/index";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const history = useHistory(null);
  const [email, setEmail] = useState("dojac63370@aregods.com");
  const [password, setPassword] = useState("12345678");
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
        localStorage.setItem("userData", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        if (res.data.user.role === "user") {
          toast.success("Logged In Successfully");
          history.push("/User/Dashboard/ListOfRequests");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <>
      <Header />
      <div className="login_mainDiv">
        <div className="loginCenterDiv">
          {/* HEADING  */}

          {/* LOGIN BUTTON AND ICON  */}
          <div className="login_icon_div">
            <img src={LoginIcon} alt="" className="login_icons" />
            <h2 className="login_h2">Login</h2>
          </div>
          {/* LOGIN INPUTS  */}
          <div className="email_inputs_div">
            <label htmlFor="">E-mail address</label>
            <div className="input_field">
              <input
                className="input_email"
                type="email"
                placeholder="mail@mail.com"
                required
                onChange={handleEmail}
                value={email}
              />
              <img src={Quiz} alt="" className="quizIcon" />
            </div>
          </div>
          {/* PASSWORD  */}
          <div className="email_inputs_div">
            <label htmlFor="">Password</label>
            <div className="input_field2">
              <input
                className="input_email"
                type="password"
                placeholder="Password"
                required
                onChange={handlePassword}
                value={password}
              />
              <img src={Quiz} alt="" className="quizIcon" />
            </div>
            <NavLink to="/forgetpassword" className="forgot_p">
              Forgot your password ?
            </NavLink>
          </div>
          {/* login button  */}
          <button className="logingbtn" onClick={handleLoggin}>
            To log in
          </button>
          <NavLink to="/registration" className="regBtn">
            Register
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Login;
