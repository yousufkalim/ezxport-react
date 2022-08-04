import SearchField from "../../components/Common/SearchField";
import Button from "../../components/Common/Button";
import InputField from "../../components/Common/InputField";
import Modal from "../../components/Common/Modal";
import BackArrow from "../../assets/BackArrow.svg";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import PaginationPage from "../../components/AdminDashboard/Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AdminTab1 from "../../components/AdminDashboard/AdminTab1";
import AdminTab2 from "../../components/AdminDashboard/AdminTab2";
import DownArrow from "../../assets/TitleDownArrow.svg";
import { useParams } from "react-router-dom";
import API from "../../api/index";
import { toast } from "react-toastify";

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
  const params = useParams();
  const { id } = params;
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [sendingEmail, setSendingEmail] = useState("");
  const [Contact, setContact] = useState("");
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countries, setCountries] = useState();

  useEffect(() => {
    handleGetVendor();
  }, [open]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleGetVendor = async () => {
    await API("get", `/vendors/${id}`)
      .then((res) => {
        console.log(res, "resssss");
        setSendingEmail(res?.data?.vendor?.sending_email);
        setContact(res?.data?.vendor?.contact_email);
        setFullname(res?.data?.vendor?.name);
        setPhoneNumber(res?.data?.vendor?.phone_number);
        setCountries(res?.data?.vendor?.countries);
      })
      .catch((err) => {
        console.log(err, "errrrrr");
      });
  };
  const handleClose = () => setOpen(false);
  const handelUpdateVendor = async () => {
    await API("put", `/vendors/${id}`, {
      phone_number: phoneNumber,
      name: fullname,
      sending_email: sendingEmail,
      contact_email: Contact,
      countries: countries,
    })
      .then((res) => {
        console.log("first,res", res);
        setOpen(false);
        toast.success("Service Provider Updated Successfully");
      })
      .catch((err) => {
        console.log("ERRRR", err);
        setOpen(false);
        toast.error(err.response.data.message);
      });
  };
  //   const handleGetCountrybyId = () => {
  //     countries;
  //   };
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
              &nbsp; Service Providers
            </h1>

            {value === 0 ? (
              <div className="searching2">
                <Button text="Change Provider" className="changeProvider" onClick={() => setOpen(true)} />
              </div>
            ) : (
              <div className="searching">
                <SearchField placeholder="Searching" />
                <Button text="Change Provider" className="changeProvider" />
              </div>
            )}
          </div>

          <div className="list_table">
            <Box sx={{ width: "100%" }}>
              <Box>
                <Tabs value={value} onChange={handleChange} className="tab_menu">
                  <Tab className="admin_tab_btn" label="Information" {...a11yProps(0)} />
                  <Tab className="admin_tab_btn" label="Associated Countries" {...a11yProps(1)} />
                </Tabs>
              </Box>

              <TabPanel value={value} index={0}>
                <div className="list_table">
                  <div className="textField_div1">
                    <label htmlFor="" className="label_modal">
                      Default sending email address
                    </label>{" "}
                    <InputField name="sendingEmail" className="textfield_row1" disabled={true} value={sendingEmail} />
                  </div>
                  <div className="textField_div2">
                    <div className="textField_row2_div">
                      <label htmlFor="" className="label_modal">
                        Contact
                      </label>{" "}
                      <InputField disabled={true} name="Contact" className="textfield_row2" value={Contact} />
                    </div>
                    <div className="textField_row2_div">
                      <label htmlFor="" className="label_modal">
                        Full Name
                      </label>{" "}
                      <InputField disabled={true} name="fullname" className="textfield_row2" value={fullname} />
                    </div>
                    <div className="textField_row2_div">
                      <label htmlFor="" className="label_modal">
                        Phone Number
                      </label>{" "}
                      <InputField disabled={true} name="phoneNumber" className="textfield_row2" value={phoneNumber} />
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
                            <TableCell sx={{ color: "#667085", backgroundColor: "#F9FAFB" }}>
                              Country <img src={DownArrow} alt="" />
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {countries?.map((item) => {
                            return (
                              <TableRow key={item.name}>
                                <TableCell component="th" scope="row" sx={{ border: "1px solid #E5E5E5;", padding: 2 }}>
                                  {item.name}
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
      <Modal open={open} setOpen={setOpen} title="Update Service Provider" handleClose={handleClose} Closebtn={true}>
        <div className="edit_vendor_div">
          <label htmlFor="" className="label_modal">
            Full Name
          </label>{" "}
          <InputField value={fullname} name="fullname" className="textfield_row2" onChange={(e) => setFullname(e.target.value)} />
          <label htmlFor="" className="label_modal">
            Phone Number
          </label>{" "}
          <InputField
            value={phoneNumber}
            name="phone_Number"
            className="textfield_row2"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <label htmlFor="" className="label_modal">
            Contact
          </label>{" "}
          <InputField
            value={Contact}
            name="contactEmail"
            className="textfield_row2"
            onChange={(e) => setContact(e.target.value)}
          />
          <label htmlFor="" className="label_modal">
            Default sending Email address
          </label>
          <InputField
            value={sendingEmail}
            name="sendingEmail"
            className="textfield_row2"
            onChange={(e) => setSendingEmail(e.target.value)}
          />
          <Button text="Update Service Provider" className="edit_vendor_button" onClick={handelUpdateVendor} />
        </div>
      </Modal>
    </>
  );
};

export default NameProvider;
