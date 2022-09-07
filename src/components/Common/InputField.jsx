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
          autoComplete="new-password"
        />
        <img src={props.icon} alt="" className="quizIcon" />
        {props.visibleEye && <props.icon2 className="quizIcon" onClick={props.onClick} />}
      </div>
    </>
  );
};

export default InputField;
