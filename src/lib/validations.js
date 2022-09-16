import { validate } from "validate.js";


export const handleBlur = (e, formState,setFormState,schema) => {
    e.preventDefault();
    const {name} = e.target;
    const errors = validate(formState.values, schema);
    console.log("Errors ", errors );
    console.log("Lastest state  ", formState);
    setFormState((formState) => ({
      ...formState,
      errors: errors ?? {},
      touched: {...formState.touched, [name]: true},
      isValid: errors ? false : true

    }))
  }