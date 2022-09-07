import React, { useState } from 'react';
import SearchIcon from '../../assets/SearchIcon.svg';
import QuizIcon from '../../assets/QuizIcon.svg';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

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

const Account = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
                  <button className="account_btn">Validate the modification</button>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="list_table">
            <Box sx={{ width: '100%' }}>
              <Box>
                <Tabs value={value} onChange={handleChange}>
                  <Tab className="tab_btn1" label="User information" {...a11yProps(0)} />
                  <Tab className="tab_btn3" label="Company information" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <br />
              {/* 1in tag */}
              <TabPanel value={value} index={0}>
                <div className="emailAddress_div">
                  <label className="email_input_label" htmlFor="">
                    E-mail address
                  </label>
                  <input type="text" className="email_input" placeholder="mail@mail.com" />
                  <img src={QuizIcon} alt="" className="email_input_icon" />
                </div>
              </TabPanel>

              {/* 2in tag */}
              <TabPanel value={value} index={1}>
                <div className="company_input_div">
                  <div className="company_input_col">
                    <label className="email_input_label" htmlFor="">
                      Last name
                    </label>
                    <input type="text" className="company_input" placeholder="Last name" />
                  </div>
                  <div className="company_input_col">
                    <label className="email_input_label" htmlFor="">
                      Type of society
                    </label>
                    <div className="select_options">
                      <select className="company_input2" name="cars" id="cars">
                        <option value="volvo">Type</option>
                        <option value="saab">Type</option>
                        <option value="mercedes">Type</option>
                        <option value="audi">Type</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="company_input_div">
                  <div className="company_input_col">
                    <label className="email_input_label" htmlFor="">
                      VAT number
                    </label>
                    <input type="text" className="company_input" placeholder="6372890367849" />
                  </div>
                </div>
              </TabPanel>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
