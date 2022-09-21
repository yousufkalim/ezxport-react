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
  const [formData, setFormData] = useState({ name: "", type: "", vat: "" });

  const { t, i18n } = useTranslation();
  const { language } = i18n;

  useEffect(() => {
    getUserInformation();
  }, []);

  const setData = (data) => {
    const { name, type, vat } = data;
    setFormData({ name, type, vat });
  };

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
        toast.error(t("Something went wrong"));
        setLoading(false);
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const submitCompanyInfo = async () => {
    const { name, type, vat } = formData;
    const companyObj = {
      name,
      type,
      vat,
    };
    const userData = { ...user };
    userData.company = companyObj;
    await API("put", `/users/${userData._id}`, userData)
      .then((res) => {
        toast.success(t("company updated successfully"));
      })
      .catch((err) => {
        toast.error(t("Something went wrong!"));
      });
  };

  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          <div className="List_heading_div2">
            <h1 className="list_h1">{t("Account")}</h1>
            {value === 1 ? (
              <>
                <div className="account_container">
                  <button onClick={(e) => submitCompanyInfo(e)} className="account_btn">
                    {t("Validate the modification")}
                  </button>
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
                  <Tab className="tab_btn1" label={t("User information")} {...a11yProps(0)} />
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
                  formData={formData}
                  setFormData={setFormData}
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
