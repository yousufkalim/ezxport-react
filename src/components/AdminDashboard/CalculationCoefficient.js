import React from "react";
import FormControl from "@mui/material/FormControl";
import InputField from "../Common/InputField";
import { useTranslation, Trans } from "react-i18next";

const CalculationCoefficient = ({ MinThreshold, coefficient, minCost, maxCost }) => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  return (
    <>
      <div className="Coefficient_main">
        <div className="Coefficient_input_div">
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                {t("Minimum threshold")}
              </label>
              <InputField value={MinThreshold} disabled={true} className="calculation_input" />
            </FormControl>
          </div>
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                {t("Coefficient")}
              </label>

              <InputField
                value={coefficient ? coefficient + " %" : ""}
                disabled={true}
                className="calculation_input"
              />
            </FormControl>
          </div>
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                {t("minimum cost")}
              </label>
              <InputField value={minCost} disabled={true} className="calculation_input" />
            </FormControl>
          </div>
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                {t("Maximum cost")}
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
