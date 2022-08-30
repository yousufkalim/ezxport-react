import React from 'react';
import { ReactComponent as Calendar } from '../../assets/calendarIcon.svg';
const DatePicker = (props) => {
  return (
    <div className="calender_div">
      &nbsp;
      <Calendar />
      <input
        type="date"
        className="input_Calendar"
        id="date"
        name={props.name}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
};

export default DatePicker;
