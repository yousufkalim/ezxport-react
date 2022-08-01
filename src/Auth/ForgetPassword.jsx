import React, { useState } from "react";
import ForgetLogo from "../assets/ForgetLogo.svg";
import Quiz from "../assets/Quiz.png";
import Header from "../components/Common/Header";
import { Link } from "react-router-dom";
import BackArrow from "../assets/BackArrow.svg";
import API from "../api";
import { toast } from "react-toastify";
import InputField from "../components/Common/InputField";
import Button from "../components/Common/Button";

const ForgetPassword = () => {
  const [email, setEmail] = useState("dojac63370@aregods.com");
  const [flag, setFlag] = useState(false);
  const handleResetPassword = async () => {
    await API("put", `/auth/forgot/${email}`)
      .then((res) => {
        setFlag(true);
        if (res.data.success) {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setFlag(false);
      });
  };
  return (
    <>
      <Header />
      <div className="login_mainDiv">
        <Link className="backArrow_div" 
          to="/"
          >
        <img
          src={BackArrow}
          alt="back"
          className="backArrow"
          />
          </Link>
        <div className="loginCenterDiv">
          {/* LOGIN BUTTON AND ICON  */}
          <div className="login_icon_div">
            <img src={ForgetLogo} alt="" className="login_icons" style={{ paddingBottom: "5px" }} />
            <br />
            <h2 className="login_h2">Forgot your password ?</h2>
            <p className="forget_p">Please enter your email address to reset your password</p>
          </div>
          {/* LOGIN INPUTS  */}
          <div className="email_inputs_div">
            <label htmlFor="E-mail address">E-mail address</label>
            <InputField
              className="input_email"
              type="email"
              placeholder="mail@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={Quiz}
            />
          </div>
          {/* login button  */}
          {!flag ? (
            <Button className="logingbtn" onClick={handleResetPassword} text="Reset Password" />
          ) : (
            <p className="regBtn" style={{ cursor: "default !important" }}>
              Request made successfully
            </p>
          )}
          <Button className={flag ? "logingbtn" : "regBtn"} onClick={handleResetPassword} text="resend again" />
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
