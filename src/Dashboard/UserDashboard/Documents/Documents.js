import React, { useEffect, useState } from 'react';
import SearchIcon from '../../../assets/SearchIcon.svg';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import API from '../../../api/index';
import { toast } from 'react-toastify';
import Spinner from '../../../components/Common/Spinner';
import DocumentByRequest from './subcomponents/DocumentByRequest';
import DocumentByName from './subcomponents/DocumentByName';

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

const Documents = () => {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [codes, setCodes] = useState([]);
  const [documents, setDocuments] = useState([]);

  const userData = localStorage.getItem('userData');
  const user = JSON.parse(userData);

  useEffect(() => {
    getAllRequests();
  },[]);

  const getAllRequests = () => {
    setLoading(true);
    API('get', `/requests/returnMultipleFormatedRequest/${user._id}`).then((res) => {
      const allRequests = res.data?.Request;
      const allCodes = allRequests.filter(item => item.codes.length > 0 );
      const allDocuments = allRequests.filter(item => item.documents.length > 0 );
      setLoading(false);
      setDocuments(allDocuments);
      setCodes(allCodes);
    }).catch(err => {
      toast.error('Something went wrong!');
      setLoading();
    });
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          <div className="List_heading_div">
            <h1 className="list_h1_doc">Documents</h1>
            <div className="searching4">
              <input type="text" className="search_input2" placeholder="To Research" />
              <img src={SearchIcon} alt="" className="search_icon2" />
            </div>
          </div>
          <div className="list_table">
            <Box sx={{ width: '100%' }}>
              <Box>
                <Tabs value={value} onChange={handleChange}>
                  <Tab className="tab_btn1" label="By Request" {...a11yProps(0)} />
                  <Tab className="tab_btn3" label="By Nomenclature" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <br />
              <TabPanel value={value} index={0}>
                {/* List  */}
                <DocumentByRequest documents={documents} loading={loading} />
              </TabPanel>

              {/* 2in tag */}
              <TabPanel value={value} index={1}>
                <DocumentByName codes={codes} loading={loading} />
              </TabPanel>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default Documents;
