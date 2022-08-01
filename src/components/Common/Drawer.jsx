import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LILogo5 from '../../assets/LILogo5.svg';
import LILogo6 from '../../assets/LILogo6.svg';
import LILogo7 from '../../assets/LILogo7.svg';

const Drawer = ({ handleActiveUploadButton, activeUploadButton, Route }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData')));
  const handleLoggout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    window.location = "/";
  };

  return (
    <>
      <div className="dash_menu">
        <ul className="dashboard_ul">
          {Route.map((item, index) => {
            if (index < Route.length - 2 && user.role === 'user') {
              return (
                <>
                  <Link
                    exact
                    activeClassName="activeColor"
                    to={item.path}
                    className={`${activeUploadButton === index + 1 && 'activeLi'} dashboard_li `}
                    onClick={() => handleActiveUploadButton(index + 1)}
                  >
                    <img src={item.icon} alt="" className="li_img" />
                    {item.name}
                  </Link>
                </>
              );
            } else if (user.role === 'admin') {
              return (
                <>
                  <Link
                    exact
                    activeClassName="activeColor"
                    to={item.path}
                    className={`${activeUploadButton === index + 1 && 'activeLi'} dashboard_li `}
                    onClick={() => handleActiveUploadButton(index + 1)}
                  >
                    <img src={item.icon} alt="" className="li_img" />
                    {item.name}
                  </Link>
                </>
              );
            }
          })}
        </ul>
      </div>
      {/* dashbord menu 2 */}
      <div className="dash_menu2">
        <ul className="dashboard_ul">
          {user.role === 'user' ? (
            <>
              <Link
                exact
                to="/User/Dashboard/AskQuestion"
                className={`${activeUploadButton === 5 && 'activeLi'} dashboard_li `}
                onClick={() => handleActiveUploadButton(5)}
              >
                <img src={LILogo5} alt="" className="li_img" />
                Ask a question
              </Link>
              <Link
                exact
                to="#"
                className={`${activeUploadButton === 6 && 'activeLi'} dashboard_li `}
                onClick={() => handleActiveUploadButton(6)}
              >
                <img src={LILogo6} alt="" className="li_img" />
                Account
              </Link>
            </>
          ) : (
            ''
          )}

          <div className="userDetail">
            <div className="user_Pro">
              <Link to="#" className="deshboard_user">
                {user.firstName} {user.lastName}
              </Link>
              <img
                src={LILogo7}
                alt=""
                className="user_profile"
                onClick={handleLoggout}
                style={{ cursor: 'pointer' }}
              />
            </div>
            <p className="user_mail">{user.email}</p>
          </div>
        </ul>
      </div>
    </>
  );
};

export default Drawer;
