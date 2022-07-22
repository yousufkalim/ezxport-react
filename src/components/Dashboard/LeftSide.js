import React from 'react';
import LILogo1 from '../../assets/LILogo1.svg';
import LILogo2 from '../../assets/LILogo2.svg';
import LILogo3 from '../../assets/LILogo3.svg';
import LILogo4 from '../../assets/LILogo4.svg';
import { NavLink } from 'react-router-dom';
import LILogo5 from '../../assets/LILogo5.svg';
import LILogo6 from '../../assets/LILogo6.svg';
import LILogo7 from '../../assets/LILogo7.svg';
const LeftSide = ({ handleActiveUploadButton, activeUploadButton }) => {
  return (
    <>
      <div className="dash_menu">
        <ul className="dashboard_ul">
          <NavLink
            to="#"
            className={`${activeUploadButton == 1 && 'dashboard_li'} dashboard_li `}
            onClick={() => handleActiveUploadButton(1)}
          >
            <img src={LILogo1} alt="" className="li_img" />
            Follow-up of requests
          </NavLink>

          <NavLink
            to="#"
            className={`${activeUploadButton == 2 && 'dashboard_li'} dashboard_li `}
            onClick={() => handleActiveUploadButton(2)}
          >
            <img src={LILogo2} alt="" className="li_img" />
            Service providers
          </NavLink>

          <NavLink
            to="#"
            className={`${activeUploadButton == 3 && 'dashboard_li'} dashboard_li `}
            onClick={() => handleActiveUploadButton(3)}
          >
            <img src={LILogo3} alt="" className="li_img" />
            Address Book
          </NavLink>

          <NavLink
            to="#"
            className={`${activeUploadButton == 4 && 'dashboard_li'} dashboard_li `}
            onClick={() => handleActiveUploadButton(4)}
          >
            <img src={LILogo4} alt="" className="li_img" />
            Documents
          </NavLink>
        </ul>
      </div>
      {/* dashbord menu 2 */}
      <div className="dash_menu2">
        <ul className="dashboard_ul">
          <NavLink to="#" className="dashboard_li">
            <img src={LILogo5} alt="" className="li_img" />
            Ask a question
          </NavLink>
          <NavLink to="#" className="dashboard_li">
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
    </>
  );
};

export default LeftSide;
