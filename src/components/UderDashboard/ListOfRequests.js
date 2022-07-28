import React from 'react';
import { NavLink } from 'react-router-dom';

// table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ListOfRequests = ({ rows }) => {
  return (
    <div>
      {/* table  */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" className="country" style={{ backgrounColor: '#EAECF0' }}>
                Request
              </TableCell>
              <TableCell align="left" className="country" style={{ backgrounColor: '#EAECF0' }}>
                Date
              </TableCell>
              <TableCell align="left" className="country" style={{ backgrounColor: '#EAECF0' }}>
                Certificate cost
              </TableCell>
              <TableCell align="left" className="country" style={{ backgrounColor: '#EAECF0' }}>
                Nb codes
              </TableCell>
              <TableCell align="left" className="country" style={{ backgrounColor: '#EAECF0' }}>
                Service providers
              </TableCell>
              <TableCell align="left" className="country" style={{ backgrounColor: '#EAECF0' }}>
                Statutes
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <NavLink
                    to="/User/Dashboard/Application"
                    style={{ color: 'black', textDecoration: 'none' }}
                  >
                    {row.name}
                  </NavLink>

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
  );
};

export default ListOfRequests;
