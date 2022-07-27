import React, { useState } from 'react';
import ChangeSuccessfully from './ChangeSuccessfully';
import { toast } from 'react-toastify';
import API from '../api';
import ForgetLogo from '../assets/ForgetLogo.svg';
import Quiz from '../assets/Quiz.png';
import Header from '../components/Header';
// import InputField from "../Components/InputField";
// import { NavLink } from "react-router-dom";

const ChangePassword = ({ Token, setResetPassword }) => {
  // const history = useHistory(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const handleChangePassword = async () => {
    await API('put', `/auth/new-password/${Token}`, {
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
                <img
                  src={ForgetLogo}
                  alt=""
                  className="login_icons"
                  style={{ paddingBottom: '5px' }}
                />
                <br />
                <h2 className="login_h2">New Password</h2>
              </div>
              {/* PASSWORD */}
              <div className="email_inputs_div">
                <label htmlFor="">New Password</label>
                <div className="input_field">
                  <input
                    className="input_email"
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <img src={Quiz} alt="" className="quizIcon" />
                </div>
              </div>
              {/*C PASSWORD  */}
              <div className="email_inputs_div">
                <label htmlFor="">Confirm password</label>
                <div className="input_field2">
                  <input
                    className="input_email"
                    type="password"
                    placeholder="Confirm password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <img src={Quiz} alt="" className="quizIcon" />
                </div>
              </div>
              {/* login button  */}
              <button className="logingbtn" onClick={handleChangePassword}>
                change the password
              </button>
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
