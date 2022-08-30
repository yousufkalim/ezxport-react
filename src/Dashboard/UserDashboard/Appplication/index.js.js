import React from 'react';
import ApplicationHeader from './ApplicationHeader';
import ApplicationTab from './ApplicationTab';
import ProductLists from './ProductLists';

const Application = () => {
  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          {/* list head  */}
          <ApplicationHeader />
          <ApplicationTab />
        </div>
      </div>
    </>
  );
};

export default Application;
