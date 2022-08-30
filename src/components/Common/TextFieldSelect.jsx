import React from "react";

const TextFieldSelect = (props) => {
  return (
    <div style={{ position: "relative" }}>
      <input
        name={props.name}
        type={props.type}
        style={{
          width: "100%",
          height: "3rem",
          borderRadius: "9px",
          border: "1.5px solid #D0D5DD",
          outline: "none",
          fontSize: "1rem",
          paddingLeft: "1rem",
        }}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        disabled={props.disabled}
      />
      {/* <span>{props.currency === "USD" ? "$" : "€"}</span> */}
      <select name={props.selectName} className="textfiled_select_component" onChange={props.onOptionChange}>
        <option value={"USD"}>USD</option>
        <option value={"EURO"}>EURO</option>
      </select>
    </div>
  );
};

export default TextFieldSelect;
