import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import SellerTab from "./SellerTab";
import BuyerTab from "./BuyerTab";
import PlaceOfInspectionTab from "./PlaceOfInspectionTab";
import moment from "moment";
import ProductLists from "./ProductLists";
import { useTranslation } from "react-i18next";

const InformationTab = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { t } = useTranslation();
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
  return (
    <>
      <div className="InformationTab">
        <div className="InformationTab_col">
          <div className="requestDate_tab">
            <p className="requestData_p">{t("Request date")}</p>
            <p className="requestData_date">
              {moment(props?.userRequest?.createdAt).format("DD/MM/YYYY")}
            </p>
          </div>
          <div className="requestDate_tab">
            <p className="requestData_p">{t("Country")}</p>
            <p className="requestData_date">{t(props?.userRequest?.country?.name)}</p>
          </div>
        </div>
        <div className="InformationTab_col">
          <div className="requestDate_tab">
            <p className="requestData_p">{t("Certificate cost")}</p>
            <p className="requestData_date">
              {props?.userRequest?.certification_cost?.value}{" "}
              {props?.userRequest?.certification_cost?.currency === "USD" ? "$" : "€"}{" "}
            </p>
          </div>
          <div className="requestDate_tab">
            <p className="requestData_p">{t("Inspection date")}</p>
            <p className="requestData_date">
              {moment(props?.userRequest?.inspection_date).format("ll")}
            </p>
          </div>
        </div>
      </div>
      {/* 3 tab menu  */}
      <div className="expeditions_div">
        <p className="expeditions_p">{t("Expeditions")}</p>
      </div>
      <Box sx={{ width: "100%" }}>
        <Box>
          <Tabs value={value} onChange={handleChange}>
            <Tab className="tab_btn1" label={t("Sellers")} {...a11yProps(0)} />
            <Tab className="tab_btn2" label={t("Buyers")} {...a11yProps(1)} />
            <Tab className="tab_btn3" label={t("Place of inspection")} {...a11yProps(2)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <div className="list_table">
            <SellerTab seller={props?.userRequest?.seller} codes={props?.userRequest?.codes} />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="list_table">
            <BuyerTab buyer={props?.userRequest?.buyer} />
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div className="list_table">
            <PlaceOfInspectionTab place={props?.userRequest?.place} />
          </div>
        </TabPanel>
      </Box>
      <ProductLists
        codes={props?.userRequest?.codes}
        currency={props?.userRequest?.country?.currency}
      />
    </>
  );
};

export default InformationTab;
