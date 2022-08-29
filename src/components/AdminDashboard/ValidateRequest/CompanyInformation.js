import InputField from '../../Common/InputField';
import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import API from '../../../api/index';

import AddressBook from './AddressBook';
import ExportDocuments from './ExportDocuments';

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
const ValidateForm = (props) => {
  // user data states
  const params = useParams();
  const { id } = params;
  const [value, setValue] = useState(0);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [completeAddress, setCompleteAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [town, setTown] = useState('');
  const [name, setName] = useState('');
  const [societyType, setSocietyType] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  // user request states
  const [requestById, setRequestById] = useState([]);

  //   useEffect(() => {
  //     handleUserData();
  //   }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    props.TabeProps(value);
  }, [value]);

  // const handleUserData = async () => {
  //   await API('get', `/users/${id}`)
  //     .then((res) => {
  //       setLastName(res?.data?.user?.last_name);
  //       setFirstName(res?.data?.user?.first_name);
  //       setEmail(res?.data?.user?.email);
  //       setPhoneNumber(res?.data?.user?.phone_number);
  //       setCompleteAddress(res?.data?.user?.address);
  //       setPostalCode(res?.data?.user?.zipcode || res?.data?.user?.zip_code);
  //       setTown(res?.data?.user?.city);
  //       setName(res?.data?.user?.company?.name);
  //       setSocietyType(res?.data?.user?.company?.type);
  //       setVatNumber(res?.data?.user?.company?.vat);
  //     })
  //     .catch((err) => {
  //       console.log(err, 'errrrrr');
  //     });
  // };

  //   const handleRequestByUserId = async () => {
  //     await API('get', `/requests/getByUser/${id}`)
  //       .then((res) => {
  //         setRequestById(res?.data?.requet);
  //         // console.log("first", res.data);
  //       })
  //       .catch((err) => {
  //         console.log('err---->', err);
  //       });
  //   };

  return (
    <>
      <div className="list_main_div validateForm">
        <div className="list_second_div">
          <div className="list_table">
            <Box sx={{ width: '100%' }}>
              <Box>
                <Tabs value={value} onChange={handleChange}>
                  <Tab className="tab_btn1" label="Company information" {...a11yProps(0)} />
                  <Tab className="tab_btn2" label="Address Book" {...a11yProps(1)} />
                  <Tab className="tab_btn3" label="Export documents" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <div className="list_table">
                  <div className="textField_div2">
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        Last name
                      </label>{' '}
                      <InputField
                        className="textfield_row2"
                        value={lastName}
                        placeholder="Last name"
                      />
                    </div>
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        First name
                      </label>{' '}
                      <InputField
                        className="textfield_row2"
                        value={firstName}
                        placeholder="First name"
                      />
                    </div>
                  </div>
                  <div className="textField_div2">
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        E-mail address
                      </label>{' '}
                      <InputField
                        className="textfield_row2"
                        value={email}
                        placeholder="mail@mail.com"
                      />
                    </div>
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        Telephone
                      </label>{' '}
                      <InputField
                        className="textfield_row2"
                        value={phoneNumber}
                        placeholder="33 07 86 36 02 20"
                      />
                    </div>
                  </div>
                  <div className="textField_div2">
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        Full address
                      </label>{' '}
                      <InputField
                        className="textfield_row2"
                        value={completeAddress}
                        placeholder="90 road of rouvroy"
                      />
                    </div>
                    <div className="userdetail_textField_div2">
                      <div style={{ width: '35%' }} className="postel_input">
                        <label htmlFor="" className="label_modal">
                          Code postal
                        </label>{' '}
                        <InputField
                          className="userdetail_textField_row"
                          value={postalCode}
                          placeholder="80100"
                        />
                      </div>
                      <div style={{ width: '60%' }}>
                        <label htmlFor="" className="label_modal">
                          Town
                        </label>{' '}
                        <InputField
                          className="userdetail_textField_row"
                          value={town}
                          placeholder="Abbeville"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="textField_div2">
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        Last name
                      </label>{' '}
                      <InputField className="textfield_row2" value={name} placeholder="Last name" />
                    </div>
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        Type of society
                      </label>{' '}
                      <InputField
                        className="textfield_row2"
                        value={societyType}
                        placeholder="Type 1"
                      />
                    </div>
                  </div>
                  <div className="textField_div2">
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        VAT number
                      </label>{' '}
                      <InputField
                        className="textfield_row2"
                        value={vatNumber}
                        placeholder="6372890367849"
                      />
                    </div>
                  </div>
                </div>
              </TabPanel>
              {/* --------------* Address Book *-------------- */}
              <TabPanel value={value} index={1}>
                <div className="list_table">
                  <>
                    <TableContainer component={Paper}>
                      <AddressBook />
                    </TableContainer>
                  </>
                </div>
              </TabPanel>
              {/* ------------Export documents---------- */}
              <TabPanel value={value} index={2}>
                <div className="list_table">
                  <>
                    <TableContainer component={Paper}>
                      <ExportDocuments />
                    </TableContainer>
                  </>
                </div>
              </TabPanel>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default ValidateForm;
