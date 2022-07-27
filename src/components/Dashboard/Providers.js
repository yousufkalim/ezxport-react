import React from 'react';
import '../../css/Dashboard.css';
import SearchIcon from '../../assets/SearchIcon.svg';
// table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DotedIcon from '../../assets/DotedIcon.svg';

function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs };
}
const rows = [
  createData('AP plus', 'Darrell Steward', 'Côte d’Ivoire, Cameroun, Gabon', DotedIcon),
  createData('Bureau Veritas', 'Wade Warren', 'Gabon', DotedIcon),
  createData('AP plus', 'Darrell Steward', 'Côte d’Ivoire, Cameroun, Gabon', DotedIcon),
  createData('AP plus', 'Darrell Steward', 'Côte d’Ivoire, Cameroun, Gabon', DotedIcon),
];

const Providers = () => {
  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          {/* list head  */}
          <div className="List_heading_div">
            <h1 className="list_h1">Service providers</h1>
            <div className="searching">
              <input type="text" className="search_input" placeholder="To Research" />
              <img src={SearchIcon} alt="" className="search_icon" />
              {/* <NavLink className="list_reqst_btn2" to="#">
                Ajouter un acheteur
              </NavLink> */}
            </div>
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
                      Prestataires
                    </TableCell>
                    <TableCell
                      align="left"
                      className="country"
                      style={{ backgrounColor: '#EAECF0' }}
                    >
                      Contact
                    </TableCell>
                    <TableCell
                      align="left"
                      className="country"
                      style={{ backgrounColor: '#EAECF0' }}
                    >
                      Pays associés
                    </TableCell>
                    <TableCell
                      align="left"
                      className="country"
                      style={{ backgrounColor: '#EAECF0' }}
                    >
                      .
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
                      </TableCell>
                      <TableCell align="left" className="country2">
                        {row.calories}
                        <br />
                        <p className="country2"> tim.jennings@example.com</p>
                      </TableCell>
                      <TableCell align="left" className="country2">
                        {row.fat}
                      </TableCell>
                      <TableCell align="left" className="country2" style={{ cursor: 'pointer' }}>
                        <img src={row.carbs} alt="" />
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
export default Providers;
