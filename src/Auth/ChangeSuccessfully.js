import React from 'react';
import ChangedPIcon from '../assets/ChangedPIcon.svg';
import Header from '../Components/Header';
import { NavLink } from 'react-router-dom';

const ChangeSuccessfully = () => {
  return (
    <>
      <Header />
      <div className="login_mainDiv">
        <div className="loginCenterDiv">
          {/* HEADING  */}

          {/* LOGIN BUTTON AND ICON  */}
          <div className="login_icon_div">
            <img
              src={ChangedPIcon}
              alt=""
              className="login_icons"
              style={{ paddingBottom: '5px' }}
            />
            <br />
            <h2 className="login_h2">Password changed successfully</h2>
          </div>

          {/* login button  */}
          <NavLink to="/" className="logingbtn">
            To log in
          </NavLink>
        </div>
      </div>
    </>
  );
};
export default ChangeSuccessfully;
