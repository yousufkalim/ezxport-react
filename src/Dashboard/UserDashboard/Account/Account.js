import React, { useEffect, useState } from "react";
import SearchIcon from "../../../assets/SearchIcon.svg";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import UserInformation from "./subcomponents/UserInformation";
import CompanyInformation from "./subcomponents/CompanyInformation";
import { toast } from "react-toastify";
import API from "../../../api/index";
import { useTranslation, Trans } from "react-i18next";
import { validate } from "validate.js";
import Button from "../../../components/Common/Button";

const schema = {
  lastName: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },
  type: {
    presence: { allowEmpty: false, message: "is required" },
  },
  vatNumber: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 64 },
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

const Account = () => {
  const [value, setValue] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    isValid: false,
    values: { lastName: "", type: "", vatNumber: "" },
    touched: {},
    errors: {}
  });

  const { t, i18n } = useTranslation();
  const { language } = i18n;

  useEffect(() => {
    getUserInformation();
  }, []);

  const setData = (data) => {
    const { name, type, vat } = data;
    setFormState({...formState, values:{ lastName:name, type, vatNumber: vat }});
  };


  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values, setFormState]);

  const getUserInformation = async () => {
    const user = localStorage.getItem("userData");
    const userData = JSON.parse(user);
    setLoading(true);
    await API("get", `/users/${userData._id}`)
      .then((res) => {
        const currentUser = res.data.user;
        setUser(currentUser);
        setData(currentUser.company);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Something went wrong");
        setLoading(false);
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const submitCompanyInfo = async () => {
    const { lastName, type, vatNumber } = formState.values;
    const companyObj = {
      name: lastName,
      type,
      vat: vatNumber,
    };
    const userData = { ...user };
    userData.company = companyObj;
    await API("put", `/users/${userData._id}`, userData)
      .then((res) => {
        toast.success("company updated successfully");
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  };

  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          <div className="List_heading_div2">
            <h1 className="list_h1">Account</h1>
            {value === 1 ? (
              <>
                <div className="account_container">
                  <Button disabled={!formState.isValid} text='Validate the modification' onClick={(e) => submitCompanyInfo(e)} className="account_btn" />
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="list_table">
            <Box sx={{ width: "100%" }}>
              <Box>
                <Tabs value={value} onChange={handleChange}>
                  <Tab className="tab_btn1" label="User information" {...a11yProps(0)} />
                  <Tab className="tab_btn3" label={t("Company information")} {...a11yProps(2)} />
                </Tabs>
              </Box>
              <br />
              {/* 1in tag */}
              <TabPanel value={value} index={0}>
                <UserInformation />
              </TabPanel>

              {/* 2in tag */}
              <TabPanel value={value} index={1}>
                <CompanyInformation
                  formState={formState}
                  setFormState={setFormState}
                  loading={loading}
                />
              </TabPanel>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
