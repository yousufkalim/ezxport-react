import React from 'react';
import '../../css/Screen.css';
import ForgetLogo from '../../assets/ForgetLogo.svg';
import Quiz from '../../assets/Quiz.png';
import Header from '../Header';
import { NavLink, useHistory } from 'react-router-dom';
import BackArrow from '../../assets/BackArrow.svg';

const ResetPassword = () => {
  const history = useHistory();

  return (
    <>
      <Header />
      <div className="login_mainDiv">
        <img
          src={BackArrow}
          alt=""
          className="backArrow"
          onClick={() => {
            history.push('/forgetpassword');
          }}
        />
        <div className="loginCenterDiv">
          {/* HEADING  */}

          {/* LOGIN BUTTON AND ICON  */}
          <div className="login_icon_div">
            <img src={ForgetLogo} alt="" className="login_icons" style={{ paddingBottom: '5px' }} />
            <br />
            <h2 className="login_h2">Forgot your password ?</h2>
            <p className="forget_p">Please enter your email address to reset your password</p>
          </div>
          {/* LOGIN INPUTS  */}
          <div className="email_inputs_div">
            <label htmlFor="">E-mail address</label>
            <div className="input_field">
              <input className="input_email" type="email" placeholder="mail@mail.com" required />
              <img src={Quiz} alt="" className="quizIcon" />
            </div>
          </div>
          {/* login button  */}
          <button className="regBtn regBtn2">Request made successfully</button>
          <NavLink to="/changepassword" className="logingbtn">
            resend again
          </NavLink>
        </div>
      </div>
    </>
  );
};
export default ResetPassword;
