import React, { useState } from "react";
import PaginationPage from "./Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "../Common/Modal";
import InputField from "../Common/InputField";
import Button from "../Common/Button";
import API from "../../api/index";
import { toast } from "react-toastify";
import DeleteIcon from "../../assets/DeleteIcon.svg";

const AdminTab2 = (props) => {
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");

  const handleAddDocuments = async () => {
    await API("post", "/documents/", {
      name: name,
      info: info,
      countries: [props.countryId],
    })
      .then((res) => {
        console.log("handleAddDocuments", res);
        props.handleCountryData();
        props.setOpenAddDocument(false);
        toast.success("Document Added Successfully");
        setName("");
        setInfo("");
      })
      .catch((err) => {
        console.log("handleAddDocuments", err);
        props.setOpenAddDocument(false);
        toast.error(err.response.data.message);
      });
  };
  const handleDocumentDelete = async (id) => {
    await API("delete", `/documents/${id}`)
      .then((res) => {
        console.log(res);
        props.handleCountryData();
        toast.success("Document Deleted Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#667085", backgroundColor: "#F9FAFB" }}>
                Documents <img src={props.img} alt="" />
              </TableCell>
              <TableCell sx={{ color: "#667085", backgroundColor: "#F9FAFB" }}>
                Help Information <img src={props.img} alt="" />
              </TableCell>
              <TableCell sx={{ color: "#667085", backgroundColor: "#F9FAFB" }}>
                Actions <img src={props.img} alt="" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => (
              <TableRow key={row.createData}>
                <TableCell style={{ width: "20%" }} component="th" scope="row" sx={{ padding: 2 }}>
                  {row?.name}
                </TableCell>
                <TableCell component="th" scope="row" sx={{ padding: 2 }}>
                  {row?.info}
                </TableCell>
                <TableCell align="left" className="country2">
                  <img
                    src={DeleteIcon}
                    alt=""
                    className="dltIcon"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDocumentDelete(row._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationPage />
      <Modal
        open={props.openAddDocument}
        setOpen={props.setOpenAddDocument}
        title="Add Documents"
        handleClose={props.handleAddDocumentModalClose}
        Closebtn={true}
      >
        <div style={{ height: "20%" }}>
          <label htmlFor="" className="label_modal">
            Document Name
          </label>{" "}
          <InputField name="docName" value={name} className="textfield_addvendor" onChange={(e) => setName(e.target.value)} />
          <label htmlFor="" className="label_modal">
            Help Information
          </label>{" "}
          <InputField name="docInfo" value={info} className="textfield_addvendor" onChange={(e) => setInfo(e.target.value)} />
          <Button text="Add Document" className="add_vendor_button" onClick={handleAddDocuments} />
        </div>
      </Modal>
    </>
  );
};

export default AdminTab2;
