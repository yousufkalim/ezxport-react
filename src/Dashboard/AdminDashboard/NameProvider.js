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
import { useParams } from 'react-router-dom';
import API from '../../api/index';
import { toast } from 'react-toastify';
import validate from 'validate.js';
import downArrow from '../../assets/TitleDownArrow.svg';
import arrow_up from '../../assets/arrow_up.svg';
import { getSortedData } from '../../lib/getSortedData';
import { useTranslation, Trans } from "react-i18next";

const schema = {
  fullName: {
    presence: { allowEmpty: false, message: "is required" },
    length: { minimum: 2 },
  },
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64,
    },
  },
  contact: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64,
    },
  },
  phone: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 10,
      minimum: 10,
    },
  },
};

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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const NameProvider = () => {
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      fullName: "",
      contact: "",
      email: "",
      phone: "",
    },
    touched: {},
    errors: {},
  });

  const hasError = (field) => (formState.touched[field] && formState.errors[field] ? true : false);

  const params = useParams();
  const { id } = params;
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  // const [sendingEmail, setSendingEmail] = useState('');
  // const [Contact, setContact] = useState('');
  // const [fullname, setFullname] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');
  const [countries, setCountries] = useState();
  const [sort, setSort] = useState({key: "", ascend: true});

  const { t, i18n } = useTranslation();
  const { language } = i18n;

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handlePhnChange = (event) => {
    if (!event.target.value.match(/[^0-9]/)) {
      setFormState((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          [event.target.name]: event.target.value,
        },
        touched: {
          ...formState.touched,
          [event.target.name]: true,
        },
      }));
    }
  };
  const handleChange = (event) => {
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  useEffect(() => {
    handleGetVendor();
  }, [open]);

  const handleDataChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleGetVendor = async () => {
    await API("get", `/vendors/${id}`)
      .then((res) => {
        setFormState((formState) => ({
          ...formState,
          values: {
            fullName: res?.data?.vendor?.name,
            contact: res?.data?.vendor?.contact_email,
            email: res?.data?.vendor?.sending_email,
            phone: res?.data?.vendor?.phone_number,
          },
        }));
        // setSendingEmail);
        // setContact(res?.data?.vendor?.contact_email);
        // setFullname(res?.data?.vendor?.name);
        // setPhoneNumber(res?.data?.vendor?.phone_number);
        setCountries(res?.data?.vendor?.countries);
      })
      .catch((err) => {
        console.log(err, "errrrrr");
      });
  };
  const handleClose = () => setOpen(false);
  const handelUpdateVendor = async () => {
    await API("put", `/vendors/${id}`, {
      phone_number: formState.values.phone,
      name: formState.values.fullName,
      sending_email: formState.values.email,
      contact_email: formState.values.contact,
      countries: countries,
    })
      .then((res) => {
        setOpen(false);
        toast.success("Service Provider Updated Successfully");
      })
      .catch((err) => {
        console.log("ERRRR", err);
        setOpen(false);
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          {/* list head  */}
          <div className="List_heading_div">
            <h1 className="list_h1">
              <Link to="/Admin/Dashboard/Service">
                <img src={BackArrow} alt="" />
              </Link>
              &nbsp; {formState.values.fullName}
            </h1>
            {value === 0 ? (
              <div className="searching2">
                <Button
                  text={t("Change Provider")}
                  className="changeProvider"
                  onClick={() => setOpen(true)}
                />
              </div>
            ) : (
              <div className="searching">
                <SearchField placeholder={t("Searching")} className="search_name_input" />
                <Button text={t("Change Provider")} className="changeProvider" />
              </div>
            )}
          </div>

          <div className="list_table">
            <Box sx={{ width: "100%" }}>
              <Box>
                <Tabs value={value} onChange={handleDataChange} className="tab_menu">
                  <Tab className="admin_tab_btn" label={t("Information")} {...a11yProps(0)} />
                  <Tab
                    className="admin_tab_btn"
                    label={t("Associated Countries")}
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>

              <TabPanel value={value} index={0}>
                <div className="list_table">
                  <div className="textField_div1">
                    <label htmlFor="" className="label_modal">
                      {t("Default sending email address")}
                    </label>{" "}
                    <InputField
                      name="sendingEmail"
                      className="textfield_row1"
                      disabled={true}
                      value={formState.values.email}
                    />
                  </div>
                  <div className="textField_div2">
                    <div className="textField_row2_div">
                      <label htmlFor="" className="label_modal">
                        Contact
                      </label>{" "}
                      <InputField
                        disabled={true}
                        name="Contact"
                        className="textfield_row2"
                        value={formState.values.contact}
                      />
                    </div>
                    <div className="textField_row2_div">
                      <label htmlFor="" className="label_modal">
                        {t("Full Name")}
                      </label>{" "}
                      <InputField
                        disabled={true}
                        name="fullname"
                        className="textfield_row2"
                        value={formState.values.fullName}
                      />
                    </div>
                    <div className="textField_row2_div">
                      <label htmlFor="" className="label_modal">
                        {t("Telephone number")}
                      </label>{" "}
                      <InputField
                        disabled={true}
                        name="phoneNumber"
                        className="textfield_row2"
                        value={formState.values.phone}
                      />
                    </div>
                  </div>
                </div>
              </TabPanel>

              <TabPanel value={value} index={1}>
                <div className="list_table">
                  {" "}
                  <>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{
                                color: "#667085",
                                backgroundColor: "#F9FAFB",
                              }}
                            >
                              {t("Country")} 
                              {
                                !sort.ascend ? (
                                  <img className='sorting-icon' onClick={() => getSortedData(countries,setCountries, setSort, [],'name', true)} src={arrow_up} alt="" />
                                ) : (
                                  <img onClick={() => getSortedData(countries,setCountries, setSort, [],'name',false)} src={downArrow} alt="" />
                                )
                              }
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {countries?.map((item) => {
                            return (
                              <TableRow key={item.name}>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  sx={{
                                    border: "1px solid #E5E5E5;",
                                    padding: 2,
                                  }}
                                >
                                  <p className="AP_plus_title">{item.name}</p>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <PaginationPage />
                  </>
                </div>
              </TabPanel>
            </Box>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={t("Update Service Provider")}
        handleClose={handleClose}
        Closebtn={true}
      >
        <div className="edit_vendor_div">
          <label htmlFor="" className="label_modal">
            {t("Full Name")}
          </label>{" "}
          <InputField
            value={formState.values.fullName}
            name="fullName"
            className={
              hasError("fullName") && formState.errors.fullName
                ? "textfield_row2_red"
                : "textfield_row2"
            }
            onChange={handleChange}
          />
          <div className="error-format">
            {hasError("fullName") ? formState.errors.fullName[0] : null}
          </div>
          <label htmlFor="" className="label_modal">
            {t("Phone Number")}
          </label>{" "}
          <InputField
            value={formState.values.phone}
            name="phone"
            className={
              hasError("phone") && formState.errors.phone ? "textfield_row2_red" : "textfield_row2"
            }
            onChange={handlePhnChange}
          />
          <div className="error-format">{hasError("phone") ? formState.errors.phone[0] : null}</div>
          <label htmlFor="" className="label_modal">
            Contact
          </label>{" "}
          <InputField
            value={formState.values.contact}
            name="contact"
            className={
              hasError("contact") && formState.errors.contact
                ? "textfield_row2_red"
                : "textfield_row2"
            }
            onChange={handleChange}
          />
          <div className="error-format">
            {hasError("contact") ? formState.errors.contact[0] : null}
          </div>
          <label htmlFor="" className="label_modal">
            {t("Default sending Email address")}
          </label>
          <InputField
            value={formState.values.email}
            name="email"
            className={
              hasError("email") && formState.errors.email ? "textfield_row2_red" : "textfield_row2"
            }
            onChange={handleChange}
          />
          <div className="error-format">{hasError("email") ? formState.errors.email[0] : null}</div>
          <Button
            text={t("Update Service Provider")}
            className={formState.isValid ? "edit_vendor_button" : "edit_vendor_button_disabled"}
            disabled={!formState.isValid ? true : false}
            onClick={handelUpdateVendor}
          />
        </div>
      </Modal>
    </>
  );
};

export default NameProvider;
