import React from 'react';
import { useTranslation } from "react-i18next";

const InputField = (props) => {
  const { isError, error, label } = props;
  const { t } = useTranslation();
  return (
    <>
      <div className="input_field2">

        {props.label &&
          <label htmlFor="" className="buyer_label">
            {t(label)}
          </label>
        }
        <input
          // {...props}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          name={props.name}
          value={props.value}
          className={`${props.className ?? "input-field "}  ${error && isError && "input_field_error"}`}
          type={props.type}
          placeholder={props.placeholder}
          onChange={props.onChange}
          disabled={props.disabled}
          autoComplete={props.autoComplete}
          role={props.role}
        />
        <img src={props.icon} alt="" className="quizIcon" />
        {props.visibleEye && <props.icon2 className="quizIcon" onClick={props.onClick} />}
      </div>
      {
        isError && (
          <div className='input-error'>{error?.[0] ?? null}</div>
        )
      }
    </>
  );
};

export default InputField;
