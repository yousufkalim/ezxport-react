import React, { useState } from 'react';
import '../css/Dashboard.css';
import DashLogo from '../assets/DashLogo.svg';
import Drawer from '../components/Common/Drawer';
import { UserRoutes } from '../routes/routes';
import { Switch, Route } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Application from '../Dashboard/UserDashboard/Appplication/index.js';

const UserLayouts = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeUploadButton, setActiveUploadButton] = useState(1);

  const handleActiveUploadButton = (i) => {
    setActiveUploadButton(i);
  };
  return (
    <>
      <div className="userdashboard_div">
        <div className="userDashboar_center_div">
          {showMenu ? (
            <>
              <div className="dashboard_left_side2">
                {/* DSAHBOARD LOGO */}
                <CloseIcon
                  color="primary"
                  className="cros_icon"
                  onClick={() => {
                    setShowMenu(false);
                  }}
                />
                <div className="dashoard_logo">
                  <img src={DashLogo} alt="" className="dashboard_logo" />
                </div>
                {/* DASHBOARD MENU */}
                <Drawer
                  Route={UserRoutes}
                  handleActiveUploadButton={handleActiveUploadButton}
                  activeUploadButton={activeUploadButton}
                />
              </div>
            </>
          ) : (
            <>
              <div className="dashboard_left_side">
                  {/* DSAHBOARD LOGO  */}
                <div className="dashoard_logo">
                  <img src={DashLogo} alt="" className="dashboard_logo " />
                </div>
                  {/* DASHBOARD MENU */}
                <Drawer
                  Route={UserRoutes}
                  handleActiveUploadButton={handleActiveUploadButton}
                  activeUploadButton={activeUploadButton}
                />
              </div>
            </>
          )}

          <div className="dashboard_right_side">
            <MenuIcon
              onClick={() => {
                setShowMenu(!showMenu);
              }}
              className="hambrgr_icon"
            />
            <Switch>
              {UserRoutes.map((item) => {
                return <Route exact path={item.path} render={() => <item.component />} />;
              })}
              <Route exact path="/User/Dashboard/Application/:id" component={Application} />

            </Switch>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLayouts;
