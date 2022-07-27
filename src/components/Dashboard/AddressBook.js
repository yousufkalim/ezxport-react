import React, { useState } from 'react';
import '../../css/Dashboard.css';
import { NavLink } from 'react-router-dom';
import SearchIcon from '../../assets/SearchIcon.svg';
// table
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DotedIcon from '../../assets/DotedIcon.svg';
// import SearchIcon from '@mui/icons-material/Search';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AddressBook = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // table
  function createData(Société, Congo, mail, address, num, chaussée, DotedIcon) {
    return { Société, Congo, mail, address, num, chaussée, DotedIcon };
  }
  const rows = [
    createData(
      'Société 1',
      'Congo',
      'mail@mail.com',
      'address',
      '+33 07 83 73 82 32',
      '97 chaussée de rouvroy',
      DotedIcon
    ),
    createData(
      'Société 1',
      'Congo',
      'mail@mail.com',
      'address',
      '+33 07 83 73 82 32',
      '97 chaussée de rouvroy',
      DotedIcon
    ),
    createData(
      'Société 1',
      'Congo',
      'mail@mail.com',
      'address',
      '+33 07 83 73 82 32',
      '97 chaussée de rouvroy',
      DotedIcon
    ),
    createData(
      'Société 1',
      'Congo',
      'mail@mail.com',
      'address',
      '+33 07 83 73 82 32',
      '97 chaussée de rouvroy',
      DotedIcon
    ),
    createData(
      'Société 1',
      'Congo',
      'mail@mail.com',
      'address',
      '+33 07 83 73 82 32',
      '97 chaussée de rouvroy',
      DotedIcon
    ),
  ];

  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          {/* list head  */}
          <div className="List_heading_div">
            <h1 className="list_h1">Address Book</h1>
            <div className="searching">
              <input type="text" className="search_input" placeholder="To Research" />
              <img src={SearchIcon} alt="" className="search_icon" />
              <NavLink className="list_reqst_btn2" to="#">
                Ajouter un acheteur
              </NavLink>
            </div>
          </div>
          {/* list table   */}
          <div className="list_table">
            {/* table  */}
            <Box sx={{ width: '100%' }}>
              <Box>
                <Tabs value={value} onChange={handleChange}>
                  <Tab className="tab_btn1" label="Acheteurs" {...a11yProps(0)} />
                  <Tab className="tab_btn2" label="Vendeurs" {...a11yProps(1)} />
                  <Tab className="tab_btn3" label="Lieux d’inspection" {...a11yProps(2)} />
                </Tabs>
              </Box>
              {/* table 1  */}
              <TabPanel value={value} index={0}>
                {/* first table of data  */}
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
                            Nom société
                          </TableCell>
                          <TableCell
                            align="left"
                            className="country"
                            style={{ backgrounColor: '#EAECF0' }}
                          >
                            Pays
                          </TableCell>
                          <TableCell
                            align="left"
                            className="country"
                            style={{ backgrounColor: '#EAECF0' }}
                          >
                            Adresse email
                          </TableCell>
                          <TableCell
                            align="left"
                            className="country"
                            style={{ backgrounColor: '#EAECF0' }}
                          >
                            Téléphone
                          </TableCell>
                          <TableCell
                            align="left"
                            className="country"
                            style={{ backgrounColor: '#EAECF0' }}
                          >
                            Adresse
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
                            key={row.Société}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {row.Société}
                            </TableCell>
                            <TableCell align="left" className="country2">
                              {row.Congo}
                              <br />
                            </TableCell>
                            <TableCell align="left" className="country2">
                              {row.mail}
                            </TableCell>
                            <TableCell align="left" className="country2">
                              {row.num}
                            </TableCell>
                            <TableCell
                              align="left"
                              className="country2"
                              style={{ cursor: 'pointer' }}
                            >
                              {row.chaussée}
                              <p className="country2"> 34 733, Kinshasa</p>
                            </TableCell>

                            <TableCell
                              align="left"
                              className="country2"
                              style={{ cursor: 'pointer' }}
                            >
                              <img src={row.DotedIcon} alt="" />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {/* table  */}
                </div>
              </TabPanel>

              {/* table 2  */}
              <TabPanel value={value} index={1}>
                {/* first table of data  */}
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
                            Nom société
                          </TableCell>
                          <TableCell
                            align="left"
                            className="country"
                            style={{ backgrounColor: '#EAECF0' }}
                          >
                            Pays
                          </TableCell>
                          <TableCell
                            align="left"
                            className="country"
                            style={{ backgrounColor: '#EAECF0' }}
                          >
                            Adresse email
                          </TableCell>
                          <TableCell
                            align="left"
                            className="country"
                            style={{ backgrounColor: '#EAECF0' }}
                          >
                            Téléphone
                          </TableCell>
                          <TableCell
                            align="left"
                            className="country"
                            style={{ backgrounColor: '#EAECF0' }}
                          >
                            Adresse
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
                            key={row.Société}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {row.Société}
                            </TableCell>
                            <TableCell align="left" className="country2">
                              {row.Congo}
                              <br />
                            </TableCell>
                            <TableCell align="left" className="country2">
                              {row.mail}
                            </TableCell>
                            <TableCell align="left" className="country2">
                              {row.num}
                            </TableCell>
                            <TableCell
                              align="left"
                              className="country2"
                              style={{ cursor: 'pointer' }}
                            >
                              {row.chaussée}
                              <p className="country2"> 34 733, Kinshasa</p>
                            </TableCell>

                            <TableCell
                              align="left"
                              className="country2"
                              style={{ cursor: 'pointer' }}
                            >
                              <img src={row.DotedIcon} alt="" />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {/* table  */}
                </div>
              </TabPanel>

              {/* table 3  */}
              <TabPanel value={value} index={2}>
                {/* first table of data  */}
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
                            Nom société
                          </TableCell>
                          <TableCell
                            align="left"
                            className="country"
                            style={{ backgrounColor: '#EAECF0' }}
                          >
                            Pays
                          </TableCell>
                          <TableCell
                            align="left"
                            className="country"
                            style={{ backgrounColor: '#EAECF0' }}
                          >
                            Adresse email
                          </TableCell>
                          <TableCell
                            align="left"
                            className="country"
                            style={{ backgrounColor: '#EAECF0' }}
                          >
                            Téléphone
                          </TableCell>
                          <TableCell
                            align="left"
                            className="country"
                            style={{ backgrounColor: '#EAECF0' }}
                          >
                            Adresse
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
                            key={row.Société}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {row.Société}
                            </TableCell>
                            <TableCell align="left" className="country2">
                              {row.Congo}
                              <br />
                            </TableCell>
                            <TableCell align="left" className="country2">
                              {row.mail}
                            </TableCell>
                            <TableCell align="left" className="country2">
                              {row.num}
                            </TableCell>
                            <TableCell
                              align="left"
                              className="country2"
                              style={{ cursor: 'pointer' }}
                            >
                              {row.chaussée}
                              <p className="country2"> 34 733, Kinshasa</p>
                            </TableCell>

                            <TableCell
                              align="left"
                              className="country2"
                              style={{ cursor: 'pointer' }}
                            >
                              <img src={row.DotedIcon} alt="" />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {/* table  */}
                </div>
              </TabPanel>
            </Box>
            {/* table  */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressBook;
