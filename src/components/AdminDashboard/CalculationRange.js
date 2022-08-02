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
import AddSlice from './AddSlice';

const CalculationRange = ({ rows, img, DltIcon, editIcon }) => {
  return (
    <div>
      {/* table  */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" className="country" style={{ backgrounColor: '#EAECF0' }}>
                Minimum <img src={img} alt="" />
              </TableCell>
              <TableCell align="left" className="country" style={{ backgrounColor: '#EAECF0' }}>
                Maximum <img src={img} alt="" />
              </TableCell>
              <TableCell align="left" className="country" style={{ backgrounColor: '#EAECF0' }}>
                Coût certificat <img src={img} alt="" />
              </TableCell>
              <TableCell align="left" className="country" style={{ backgrounColor: '#EAECF0' }}>
                Actions <img src={img} alt="" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" style={{ width: '20%' }}>
                  <NavLink
                    to="/User/Dashboard/Application"
                    style={{ color: 'black', textDecoration: 'none' }}
                  >
                    {row.name}
                  </NavLink>

                  <br />
                </TableCell>
                <TableCell align="left" className="country2" style={{ width: '20%' }}>
                  {row.calories}
                </TableCell>
                <TableCell align="left" className="country2">
                  {row.fat}
                </TableCell>
                <TableCell align="left" className="country2">
                  <img src={DltIcon} alt="" className="dltIcon" style={{ cursor: 'pointer' }} />
                  &nbsp; &nbsp;
                  <img src={editIcon} alt="" className="dltIcon" style={{ cursor: 'pointer' }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddSlice />
      {/* table  */}
    </div>
  );
};
export default CalculationRange;
