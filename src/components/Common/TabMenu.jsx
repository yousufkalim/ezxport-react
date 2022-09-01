import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import DotedIcon from '../../assets/DotedIcon.svg';
import ViewBuyerPopup from '../../Dashboard/UserDashboard/ModelPopup/ViewBuyerPopup';
import EdditBuyer from '../../Dashboard/UserDashboard/ModelPopup/EdditBuyer.js';

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
// table
function createData(Société, Congo, mail, address, num, chaussée, DotedIcon) {
  return { Société, Congo, mail, address, num, chaussée, DotedIcon };
}

// rows
const rows = [
  createData(
    'Company 1',
    'Congo',
    'mail@mail.com',
    'address',
    '+33 07 83 73 82 32',
    '97 chaussée de rouvroy',
    DotedIcon
  ),
  createData(
    'Company 1',
    'Congo',
    'mail@mail.com',
    'address',
    '+33 07 83 73 82 32',
    '97 chaussée de rouvroy',
    DotedIcon
  ),
  createData(
    'Company 1',
    'Congo',
    'mail@mail.com',
    'address',
    '+33 07 83 73 82 32',
    '97 chaussée de rouvroy',
    DotedIcon
  ),
  createData(
    'Company 1',
    'Congo',
    'mail@mail.com',
    'address',
    '+33 07 83 73 82 32',
    '97 chaussée de rouvroy',
    DotedIcon
  ),
  createData(
    'Company 1',
    'Congo',
    'mail@mail.com',
    'address',
    '+33 07 83 73 82 32',
    '97 chaussée de rouvroy',
    DotedIcon
  ),
];

const TabMenu = (props) => {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = useState(false);
  const [edditPop, setEdditPop] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpen2 = () => {
    setEdditPop(true);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <EdditBuyer open={edditPop} setOpen={setEdditPop} />
      <ViewBuyerPopup open={open} setOpen={setOpen} />
      <Box sx={{ width: '100%' }}>
        <Box>
          <Tabs value={value} onChange={handleChange}>
            <Tab className="tab_btn1" label="Buyers" {...a11yProps(0)} />
            <Tab className="tab_btn2" label="Sellers" {...a11yProps(1)} />
            <Tab className="tab_btn3" label="Inspection locations" {...a11yProps(2)} />
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
                    {props.title.map((item) => {
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
                  {rows.map((row) => (
                    <TableRow
                      key={row.Société}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      style={{ cursor: 'pointer' }}
                    >
                      <TableCell component="th" scope="row" onClick={handleClickOpen}>
                        <p className="AP_plus_title">{row.Société} </p>
                      </TableCell>
                      <TableCell align="left" className="country2" onClick={handleClickOpen}>
                        {row.Congo}
                        <br />
                      </TableCell>
                      <TableCell align="left" className="country2" onClick={handleClickOpen}>
                        {row.mail}
                      </TableCell>
                      <TableCell align="left" className="country2" onClick={handleClickOpen}>
                        {row.num}
                      </TableCell>
                      <TableCell
                        align="left"
                        className="country2"
                        style={{ cursor: 'pointer' }}
                        onClick={handleClickOpen}
                      >
                        <p className="AP_plus_title">{row.chaussée}</p>
                        <p className="country2"> 34 733, Kinshasa</p>
                      </TableCell>

                      <TableCell
                        align="left"
                        className="country2"
                        style={{ cursor: 'pointer' }}
                        onClick={handleClickOpen2}
                      >
                        <img src={DotedIcon} alt="" />
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
                    {props.title.map((item) => {
                      return (
                        <TableCell
                          align="left"
                          className="country"
                          style={{ backgrounColor: '#EAECF0' }}
                        >
                          {item.heading}&nbsp;
                          <img src={item.imgSrc} alt="" className="title_arrow" />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.Société}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" onClick={handleClickOpen}>
                        <p className="AP_plus_title">{row.Société} </p>
                      </TableCell>
                      <TableCell align="left" className="country2" onClick={handleClickOpen}>
                        {row.Congo}
                        <br />
                      </TableCell>
                      <TableCell align="left" className="country2" onClick={handleClickOpen}>
                        {row.mail}
                      </TableCell>
                      <TableCell align="left" className="country2" onClick={handleClickOpen}>
                        {row.num}
                      </TableCell>
                      <TableCell align="left" className="country2" style={{ cursor: 'pointer' }}>
                        <p className="AP_plus_title">{row.chaussée}</p>
                        <p className="country2" onClick={handleClickOpen}>
                          34 733, Kinshasa
                        </p>
                      </TableCell>

                      <TableCell
                        align="left"
                        className="country2"
                        style={{ cursor: 'pointer' }}
                        onClick={handleClickOpen2}
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
                    {props.title.map((item) => {
                      return (
                        <TableCell
                          align="left"
                          className="country"
                          style={{ backgrounColor: '#EAECF0' }}
                        >
                          {item.heading}&nbsp;
                          <img src={item.imgSrc} alt="" className="title_arrow" />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.Société}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" onClick={handleClickOpen}>
                        <p className="AP_plus_title">{row.Société} </p>
                      </TableCell>
                      <TableCell align="left" className="country2" onClick={handleClickOpen}>
                        {row.Congo}
                        <br />
                      </TableCell>
                      <TableCell align="left" className="country2" onClick={handleClickOpen}>
                        {row.mail}
                      </TableCell>
                      <TableCell align="left" className="country2" onClick={handleClickOpen}>
                        {row.num}
                      </TableCell>
                      <TableCell align="left" className="country2" style={{ cursor: 'pointer' }}>
                        <p className="AP_plus_title">{row.chaussée}</p>
                        <p className="country2" onClick={handleClickOpen}>
                          34 733, Kinshasa
                        </p>
                      </TableCell>

                      <TableCell
                        align="left"
                        className="country2"
                        style={{ cursor: 'pointer' }}
                        onClick={handleClickOpen2}
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
    </>
  );
};

export default TabMenu;
