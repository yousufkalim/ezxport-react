import React, { useState } from "react";
import { Link } from "react-router-dom";
import LILogo5 from "../../assets/LILogo5.svg";
import LILogo6 from "../../assets/LILogo6.svg";
import LILogo7 from "../../assets/LILogo7.svg";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ClearIcon from "@mui/icons-material/Clear";
import { useTranslation, Trans } from "react-i18next";

// import DialogActions from "@mui/material/DialogActions";
// import DialogTitle from "@mui/material/DialogTitle";

const Drawer = ({ handleActiveUploadButton, activeUploadButton, Route }) => {
  const [open, setOpen] = React.useState(false);

  const { t, i18n } = useTranslation();
  const { language } = i18n;

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

  return (
    <>
      <div className="dash_menu">
        <ul className="dashboard_ul">
          {Route.map((item, index) => {
            if (index < Route.length - 2 && role === "user") {
              return (
                <>
                  <Link
                    exact
                    activeClassName="activeColor"
                    to={item.path}
                    className={`${activeUploadButton === index + 1 && "activeLi"} dashboard_li `}
                    onClick={() => handleActiveUploadButton(index + 1)}
                  >
                    <span
                      className={`${activeUploadButton === index + 1 && "li_img_white"}  li_img `}
                    >
                      {item.icon}
                    </span>
                    {t(item?.name)}
                  </Link>
                </>
              );
            } else if (role === "admin") {
              return (
                <>
                  <Link
                    exact
                    activeClassName="activeColor"
                    to={item.path}
                    className={`${activeUploadButton === index + 1 && "activeLi"} dashboard_li `}
                    onClick={() => handleActiveUploadButton(index + 1)}
                  >
                    <span
                      className={`${activeUploadButton === index + 1 && "li_img_white"}  li_img `}
                    >
                      {item.icon}
                    </span>
                    {t(item.name)}
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
          {role === "user" ? (
            <>
              <Link
                exact
                to="/User/Dashboard/AskQuestion"
                className={`${activeUploadButton === 6 && "activeLi "} dashboard_li `}
                onClick={() => handleActiveUploadButton(6)}
              >
                <img src={LILogo5} alt="" className="li_img" />
                Ask a question
              </Link>
              <Link
                exact
                to="/User/Dashboard/Account"
                className={`${activeUploadButton === 7 && "activeLi"} dashboard_li `}
                onClick={() => handleActiveUploadButton(7)}
              >
                <img src={LILogo6} alt="" className="li_img" />
                Account
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
                // onClick={handleLoggout}
                style={{ cursor: "pointer" }}
              />
            </div>
            <p className="user_mail">{user.email}</p>
          </div>
        </ul>
      </div>
      {/* logout popup  */}
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
              <h2 className="buyer_h2">Are you sure you want to log out?</h2>
              <ClearIcon onClick={handleClose} />
            </div>
            {/* {children} */}
            <div className="logout_popup">
              <Button className="logBtn" onClick={handleClose}>
                Cancel
              </Button>
              <Button className="logBtn2" onClick={handleLoggout} autoFocus>
                Logout
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default Drawer;
