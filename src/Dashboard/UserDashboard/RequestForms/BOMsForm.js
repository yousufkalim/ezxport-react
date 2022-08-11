import React from "react";
import Inputfield from "../../../components/Common/InputField";
import Button from "../../../components/Common/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DownArrow from "../../../assets/DownArrow.svg";
import Paper from "@mui/material/Paper";
import DeleteIcon from "../../../assets/DeleteIcon.svg";
import EditIcon from "../../../assets/EditIcon.svg";
const BOMsForm = () => {
  const rangeData = [
    {
      code: "12345678",
      value: "7000",
    },
    {
      code: "12345678",
      value: "7000",
    },
    {
      code: "12345678",
      value: "7000",
    },
    {
      code: "12345678",
      value: "7000",
    },
  ];
  return (
    <div>
      <label>Country</label>
      <select className="countrydropdown">
        <option value={0}>qwertyu</option>
        <option value={0}>qwertyu</option>
        <option value={0}>qwertyu</option>
        <option value={0}>qwertyu</option>
        <option value={0}>qwertyu</option>
        <option value={0}>qwertyu</option>
        <option value={0}>qwertyu</option>
      </select>
      <label>Create a new request or select an old request to retrieve information</label>
      <select className="countrydropdown">
        <option value={0}>qwertyu</option>
        <option value={0}>qwertyu</option>
        <option value={0}>qwertyu</option>
        <option value={0}>qwertyu</option>
        <option value={0}>qwertyu</option>
        <option value={0}>qwertyu</option>
        <option value={0}>qwertyu</option>
      </select>
      <label>Application title</label>
      <Inputfield className="applicationTitle" />
      <div style={{ display: "flex" }}>
        <div style={{ width: "40%" }}>
          <span className="title_productList">Product Lists</span>
          <br />
          <u style={{ color: "#7F56D9", fontSize: "14px" }}>You don't know your product nomenclatures?</u>
        </div>
        <div style={{ width: "55%", display: "flex", alignItems: "flex-start", justifyContent: "flex-end" }}>
          <Button text="Import an XLS file" className="import_Btn" />
          <Button text="Download XLS file" className="download_Btn" />
        </div>
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <div className="codedropdown_div">
          <label style={{ marginTop: "1rem" }}>Code</label>
          <select className="countrydropdown">
            <option>qwertyu</option>
          </select>
        </div>
        <div className="codedropdown_div">
          <label style={{ marginTop: "1rem" }}>Monetary value</label>
          <Inputfield className="applicationTitle" />
        </div>
        <div className="codedropdown_div1">
          <Button text="To add" className="to_add_btn" />
        </div>
      </div>
      <TableContainer component={Paper} style={{ width: "95%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" className="country">
                Code <img src={DownArrow} alt="" />
              </TableCell>
              <TableCell align="center" className="country">
                Monetary value <img src={DownArrow} alt="" />
              </TableCell>

              <TableCell align="center" className="country">
                Actions <img src={DownArrow} alt="" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rangeData?.map((item) => (
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="center" style={{ width: "20%" }}>
                  {item.code}
                  <br />
                </TableCell>
                <TableCell align="center" className="country2" style={{ width: "20%" }}>
                  {item.value}
                </TableCell>

                <TableCell align="center" className="country2">
                  <img src={DeleteIcon} alt="" className="dltIcon" style={{ cursor: "pointer" }} />
                  &nbsp; &nbsp;
                  <img src={EditIcon} alt="" className="dltIcon" style={{ cursor: "pointer" }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BOMsForm;
