import React, { useState } from 'react';
import '../css/Dashboard.css';
import DashLogo from '../assets/DashLogo.svg';
import Drawer from "../components/Common/Drawer";
import { AdminRoutes } from '../routes/routes';
import { Switch, Route } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NomPays from '../Dashboard/AdminDashboard/NomPays';

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
                {/* dashbord logo  */}
                <CloseIcon
                  className="cros_icon"
                  onClick={() => {
                    setShowMenu(false);
                  }}
                />
                <div className="dashoard_logo">
                  <img src={DashLogo} alt="" className="dashboard_logo " />
                </div>
                {/* dashbord menu  */}
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
                {/* dashbord logo  */}
                <div className="dashoard_logo">
                  <img src={DashLogo} alt="" className="dashboard_logo " />
                </div>
                {/* dashbord menu  */}
                <Drawer
                  Route={AdminRoutes}
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
              {AdminRoutes.map((item) => {
                return <Route path={item.path} render={() => <item.component />} />;
              })}
              <Route path="/Admin/Dashboard/NomPays" component={NomPays} />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayouts;
