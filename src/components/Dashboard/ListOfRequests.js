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
  createData(
    'Application title',
    ' 07 / 03 / 2022',
    '300 €',
    23,
    'Veritas, Veritas 2',
    'File validated'
  ),
  createData(
    'Application title',
    ' 07 / 03 / 2022',
    '300 €',
    23,
    'Veritas, Veritas 2',
    'File validated'
  ),
  createData(
    'Application title',
    ' 07 / 03 / 2022',
    '300 €',
    23,
    'Veritas, Veritas 2',
    'File validated'
  ),
  createData(
    'Application title',
    ' 07 / 03 / 2022',
    '300 €',
    23,
    'Veritas, Veritas 2',
    'File validated'
  ),
  createData(
    'Application title',
    ' 07 / 03 / 2022',
    '300 €',
    23,
    'Veritas, Veritas 2',
    'File validated'
  ),
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
                    <TableCell
                      align="left"
                      className="country"
                      style={{ backgrounColor: '#EAECF0' }}
                    >
                      Request
                    </TableCell>
                    <TableCell
                      align="left"
                      className="country"
                      style={{ backgrounColor: '#EAECF0' }}
                    >
                      Date
                    </TableCell>
                    <TableCell
                      align="left"
                      className="country"
                      style={{ backgrounColor: '#EAECF0' }}
                    >
                      Certificate cost
                    </TableCell>
                    <TableCell
                      align="left"
                      className="country"
                      style={{ backgrounColor: '#EAECF0' }}
                    >
                      Nb codes
                    </TableCell>
                    <TableCell
                      align="left"
                      className="country"
                      style={{ backgrounColor: '#EAECF0' }}
                    >
                      Service providers
                    </TableCell>
                    <TableCell
                      align="left"
                      className="country"
                      style={{ backgrounColor: '#EAECF0' }}
                    >
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
                        <p className="country2"> Country</p>
                      </TableCell>
                      <TableCell align="left" className="country2">
                        {row.calories}
                      </TableCell>
                      <TableCell align="left" className="country2">
                        {row.fat}
                      </TableCell>
                      <TableCell align="left" className="country2">
                        {row.carbs}
                      </TableCell>
                      <TableCell align="left" className="country2">
                        {row.protein}
                      </TableCell>
                      <TableCell align="left">
                        <p className="clrClass">{row.protein2}</p>
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
