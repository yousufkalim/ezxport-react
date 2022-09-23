import React, { useState } from "react";
import SearchField from "../../../components/Common/SearchField";
// import TabMenu from "./TabMenu";
import Button from "../../../components/Common/Button";
import TitleDownArrow from "../../../assets/TitleDownArrow.svg";
import { useTranslation } from "react-i18next";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import BuyersTab from "./subcomponents/BuyersTab";
import PropTypes from "prop-types";
import API from "../../../api/index";
import { toast } from "react-toastify";
import SellersTab from "./subcomponents/SellersTab";
import LocationsTab from "./subcomponents/LocationsTab";

// const title = [
//   { heading: "Company name", sortIcon: true, key: "company_name", imgSrc: TitleDownArrow },
//   { heading: "Country" },
//   { heading: "E-mail address" },
//   { heading: "Telephone" },
//   { heading: "Address" },
//   { heading: "" },
// ];


const schema = {
  companyName: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },
  country: {
    presence: { allowEmpty: false, message: "is required" },
  },
  email: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 64 },
    email: true,
  },
  address: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 64 },
  },
  zipcode: {
    presence: { allowEmpty: false, message: "is required" },
  },
  telephone: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 10, minimum: 10 },
  },
  town: {
    presence: { allowEmpty: false, message: "is required" },
  },
};


const TabPanel = (props) => {
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


const AddressBook = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const user = localStorage.getItem("userData");
  const userData = JSON.parse(user);

  const { t } = useTranslation();

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    await API("get", "/countries")
      .then((res) => {
        setCountries(res?.data?.countries);
      })
      .catch((err) => {
        toast.error(t("Something went wrong!"));
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const buttonTitle = value === 0 ? "Add buyer" : value === 1 ? "Add seller" : "Add location";

  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          {/* list head  */}
          <div className="List_heading_div4">
            <h1 className="list_h1_address">{t("Address Book")}</h1>
            <div className="searching5">
              <SearchField setSearch={setSearchTerm}  />

              <Button text={t("Add")} className="list_reqst_btn3" onClick={handleClickOpen} />
            </div>
          </div>
          {/* list table   */}
          <div className="list_table">
          <Box sx={{ width: "100%" }}>
            <Box>
              <Tabs value={value} onChange={handleChange}>
                <Tab className="tab_btn1" label={t("Buyers")} {...a11yProps(0)} />
                <Tab className="tab_btn2" label={t("Sellers")} {...a11yProps(1)} />
                <Tab className="tab_btn3" label={t("Inspection locations")} {...a11yProps(2)} />
              </Tabs>
            </Box>
            {/* Buyers Tab */}
            <TabPanel value={value} index={0}>
              <BuyersTab
                t={t}
                searchTerm={searchTerm}
                userId={userData._id}
                countries={countries}
                setOpen={setOpen}
                open={open}
                value={value}
              />
            </TabPanel>

            {/* Sellers TAB 2  */}
            <TabPanel value={value} index={1}>
              <SellersTab
                schema={t(schema)}
                t={t}
                searchTerm={searchTerm}
                userId={userData._id}
                countries={countries}
                setOpen={setOpen}
                open={open}
                value={value}
              />
            </TabPanel>

            {/* Locations TAB 3  */}
            <TabPanel value={value} index={2}>
              <LocationsTab
                t={t}
                searchTerm={searchTerm}
                userId={userData._id}
                countries={countries}
                setOpen={setOpen}
                open={open}
                value={value}
              />
            </TabPanel>
          </Box>
            {/* <TabMenu
              t={t}
              handleChange={handleChange}
              value={value}
              setOpen={setOpen}
              open={open}
              title={t("title")}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressBook;
