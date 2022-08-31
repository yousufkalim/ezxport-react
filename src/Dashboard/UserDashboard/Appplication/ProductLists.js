import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TitleDownArrow from '../../../assets/TitleDownArrow.svg';

const ProductLists = (props) => {
  return (
    <>
      <div className="ProductLists">
        <div className="ProductLists_heading">
          <p className="ProductLists_title">Product Lists</p>
          <p className="total_value_p">
            Total value <span> – 25 000 € – 23 codes </span>
          </p>
        </div>
        {/* table  */}
        <div className="list_table" style={{ marginBottom: '5%' }}>
          {/* table  */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead style={{ backgroundColor: '#F9FAFB' }}>
                <TableRow>
                  <TableCell align="left" className="country">
                    Code &nbsp; &nbsp;
                    <img src={TitleDownArrow} alt="" className="title_arrow" />
                  </TableCell>
                  <TableCell align="left" className="country">
                    Denomination &nbsp; &nbsp;
                    <img src={TitleDownArrow} alt="" className="title_arrow" />
                  </TableCell>
                  <TableCell align="left" className="country">
                    Monetary value
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.Data.map((item) => (
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row" style={{ width: '22%' }}>
                      {item.ServiceProviders}
                    </TableCell>
                    <TableCell align="left" className="country2" style={{ width: '22%' }}>
                      {item.contact}
                    </TableCell>
                    <TableCell align="left" className="country2" style={{ width: '100%' }}>
                      {item.AssociatedCountries}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default ProductLists;
