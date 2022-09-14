import React from "react";
import FormControl from "@mui/material/FormControl";
import InputField from "../Common/InputField";

const CalculationCoefficient = ({ coefficientChange, currency }) => {

  return (
    <>
      <div className="Coefficient_main">
        <div className="Coefficient_input_div">
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                Minimum threshold
              </label>
              <InputField value={`${coefficientChange?.min_threshold?.value} ${currency === "USD" ? "$" : "€"}`} disabled={true} className="calculation_input" />
            </FormControl>
          </div>
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                Coefficient
              </label>

              <InputField value={`${coefficientChange?.coefficient} %`} disabled={true} className="calculation_input" />
            </FormControl>
          </div>
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                Minimum cost
              </label>
              <InputField value={`${coefficientChange?.min_cost?.value} ${currency === "USD" ? "$" : "€"}`} disabled={true} className="calculation_input" />
            </FormControl>
          </div>
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                Coût maximum
              </label>
              <InputField value={`${coefficientChange?.max_cost?.value} ${currency === "USD" ? "$" : "€"}`} disabled={true} className="calculation_input" />
            </FormControl>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalculationCoefficient;
