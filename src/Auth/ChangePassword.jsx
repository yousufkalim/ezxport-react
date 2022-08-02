import React, { useState } from "react";
import ChangeSuccessfully from "./ChangeSuccessfully";
import { toast } from "react-toastify";
import API from "../api";
import ForgetLogo from "../assets/ForgetLogo.svg";
import Quiz from "../assets/Quiz.png";
import Header from "../components/Common/Header";
import InputField from "../components/Common/InputField";
import Button from "../components/Common/Button";
// import InputField from "../Components/InputField";
// import { NavLink } from "react-router-dom";

const ChangePassword = ({ Token, setResetPassword }) => {
  // const history = useHistory(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
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
                <img src={ForgetLogo} alt="" className="login_icons" style={{ paddingBottom: "5px" }} />
                <br />
                <h2 className="login_h2">New Password</h2>
              </div>
              {/* PASSWORD */}
              <div className="email_inputs_div">
                <label htmlFor="">New Password</label>
                <InputField
                  className="input_email"
                  type="password"
                  placeholder="New Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/*C PASSWORD  */}
              <div className="email_inputs_div">
                <label htmlFor="">Confirm password</label>
                <InputField
                  className="input_email"
                  type="password"
                  placeholder="Confirm password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {/* login button  */}
              <Button className="logingbtn" onClick={handleChangePassword} text="Change the password" />
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
