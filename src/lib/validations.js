import { validate } from "validate.js";

export const handleBlur = (e, formState, setFormState, schema) => {
  e.preventDefault();
  const { name } = e.target;
  const errors = validate(formState.values, schema);
  setFormState((formState) => ({
    ...formState,
    errors: errors ?? {},
    touched: { ...formState.touched, [name]: true },
    isValid: errors ? false : true,
  }));
};
