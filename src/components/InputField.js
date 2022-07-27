import React from 'react';
// import Quiz from '../assets/Quiz.png';

const InputField = (props) => {
  return (
    <>
      <div className="input_field2">
        <input
          className={props.className}
          type={props.type}
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
        <img src={props.Quiz} alt="" className="quizIcon" />
      </div>
    </>
  );
};

export default InputField;
