import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Applicaation = () => {
  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          {/* list head  */}
          <div className="List_heading_div">
            <p className="list_h1">
              <ArrowBackIcon className="leftArrowIcon" />
              &nbsp; Application title
            </p>
          </div>
          {/* list table   */}
          <div className="list_table">abc</div>
        </div>
      </div>
    </>
  );
};

export default Applicaation;
