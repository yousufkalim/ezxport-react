import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import SellerTab from './SellerTab';
import BuyerTab from './BuyerTab';
import PlaceOfInspectionTab from './PlaceOfInspectionTab';

const InformationTab = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  return (
    <>
      <div className="InformationTab">
        <div className="InformationTab_col">
          <div className="requestDate_tab">
            <p className="requestData_p">Request date</p>
            <p className="requestData_date">07/03/2023</p>
          </div>
          <div className="requestDate_tab">
            <p className="requestData_p">Country</p>
            <p className="requestData_date">Gabon</p>
          </div>
        </div>
        <div className="InformationTab_col">
          <div className="requestDate_tab">
            <p className="requestData_p">Certificate cost</p>
            <p className="requestData_date">300 €</p>
          </div>
          <div className="requestDate_tab">
            <p className="requestData_p">Inspection date</p>
            <p className="requestData_date">Jan 6, 2022</p>
          </div>
        </div>
      </div>
      {/* 3 tab menu  */}
      <div className="expeditions_div">
        <p className="expeditions_p">Expeditions</p>
      </div>
      <Box sx={{ width: '100%' }}>
        <Box>
          <Tabs value={value} onChange={handleChange}>
            <Tab className="tab_btn1" label="Seller" {...a11yProps(0)} />
            <Tab className="tab_btn2" label="Buyer" {...a11yProps(1)} />
            <Tab className="tab_btn3" label="Place of inspection" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <div className="list_table">
            <SellerTab />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="list_table">
            <BuyerTab />
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div className="list_table">
            <PlaceOfInspectionTab />
          </div>
        </TabPanel>
      </Box>
    </>
  );
};

export default InformationTab;
