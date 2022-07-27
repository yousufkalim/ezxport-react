import React from 'react';
import LoginIcon from '../assets/LoginIcon.svg';
import Quiz from '../assets/Quiz.png';
import { NavLink } from 'react-router-dom';
import Header from '../Components/Header';

const Login = () => {
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
              <input className="input_email" type="email" placeholder="mail@mail.com" required />
              <img src={Quiz} alt="" className="quizIcon" />
            </div>
          </div>
          {/* PASSWORD  */}
          <div className="email_inputs_div">
            <label htmlFor="">Password</label>
            <div className="input_field2">
              <input className="input_email" type="password" placeholder="Password" required />
              <img src={Quiz} alt="" className="quizIcon" />
            </div>
            <NavLink to="/forgetpassword" className="forgot_p">
              Forgot your password ?
            </NavLink>
          </div>
          {/* login button  */}
          <button className="logingbtn">To log in</button>
          <NavLink to="/registration" className="regBtn">
            Register
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Login;
