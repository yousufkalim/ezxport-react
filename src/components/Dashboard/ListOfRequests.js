import React from 'react';
import '../../css/Dashboard.css';
import { NavLink } from 'react-router-dom';
// table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein, protein2) {
  return { name, calories, fat, carbs, protein, protein2 };
}
const rows = [
  createData('Application title', ' 07 / 03 / 2022', '300 €', 23, '–', 'Sent'),
  createData('Application title', 237, 9.0, 37, 4.3, 4.4),
  createData('Application title', 262, 16.0, 24, 6.0, 4.0),
  createData('Application title', 305, 3.7, 67, 4.3, 67),
  createData('Application title', 356, 16.0, 49, 3.9, 57),
];

const ListOfRequests = () => {
  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          {/* list head  */}
          <div className="List_heading_div">
            <h1 className="list_h1">List of requests</h1>
            <NavLink className="list_reqst_btn" to="#">
              Create a request
            </NavLink>
          </div>
          {/* list table   */}
          <div className="list_table">
            {/* table  */}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" className="country">
                      Request
                    </TableCell>
                    <TableCell align="left" className="country">
                      Date
                    </TableCell>
                    <TableCell align="left" className="country">
                      Certificate cost
                    </TableCell>
                    <TableCell align="left" className="country">
                      Nb codes
                    </TableCell>
                    <TableCell align="left" className="country">
                      Service providers
                    </TableCell>
                    <TableCell align="left" className="country">
                      Statutes
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                        <br />
                        <p className="country"> Country</p>
                      </TableCell>
                      <TableCell align="left" className="country">
                        {row.calories}
                      </TableCell>
                      <TableCell align="left" className="country">
                        {row.fat}
                      </TableCell>
                      <TableCell align="left" className="country">
                        {row.carbs}
                      </TableCell>
                      <TableCell align="left" className="country">
                        {row.protein}
                      </TableCell>
                      <TableCell align="left" className="country">
                        {row.protein2}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* table  */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListOfRequests;
