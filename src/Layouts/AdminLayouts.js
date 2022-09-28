import React, { useState } from 'react';
import '../css/Dashboard.css';
import DashLogo from '../assets/DashLogo.svg';
import Drawer from '../components/Common/Drawer';
import { AdminRoutes } from '../routes/routes';
import { Switch, Route } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NomPays from '../Dashboard/AdminDashboard/NomPays';
import NameProvider from '../Dashboard/AdminDashboard/NameProvider';
import UserDetails from '../Dashboard/AdminDashboard/UserDetails';

const AdminLayouts = () => {
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
                {/* DASHBOARD LOGO  */}
                <CloseIcon
                  color="primary"
                  className="cros_icon"
                  onClick={() => {
                    setShowMenu(false);
                  }}
                />
                <div className="dashoard_logo">
                  <img src={DashLogo} alt="" className="dashboard_logo " />
                </div>
                {/* DASHBOARD MENU */}
                <Drawer
                  Route={AdminRoutes}
                  handleActiveUploadButton={handleActiveUploadButton}
                  activeUploadButton={activeUploadButton}
                />
              </div>
            </>
          ) : (
            <>
              <div className="dashboard_left_side">
                  {/* DASHBOARD LOGO  */}
                <div className="dashoard_logo">
                  <img src={DashLogo} alt="" className="dashboard_logo " />
                </div>
                  {/* DASHBOARD MENU */}
                <Drawer
                  Route={AdminRoutes}
                  handleActiveUploadButton={handleActiveUploadButton}
                  activeUploadButton={activeUploadButton}
                />
              </div>
            </>
          )}

          <div className="dashboard_right_side" style={{ overflow: 'hidden !important' }}>
            <MenuIcon
              onClick={() => {
                setShowMenu(!showMenu);
              }}
              className="hambrgr_icon"
            />
            <Switch>
              {AdminRoutes.map((item) => {
                return <Route exact path={item.path} render={() => <item.component />} />;
              })}
              <Route exact path="/Admin/Dashboard/Country/NomPays/:id" component={NomPays} />
              <Route
                exact
                path="/Admin/Dashboard/ServiceProvider/nameProvider/:id"
                component={NameProvider}
              />
              <Route exact path="/Admin/Dashboard/Users/UserDetails/:id" component={UserDetails} />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayouts;
