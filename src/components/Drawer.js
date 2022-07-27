import React from 'react';
import { NavLink } from 'react-router-dom';
import LILogo1 from '../assets/LILogo1.svg';
import LILogo2 from '../assets/LILogo2.svg';
import LILogo3 from '../assets/LILogo3.svg';
import LILogo4 from '../assets/LILogo4.svg';
import LILogo5 from '../assets/LILogo5.svg';
import LILogo6 from '../assets/LILogo6.svg';
import LILogo7 from '../assets/LILogo7.svg';

const Drawer = ({ handleActiveUploadButton, activeUploadButton, Route }) => {
  return (
    <>
      <div className="dash_menu">
        <ul className="dashboard_ul">
          {Route.map((item, index) => {
            console.log(index);
            return (
              <>
                <NavLink
                  exact
                  activeClassName="activeColor"
                  to={item.path}
                  className={`${activeUploadButton === index && 'activeLi'} dashboard_li `}
                  onClick={() => handleActiveUploadButton(index)}
                >
                  <img src={item.icon} alt="" className="li_img" />
                  {item.name}
                </NavLink>
              </>
            );
          })}
        </ul>
      </div>
      {/* dashbord menu 2 */}
      <div className="dash_menu2">
        <ul className="dashboard_ul">
          <NavLink
            exact
            to="/User/Dashboard/AskQuestion"
            className={`${activeUploadButton === 5 && 'activeLi'} dashboard_li `}
            onClick={() => handleActiveUploadButton(5)}
          >
            <img src={LILogo5} alt="" className="li_img" />
            Ask a question
          </NavLink>
          <NavLink
            exact
            to="#"
            className={`${activeUploadButton === 6 && 'activeLi'} dashboard_li `}
            onClick={() => handleActiveUploadButton(6)}
          >
            <img src={LILogo6} alt="" className="li_img" />
            Account
          </NavLink>
          {/* olivial  */}
          <div className="userDetail">
            <div className="user_Pro">
              <NavLink to="#" className="deshboard_user">
                Olivia Rhye
              </NavLink>
              <img src={LILogo7} alt="" className="user_profile" />
            </div>
            <p className="user_mail">olivia@ezxport.com</p>
          </div>
        </ul>
      </div>

      {/* <div className="content" style={{ backgroundColor: 'white', color: 'black' }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, iure.
      </div> */}
    </>
  );
};

export default Drawer;
