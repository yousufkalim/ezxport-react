import React from "react";
import ChangedPIcon from "../assets/ChangedPIcon.svg";
import Header from "../components/Header";
import { useHistory } from "react-router";

const ChangeSuccessfully = ({ setResetPassword }) => {
  const history = useHistory(null);
  const handleToLogin = () => {
    setResetPassword(false);
    history.push("/");
  };
  return (
    <>
      <Header />
      <div className="login_mainDiv">
        <div className="loginCenterDiv">
          {/* HEADING  */}

          {/* LOGIN BUTTON AND ICON  */}
          <div className="login_icon_div">
            <img src={ChangedPIcon} alt="" className="login_icons" style={{ paddingBottom: "5px" }} />
            <br />
            <h2 className="login_h2">Password changed successfully</h2>
          </div>

          {/* login button  */}
          <button onClick={handleToLogin} className="logingbtn">
            To log in
          </button>
        </div>
      </div>
    </>
  );
};
export default ChangeSuccessfully;
