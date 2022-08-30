import React from 'react';
import EzxportIcon from '../../assets/EzxportIcon.svg';
import SendIcon from '../../assets/SendIcon.svg';

const SendDocuments = () => {
  return (
    <>
      <div className="SendDocuments_main">
        <div className="Reference_logo_div">
          <img src={EzxportIcon} alt="" className="header_center_div" />
        </div>
        <div className="SendDocuments_second">
          <img src={SendIcon} alt="" className="SendDocuments_img" />
          <p className="SendDocuments_P">
            You have validated the documents of company X, we will send you all the documents to the
            address mail@mail.come <span style={{ fontWeight: 'bold' }}>mail@mail.com</span>{' '}
          </p>
        </div>
      </div>
    </>
  );
};

export default SendDocuments;
