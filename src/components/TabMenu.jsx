import React from 'react';
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
import DotedIcon from '../assets/DotedIcon.svg';

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

const TabMenu = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ width: "100%" }}>
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
                    {props.title.map((item) => {
                      return (
                        <TableCell align="left" className="country" style={{ backgrounColor: "#EAECF0" }}>
                          {item.heading}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.Société} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
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
                      <TableCell align="left" className="country2" style={{ cursor: "pointer" }}>
                        {row.chaussée}
                        <p className="country2"> 34 733, Kinshasa</p>
                      </TableCell>

                      <TableCell align="left" className="country2" style={{ cursor: "pointer" }}>
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
                        <TableCell align="left" className="country" style={{ backgrounColor: "#EAECF0" }}>
                          {item.heading}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.Société} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
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
                      <TableCell align="left" className="country2" style={{ cursor: "pointer" }}>
                        {row.chaussée}
                        <p className="country2"> 34 733, Kinshasa</p>
                      </TableCell>

                      <TableCell align="left" className="country2" style={{ cursor: "pointer" }}>
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
                        <TableCell align="left" className="country" style={{ backgrounColor: "#EAECF0" }}>
                          {item.heading}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.Société} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
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
                      <TableCell align="left" className="country2" style={{ cursor: "pointer" }}>
                        {row.chaussée}
                        <p className="country2"> 34 733, Kinshasa</p>
                      </TableCell>

                      <TableCell align="left" className="country2" style={{ cursor: "pointer" }}>
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
