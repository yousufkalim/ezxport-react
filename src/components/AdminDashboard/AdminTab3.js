import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "../../assets/DeleteIcon.svg";
import API from "../../api/index";
import Modal from "../../components/Common/Modal";
import InputField from "../../components/Common/InputField";
import Button from "../Common/Button";
import validate from "validate.js";
import { useTranslation } from "react-i18next";
import ConfirmModal from "../Common/ConfirmModal";
import { getSortedData } from "../../lib/getSortedData";
import downArrow from "../../assets/TitleDownArrow.svg";
import arrow_up from "../../assets/arrow_up.svg";
import Spinner from "../Common/Spinner";
import toaster from "../../utils/toaster";

const schema = {
  code: {
    presence: { allowEmpty: false, message: "is required" },
  },
};
const updateSchema = {
  bomCode: {
    presence: { allowEmpty: false, message: "is required" },
  },
};

const nestSortTitles = [];

const AdminTab3 = (props) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [bomId, setBomId] = useState("");

  const [newCertificate_status, setNewCertificate_status] = useState("default");
  const [certificate_status, setCertificate_status] = useState("");
  const [sort, setSort] = useState({ key: "", ascend: true });

  const { loading, rows, setBoms } = props;

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      code: "",
    },
    touched: {},
    errors: {},
  });
  const [updateBomCode, setUpdateBomCode] = useState({
    isValid: false,
    values: {
      bomCode: "",
    },
    touched: {},
    errors: {},
  });

  const { t } = useTranslation();

  const hasError = (field) => (formState.touched[field] && formState.errors[field] ? true : false);

  const updateHasError = (field) =>
    updateBomCode.touched[field] && updateBomCode.errors[field] ? true : false;

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  useEffect(() => {
    const errors = validate(updateBomCode.values, updateSchema);
    setUpdateBomCode((updateBomCode) => ({
      ...updateBomCode,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [updateBomCode.values]);

  const handleChange = (event) => {
    if (!event.target.value.match(/[^a-zA-Z0-9]/)) {
      setFormState((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          [event.target.name]: event.target.value,
        },
        touched: {
          ...formState.touched,
          [event.target.name]: true,
        },
      }));
    }
  };

  const handleBomDelete = async (BomId) => {
    await API("delete", `/boms/${BomId}`)
      .then((res) => {
        props.handleCountryData();
        setBomId("");
        setOpenModal(false);
        toaster("success", t("BOMs deleted successfully"), t("Deleted BOMs"));
      })
      .catch((err) => {
        console.log("handleBomDelete", err);
      });
  };
  const handleClose = () => {
    setOpen(false);
    // setSelect([]);
  };

  const handleEditBomClick = (bomcode) => {
    setOpen(true);
    setData(bomcode);
    setUpdateBomCode((updateBomCode) => ({
      ...updateBomCode,
      values: {
        ...updateBomCode.values,
        bomCode: bomcode.code,
      },
    }));
    setCertificate_status(bomcode.certification_required);
  };
  const handleAddBom = async () => {
    await API("post", "/boms", {
      code: formState.values.code,
      certification_required: true,
      countries: [props?.countryId],
    })
      .then((res) => {
        props.handleCountryData();
        props.setOpenAddBomModal(false);
        setFormState((formState) => ({
          ...formState,
          values: {
            ...formState.values,
            code: "",
            certificate_status: "",
            countries: "",
          },
          touched: {
            ...updateBomCode.touched,
            code: false,
            certificate_status: false,
            countries: false,
          },
        }));
        toaster("success", t("BOMs added successfully"), t("Adding BOMs"));
      })
      .catch((err) => {
        console.log("handleAddBom", err);
        setNewCertificate_status("default");
        props.setOpenAddBomModal(false);
        toaster("Failed", t(err.response.data.message));

        setFormState((formState) => ({
          ...formState,
          values: {
            ...formState.values,
            code: "",
            certificate_status: "",
            countries: "",
          },
          touched: {
            ...updateBomCode.touched,
            code: false,
            certificate_status: false,
            countries: false,
          },
        }));
      });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#667085", backgroundColor: "#F9FAFB" }}>BOMs code</TableCell>
              <TableCell sx={{ color: "#667085", backgroundColor: "#F9FAFB" }}>
                {t("Status")}
                {!sort.ascend ? (
                  <img
                    className="sorting-icon"
                    onClick={() =>
                      getSortedData(
                        rows,
                        setBoms,
                        setSort,
                        nestSortTitles,
                        "certification_required",
                        true
                      )
                    }
                    src={arrow_up}
                    alt=""
                  />
                ) : (
                  <img
                    onClick={() =>
                      getSortedData(
                        rows,
                        setBoms,
                        setSort,
                        nestSortTitles,
                        "certification_required",
                        false
                      )
                    }
                    src={downArrow}
                    alt=""
                  />
                )}
              </TableCell>

              <TableCell sx={{ color: "#667085", backgroundColor: "#F9FAFB" }}>
                {t("Actions")}
              </TableCell>
            </TableRow>
          </TableHead>
          {loading ? (
            <Spinner />
          ) : (
            <TableBody>
              {props.rows.map((row) => (
                <TableRow key={row.createData}>
                  <TableCell
                    // style={{ width: "20%" }}
                    component="th"
                    scope="row"
                    sx={{ padding: 2 }}
                    align="left"
                  >
                    <p className="AP_plus_title">{row.code}</p>
                  </TableCell>
                  <TableCell component="th" scope="row" sx={{ padding: 2 }} align="left">
                    {/* <p
                        style={{
                          background: "#ECFDF3",
                          borderRadius: "16px",
                          display: "inline-block",
                          padding: "2px 5px",
                          color: "#027A48",
                        }}
                      ></p> */}
                    {row.certification_required === true ? (
                      <p
                        style={{
                          background: "#ECFDF3",
                          borderRadius: "16px",
                          display: "inline-block",
                          padding: "2px 5px",
                          color: "#027A48",
                        }}
                      >
                        {t("Subject to inspection")}
                      </p>
                    ) : (
                      <p
                        style={{
                          background: "#FFFAEB",
                          borderRadius: "16px",
                          display: "inline-block",
                          padding: "2px 5px",
                          color: "#B54708",
                        }}
                      >
                        {t("Not subject")}
                      </p>
                    )}
                  </TableCell>
                  <TableCell align="left" className="country2">
                    <img
                      src={DeleteIcon}
                      alt=""
                      className="dltIcon"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setBomId(row._id);
                        setOpenModal(true);
                      }}
                    />

                    {/* <img
                      src={EditIcon}
                      alt=""
                      className="dltIcon"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleEditBomClick(row);
                      }}
                    /> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <ConfirmModal open={openModal} setOpen={setOpenModal} action={() => handleBomDelete(bomId)} />

      {/* update modal */}
      {/* <Modal open={open} setOpen={setOpen} title={t("Update")} handleClose={handleClose} Closebtn={true}>
        <div style={{ height: "20%" }}>
          <label htmlFor="" className="label_modal">
            BOMs code
          </label>{" "}
          <InputField
            name="bomCode"
            value={updateBomCode.values.bomCode}
            className={
              updateHasError("bomCode") && updateBomCode.errors.bomCode ? "textfield_addvendor_red" : "textfield_addvendor"
            }
            onChange={handleUpdateBomChange}
          />
          <div className="error-format">{updateHasError("bomCode") ? updateBomCode.errors.bomCode[0] : null}</div>
          <label htmlFor="" className="label_modal">
            {t("Status")}
          </label>{" "}
          <select
            defaultValue={certificate_status}
            name="certificate_status"
            className="textfield_addvendor"
            onChange={(e) => setCertificate_status(e.target.value)}
          >
            <option value={false}>{t("Not subject")}</option>
            <option value={true}>{t("Subject to inspection")}</option>
          </select>
          {/* <label htmlFor="" className="label_modal">
            {t("Select country for BOMs")}
          </label>
          <MultiSelect
            name="countries"
            onChange={handleCountryChange}
            value={select}
            names={names}
            select={select}
          /> */}
      {/* <Button
            text={t("Update")}
            className={updateBomCode.isValid ? "add_vendor_button" : "add_vendor_button_disabled"}
            disabled={!updateBomCode.isValid ? true : false}
            onClick={() => handleBomUpdate(data._id)}
          />
        </div> */}
      {/* </Modal>  */}
      {/* Add modal */}
      <Modal
        open={props.openAddBomModal}
        setOpen={props.setOpenAddBomModal}
        title="Add BOMs"
        handleClose={props.handleAddBomModalClose}
        Closebtn={true}
      >
        <div style={{ height: "20%" }}>
          <label htmlFor="" className="label_modal">
            BOMs code
          </label>{" "}
          <InputField
            name="code"
            value={formState.values.code}
            className={
              hasError("code") && formState.errors.code
                ? "textfield_addvendor_red"
                : "textfield_addvendor"
            }
            onChange={handleChange}
          />
          <div className="error-format">{hasError("code") ? t(formState.errors.code[0]) : null}</div>
          {/* <label htmlFor="" className="label_modal">
            {t("Status")}
          </label>{" "}
          <select
            defaultValue={newCertificate_status}
            name="certificate_status"
            className="textfield_addvendor"
            onChange={(e) => setNewCertificate_status(e.target.value)}
          >
            <option disabled value={"default"}>
              {t("Select an Option")}
            </option>
            <option value={false}>{t("Not subject")}</option>
            <option value={true}>{t("Subject to inspection")}</option>
          </select> */}
          {/* <label htmlFor="" className="label_modal">
            {t("Select country for BOMs")}
          </label>
          <MultiSelect
            name={"countries"}
            onChange={handleCountryChange}
            value={select}
            names={names}
            select={select}
          /> */}
          <Button
            text={t("Add")}
            className={formState.isValid ? "add_vendor_button" : "add_vendor_button_disabled"}
            onClick={handleAddBom}
            disabled={!formState.isValid ? true : false}
          />
        </div>
      </Modal>
    </>
  );
};

export default AdminTab3;
