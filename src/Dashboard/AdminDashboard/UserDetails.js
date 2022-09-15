import InputField from "../../components/Common/InputField";
import BackArrow from "../../assets/BackArrow.svg";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import API from "../../api/index";
// import { toast } from 'react-toastify';
import Moment from "moment";
import { useTranslation, Trans } from "react-i18next";
import downArrow from '../../assets/TitleDownArrow.svg';
import arrow_up from '../../assets/arrow_up.svg';
import { getSortedData } from '../../lib/getSortedData';

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
const UserDetails = () => {
  // user data states
  const params = useParams();
  const { id } = params;
  const [value, setValue] = useState(0);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [completeAddress, setCompleteAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [town, setTown] = useState("");
  const [name, setName] = useState("");
  const [societyType, setSocietyType] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  // user request states
  const [requestById, setRequestById] = useState([]);
  const [sort, setSort] = useState({key: "", ascend: true});
  const [requestLoading, setRequestLoading] = useState(false);

  const { t, i18n } = useTranslation();
  const { language } = i18n;

  useEffect(() => {
    handleUserData();
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleUserData = async () => {
    await API("get", `/users/${id}`)
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
        console.log(err, "errrrrr");
      });
  };

  const handleRequestByUserId = async () => {
    setRequestLoading(true);
    await API('get', `/requests/getByUser/${id}`)
      .then((res) => {
        console.log("🚀 ~ file: UserDetails.js ~ line 107 ~ .then ~ res", res);
        setRequestById(res?.data?.request);
        setRequestLoading(false);
        // console.log("first", res.data);
      })
      .catch((err) => {
        console.log("err---->", err);
      });
  };

  console.log("Request  ", requestById);

  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          {/* list head  */}
          <div className="List_Details_div">
            <h1 className="list_Details_h1">
              <Link to="/Admin/Dashboard/Users">
                <img src={BackArrow} alt="" style={{ marginRight: "10px" }} />
              </Link>
              &nbsp;
              {`${lastName} ${firstName}`}
            </h1>
          </div>

          <div className="list_table">
            <Box sx={{ width: "100%" }}>
              <Box>
                <Tabs value={value} onChange={handleChange} className="tab_menu">
                  <Tab className="admin_tab_btn" label={t("Information")} {...a11yProps(0)} />

                  <Tab
                    className="admin_tab_btn"
                    label={t("Requests")}
                    {...a11yProps(1)}
                    onClick={handleRequestByUserId}
                  />
                </Tabs>
              </Box>

              <TabPanel value={value} index={0}>
                <div className="list_table">
                  <p className="title_text">{t("Informations utilisateur")}</p>
                  <div className="textField_div2">
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        {t("Last name")}
                      </label>{" "}
                      <InputField disabled={true} className="textfield_row2" value={lastName} />
                    </div>
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        {t("First name")}
                      </label>{" "}
                      <InputField disabled={true} className="textfield_row2" value={firstName} />
                    </div>
                  </div>
                  <div className="textField_div2">
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        {t("E-mail address")}
                      </label>{" "}
                      <InputField disabled={true} className="textfield_row2" value={email} />
                    </div>
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        {t("Telephone")}
                      </label>{" "}
                      <InputField disabled={true} className="textfield_row2" value={phoneNumber} />
                    </div>
                  </div>
                  <div className="textField_div2">
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        {t("Full address")}
                      </label>{" "}
                      <InputField
                        disabled={true}
                        className="textfield_row2"
                        value={completeAddress}
                      />
                    </div>
                    <div className="userdetail_textField_div2">
                      <div className="postel_input">
                        <label htmlFor="" className="label_modal">
                          {t("Postal code")}
                        </label>{" "}
                        <InputField
                          disabled={true}
                          className="userdetail_textField_row"
                          value={postalCode}
                        />
                      </div>
                      <div style={{ width: "60%" }}>
                        <label htmlFor="" className="label_modal">
                          {t("Town")}
                        </label>{" "}
                        <InputField
                          disabled={true}
                          className="userdetail_textField_row"
                          value={town}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="title_text" style={{ marginTop: "2.5rem" }}>
                    {t("Company information")}
                  </p>
                  <div className="textField_div2">
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        {t("Last name")}
                      </label>{" "}
                      <InputField disabled={true} className="textfield_row2" value={name} />
                    </div>
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        {t("Type of society")}
                      </label>{" "}
                      <InputField disabled={true} className="textfield_row2" value={societyType} />
                    </div>
                  </div>
                  <div className="textField_div2">
                    <div className="userdetail_textField_div">
                      <label htmlFor="" className="label_modal">
                        {t("VAT number")}
                      </label>{" "}
                      <InputField disabled={true} className="textfield_row2" value={vatNumber} />
                    </div>
                  </div>
                </div>
              </TabPanel>

              <TabPanel value={value} index={1}>
                <div className="list_table">
                  {requestById?.length !== 0 ? (
                    <>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell
                                align="left"
                                className="country"
                                style={{ backgrounColor: "#EAECF0" }}
                              >
                                {t("Request")} &nbsp;
                                {
                                  !sort.ascend ? (
                                    <img className='sorting-icon' onClick={() => getSortedData(requestById,setRequestById, setSort, [],'title', true)} src={arrow_up} alt="" />
                                  ) : (
                                    <img onClick={() => getSortedData(requestById,setRequestById, setSort, [],'title', false)} src={downArrow} alt="" />
                                  )
                                }
                              </TableCell>
                              <TableCell
                                align="left"
                                className="country"
                                style={{ backgrounColor: "#EAECF0" }}
                              >
                                Date
                              </TableCell>
                              <TableCell
                                align="left"
                                className="country"
                                style={{ backgrounColor: "#EAECF0" }}
                              >
                                {t("Certificate cost")}
                              </TableCell>

                              <TableCell
                                align="left"
                                className="country"
                                style={{ backgrounColor: "#EAECF0" }}
                              >
                                {t("Service providers")}
                              </TableCell>
                              <TableCell
                                align="left"
                                className="country"
                                style={{ backgrounColor: "#EAECF0" }}
                              >
                                {t("Status")}
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {requestById?.map((item) => (
                              <TableRow
                                key={item?._id}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  <p className="AP_plus_title">{item?.title}</p>
                                  <p className="country2">{t(item?.country?.name)}</p>
                                </TableCell>
                                <TableCell align="left" className="country2">
                                  {Moment(item?.createdAt).format("DD/MM/YYYY")}
                                </TableCell>
                                <TableCell align="left" className="country2">
                                  {item?.certification_cost?.value ? (
                                    <>
                                      {item?.certification_cost?.currency === "USD"
                                        ? item?.certification_cost?.value + "$"
                                        : item?.certification_cost?.currency === "EURO" &&
                                          item?.certification_cost?.value + "€"}
                                    </>
                                  ) : (
                                    "--"
                                  )}
                                </TableCell>

                                <TableCell align="left" className="country2">
                                  {item?.vendor?.contact_lname ? (
                                    <>
                                      {item?.vendor?.contact_lname}
                                      {item?.vendor?.contact_fname}
                                    </>
                                  ) : (
                                    "--"
                                  )}
                                </TableCell>
                                <TableCell align="left">
                                  <p className="clrClass">{t(item.status)}</p>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </>
                  ) : (
                    <>
                      <h1 style={{ textAlign: "center", color: "#667085" }}>
                        No request created by {`${lastName} ${firstName}`}
                      </h1>
                    </>
                  )}
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
