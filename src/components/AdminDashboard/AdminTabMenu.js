import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import AdminTab1 from "./AdminTab1";
import AdminTab2 from "./AdminTab2";
import AdminTab3 from "./AdminTab3";
import AdminTab4 from "./AdminTab4";
import DownArrow from "../../assets/TitleDownArrow.svg";
import { useParams } from "react-router-dom";
import API from "../../api/index";
import { useTranslation } from "react-i18next";
import toaster from "../../utils/toaster";

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

const AdminTabMenu = () => {
  const params = useParams();
  const { id } = params;
  const [value, setValue] = useState(0);
  const [vendor, setVendor] = useState();
  const [document, setDocument] = useState();
  const [boms, setBoms] = useState();
  const [calculation, setCalculation] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    handleCountryData();
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleCountryData = async () => {
    await API("get", `/countries/${id}`)
      .then((res) => {
        setVendor(res.data.country.vendors);
        setDocument(res.data.country.documents);
        setBoms(res.data.country.boms);
        setCalculation(res.data.country.calculation);
      })
      .catch((err) => {
        toaster("failed", t("Countries not found"), "Error")
      });
  };
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box>
          <Tabs value={value} onChange={handleChange} className="tab_menu">
            <Tab className="admin_tab_btn" label={t("Service providers")} {...a11yProps(0)} />
            <Tab className="admin_tab_btn" label={t("Documents")} {...a11yProps(1)} />
            <Tab className="admin_tab_btn" label={t("BOMs")} {...a11yProps(2)} />
            <Tab className="admin_tab_btn" label={t("Calculation")} {...a11yProps(3)} />
          </Tabs>
        </Box>
        <br />
        {/* TABLE NO.1 */}

        <TabPanel value={value} index={0}>
          <div className="list_table">
            <AdminTab1 vendor={vendor} />
          </div>
        </TabPanel>
        {/* TABLE NO.2 */}
        <TabPanel value={value} index={1}>
          <div className="list_table">
            <AdminTab2 rows={document} img={DownArrow} />
          </div>
        </TabPanel>
        {/* TABLE NO.3 */}
        <TabPanel value={value} index={2}>
          <div className="list_table">
            <AdminTab3 rows={boms} />
          </div>
        </TabPanel>
        {/* TABLE NO.4 */}
        <TabPanel value={value} index={3}>
          <AdminTab4 calculation={calculation} />
        </TabPanel>
      </Box>
    </>
  );
};

export default AdminTabMenu;
