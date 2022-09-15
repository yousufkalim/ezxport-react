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
import { useTranslation, Trans } from "react-i18next";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [flag, setFlag] = useState(false);

  const { t, i18n } = useTranslation();
  const { language } = i18n;

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
    setFlag(!flag);
  };
  return (
    <>
      <Header />
      <div className="login_mainDiv">
        <div className="backArrow_div">
          <Link to="/">
            <img src={BackArrow} alt="back" className="backArrow" />
          </Link>
        </div>
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
            <label htmlFor="E-mail address">{t("E-mail address")}</label>
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
            <div className={"resetPassword-div"}>
              <Button
                className={email === "" ? "logingbtn_disabled" : "logingbtn"}
                onClick={handleResetPassword}
                text="Reset Password"
                disabled={email === "" && true}
              />
            </div>
          ) : (
            <div className="requestSuccess-div">
              <button className="regBtn" style={{ cursor: "default !important" }}>
                Request made successfully
              </button>
            </div>
          )}
          <div className="resetPassword-div">
            <Button
              className={flag ? "logingbtn" : "regBtn"}
              onClick={handleResetPassword}
              text="resend again"
              disabled={!flag || email === "" ? true : false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
