import React from 'react';
import ListOfRequests from './ListOfRequests';

const RightSlide = ({ activeUploadButton }) => {
  return (
    <>
      <div className="dashboard_right_side">
        {activeUploadButton == 1 ? <ListOfRequests /> : null}
        {activeUploadButton == 2 ? <p>Service providers</p> : null}
        {activeUploadButton == 3 ? <p>Address Book</p> : null}
        {activeUploadButton == 4 ? <p>Documents</p> : null}
      </div>
    </>
  );
};

export default RightSlide;
