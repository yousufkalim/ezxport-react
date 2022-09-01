import React, { useState } from 'react';
import SearchIcon from '../../assets/SearchIcon.svg';
import DownloadIcon from '../../assets/DownloadIcon.svg';
// import UpArrow from '../../assets/UpArrow.svg';
// import DownArrow from '../../assets/DownArrow.svg';
import RightArrow from '../../assets/RightArrow.svg';
import TitleDownArrow from '../../assets/TitleDownArrow.svg';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

// table
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          <div className="List_heading_div">
            <h1 className="list_h1">Documents</h1>
            <div className="searching">
              <input type="text" className="search_input" placeholder="To Research" />
              <img src={SearchIcon} alt="" className="search_icon" />
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
                <List>
                  <ListItemButton sx={{ border: '1px solid #EAECF0', background: '#f9fafb' }}>
                    <li className="table_li_name" style={{ marginRight: 'auto', display: 'flex' }}>
                      Folder name &nbsp;
                      <img src={TitleDownArrow} alt="" className="title_arrow" />
                    </li>
                  </ListItemButton>
                  <ListItemButton onClick={handleClick} sx={{ border: '1px solid #EAECF0' }}>
                    <li className="table_li" style={{ marginRight: 'auto', display: 'flex' }}>
                      TRACTELGAB01
                    </li>
                    <img src={DownloadIcon} alt="" className="downlaod_img_main" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ border: '1px solid #EAECF0' }}>
                        <li className="table_li2" style={{ marginRight: 'auto', display: 'flex' }}>
                          <img src={RightArrow} alt="" className="rightArrow" />
                          Document1
                        </li>
                        <img src={DownloadIcon} alt="" className="downlaod_img" />
                      </ListItemButton>
                      <ListItemButton sx={{ border: '1px solid #EAECF0' }}>
                        <li className="table_li2" style={{ marginRight: 'auto', display: 'flex' }}>
                          <img src={RightArrow} alt="" className="rightArrow2" />
                          Delivery&nbsp;form
                        </li>
                        <img src={DownloadIcon} alt="" className="downlaod_img" />
                      </ListItemButton>
                      <ListItemButton sx={{ border: '1px solid #EAECF0' }}>
                        <li className="table_li2" style={{ marginRight: 'auto', display: 'flex' }}>
                          <img src={RightArrow} alt="" className="rightArrow" />
                          8510860
                        </li>
                        <img src={DownloadIcon} alt="" className="downlaod_img" />
                      </ListItemButton>
                      {/* nasted dropdown  */}
                      <ListItemButton
                        onClick={handleClick}
                        sx={{ border: '1px solid #EAECF0', display: 'flex' }}
                      >
                        <li className="table_li3" style={{ marginRight: 'auto', display: 'flex' }}>
                          <img src={RightArrow} alt="" className="rightArrow" />
                          Product&nbsp;name
                        </li>
                        <img src={DownloadIcon} alt="" className="downlaod_img_main" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        <ListItemButton sx={{ border: '1px solid #EAECF0' }}>
                          <li
                            className="table_li4"
                            style={{ marginRight: 'auto', display: 'flex' }}
                          >
                            <img src={RightArrow} alt="" className="rightArrow" />
                            8510860_FT
                          </li>
                          <img src={DownloadIcon} alt="" className="downlaod_img" />
                        </ListItemButton>
                        <ListItemButton sx={{ border: '1px solid #EAECF0' }}>
                          <li
                            className="table_li4"
                            style={{ marginRight: 'auto', display: 'flex' }}
                          >
                            <img src={RightArrow} alt="" className="rightArrow" />
                            8510860_RT
                          </li>
                          <img src={DownloadIcon} alt="" className="downlaod_img" />
                        </ListItemButton>
                        <ListItemButton sx={{ border: '1px solid #EAECF0' }}>
                          <li
                            className="table_li4"
                            style={{ marginRight: 'auto', display: 'flex' }}
                          >
                            <img src={RightArrow} alt="" className="rightArrow" />
                            8510860_CA
                          </li>
                          <img src={DownloadIcon} alt="" className="downlaod_img" />
                        </ListItemButton>
                      </Collapse>
                    </List>
                  </Collapse>
                </List>
                <List>
                  <ListItemButton onClick={handleClick} sx={{ border: '1px solid #EAECF0' }}>
                    <li className="table_li" style={{ marginRight: 'auto', display: 'flex' }}>
                      TRACTELGAB02
                    </li>
                    <img src={DownloadIcon} alt="" className="downlaod_img_main" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </List>
                <List>
                  <ListItemButton onClick={handleClick} sx={{ border: '1px solid #EAECF0' }}>
                    <li className="table_li" style={{ marginRight: 'auto' }}>
                      TRACTELGAB03
                    </li>
                    <img src={DownloadIcon} alt="" className="downlaod_img_main" />
                    {setOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </List>
              </TabPanel>

              {/* 2in tag */}
              <TabPanel value={value} index={1}>
                <List>
                  <ListItemButton sx={{ border: '1px solid #EAECF0', background: '#f9fafb' }}>
                    <li className="table_li_name" style={{ marginRight: 'auto', display: 'flex' }}>
                      Folder name &nbsp;
                      <img src={TitleDownArrow} alt="" className="title_arrow" />
                    </li>
                  </ListItemButton>
                  <ListItemButton onClick={handleClick} sx={{ border: '1px solid #EAECF0' }}>
                    <li className="table_li" style={{ marginRight: 'auto', display: 'flex' }}>
                      8510860
                    </li>
                    <img src={DownloadIcon} alt="" className="downlaod_img_main" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ border: '1px solid #EAECF0' }}>
                        <li className="table_li2" style={{ marginRight: 'auto', display: 'flex' }}>
                          <img src={RightArrow} alt="" className="rightArrow" />
                          Nom&nbsp;produit
                        </li>
                        <img src={DownloadIcon} alt="" className="downlaod_img" />
                      </ListItemButton>
                      <ListItemButton sx={{ border: '1px solid #EAECF0' }}>
                        <li className="table_li2" style={{ marginRight: 'auto', display: 'flex' }}>
                          <img src={RightArrow} alt="" className="rightArrow2" />
                          8510860_RT
                        </li>
                        <img src={DownloadIcon} alt="" className="downlaod_img" />
                      </ListItemButton>
                      <ListItemButton sx={{ border: '1px solid #EAECF0' }}>
                        <li className="table_li2" style={{ marginRight: 'auto', display: 'flex' }}>
                          <img src={RightArrow} alt="" className="rightArrow" />
                          8510860_CA
                        </li>
                        <img src={DownloadIcon} alt="" className="downlaod_img" />
                      </ListItemButton>
                      {/* nasted dropdown  */}
                      <ListItemButton
                        onClick={handleClick}
                        sx={{ border: '1px solid #EAECF0', display: 'flex' }}
                      >
                        <li className="table_li3" style={{ marginRight: 'auto', display: 'flex' }}>
                          <img src={RightArrow} alt="" className="rightArrow" />
                          Bon&nbsp;de&nbsp;livraison
                        </li>
                        <img src={DownloadIcon} alt="" className="downlaod_img_main" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        <ListItemButton sx={{ border: '1px solid #EAECF0' }}>
                          <li
                            className="table_li4"
                            style={{ marginRight: 'auto', display: 'flex' }}
                          >
                            <img src={RightArrow} alt="" className="rightArrow" />
                            Demandes&nbsp;associées
                          </li>
                          <img src={DownloadIcon} alt="" className="downlaod_img" />
                        </ListItemButton>
                        <ListItemButton sx={{ border: '1px solid #EAECF0' }}>
                          <li
                            className="table_li4"
                            style={{ marginRight: 'auto', display: 'flex' }}
                          >
                            <img src={RightArrow} alt="" className="rightArrow" />
                            TRACTELGAB01
                          </li>
                          <img src={DownloadIcon} alt="" className="downlaod_img" />
                        </ListItemButton>
                        <ListItemButton sx={{ border: '1px solid #EAECF0' }}>
                          <li
                            className="table_li4"
                            style={{ marginRight: 'auto', display: 'flex' }}
                          >
                            <img src={RightArrow} alt="" className="rightArrow" />
                            TRACTELGAB01
                          </li>
                          <img src={DownloadIcon} alt="" className="downlaod_img" />
                        </ListItemButton>
                      </Collapse>
                    </List>
                  </Collapse>
                </List>
                <List>
                  <ListItemButton onClick={handleClick} sx={{ border: '1px solid #EAECF0' }}>
                    <li className="table_li" style={{ marginRight: 'auto', display: 'flex' }}>
                      8510861
                    </li>
                    <img src={DownloadIcon} alt="" className="downlaod_img_main" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </List>
              </TabPanel>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default Documents;
