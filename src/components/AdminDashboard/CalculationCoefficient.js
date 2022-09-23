import React from "react";
import FormControl from "@mui/material/FormControl";
import InputField from "../Common/InputField";
import { useTranslation } from "react-i18next";

const CalculationCoefficient = ({ values, currency }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="Coefficient_main">
        <div className="Coefficient_input_div">
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                {t("Minimum threshold")}
              </label>
              <InputField
                value={
                  values?.MinThreshold
                    ? `${values?.MinThreshold} ${
                        currency === "USD" ? "$" : "€"
                      }`
                    : t("Minimum threshold")
                }
                disabled={true}
                className="calculation_input"
              />
            </FormControl>
          </div>
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                {t("Coefficient")}
              </label>

              <InputField
                value={
                  values?.coefficient
                    ? `${values?.coefficient} %`
                    : t("Coefficient")
                }
                disabled={true}
                className="calculation_input"
              />
            </FormControl>
          </div>
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                {t("Minimum cost")}
              </label>
              <InputField
                value={
                  values?.minCost
                    ? `${values?.minCost} ${currency === "USD" ? "$" : "€"}`
                    : t("Minimum cost")
                }
                disabled={true}
                className="calculation_input"
              />
            </FormControl>
          </div>
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                {t("Maximum cost")}
              </label>
              <InputField
                value={
                  values?.maxCost
                    ? `${values?.maxCost} ${currency === "USD" ? "$" : "€"}`
                    : t("Maximum cost")
                }
                disabled={true}
                className="calculation_input"
              />
            </FormControl>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalculationCoefficient;
