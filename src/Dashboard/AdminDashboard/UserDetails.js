import SearchField from '../../components/Common/SearchField';
import Button from '../../components/Common/Button';
import InputField from '../../components/Common/InputField';
import Modal from '../../components/Common/Modal';
import BackArrow from '../../assets/BackArrow.svg';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import PaginationPage from '../../components/AdminDashboard/Pagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AdminTab1 from '../../components/AdminDashboard/AdminTab1';
import AdminTab2 from '../../components/AdminDashboard/AdminTab2';
import DownArrow from '../../assets/TitleDownArrow.svg';
import { useParams } from 'react-router-dom';
import API from '../../api/index';
import { toast } from 'react-toastify';
import Moment from 'moment';

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
const UserDetails = () => {
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

  useEffect(() => {
    handleUserData();
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleUserData = async () => {
    await API('get', `/users/${id}`)
      .then((res) => {
        setLastName(res?.data?.user?.last_name);
        setFirstName(res?.data?.user?.first_name);
        setEmail(res?.data?.user?.email);
        setPhoneNumber(res?.data?.user?.phone_number);
        setCompleteAddress(res?.data?.user?.address);
        setPostalCode(res?.data?.user?.zipcode || res?.data?.user?.zip_code);
        setTown(res?.data?.user?.city);
        setName(res?.data?.user?.company?.name);
        setSocietyType(res?.data?.user?.company?.type);
        setVatNumber(res?.data?.user?.company?.vat);
      })
      .catch((err) => {
        console.log(err, 'errrrrr');
      });
  };

  const handleRequestByUserId = async () => {
    await API('get', `/requests/getByUser/${id}`)
      .then((res) => {
        setRequestById(res?.data?.requet);
        // console.log("first", res.data);
      })
      .catch((err) => {
        console.log('err---->', err);
      });
  };

  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          {/* list head  */}
          <div className="List_heading_div">
            <h1 className="list_h1">
              <Link to="/Admin/Dashboard/Users">
                <img src={BackArrow} alt="" />
              </Link>
              &nbsp; User
            </h1>
          </div>

          <div className="list_table">
            <Box sx={{ width: '100%' }}>
              <Box>
                <Tabs value={value} onChange={handleChange} className="tab_menu">
                  <Tab className="admin_tab_btn" label="Information" {...a11yProps(0)} />
                  <Tab
                    className="admin_tab_btn"
                    label="Demandes"
                    {...a11yProps(1)}
                    onClick={handleRequestByUserId}
                  />
                </Tabs>
              </Box>

              <TabPanel value={value} index={0}>
                <div className="list_table">
                  <p className="title_text">Informations utilisateur</p>
                  <div className="textField_div2">
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        Nom
                      </label>{' '}
                      <InputField disabled={true} className="textfield_row2" value={lastName} />
                    </div>
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        Prénom
                      </label>{' '}
                      <InputField disabled={true} className="textfield_row2" value={firstName} />
                    </div>
                  </div>
                  <div className="textField_div2">
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        Adresse email
                      </label>{' '}
                      <InputField disabled={true} className="textfield_row2" value={email} />
                    </div>
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        Téléphone
                      </label>{' '}
                      <InputField disabled={true} className="textfield_row2" value={phoneNumber} />
                    </div>
                  </div>
                  <div className="textField_div2">
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        Adresse complète
                      </label>{' '}
                      <InputField
                        disabled={true}
                        className="textfield_row2"
                        value={completeAddress}
                      />
                    </div>
                    <div className="userdetail_textField_div2">
                      <div style={{ width: '35%' }} className="postel_input">
                        <label htmlFor="" className="label_modal">
                          Code postal
                        </label>{' '}
                        <InputField
                          disabled={true}
                          className="userdetail_textField_row"
                          value={postalCode}
                        />
                      </div>
                      <div style={{ width: '60%' }}>
                        <label htmlFor="" className="label_modal">
                          Ville
                        </label>{' '}
                        <InputField
                          disabled={true}
                          className="userdetail_textField_row"
                          value={town}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="title_text" style={{ marginTop: '2.5rem' }}>
                    Informations entreprise
                  </p>
                  <div className="textField_div2">
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        Nom
                      </label>{' '}
                      <InputField disabled={true} className="textfield_row2" value={name} />
                    </div>
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        Type de société
                      </label>{' '}
                      <InputField disabled={true} className="textfield_row2" value={societyType} />
                    </div>
                  </div>
                  <div className="textField_div2">
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        Numéro de TVA
                      </label>{' '}
                      <InputField disabled={true} className="textfield_row2" value={vatNumber} />
                    </div>
                  </div>
                </div>
              </TabPanel>

              <TabPanel value={value} index={1}>
                <div className="list_table">
                  <>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell
                              align="left"
                              className="country"
                              style={{ backgrounColor: '#EAECF0' }}
                            >
                              Demande
                            </TableCell>
                            <TableCell
                              align="left"
                              className="country"
                              style={{ backgrounColor: '#EAECF0' }}
                            >
                              Date
                            </TableCell>
                            <TableCell
                              align="left"
                              className="country"
                              style={{ backgrounColor: '#EAECF0' }}
                            >
                              Coût certificat
                            </TableCell>

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
                              Status
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {requestById?.map((item) => (
                            <TableRow
                              key={item?._id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {item?.title}
                                <br />
                                <p className="country2">{item?.country?.name}</p>
                              </TableCell>
                              <TableCell align="left" className="country2">
                                {Moment(item?.createdAt).format('DD/MM/YYYY')}
                              </TableCell>
                              <TableCell align="left" className="country2">
                                {item?.certification_cost?.value ? (
                                  <>
                                    {item?.certification_cost?.currency === 'USD'
                                      ? item?.certification_cost?.value + '$'
                                      : item?.certification_cost?.currency === 'EURO' &&
                                        item?.certification_cost?.value + '€'}
                                  </>
                                ) : (
                                  '--'
                                )}
                              </TableCell>

                              <TableCell align="left" className="country2">
                                {item?.vendor?.contact_lname ? (
                                  <>
                                    {item?.vendor?.contact_lname}
                                    {item?.vendor?.contact_fname}
                                  </>
                                ) : (
                                  '--'
                                )}
                              </TableCell>
                              <TableCell align="left">
                                <p className="clrClass">{item.status}</p>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
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

export default UserDetails;
