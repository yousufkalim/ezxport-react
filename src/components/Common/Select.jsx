import React from "react";

const Select = (props) => {
  return (
    <>
      <select defaultValue={props.defaultValue} name={props.name} className={props.className} onChange={props.onChange}>
        <option value={true}>"Not subject"</option>
        <option value={false}>"Subject to inspection"</option>
      </select>
    </>
  );
};

export default Select;
