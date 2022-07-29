import React from 'react';
import CalculationCoefficient from './CalculationCoefficient';
import CalculationRange from './CalculationRange';

const AdminTab4 = () => {
  const [currentRadioValue, setCurrentValue] = React.useState('on');
  const handleRadioChange = (value) => {
    setCurrentValue(value);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0',
        }}
      >
        <input
          name="radio-item-1"
          value="on"
          type="radio"
          onChange={(e) => setCurrentValue(e.target.value)}
          defaultChecked={currentRadioValue === 'on'}
        />
        <label
          htmlFor="radio-item-1"
          style={{
            paddingLeft: '5px',
          }}
        >
          Calculation by coefficient
        </label>

        <input
          style={{
            marginLeft: '20px',
          }}
          name="radio-item-1"
          value="off"
          type="radio"
          onChange={(e) => setCurrentValue(e.target.value)}
          defaultChecked={currentRadioValue === 'off'}
        />
        <label
          style={{
            paddingLeft: '5px',
          }}
          htmlFor="radio-item-2"
        >
          Calculation by range
        </label>
      </div>
      {currentRadioValue === 'on' && <CalculationCoefficient />}
      {currentRadioValue === 'off' && <CalculationRange />}
    </>
  );
};

export default AdminTab4;
