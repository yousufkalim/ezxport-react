import React, { useState } from 'react';
import Reference from './Reference';
import CompanyInformation from '../ValidateRequest/CompanyInformation';

const Index = () => {
  const [countTabe, setCountTabe] = useState();
  function TabeProps(data) {
    setCountTabe(data);
  }

  return (
    <>
      <Reference TabePropsCount={countTabe} />
      <CompanyInformation TabeProps={TabeProps} />
    </>
  );
};

export default Index;
