import React from "react";
import FormControl from "@mui/material/FormControl";
import InputField from "../Common/InputField";

const CalculationCoefficient = ({ MinThreshold, coefficient, minCost, maxCost }) => {
  return (
    <>
      <div className="Coefficient_main">
        <div className="Coefficient_input_div">
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                Minimum threshold
              </label>
              <InputField value={MinThreshold} disabled={true} className="calculation_input" />
            </FormControl>
          </div>
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                Coefficient
              </label>

              <InputField value={coefficient ? coefficient + " %" : ""} disabled={true} className="calculation_input" />
            </FormControl>
          </div>
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                minimum cost
              </label>
              <InputField value={minCost} disabled={true} className="calculation_input" />
            </FormControl>
          </div>
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                Coût maximum
              </label>
              <InputField value={maxCost} disabled={true} className="calculation_input" />
            </FormControl>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalculationCoefficient;
