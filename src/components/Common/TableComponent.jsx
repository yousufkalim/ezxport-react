import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ApPlusPopup from '../../Dashboard/UserDashboard/ModelPopup/ApPlusPopup';

const TableComponent = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <ApPlusPopup open={open} setOpen={setOpen} />
      <div className="list_table">
        {/* table  */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {props.Data.map((item) => {
                  return (
                    <TableCell
                      align="left"
                      className="country"
                      style={{ backgrounColor: '#EAECF0' }}
                    >
                      {item.heading} &nbsp;
                      <img src={item.imgSrc} alt="" className="title_arrow" />
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.Data.map((item) => (
                <TableRow
                  onClick={handleClickOpen}
                  style={{ cursor: 'pointer' }}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <p className="AP_plus_title">{item.ServiceProviders}</p>
                  </TableCell>
                  <TableCell align="left" className="country2">
                    <p className="AP_plus_title"> {item.contact}</p>
                    <p className="country2"> tim.jennings@example.com</p>
                  </TableCell>
                  <TableCell align="left" className="country2">
                    {item.AssociatedCountries}
                  </TableCell>
                  {props.Icons === false ? (
                    ''
                  ) : (
                    <TableCell align="left" className="country2" style={{ cursor: 'pointer' }}>
                      <img src={item.Icon} alt="" />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default TableComponent;
