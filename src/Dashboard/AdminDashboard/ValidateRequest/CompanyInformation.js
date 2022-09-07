import InputField from '../../../components/Common/InputField';
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
  // const [lastName, setLastName] = useState('');
  // const [firstName, setFirstName] = useState('');
  // const [email, setEmail] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');
  // const [completeAddress, setCompleteAddress] = useState('');
  // const [postalCode, setPostalCode] = useState('');
  // const [town, setTown] = useState('');
  // const [name, setName] = useState('');
  // const [societyType, setSocietyType] = useState('');
  // const [vatNumber, setVatNumber] = useState('');
  // user request states
  const [requestById, setRequestById] = useState({});

  useEffect(() => {
    handlerequestById();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    props.TabeProps(value);
  }, [value]);

  const handlerequestById = async () => {
    await API('get', `/requests/${id}`)
      .then((res) => {
        console.log('🚀 ~ file: CompanyInformation.js ~ line 81 ~ .then ~ res', res);
        setRequestById(res.data.request);
      })
      .catch((err) => {
        console.log(err, 'errrrrr');
      });
  };

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
                      <InputField className="textfield_row2" value={requestById?.user?.last_name} />
                    </div>
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        First name
                      </label>{' '}
                      <InputField
                        className="textfield_row2"
                        value={requestById?.user?.first_name}
                      />
                    </div>
                  </div>
                  <div className="textField_div2">
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        E-mail address
                      </label>{' '}
                      <InputField className="textfield_row2" value={requestById?.user?.email} />
                    </div>
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        Telephone
                      </label>{' '}
                      <InputField
                        className="textfield_row2"
                        value={requestById?.user?.phone_number}
                      />
                    </div>
                  </div>
                  <div className="textField_div2">
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        Full address
                      </label>{' '}
                      <InputField className="textfield_row2" value={requestById?.user?.address} />
                    </div>
                    <div className="userdetail_textField_div2">
                      <div className="postel_input">
                        <label htmlFor="" className="label_modal">
                          Code postal
                        </label>{' '}
                        <InputField
                          className="userdetail_textField_row"
                          value={requestById?.user?.zip_code}
                        />
                      </div>
                      <div style={{ width: '60%' }}>
                        <label htmlFor="" className="label_modal">
                          Town
                        </label>{' '}
                        <InputField
                          className="userdetail_textField_row"
                          value={requestById?.user?.city}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="textField_div2">
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        Last name
                      </label>{' '}
                      <InputField
                        className="textfield_row2"
                        value={requestById?.user?.company?.name}
                      />
                    </div>
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        Type of society
                      </label>{' '}
                      <InputField
                        className="textfield_row2"
                        value={requestById?.user?.company?.type}
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
                        value={requestById?.user?.company?.vat}
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
                      <AddressBook requestById={requestById} />
                    </TableContainer>
                  </>
                </div>
              </TabPanel>
              {/* ------------Export documents---------- */}
              <TabPanel value={value} index={2}>
                <div className="list_table">
                  <>
                    <TableContainer component={Paper}>
                      <ExportDocuments requestById={requestById} />
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
