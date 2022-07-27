import React, { useState } from "react";
import "../../css/Screen.css";
import ForgetLogo from "../../assets/ForgetLogo.svg";
import Quiz from "../../assets/Quiz.png";
import Header from "../Header";
import { NavLink, useHistory } from "react-router-dom";
import BackArrow from "../../assets/BackArrow.svg";
import API from "../../api";
import { toast } from "react-toastify";
import { className } from "postcss-selector-parser";

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
            <div className="input_field">
              <input
                className="input_email"
                type="email"
                placeholder="mail@mail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <img src={Quiz} alt="" className="quizIcon" />
            </div>
          </div>
          {/* login button  */}
          {!flag ? (
            <button className="logingbtn" onClick={handleResetPassword}>
              Reset Password
            </button>
          ) : (
            <p className="regBtn" style={{ cursor: "default !important" }}>
              {" "}
              Request made successfully
            </p>
          )}

          <button className={flag ? "logingbtn" : "regBtn"} onClick={handleResetPassword}>
            resend again
          </button>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
