import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextFieldSelect from '../Common/TextFieldSelect';
import FormControl from '@mui/material/FormControl';
import DownArrow from '../../assets/TitleDownArrow.svg';
import DeleteIcon from '../../assets/DeleteIcon.svg';
import EditIcon from '../../assets/EditIcon.svg';
import API from '../../api/index';
import { toast } from 'react-toastify';
import Modal from '../Common/Modal';
import validate from 'validate.js';
import Button from '../Common/Button';
import InputField from '../Common/InputField';
import { useTranslation, Trans } from "react-i18next";
import ConfirmModal from "../Common/ConfirmModal";

const schema = {
  minCost: {
    presence: { allowEmpty: false, message: "is required" },

  },
  maxCost: {
    presence: { allowEmpty: false, message: "is required" },
},
  certificate: {
    presence: { allowEmpty: false, message: "is required" },
  },
};
const CalculationRange = (props) => {
  const [rangeData, setRangeData] = useState();
  const [itemId, setItemId] = useState();
  const [editModal, setEditModal] = useState(false);
  // const [certificat, setCertificat] = useState();
  // const [minCost, setMinCost] = useState();
  // const [maxCost, setMaxCost] = useState();
  //
  const [rangeCertificat, setRangeCertificat] = useState();
  const [rangeMinCost, setRangeMinCost] = useState();
  const [rangeMaxCost, setRangeMaxCost] = useState();
  const [allErrors, setAllErrors] = useState({min: '', max: '', certificate: ''});
  const [openModal, setOpenModal] = useState(false);
  const [rangeId, setRangeId] = useState("");

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      minCost: "",
      maxCost: "",
      certificate: "",
    }
  });

  const { t, i18n } = useTranslation();

  useEffect(() => {
    if(formState.values.minCost){
      const {min, max} = allErrors;
      const {minCost, maxCost, certificate} = formState.values;
      if(!min && !max && !allErrors.certificate && minCost && maxCost && certificate) {
        setFormState({...formState, isValid: true})
      }else{
        setFormState({...formState, isValid: false})
  
      }
    }
  }, [formState.values, allErrors])

  const handleValuesChange = (event) => {
    const validatedValue = event.target.value.replace(/[^0-9]/g, "");
    if (validatedValue === "0") {
      if (formState.values.minCost !== "") {
        return setFormState((formState) => ({
          ...formState,
          values: {
            ...formState.values,
            [event.target.name]: validatedValue,
          },
        }));
      }
    } else {
      return setFormState((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          [event.target.name]: validatedValue,
        }
      }));
    }
  };

  const handleRangeData = async () => {
    await API("get", `/calculations/${props?.id}`)
      .then((res) => {
        console.log(res, "handleRangeData");
        setRangeData(res?.data?.calculation?.range);
      })
      .catch((err) => {
        console.log(err, "handleRangeData");
      });
  };
  const handleAddRange = async () => {
    await API("put", `/calculations/addRange/${props.id}`, {
      range: {
        min: formState.values.minCost,
        max: formState.values.maxCost,
        certificate_cost: formState.values.certificate,
      },
    })
      .then((res) => {
        console.log("handleAddRange", res);
        handleRangeData();
        setFormState((formState) => ({
          ...formState,
          values: {

            minCost: "",
            maxCost: "",
            certificate: "",
          }, isValid: false,

        }));
        // setMaxCost("");
        // setCertificat("");
        toast.success("Range added successfully");
      })
      .catch((err) => {
        console.log("handleAddRange", err);
      });
  };

  const handleBlur = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const val = parseInt(value);
    const {minCost, maxCost} = formState.values;
    const latestValues = rangeData[rangeData?.length - 1];
    const latestMax = latestValues?.max + 1;
    const latestCertificate= latestValues?.certificate_cost;
    console.log("LATEST MAX ", latestValues);
    console.log("LATEST value ", val);
    console.log("NAME ", name);
    console.log("NAME ", val !== latestMax);

    if(name === 'minCost'){
      if (rangeData?.length && val !== latestMax){
        setAllErrors({...allErrors, min: "Please enter valid minimum cost"})
      }
      else if(maxCost && val >= maxCost ){
        setAllErrors({...allErrors, min: "Minimum cost should be less than maximum cost"});
      }
      else {
        setAllErrors({...allErrors, min: ""});
      }
    }
    else if(name === 'maxCost'){
      if(val <= minCost ){
        setAllErrors({...allErrors, max: "Maxminm cost should be greater than minimum cost"});
      }
      else {
        setAllErrors({...allErrors, max: ""});
      }
    }
    else if (name === 'certificate') {
        if(rangeData?.length && val <= latestCertificate) {
          setAllErrors({...allErrors, certificate: "Certificate cost should be greater than previous one"});
        }
        else {
          setAllErrors({...allErrors, certificate: ""});

        }
    }

  }

  console.log("FORM state ", formState)

  const handleNewRange = async () => {
    await API("post", `/calculations/`, {
      country: props.CountryId,
      type: "range",
      range: {
        min: formState.values.minCost,
        max: formState.values.maxCost,
        certificate_cost: formState.values.certificate,
      },
    })
      .then((res) => {
        console.log("handleAddCoefficient", res);
        props.setOpenCalculationModal(false);

        setFormState((formState) => ({
          ...formState,
          values: {
            minCost: "",
            maxCost: "",
            certificate: "",
          },
          isValid: true,
        }));

        toast.success("Coefficient Added Successfully");
      })
      .catch((err) => {
        console.log("handleAddCoefficient", err);
      });
  };
  const handleDeleteCalculation = async (calId) => {
    await API("put", `/calculations/deleteRange/${props?.id}`, {
      rangeId: calId,
    })
      .then((res) => {
        console.log("handleDeleteCalculation", res);
        handleRangeData();
        setOpenModal(false);
        setRangeId('');
        toast.success("Range Deleted successfully");
      })
      .catch((err) => {
        console.log("handleDeleteCalculation", err);
      });
  };
  const handleUpdateRange = async () => {
    await API("put", `/calculations/updateRange/${props?.id}`, {
      range: {
        max: rangeMaxCost,
        min: rangeMinCost,
        certificate_cost: rangeCertificat,
      },
      rangeId: itemId,
    })
      .then((res) => {
        setEditModal(false);
        console.log("handleUpdateRange", res);
        handleRangeData();
        toast.success("Range updated successfully");
      })
      .catch((err) => {
        console.log("handleUpdateRange", err);
      });
  };
  useEffect(() => {
    handleRangeData();
  }, []);

  const handleEditModalClose = () => setEditModal(false);
  const hasError = (name) => (allErrors[name] && allErrors[name] ? true : false);

  console.log("ERRORS ", allErrors);

  return (
    <>
      <div>
        {/* table  */}
        {rangeData === undefined || rangeData?.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" className="country" style={{ backgrounColor: "#EAECF0" }}>
                    {t("Minimum")} <img src={DownArrow} alt="" />
                  </TableCell>
                  <TableCell align="left" className="country" style={{ backgrounColor: "#EAECF0" }}>
                    {t("Maximum")} <img src={DownArrow} alt="" />
                  </TableCell>
                  <TableCell align="left" className="country" style={{ backgrounColor: "#EAECF0" }}>
                    Coût certificat <img src={DownArrow} alt="" />
                  </TableCell>
                  <TableCell align="left" className="country" style={{ backgrounColor: "#EAECF0" }}>
                    Actions <img src={DownArrow} alt="" />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rangeData?.map((item) => (
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row" style={{ width: '20%' }}>
                      <p className="AP_plus_title">{`${item.min} ${props.currency === "USD" ? "$" : "€"}`}</p>
                    </TableCell>
                    <TableCell align="left" className="country2" style={{ width: '20%' }}>
                      <p className="AP_plus_title">{`${item.max} ${props.currency === "USD" ? "$" : "€"}`}</p>
                    </TableCell>
                    <TableCell align="left" className="country2">
                      <p className="AP_plus_title">{`${item.certificate_cost} ${props.currency === "USD" ? "$" : "€"}`}</p>
                    </TableCell>
                    <TableCell align="left" className="country2">
                      <img
                        src={DeleteIcon}
                        alt=""
                        className="dltIcon"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setOpenModal(true);
                          setRangeId(item._id);
                        }}
                      />

                      <img
                        src={EditIcon}
                        alt=""
                        className="dltIcon"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setEditModal(true);
                          setItemId(item._id);
                          setRangeCertificat(item.certificate_cost);
                          setRangeMinCost(item.min);
                          setRangeMaxCost(item.max);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          ""
        )}
        <div className="AddSlice_main">
          <div className="AddSlice_senter">
            <h2 className="AddSlice_title">{t("Add a slice")}</h2>
            <div className="AddSlice_inputs_div">
              <div className="AddSlice_input_fields">
                <FormControl fullWidth>
                  <InputField
                    label="Minimum"
                    isError={
                      hasError("min")
                    }
                    error={[allErrors.min]}
                    value={formState.values.minCost}
                    name="minCost"
                    onChange={handleValuesChange}
                    onBlur={(e) => handleBlur(e)}
                    type="tel"
                    className="calculation_input"
                  />
                </FormControl>
              </div>
              <div className="AddSlice_input_fields">
                <FormControl fullWidth>
                  <InputField
                    label="Maximum"
                    isError={
                      hasError("max")
                    }
                    error={[allErrors.max]}
                    value={formState.values.maxCost}
                    name="maxCost"
                    onChange={handleValuesChange}
                    onBlur={(e) => handleBlur(e)}
                    className="calculation_input"

                  />
                </FormControl>
              </div>
              <div className="AddSlice_input_fields">
                <FormControl fullWidth>
                  <label htmlFor="" className="buyer_label">
                    Coût certificat
                  </label>
                  <InputField
                    value={formState.values.certificate}
                    isError={
                      hasError("certificate")
                    }
                    error={[allErrors.certificate]}
                    name="certificate"
                    onChange={handleValuesChange}
                    onBlur={(e) => handleBlur(e)}
                    className="calculation_input"

                  />
                </FormControl>
              </div>
            </div>

            <button
              className={!formState.isValid ? "AddSlice_button_disabled" : "AddSlice_button"}
              onClick={props.Calculation ? handleAddRange : handleNewRange}
              disabled={!formState.isValid}
            >
              Ajouter la ligne
            </button>
          </div>
        </div>
      </div>
      <ConfirmModal open={openModal} setOpen={setOpenModal} action={() => handleDeleteCalculation(rangeId)} />
      <Modal
        open={editModal}
        setOpen={setEditModal}
        title={t("Edit Range")}
        handleClose={handleEditModalClose}
        Closebtn={true}
      >
        <div>
          <FormControl fullWidth style={{ marginTop: "1rem" }}>
            <label htmlFor="" className="buyer_label">
              {t("Minimum")}
            </label>
            <InputField
              value={rangeMinCost}
              onChange={(e) => setRangeMinCost(e.target.value)}
              className="calculation_input"


            />
          </FormControl>
          <FormControl fullWidth style={{ marginTop: "1rem" }}>
            <label htmlFor="" className="buyer_label">
              {t("Maximum")}
            </label>
            <InputField
              value={rangeMaxCost}
              onChange={(e) => setRangeMaxCost(e.target.value)}
              className="calculation_input"

            />
          </FormControl>
          <FormControl fullWidth style={{ marginTop: "1rem" }}>
            <label htmlFor="" className="buyer_label">
              Coût certificat
            </label>
            <InputField
              value={rangeCertificat}
              onChange={(e) => setRangeCertificat(e.target.value)}
              className="calculation_input"

            />
          </FormControl>
          <div style={{ marginTop: "2rem" }}>
            <Button
              text={t("Update")}
              className="bom_downloadFile_btn"
              onClick={handleUpdateRange}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default CalculationRange;
