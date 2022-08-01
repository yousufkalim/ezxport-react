import React from 'react';
import CalculationCoefficient from './CalculationCoefficient';
import CalculationRange from './CalculationRange';
import DownArrow from '../../assets/TitleDownArrow.svg';
import DeleteIcon from '../../assets/DeleteIcon.svg';
import EditIcon from '../../assets/EditIcon.svg';

function createData(name, calories, fat, carbs, protein, protein2) {
  return { name, calories, fat, carbs, protein, protein2 };
}
const rows = [
  createData('500 €', '999 €', '300 €', '22'),
  createData('500 €', '999 €', '300 €', '22'),
  createData('500 €', '999 €', '300 €', '22'),
];

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
          padding: '2% 0',
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
      {currentRadioValue === 'off' && (
        <CalculationRange rows={rows} img={DownArrow} DltIcon={DeleteIcon} editIcon={EditIcon} />
      )}
    </>
  );
};

export default AdminTab4;
