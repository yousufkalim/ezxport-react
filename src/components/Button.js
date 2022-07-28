import React from 'react';

const Button = (props) => {
  return (
    <>
      <button className={props.className} onClick={props.onClick}>
        <img src={props.Imgsrc} alt="" /> &nbsp; {props.text}
      </button>
    </>
  );
};

export default Button;
