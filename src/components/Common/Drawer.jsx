import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ReactComponent as LILogo5 } from "../../assets/LILogo5.svg";
import { ReactComponent as LILogo6 } from "../../assets/LILogo6.svg";
import LILogo7 from "../../assets/LILogo7.svg";
import french from "../../assets/france.png";
import english from "../../assets/english.png";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ClearIcon from "@mui/icons-material/Clear";
import { useTranslation, Trans } from "react-i18next";
import UserTour from "../UserDashboard/UserTour";

const Drawer = ({ handleActiveUploadButton, activeUploadButton, Route }) => {
  const [open, setOpen] = React.useState(false);
  const [showTour, setShowTour] = useState(false);
  const location = useLocation();

  const { t, i18n } = useTranslation();
  const { language } = i18n;
  const newUser = localStorage.getItem('newUser');

  console.log("New USer ", typeof newUser);
  console.log("New USer ", showTour);

  useEffect(() => {
    newUser ? setShowTour(true) : setShowTour(false);
  }, [newUser]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userData")));
  const [role, setRole] = useState(JSON.parse(localStorage.getItem("role")));
  const handleLoggout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("role");
    window.location = "/";
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <>
      <div className="dash_menu">
        <ul className="dashboard_ul">
          {Route.map((item, index) => {
            if (index < Route.length - 2 && role === "user") {
              const isActive = location.pathname === item.path;

              return (
                <>
                <div className='user_route_container'>
                  <Link
                    exact
                    activeClassName="activeColor"
                    to={item.path}
                    className={`${isActive && "activeLi"} dashboard_li user_routes`}
                    onClick={() => handleActiveUploadButton(index + 1)}
                  >
                    <span className={`${isActive && "li_img_white"}  li_img `}>{item.icon}</span>
                    {t(item?.name)}
                  </Link>
                </div>
                {/* { isActive && showTour && newUser === "true" && role === 'user' &&
                  <div className="user_tour_wrapper">
                    <UserTour setShowTour={setShowTour} pathname={location.pathname} tour={item.tour} index={index} />
                  </div>
                  }  */}
                </>
              );
            } else if (role === "admin") {
              const isActive = location.pathname === item.path;

              return (
                <>
                  <Link
                    exact
                    activeClassName="activeColor"
                    to={item.path}
                    className={`${isActive && "activeLi"} dashboard_li `}
                    onClick={() => handleActiveUploadButton(index + 1)}
                  >
                    <span className={`${isActive && "li_img_white"}  li_img `}>{item.icon}</span>
                    {t(item.name)}
                  </Link>
                  
                </>
              );
            }
          })}
        </ul>
      </div>
      {/* DASHBOARD MENU NO.2 */}
      <div className="dash_menu2">
        <ul className="dashboard_ul">
          {role === "user" ? (
            <>
              <Link
                exact
                to="/User/Dashboard/AskQuestion"
                className={`${activeUploadButton === 6 && "activeLi "} dashboard_li `}
                onClick={() => handleActiveUploadButton(6)}
              >
                <span className={`${activeUploadButton === 6 && "li_img_white"}  li_img `}>
                  <LILogo5 />
                </span>
                {t("Ask a question")}
              </Link>
              <Link
                exact
                to="/User/Dashboard/Account"
                className={`${activeUploadButton === 7 && "activeLi"} dashboard_li `}
                onClick={() => handleActiveUploadButton(7)}
              >
                <span className={`${activeUploadButton === 7 && "li_img_white"}  li_img `}>
                  <LILogo6 />
                </span>
                {t("Account")}
              </Link>
            </>
          ) : (
            ""
          )}

          <div className="userDetail">
            <div className="user_Pro">
              {role === "user"
                ? `${user.first_name} ${user.last_name}`
                : role === "admin" && `${user.name}`}
              <img
                src={LILogo7}
                alt=""
                className="user_profile"
                onClick={handleClickOpen}
                style={{ cursor: "pointer" }}
              />
            </div>
            <p className="user_mail">{user.email}</p>
            <div className="languages-container">
              <img src={english} onClick={() => changeLanguage("en")} />
              <img src={french} onClick={() => changeLanguage("fr")} />
            </div>
          </div>
        </ul>
      </div>

      {/* LOGOUT POP-UP  */}
      <div>
        <Dialog
          fullWidth
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="buyer_main">
            <div className="buyer_heading">
              <h2 className="buyer_h2">{t("Are you sure you want to log out?")}</h2>
              <ClearIcon onClick={handleClose} />
            </div>
            <div className="logout_popup">
              <Button className="logBtn" onClick={handleClose}>
                {t("Cancel")}
              </Button>
              <Button className="logBtn2" onClick={handleLoggout} autoFocus>
                {t("Logout")}
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default Drawer;
