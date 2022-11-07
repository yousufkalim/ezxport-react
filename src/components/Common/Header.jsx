import React from 'react';
import EzxportIcon from '../../assets/EzxportIcon.svg';
import { useTranslation } from 'react-i18next';
import french from '../../assets/france.png';
import english from '../../assets/english.png';
// Component
export default function Header(props) {
  const { i18n } = useTranslation();

  const changeLanguage = lang => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };
  return (
    <>
      <div className={props.classNameLogoDiv ? props.classNameLogoDiv : 'header'}>
        <img
          className={props.className ? props.className : 'header_center_div'}
          src={EzxportIcon}
          alt=""
        />
        {props.showLanguage ? (
          <div className="change_language_container">
            <img src={english} onClick={() => changeLanguage('en')} alt="" />
            <img src={french} onClick={() => changeLanguage('fr')} alt="" />
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
