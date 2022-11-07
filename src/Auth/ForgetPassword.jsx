import React, { useState, useEffect } from 'react';
import ForgetLogo from '../assets/ForgetLogo.svg';
import Header from '../components/Common/Header';
import { Link } from 'react-router-dom';
import BackArrow from '../assets/BackArrow.svg';
import API from '../api';
import InputField from '../components/Common/InputField';
import Button from '../components/Common/Button';
import { useTranslation } from 'react-i18next';
import validate from 'validate.js';
import toaster from '../utils/toaster';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  }
};

const ForgetPassword = () => {
  const [flag, setFlag] = useState(false);
  const { t } = useTranslation();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      email: ''
    },
    touched: {},
    errors: {}
  });
  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);
  const handleResetPassword = async () => {
    await API('put', `/auth/forgot/${formState?.values?.email}`)
      .then(res => {
        setFlag(true);
        if (res.data.success) {
          setFlag(!flag);
          toaster('success', t(res.data.message));
        }
      })
      .catch(err => {
        toaster('Failed', t('Email does not exist'));
        setFlag(false);
      });
  };
  const handleChange = event => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      },
      touched: { ...formState.touched, [event.target.name]: true }
    }));
  };
  const handleBlur = e => {
    e.preventDefault();
    const { name } = e.target;
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      errors: errors ?? {},
      touched: { ...formState.touched, [name]: true },
      isValid: errors ? false : true
    }));
  };

  const hasError = field => (formState.touched[field] && formState.errors[field] ? true : false);

  return (
    <>
      <Header className="header_center_image" classNameLogoDiv="header_with_lg_logo" />
      <div className="login_mainDiv">
        <div className="backArrow_div">
          <Link to="/">
            <img src={BackArrow} alt="back" className="backArrow" />
          </Link>
        </div>
        <div className="loginCenterDiv">
          {/* LOGIN BUTTON AND ICON  */}
          <div className="login_icon_div">
            <img src={ForgetLogo} alt="" className="login_icons" style={{ paddingBottom: '5px' }} />
            <br />
            <h2 className="login_h2">{t('Forgot your password ?')}</h2>
            <p className="forget_p">
              {t('Please enter your email address to reset your password')}
            </p>
          </div>
          {/* LOGIN INPUTS  */}
          <div className="email_inputs_div">
            <InputField
              label={t('E-mail address')}
              isError={hasError('email')}
              error={[t(formState.errors.email)]}
              name="email"
              onBlur={e => handleBlur(e)}
              autoComplete="off"
              type="text"
              placeholder={t('E-mail address')}
              value={formState.values.email}
              onChange={e => handleChange(e)}
            />
          </div>
          {
            !flag && (
              <div className="resetPassword-div">
                <Button
                  className={!formState.isValid ? 'logingbtn_disabled' : 'logingbtn'}
                  onClick={handleResetPassword}
                  text={t('Reset Password')}
                  disabled={!formState.isValid ? true : false}
                />
              </div>
            )
            // (
            //   <div className="requestSuccess-div">
            //     <button className="regBtn" style={{ cursor: "default !important" }}>
            //       {t("Request made successfully")}
            //     </button>
            //   </div>
            // )
          }
          <div className="resetPassword-div">
            <Button
              className={flag ? 'logingbtn' : 'regBtn'}
              onClick={handleResetPassword}
              text={t('Resend again')}
              disabled={!flag || formState?.values?.email === '' ? true : false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
