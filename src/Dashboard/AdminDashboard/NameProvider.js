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
import validate from "validate.js";
import downArrow from "../../assets/TitleDownArrow.svg";
import arrow_up from "../../assets/arrow_up.svg";
import { getSortedData } from "../../lib/getSortedData";
import { useTranslation } from "react-i18next";
import MultiSelect from "../../components/Common/MultiSelect";
import { COUNTRIES } from "../../lib/data";
import { createFilter } from "react-search-input";
import toaster from "../../utils/toaster";

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

const KEYS_TO_FILTERS = ["name"];

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
  const [select, setSelect] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [names, setNames] = useState([]);
  const [id, setId] = useState();
  const [options, setOptions] = useState();

  const hasError = (field) => (formState.touched[field] && formState.errors[field] ? true : false);

  const params = useParams();
  const { id: userId } = params;
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [sort, setSort] = useState({ key: "", ascend: true });

  const { t } = useTranslation();

  useEffect(() => {
    handleCoutries();
  }, []);

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleCoutries = async () => {
    await API("get", "/countries/")
      .then((res) => {
        let country_name = [];
        setOptions(res?.data?.countries);
        res.data.countries.map((item) => {
          country_name.push(item.name);
        });
        setNames(country_name);
      })
      .catch((err) => {
        console.log("errrrr", err);
      });
  };

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
    await API("get", `/vendors/${userId}`)
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
        const allCountries = res?.data?.vendor?.countries;
        if (allCountries) {
          setCountries(allCountries);
          const countryNames = allCountries.map((item) => item?.name);
          setSelect(countryNames);
          console.log("ALL countries ", res?.data?.vendor?.countries);
        }
      })
      .catch((err) => {
        console.log(err, "errrrrr");
      });
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    let ids = [];
    if (options?.length > 0 && select?.length > 0) {
      options?.map((item) => {
        select?.map((item2) => {
          if (item.name === item2) {
            ids.push(item._id);
          }
        });
      });
      setId(ids);
    }
  }, [select]);

  const handelUpdateAssociatedCountries = async () => {
    await API("put", `/vendors/${userId}`, {
      phone_number: formState.values.phone,
      name: formState.values.fullName,
      sending_email: formState.values.email,
      contact_email: formState.values.contact,
      countries: id,
    })
      .then((res) => {
        setOpen(false);
        toaster(
          "success",
          t("Service Provider Updated Successfully"),
          t("Updated Service Provider")
        );
      })
      .catch((err) => {
        setOpen(false);
        toaster("Failed", t(err.response.data.message));
      });
  };

  const handelUpdateVendor = async () => {
    await API("put", `/vendors/${userId}`, {
      phone_number: formState.values.phone,
      name: formState.values.fullName,
      sending_email: formState.values.email,
      contact_email: formState.values.contact,
      countries: countries,
    })
      .then((res) => {
        setOpen(false);
        toaster(
          "success",
          t("Service Provider Updated Successfully"),
          t("Updated Service Provider")
        );
      })
      .catch((err) => {
        setOpen(false);
        toaster("Failed", t(err.response.data.message));
      });
  };

  const handleMultiSelectChange = (event) => {
    console.log("VALUE ", event.target.value);
    const {
      target: { value },
    } = event;
    setSelect(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const searchedResults = countries?.filter(createFilter(searchTerm, KEYS_TO_FILTERS));

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
            <div className="searching2">
              {value === 1 && (
                <div className="searching">
                  <SearchField placeholder={t("Search")} setSearch={setSearchTerm} />
                </div>
              )}
              <Button text={t("Update")} className="changeProvider" onClick={() => setOpen(true)} />
            </div>
          </div>

          <div className="list_table">
            <Box sx={{ width: "100%" }}>
              <Box>
                <Tabs value={value} onChange={handleDataChange} className="tab_menu">
                  <Tab className="admin_tab_btn" label={t("Information")} {...a11yProps(0)} />
                  <Tab
                    className="admin_tab_btn"
                    label={t("Associated countries")}
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>

              <TabPanel value={value} index={0}>
                <div className="list_table">
                  <div className="textField_div1">
                    <label htmlFor="" className="label_modal">
                      {t("Default sending email address")}
                    </label>
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
                        {t("Contact email")}
                      </label>
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
                      </label>
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
                      </label>
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
                              {t("Country")} &nbsp;
                              {!sort.ascend ? (
                                <img
                                  className="sorting-icon"
                                  onClick={() =>
                                    getSortedData(
                                      countries,
                                      setCountries,
                                      setSort,
                                      [],
                                      "name",
                                      true
                                    )
                                  }
                                  src={arrow_up}
                                  alt=""
                                />
                              ) : (
                                <img
                                  onClick={() =>
                                    getSortedData(
                                      countries,
                                      setCountries,
                                      setSort,
                                      [],
                                      "name",
                                      false
                                    )
                                  }
                                  src={downArrow}
                                  alt=""
                                />
                              )}
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {searchedResults?.map((item) => {
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
                  </>
                </div>
              </TabPanel>
            </Box>
          </div>
        </div>
      </div>

      <Modal
        open={open && value === 1}
        setOpen={setOpen}
        title={t("Update Service Provider")}
        className="service-provider-country-modal"
        handleClose={handleClose}
        Closebtn={true}
      >
        <div className="edit_vendor_div">
          <label htmlFor="" className="label_modal">
            {t("Select country to add")}
          </label>
          <MultiSelect
            name="country"
            onChange={handleMultiSelectChange}
            value={select}
            names={names}
            select={select}
          />
          <Button
            text={t("Update Service Provider")}
            className={formState.isValid ? "edit_vendor_button" : "edit_vendor_button_disabled"}
            disabled={!formState.isValid ? true : false}
            onClick={handelUpdateAssociatedCountries}
          />
        </div>
      </Modal>

      <Modal
        open={open && value === 0}
        setOpen={setOpen}
        title={t("Update Service Provider")}
        handleClose={handleClose}
        Closebtn={true}
      >
        <div className="edit_vendor_div">
          <label htmlFor="" className="label_modal">
            {t("Full Name")}
          </label>
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
          </label>
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
            {t("Contact email")}
          </label>
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
            {t("Default sending email address")}
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
