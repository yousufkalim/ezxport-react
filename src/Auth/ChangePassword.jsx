import React, { useState } from "react";
import ChangeSuccessfully from "./ChangeSuccessfully";
import { toast } from "react-toastify";
import API from "../api";
import ForgetLogo from "../assets/ForgetLogo.svg";
import Quiz from "../assets/Quiz.png";
import Header from "../components/Common/Header";
import InputField from "../components/Common/InputField";
import Button from "../components/Common/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useTranslation, Trans } from "react-i18next";

// import InputField from "../Components/InputField";
// import { NavLink } from "react-router-dom";

const ChangePassword = ({ Token, setResetPassword }) => {
  // const history = useHistory(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { t, i18n } = useTranslation();
  const { language } = i18n;

  const handleChangePassword = async () => {
    await API("put", `/auth/new-password/${Token}`, {
      newPassword: password,
      confirmPassword: confirmPassword,
    })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setSuccess(true);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  return (
    <>
      {!success ? (
        <>
          <Header />
          <div className="login_mainDiv">
            <div className="loginCenterDiv">
              {/* HEADING  */}

              {/* LOGIN BUTTON AND ICON  */}
              <div className="login_icon_div">
                <img
                  src={ForgetLogo}
                  alt=""
                  className="login_icons"
                  style={{ paddingBottom: "5px" }}
                />
                <br />
                <h2 className="login_h2">{t("New Password")}</h2>
              </div>
              {/* PASSWORD */}
              <div className="email_inputs_div">
                <label htmlFor="">{t("New Password")}</label>
                <InputField
                  className="input_email"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("New Password")}
                  required
                  value={password}
                  visibleEye
                  icon2={showPassword ? VisibilityIcon : VisibilityOffIcon}
                  onClick={handleShowPassword}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/*C PASSWORD  */}
              <div className="email_inputs_div">
                <label htmlFor="">{t("Confirm password")}</label>
                <InputField
                  className="input_email"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={t("Confirm password")}
                  required
                  value={confirmPassword}
                  visibleEye
                  icon2={showConfirmPassword ? VisibilityIcon : VisibilityOffIcon}
                  onClick={handleShowConfirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {/* login button  */}
              <Button
                className="logingbtn"
                onClick={handleChangePassword}
                text={t("Change the password")}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <ChangeSuccessfully setResetPassword={setResetPassword} />
        </>
      )}
    </>
  );
};

export default ChangePassword;
