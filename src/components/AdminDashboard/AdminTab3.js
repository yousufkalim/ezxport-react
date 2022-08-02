import React from 'react';
import PaginationPage from './Pagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { NavLink } from 'react-router-dom';
import DownArrow from "../../assets/TitleDownArrow.svg";

const AdminTab3 = (props) => {
  console.log(props, "BOMS");
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#667085", backgroundColor: "#F9FAFB" }}>
                BOMs code <img src={DownArrow} alt="" />
              </TableCell>
              {/* <TableCell sx={{ color: "#667085", backgroundColor: "#F9FAFB" }}>
                {props.text2} <img src={props.img} alt="" />
              </TableCell> */}
              <TableCell sx={{ color: "#667085", backgroundColor: "#F9FAFB" }}>
                Status <img src={DownArrow} alt="" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => (
              <TableRow key={row.createData}>
                <TableCell style={{ width: "20%" }} component="th" scope="row" sx={{ border: "1px solid #E5E5E5;", padding: 2 }}>
                  <NavLink exact to="/Admin/Dashboard/NomPays" style={{ textDecoration: "none", color: "black" }}>
                    {row.code}
                  </NavLink>
                </TableCell>
                {/* <TableCell
                  style={{ width: '20%' }}
                  component="th"
                  scope="row"
                  sx={{ border: '1px solid #E5E5E5;', padding: 2 }}
                >
                  <NavLink
                    exact
                    to="/Admin/Dashboard/NomPays"
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    {row.lname}
                  </NavLink>
                </TableCell> */}
                <TableCell component="th" scope="row" sx={{ border: "1px solid #E5E5E5;", padding: 2 }}>
                  {/* <NavLink exact to="/Admin/Dashboard/NomPays" style={{ textDecoration: "none", color: "black" }}> */}
                  <p
                    style={{
                      background: "#ECFDF3",
                      borderRadius: "16px",
                      display: "inline-block",
                      padding: "2px 5px",
                      color: "#027A48",
                    }}
                  >
                    {row.certification_required ? "Subject to inspection" : "Not subject"}
                  </p>
                  {/* </NavLink> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationPage />
    </>
  );
};

export default AdminTab3;
