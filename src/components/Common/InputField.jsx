import React from 'react';
// import Quiz from '../assets/Quiz.png';

const InputField = (props) => {
  return (
    <>
      <div className="input_field2">
        <input
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          name={props.name}
          value={props.value}
          className={props.className}
          type={props.type}
          placeholder={props.placeholder}
          onChange={props.onChange}
          disabled={props.disabled}
        />
        <img src={props.icon} alt="" className="quizIcon" />
      </div>
    </>
  );
};

export default InputField;


