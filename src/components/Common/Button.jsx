import React from "react";

const Button = (props) => {
  return (
    <>
<<<<<<< HEAD
      <button className={props.className} onClick={props.onClick} type="button" disabled={props.disabled}>
=======
      <button
        className={props.className}
        onClick={props.onClick}
        type="button"
        disabled={props.disabled}
      >
>>>>>>> d406b3caee9a2bf0861fa87c56d4a71b5366081f
        <img src={props.Imgsrc} alt="" />
        &nbsp;
        {props.text}
      </button>
    </>
  );
};

export default Button;
