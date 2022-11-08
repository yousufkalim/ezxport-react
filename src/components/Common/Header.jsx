import React from 'react';
import EzxportIcon from '../../assets/EzxportIcon.svg';
import BackArrow from '../../assets/BackArrow.svg';
import { Link } from 'react-router-dom';
// Component
export default function Header(props) {
  return (
    <>
      <div className={props.classNameLogoDiv ? props.classNameLogoDiv : 'header'}>
        {props.backBtn ? (
          <Link to={props?.to}>
            <img
              src={BackArrow}
              alt="back"
              className="backArrow"
              style={{ marginLeft: '6%', position: 'absolute', top: '9%' }}
            />
          </Link>
        ) : (
          ''
        )}
        <img
          className={props.className ? props.className : 'header_center_div'}
          src={EzxportIcon}
          alt=""
        />
      </div>
    </>
  );
}
