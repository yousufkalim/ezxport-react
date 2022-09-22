import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import API from "../../../api/index";
import { toast } from "react-toastify";
import BuyersTab from "./subcomponents/BuyersTab";
import SellersTab from "./subcomponents/SellersTab";
import LocationsTab from "./subcomponents/LocationsTab";
import toaster from "../../../utils/toaster";

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

const TabMenu = ({ t, value, handleChange, setOpen, open, title }) => {
  const [countries, setCountries] = useState([]);
  const user = localStorage.getItem("userData");
  const userData = JSON.parse(user);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    await API("get", "/countries")
      .then((res) => {
        setCountries(res?.data?.countries);
      })
      .catch((err) => toaster("Failed", "Something went wrong!"));
  };

  return (
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
          schema={t(schema)}
          t={t}
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
          userId={userData._id}
          countries={countries}
          setOpen={setOpen}
          open={open}
          value={value}
        />
      </TabPanel>
    </Box>
  );
};

export default TabMenu;
