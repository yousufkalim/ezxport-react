import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ApplicationHeader = () => {
  return (
    <div>
      <div className="List_heading_div">
        <p className="list_h1_app">
          <ArrowBackIcon className="leftArrowIcon" />
          &nbsp; Application title
          <p className="send_p2">Sent</p>
          <p className="send_p3">Receipt being processed</p>
          <p className="send_p4">Missing documents</p>
          <p className="send_p5">File validated</p>
          <p className="send_p6">Contract to be signed</p>
        </p>
      </div>
    </div>
  );
};

export default ApplicationHeader;
