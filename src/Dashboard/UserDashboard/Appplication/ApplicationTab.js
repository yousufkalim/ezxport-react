import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import InformationTab from './InformationTab';
import DocumentsTab from './DocumentsTab';
import Badge from '@mui/material/Badge';
const ApplicationTab = (props) => {
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
      <div className="list_table">
        <Box sx={{ width: '100%', }}>
          <Box>
            <Tabs value={value} onChange={handleChange} >
              <Tab className="tab_btn1" label="Information" {...a11yProps(0)} />
              <Tab className="tab_btn3"  {...a11yProps(1)} label='Documents' />
              {props?.userRequest?.status === "missing documents" || props?.userRequest?.status === "Missing Documents" ?
                <div className='badge_missingDocs' />
                : ""}
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div className="list_table">
              <InformationTab userRequest={props?.userRequest} />
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="list_table">
              <DocumentsTab userRequest={props?.userRequest} />
            </div>
          </TabPanel>
        </Box>
      </div>
    </>
  );
};

export default ApplicationTab;
