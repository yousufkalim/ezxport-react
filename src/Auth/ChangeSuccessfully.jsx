import React from 'react';
import ChangedPIcon from '../assets/ChangedPIcon.svg';
import Header from '../components/Common/Header';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ChangeSuccessfully = ({ setResetPassword }) => {
  const { t } = useTranslation();

  const history = useHistory(null);
  const handleToLogin = () => {
    setResetPassword(false);
    history.push('/');
  };
  return (
    <>
      <Header className="header_center_image" classNameLogoDiv="header_with_lg_logo" />
      <div className="login_mainDiv">
        <div className="loginCenterDiv">
          {/* HEADING  */}

          {/* LOGIN BUTTON AND ICON  */}
          <div className="login_icon_div">
            <img
              src={ChangedPIcon}
              alt=""
              className="login_icons"
              style={{ paddingBottom: '5px' }}
            />
            <br />
            <h2 className="login_h2">{t('Password changed successfully')}</h2>
          </div>

          {/* login button  */}
          <button onClick={handleToLogin} className="logingbtn" type="button">
            {t('To log in')}
          </button>
        </div>
      </div>
    </>
  );
};
export default ChangeSuccessfully;
