import React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import DownArrow from '../../assets/TitleDownArrow.svg';
import AdminTab1 from './AdminTab1';
import AdminTab2 from './AdminTab2';
import AdminTab3 from './AdminTab3';
import AdminTab4 from './AdminTab4';

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
//   arry
const rows = [
  {
    createData: 'AP more',
  },
  {
    createData: 'Bureau Veritas ',
  },
  {
    createData: 'Cotecna ',
  },
  {
    createData: 'Intertek ',
  },
  {
    createData: 'SGS ',
  },
  {
    createData: 'TÜV Rheinland ',
  },
];
const rows2 = [
  {
    createData: 'Document',
    createData2: 'More or less long text',
    code: '8510860',
    lname: 'Long name',
    status: 'Subject to inspection',
  },
  {
    createData: 'Document',
    createData2: 'More or less long text',
    code: '8510860',
    lname: 'Long name',
    status: 'Subject to inspection',
  },
  {
    createData: 'Document',
    createData2: 'More or less long text',
    code: '8510860',
    lname: 'Long name',
    status: 'Subject to inspection',
  },
  {
    createData: 'Document',
    createData2: 'More or less long text',
    code: '8510860',
    lname: 'Long name',
    status: 'Subject to inspection',
  },
  {
    createData: 'Document',
    createData2: 'More or less long text',
    code: '8510860',
    lname: 'Long name',
    status: 'Subject to inspection',
  },
  {
    createData: 'Document',
    createData2: 'More or less long text',
    code: '8510860',
    lname: 'Long name',
    status: 'Subject to inspection',
  },
  {
    createData: 'Document',
    createData2: 'More or less long text',
    code: '8510860',
    lname: 'Long name',
    status: 'Not subject',
  },
  {
    createData: 'Document',
    createData2: 'More or less long text',
    code: '8510860',
    lname: 'Long name',
    status: 'Not subject',
  },
];

const AdminTabMenu = () => {
 
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box>
          <Tabs value={value} onChange={handleChange}>
            <Tab className="admin_tab_btn" label="Service providers" {...a11yProps(0)} />
            <Tab className="admin_tab_btn" label="Documents" {...a11yProps(1)} />
            <Tab className="admin_tab_btn" label="BOMs" {...a11yProps(2)} />
            <Tab className="admin_tab_btn" label="Calculation" {...a11yProps(3)} />
          </Tabs>
        </Box>
        {/* table 1 */}

        <TabPanel value={value} index={0}>
          <div className="list_table">
            <AdminTab1 rows={rows} text="Service providers" text2="Pays associés" img={DownArrow} />
          </div>
        </TabPanel>
        {/* table 2 */}
        <TabPanel value={value} index={1}>
          <div className="list_table">
            <AdminTab2 rows={rows2} text="Documents" text2="Help Information" img={DownArrow} />
          </div>
        </TabPanel>
        {/* table 3 */}
        <TabPanel value={value} index={2}>
          <div className="list_table">
            <AdminTab3
              rows={rows2}
              text="BOMs code "
              text2="Last name "
              text3="Status"
              img={DownArrow}
            />
          </div>
        </TabPanel>
        {/* table 4 */}
        <TabPanel value={value} index={3}>
          <AdminTab4 />
        </TabPanel>
      </Box>
    </>
  );
};

export default AdminTabMenu;
