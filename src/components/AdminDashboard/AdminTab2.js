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

const AdminTab2 = (props) => {
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
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => (
              <TableRow key={row.createData}>
                <TableCell style={{ width: "20%" }} component="th" scope="row" sx={{ border: "1px solid #E5E5E5;", padding: 2 }}>
                  {/* <NavLink exact to="/Admin/Dashboard/NomPays" style={{ textDecoration: "none", color: "black" }}> */}
                  {row?.name}
                  {/* </NavLink> */}
                </TableCell>
                <TableCell component="th" scope="row" sx={{ border: "1px solid #E5E5E5;", padding: 2 }}>
                  {/* <NavLink exact to="/Admin/Dashboard/NomPays" style={{ textDecoration: "none", color: "black" }}> */}
                  {row?.description}
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

export default AdminTab2;
