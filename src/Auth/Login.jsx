import React, { useState } from 'react';
import LoginIcon from '../assets/LoginIcon.svg';
import Quiz from '../assets/Quiz.png';
import { Link } from 'react-router-dom';
import Header from '../components/Common/Header';
import API from '../api/index';
import { toast } from 'react-toastify';
import InputField from '../components/Common/InputField';
import Button from '../components/Common/Button';

const Login = () => {
  const [email, setEmail] = useState('ts@admin.com');
  const [password, setPassword] = useState('12345678');
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLoggin = async () => {
    await API('post', '/admin/login', {
      email: email,
      password: password,
    })
      .then((res) => {
        if (res?.data?.user?.role === 'user') {
          localStorage.setItem('userData', JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.token);
          window.location = '/User/Dashboard/ListOfRequests';
        } else if(res?.data?.admin?.role === 'admin'){
          localStorage.setItem('userData', JSON.stringify(res.data.admin));
        localStorage.setItem('token', res.data.token);
          window.location = '/admin/Dashboard/Country';
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <>
      <Header />
      <div className="login_mainDiv">
        <div className="loginCenterDiv">
          {/* HEADING  */}
          <div className="login_icon_div">
            <img src={LoginIcon} alt="" className="login_icons" />
            <h2 className="login_h2">Login</h2>
          </div>
          {/* LOGIN INPUTS  */}
          <div className="email_inputs_div">
            <label htmlFor="E-mail address">E-mail address</label>
            <InputField
              className="input_email"
              type="email"
              placeholder="mail@mail.com"
              onChange={handleEmail}
              value={email}
              icon={Quiz}
            />
          </div>
          {/* PASSWORD  */}
          <div className="email_inputs_div">
            <label htmlFor="Password">Password</label>
            <InputField
              className="input_email"
              type="password"
              placeholder="Password"
              onChange={handlePassword}
              value={password}
              icon={Quiz}
            />
            <Link to="/forgetpassword" className="forgot_p">
              Forgot your password ?
            </Link>
          </div>
          <Button className="logingbtn" onClick={handleLoggin} text="To log in" />
          <Link to="/registration" className="regBtn">
            Register
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
