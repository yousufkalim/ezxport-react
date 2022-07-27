import React from 'react';
import Header from '../Components/Header';
import { NavLink, useHistory } from 'react-router-dom';
import BackArrow from '../assets/BackArrow.svg';

const Registration = () => {
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
            history.push('/');
          }}
        />

        <div className="registration_div">
          {/* first input fields  */}
          <h2 className="user_info">User information</h2>
          <div className="regist_form">
            <div className="regist_input_div">
              <div className="regist_col1">
                <label htmlFor="">First name</label>
                <input type="text" className="reg_input" placeholder="Firs name" required />
              </div>
              <div className="regist_col1">
                <label htmlFor="">Last name</label>
                <input type="text" className="reg_input" placeholder="Last name" required />
              </div>
            </div>
            <div className="regist_input_div">
              <div className="regist_col1">
                <label htmlFor="">E-mail address</label>
                <input type="text" className="reg_input" placeholder="mail@mail.com" required />
              </div>
              <div className="regist_col1">
                <label htmlFor="">Telephone</label>
                <input
                  type="number"
                  className="reg_input"
                  placeholder="33 07 86 36 02 20"
                  required
                />
              </div>
            </div>
            <div className="regist_input_div">
              <div className="regist_col1">
                <label htmlFor="">Full address</label>
                <input
                  type="text"
                  className="reg_input"
                  placeholder="90 road of rouvroy"
                  required
                />
              </div>
              <div className="regist_col2">
                <div className="city_inputs">
                  <label htmlFor="">Code postal</label>
                  <input type="number" className="reg_input2" placeholder="80100" required />
                </div>
                <div className="city_inputs2">
                  <label htmlFor="">Town</label>
                  <input type="text" className="reg_input3" placeholder="Abbeville" required />
                </div>
              </div>
            </div>
            <div className="regist_input_div">
              <div className="regist_col1">
                <label htmlFor="">Password</label>
                <input type="password" className="reg_input" placeholder="Password" required />
              </div>
              <div className="regist_col1">
                <label htmlFor="">Confirming your password</label>
                <input
                  type="password"
                  className="reg_input"
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>
          </div>
          {/* second input fields  */}
          <h2 className="user_info">Company information</h2>
          {/* ///  */}
          <div className="regist_form">
            <div className="regist_input_div">
              <div className="regist_col1">
                <label htmlFor="">Last name</label>
                <input type="text" className="reg_input" placeholder="Last name" required />
              </div>
              <div className="regist_col1">
                <label htmlFor="">Type of society</label>
                <select name="" id="" className="reg_input">
                  <option value="">Type 1</option>
                  <option value="">Type 2</option>
                  <option value="">Type 3</option>
                  <option value="">Type 4</option>
                  <option value="">Type 5</option>
                </select>
              </div>
            </div>
            <div className="regist_input_div">
              <div className="regist_col1">
                <label htmlFor="">VAT number</label>
                <input type="number" className="reg_input" placeholder="6372890367849" required />
              </div>
            </div>
          </div>
          {/* ///  */}
          <button className="register_fm">Register</button>
        </div>
      </div>
    </>
  );
};

export default Registration;
