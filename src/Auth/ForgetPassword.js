import React, { useState } from "react";
import ForgetLogo from "../assets/ForgetLogo.svg";
import Quiz from "../assets/Quiz.png";
import Header from "../components/Header";
import { NavLink, useHistory } from "react-router-dom";
import BackArrow from "../assets/BackArrow.svg";
import API from "../api";
import { toast } from "react-toastify";
import InputField from "../components/InputField";
import Button from "../components/Button";

const ForgetPassword = () => {
  const [email, setEmail] = useState("dojac63370@aregods.com");
  const [flag, setFlag] = useState(false);
  const history = useHistory();
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
        <img
          src={BackArrow}
          alt=""
          className="backArrow"
          onClick={() => {
            history.push("/");
          }}
        />
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
            <label htmlFor="">E-mail address</label>
            <InputField
              className="input_email"
              type="email"
              placeholder="mail@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* login button  */}
          {!flag ? (
            <Button className="logingbtn" onClick={handleResetPassword} text="Reset Password" />
          ) : (
            <p className="regBtn" style={{ cursor: "default !important" }}>
              {" "}
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
