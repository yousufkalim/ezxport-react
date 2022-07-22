import React, { useState } from 'react';
import '../../css/Dashboard.css';
import DashLogo from '../../assets/DashLogo.svg';
import LeftSide from './LeftSide';
import RightSide from './RightSide';

const UserDashboard = () => {
  const [activeUploadButton, setActiveUploadButton] = useState(1);

  const handleActiveUploadButton = (i) => {
    setActiveUploadButton(i);
  };
  return (
    <>
      <div className="userdashboard_div">
        <div className="userDashboar_center_div">
          <div className="dashboard_left_side">
            {/* dashbord logo  */}
            <div className="dash_logo">
              <img src={DashLogo} alt="" className="dashboar_logo" />
            </div>
            {/* dashbord menu  */}
            <LeftSide
              handleActiveUploadButton={handleActiveUploadButton}
              activeUploadButton={activeUploadButton}
            />
          </div>
          {/* right data  */}
          <RightSide activeUploadButton={activeUploadButton} />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
