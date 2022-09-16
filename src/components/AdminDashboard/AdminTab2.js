import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from '../Common/Modal';
import InputField from '../Common/InputField';
import Button from '../Common/Button';
import API from '../../api/index';
import { toast } from 'react-toastify';
import DeleteIcon from '../../assets/DeleteIcon.svg';
import validate from 'validate.js';
import { useTranslation, Trans } from "react-i18next";
import { getSortedData } from '../../lib/getSortedData';
import downArrow from '../../assets/TitleDownArrow.svg';
import arrow_up from '../../assets/arrow_up.svg';
import Spinner from "../Common/Spinner";
import ConfirmModal from '../Common/ConfirmModal';

const schema = {
  name: {
    presence: { allowEmpty: false, message: "is required" },
  },
  info: {
    presence: { allowEmpty: false, message: " is required" },
  },
};

const nestSortTitles = [];

const AdminTab2 = (props) => {
  const { rows, loading, setDocument } = props;
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      name: "",
      info: "",
    },
    touched: {},
    errors: {},
  });
  const [sort, setSort] = useState({ key: "", ascend: true });
  const [openModal, setOpenModal] = useState(false);
  const [docId, setDocId] = useState("");


  const { t, i18n } = useTranslation();
  const { language } = i18n;

  // const [name, setName] = useState("");
  // const [info, setInfo] = useState("");

  const handleAddDocuments = async () => {
    await API("post", "/documents/", {
      name: formState.values.name,
      info: formState.values.info,
      countries: [props.countryId],
    })
      .then((res) => {
        console.log("handleAddDocuments", res);
        props.handleCountryData();
        props.setOpenAddDocument(false);
        toast.success("Document Added Successfully");
        setFormState((formState) => ({
          ...formState,
          values: {
            name: "",
            info: "",
          },
          touched: {},
          errors: {},
        }));
      })
      .catch((err) => {
        console.log("handleAddDocuments", err);
        props.setOpenAddDocument(false);
        toast.error(err.response.data.message);
      });
  };

  console.log("Documents ", props.rows);

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleDocumentDelete = async (id) => {
    await API("delete", `/documents/${id}`)
      .then((res) => {
        console.log(res);
        props.handleCountryData();
        setOpenModal(false);
        setDocId("");
        toast.success("Document Deleted Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };
  const handleChange = (event) => {
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
  };
  const hasError = (field) => (formState.touched[field] && formState.errors[field] ? true : false);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#667085', backgroundColor: '#F9FAFB' }}>
                Documents
                {
                  !sort.ascend ? (
                    <img className='sorting-icon' onClick={() => getSortedData(rows, setDocument, setSort, nestSortTitles, 'name', true)} src={arrow_up} alt="" />
                  ) : (
                    <img onClick={() => getSortedData(rows, setDocument, setSort, nestSortTitles, 'name', false)} src={downArrow} alt="" />
                  )
                }
              </TableCell>
              <TableCell sx={{ color: "#667085", backgroundColor: "#F9FAFB" }}>
                {t("Help Information")} <img src={props.img} alt="" />
              </TableCell>
              <TableCell sx={{ color: "#667085", backgroundColor: "#F9FAFB" }}>
                Actions <img src={props.img} alt="" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell style={{ width: '20%' }} component="th" scope="row" sx={{ padding: 2 }}>
                  <p className="AP_plus_title">{row?.name}</p>
                </TableCell>
                <TableCell component="th" scope="row" sx={{ padding: 2 }}>
                  <p className="AP_plus_title">{row?.info}</p>
                </TableCell>
                <TableCell align="left" className="country2">
                  <img
                    src={DeleteIcon}
                    alt=""
                    className="dltIcon"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setOpenModal(true);
                      setDocId(row._id);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmModal open={openModal} setOpen={setOpenModal} action={() => handleDocumentDelete(docId)} />
      <Modal
        open={props.openAddDocument}
        setOpen={props.setOpenAddDocument}
        title={t("Add Documents")}
        handleClose={props.handleAddDocumentModalClose}
        Closebtn={true}
      >
        <div style={{ height: "20%" }}>
          <label htmlFor="" className="label_modal">
            {t("Document Name")}
          </label>
          <InputField
            name="name"
            value={formState.values.name}
            className={
              hasError("name") && formState.errors.info
                ? "textfield_addvendor_red"
                : "textfield_addvendor"
            }
            onChange={handleChange}
          />
          <div className="error-format">{hasError("name") ? formState.errors.name[0] : null}</div>
          <label htmlFor="" className="label_modal">
            {t("Help Information")}
          </label>{" "}
          <InputField
            name="info"
            value={formState.values.info}
            className={
              hasError("info") && formState.errors.info
                ? "textfield_addvendor_red"
                : "textfield_addvendor"
            }
            onChange={handleChange}
          />
          <div className="error-format">{hasError("info") ? formState.errors.info[0] : null}</div>
          <Button
            text="Add Document"
            disabled={!formState.isValid ? true : false}
            className={formState.isValid ? "add_vendor_button" : "add_vendor_button_disabled"}
            onClick={handleAddDocuments}
          />
        </div>
      </Modal>
    </>
  );
};

export default AdminTab2;
