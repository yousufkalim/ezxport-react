import React, { useState } from 'react';
import LoginIcon from '../assets/LoginIcon.svg';
import Quiz from '../assets/Quiz.png';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import API from '../api/index';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputField from '../components/InputField';
import Button from '../components/Button';

const Login = () => {
  const history = useHistory(null);
  const [email, setEmail] = useState('dojac63370@aregods.com');
  const [password, setPassword] = useState('12345678');
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLoggin = async () => {
    await API('post', '/auth/login', {
      email: email,
      password: password,
    })
      .then((res) => {
        localStorage.setItem('userData', JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.token);
        if (res.data.user.role === 'user') {
          toast.success('Logged In Successfully');
          history.push('/User/Dashboard/ListOfRequests');
        } else {
          toast.success('Logged In Successfully');
          history.push('/admin/Dashboard/Country');
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
