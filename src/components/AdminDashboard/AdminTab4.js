import React, { useState, useEffect } from "react";
import CalculationRange from "./CalculationRange";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import TextFieldSelect from "../Common/TextFieldSelect";
import Modal from "../Common/Modal";
import Button from "../Common/Button";
import API from "../../api/index";
import { toast } from "react-toastify";
import CalculationCoefficient from "./CalculationCoefficient";
import InputField from "../Common/InputField";
import { useTranslation, Trans } from "react-i18next";

function createData(name, calories, fat, carbs, protein, protein2) {
  return { name, calories, fat, carbs, protein, protein2 };
}

const AdminTab4 = (props) => {

  const [thresholdCurrency, setThresholdCurrency] = useState(
    props?.calculation?.min_threshold?.currency
  );
  const [minCostCurrency, setMinCostCurrency] = useState(props?.calculation?.min_cost?.currency);
  const [maxCostCurrency, setMaxCostCurrency] = useState(props?.calculation?.max_cost?.currency);
  const [MinThreshold, setMinThreshold] = useState(props?.calculation?.min_threshold?.value);
  const [coefficient, setCoefficient] = useState(props?.calculation?.coefficient);
  const [minCost, setMinCost] = useState(props?.calculation?.min_cost?.value);
  const [maxCost, setMaxCost] = useState(props?.calculation?.max_cost?.value);
  const [coefficientChange, setCoefficientChange] = useState(props?.calculation);

  const { t, i18n } = useTranslation();
  const { language } = i18n;

  const handleCoefficientChange = async () => {
    await API("put", `/calculations/${props?.calculation?._id}`, {
      country: props.countryId,
      type: "coefficient",
      min_threshold: { currency: thresholdCurrency, value: MinThreshold },
      coefficient: coefficient,
      min_cost: { currency: minCostCurrency, value: minCost },
      max_cost: { currency: maxCostCurrency, value: maxCost },
    })
      .then((res) => {
        console.log("handleCoefficientChange", res);
        props.setOpenCalculationModal(false);
        props.handleCountryData()
        setCoefficientChange(res?.data?.calculation)
        toast.success("Coefficient Updated Successfully");
      })
      .catch((err) => {
        console.log("handleCoefficientChange", err);
      });
  };
  const handleAddCoefficient = async () => {
    await API("post", `/calculations/`, {
      country: props.countryId,
      type: "coefficient",
      coefficient: coefficient,
      min_threshold: { currency: thresholdCurrency, value: MinThreshold },
      min_cost: { currency: minCostCurrency, value: minCost },
      max_cost: { currency: maxCostCurrency, value: maxCost },
    })
      .then((res) => {
        console.log("handleAddCoefficient", res);
        props.handleCountryData()
        setCoefficientChange(res?.data?.calculation)
        props.setOpenCalculationModal(false);
        toast.success("Coefficient Added Successfully");
      })
      .catch((err) => {
        console.log("handleAddCoefficient", err);
      });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "2% 0",
        }}
      >
        <input
          name="radio-item-1"
          value="on"
          type="radio"
          onChange={(e) => props.setCurrentRadioValue("coefficient")}
          defaultChecked={props.currentRadioValue === "coefficient"}
        />
        <label
          htmlFor="radio-item-1"
          style={{
            paddingLeft: "5px",
          }}
        >
          {t("Calculation by coefficient")}
        </label>

        <input
          style={{
            marginLeft: "20px",
          }}
          name="radio-item-1"
          value="off"
          type="radio"
          onChange={(e) => props.setCurrentRadioValue("range")}
          defaultChecked={props.currentRadioValue === "range"}
        />
        <label
          style={{
            paddingLeft: "5px",
          }}
          htmlFor="radio-item-2"
        >
          {t("Calculation by range")}
        </label>
      </div>

      {props.currentRadioValue === "range" ? (
        <CalculationRange id={props?.calculation?._id} CountryId={props.countryId} Calculation={props.calculation} currency={props.currency} />
      ) : (
        props.currentRadioValue === "coefficient" && (
            <CalculationCoefficient coefficientChange={coefficientChange} />
        )
      )}

      <Modal
        open={props.openCalculationModal}
        setOpen={props.setOpenCalculationModal}
        title={t("Update calculation by coefficient")}
        handleClose={props.handleCalculationClose}
        Closebtn={true}
      >
        <div className="Coefficient_input_div">
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                {t("Minimum threshold")}
              </label>

              <InputField
                className="calculation_input"
                value={MinThreshold}
                onChange={(e) => {
                  !e.target.value.match(/[^0-9]/) && setMinThreshold(e.target.value);
                }}
              />
            </FormControl>
          </div>
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                {t("Coefficient")} %
              </label>
              <InputField
                className="calculation_input"
                onChange={(e) => {
                  !e.target.value.match(/[^0-9]/) && setCoefficient(e.target.value);
                }}
                value={coefficient}
              />
            </FormControl>
          </div>
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                {t("minimum cost")}
              </label>

              <InputField
                className="calculation_input"
                value={minCost}
                onChange={(e) => {
                  !e.target.value.match(/[^0-9]/) && setMinCost(e.target.value);
                }}
              />
            </FormControl>
          </div>
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                {t("Maximum cost")}
              </label>

              <InputField
                className="calculation_input"
                value={maxCost}
                onChange={(e) => {
                  !e.target.value.match(/[^0-9]/) && setMaxCost(e.target.value);
                }}
              />
            </FormControl>
          </div>
          <Button
            text={t("Update")}
            className={
              MinThreshold === "" || minCost === "" || maxCost == "" || coefficient === ""
                ? "bom_downloadFile_btn_disabled"
                : "bom_downloadFile_btn"
            }
            onClick={props.calculation ? handleCoefficientChange : handleAddCoefficient}
            disabled={
              MinThreshold === "" || minCost === "" || maxCost === "" || coefficient === ""
                ? true
                : false
            }
          />
        </div>
      </Modal>
    </>
  );
};

export default AdminTab4;
