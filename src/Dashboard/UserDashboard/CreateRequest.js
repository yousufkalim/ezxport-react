import React from 'react';
import RequestIcon from '../../assets/RequestIcon.svg';
import { Link } from 'react-router-dom';

const CreateRequest = () => {
  return (
    <>
      <div className="CreateRequest">
        <div className="CreateRequest_center">
          <img src={RequestIcon} alt="" className="create_request_icon" />
          <p className="create_request_title">Follow-up of requests</p>
          <p className="create_request_p">Make your first certification request on Ezxport</p>
          <Link to="/User/RequestForm">
          <button className="create_request_btn">Create a first request</button>
          </Link>

        </div>
      </div>
    </>
  );
};

export default CreateRequest;
