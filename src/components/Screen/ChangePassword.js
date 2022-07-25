import React from 'react';
import '../../css/Screen.css';
import ForgetLogo from '../../assets/ForgetLogo.svg';
import Quiz from '../../assets/Quiz.png';
import Header from '../Header';
import { NavLink } from 'react-router-dom';

const ChangePassword = () => {
  return (
    <>
      <Header />
      <div className="login_mainDiv">
        <div className="loginCenterDiv">
          {/* HEADING  */}

          {/* LOGIN BUTTON AND ICON  */}
          <div className="login_icon_div">
            <img src={ForgetLogo} alt="" className="login_icons" style={{ paddingBottom: '5px' }} />
            <br />
            <h2 className="login_h2">New Password</h2>
          </div>
          {/* PASSWORD */}
          <div className="email_inputs_div">
            <label htmlFor="">New Password</label>
            <div className="input_field">
              <input className="input_email" type="password" placeholder="New Password" required />
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
              />
              <img src={Quiz} alt="" className="quizIcon" />
            </div>
          </div>
          {/* login button  */}
          <NavLink to="/changesuccessfully" className="logingbtn">
            change the password
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
