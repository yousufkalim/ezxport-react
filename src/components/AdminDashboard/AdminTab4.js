import React, { useState } from "react";
import CalculationRange from "./CalculationRange";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import TextFieldSelect from "../Common/TextFieldSelect";
import Modal from "../Common/Modal";
import Button from "../Common/Button";
import API from "../../api/index";
import { toast } from "react-toastify";
function createData(name, calories, fat, carbs, protein, protein2) {
  return { name, calories, fat, carbs, protein, protein2 };
}

const AdminTab4 = (props) => {
  // const [currentRadioValue, setCurrentRadioValue] = useState(props?.calculation?.type);

  const [thresholdCurrency, setThresholdCurrency] = useState(
    props?.calculation?.min_threshold?.currency
  );
  const [minCostCurrency, setMinCostCurrency] = useState(
    props?.calculation?.min_cost?.currency
  );
  const [maxCostCurrency, setMaxCostCurrency] = useState(
    props?.calculation?.max_cost?.currency
  );
  const [MinThreshold, setMinThreshold] = useState(
    props?.calculation?.min_threshold?.value
  );
  const [coefficient, setCoefficient] = useState(
    props?.calculation?.coefficient
  );
  const [minCost, setMinCost] = useState(props?.calculation?.min_cost?.value);
  const [maxCost, setMaxCost] = useState(props?.calculation?.max_cost?.value);

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
          Calculation by coefficient
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
          Calculation by range
        </label>
      </div>

      {props.currentRadioValue === "range" ? (
        <CalculationRange id={props?.calculation?._id} CountryId={props.countryId} Calculation={props.calculation} />
      ) : props.currentRadioValue === "coefficient" ? (
        <>
          <div className="Coefficient_main">
            <div className="Coefficient_input_div">
              <div className="luyer_input_field">
                <FormControl fullWidth>
                  <label htmlFor="" className="buyer_label">
                    Minimum threshold
                  </label>
                  <TextFieldSelect
                    value={
                      thresholdCurrency === "USD"
                        ? "$ " + MinThreshold
                        : maxCostCurrency === "EURO"
                        ? "€ " + MinThreshold
                        : ""
                    }
                    disabled={true}
                  />
                </FormControl>
              </div>
              <div className="luyer_input_field">
                <FormControl fullWidth>
                  <label htmlFor="" className="buyer_label">
                    Coefficient
                  </label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    value={coefficient}
                    sx={{
                      ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
                        {
                          height: "1rem !important",
                        },
                    }}
                  />
                </FormControl>
              </div>
              <div className="luyer_input_field">
                <FormControl fullWidth>
                  <label htmlFor="" className="buyer_label">
                    minimum cost
                  </label>
                  <TextFieldSelect
                    value={
                      minCostCurrency === "USD"
                        ? "$ " + minCost
                        : maxCostCurrency === "EURO"
                        ? "€ " + minCost
                        : ""
                    }
                    disabled={true}
                  />
                </FormControl>
              </div>
              <div className="luyer_input_field">
                <FormControl fullWidth>
                  <label htmlFor="" className="buyer_label">
                    Coût maximum
                  </label>
                  <TextFieldSelect
                    value={
                      maxCostCurrency === "USD"
                        ? "$ " + maxCost
                        : maxCostCurrency === "EURO"
                        ? "€ " + maxCost
                        : ""
                    }
                    disabled={true}
                  />
                </FormControl>
              </div>
            </div>
          </div>
        </>
      ) : (
        props.setCurrentRadioValue("coefficient")
      )}

      <Modal
        open={props.openCalculationModal}
        setOpen={props.setOpenCalculationModal}
        title="Mise à jour Calcul par coefficient"
        handleClose={props.handleCalculationClose}
        Closebtn={true}
      >
        <div className="Coefficient_input_div">
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                Minimum threshold
              </label>

              <TextFieldSelect
                value={MinThreshold}
                onChange={(e) => {
                  !e.target.value.match(/[^0-9]/) &&
                    setMinThreshold(e.target.value);
                }}
                onOptionChange={(e) => {
                  setThresholdCurrency(e.target.value);
                }}
              />
            </FormControl>
          </div>
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                Coefficient
              </label>
              <TextField
                onChange={(e) => {
                  !e.target.value.match(/[^0-9]/) &&
                    setCoefficient(e.target.value);
                }}
                id="outlined-basic"
                variant="outlined"
                value={coefficient}
                sx={{
                  ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                    height: "1rem !important",
                  },
                }}
              />
            </FormControl>
          </div>
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                minimum cost
              </label>

              <TextFieldSelect
                value={minCost}
                onChange={(e) => {
                  !e.target.value.match(/[^0-9]/) && setMinCost(e.target.value);
                }}
                onOptionChange={(e) => {
                  setMinCostCurrency(e.target.value);
                }}
              />
            </FormControl>
          </div>
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                Coût maximum
              </label>

              <TextFieldSelect
                value={maxCost}
                onChange={(e) => {
                  !e.target.value.match(/[^0-9]/) && setMaxCost(e.target.value);
                }}
                onOptionChange={(e) => {
                  setMaxCostCurrency(e.target.value);
                }}
              />
            </FormControl>
          </div>
          <Button
            text="Modifier"
            className={
              MinThreshold === "" ||
              minCost === "" ||
              maxCost == "" ||
              coefficient === ""
                ? "bom_downloadFile_btn_disabled"
                : "bom_downloadFile_btn"
            }
            onClick={
              props.calculation ? handleCoefficientChange : handleAddCoefficient
            }
            disabled={
              MinThreshold === "" ||
              minCost === "" ||
              maxCost === "" ||
              coefficient === ""
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
