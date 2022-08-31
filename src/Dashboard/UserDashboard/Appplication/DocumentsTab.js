import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import RightArrow from '../../../assets/RightArrow.svg';
import TitleDownArrow from '../../../assets/TitleDownArrow.svg';
import DownloadIcon from '../../../assets/DownloadIcon.svg';

const DocumentsTab = () => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <List>
        <ListItemButton sx={{ border: '1px solid #EAECF0', backgroundColor: '#F9FAFB' }}>
          <li className="table_li" style={{ marginRight: 'auto', display: 'flex' }}>
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
            <ListItemButton sx={{ border: '1px solid #EAECF0', position: 'relative' }}>
              <li className="table_li2" style={{ marginRight: 'auto', display: 'flex' }}>
                <img src={RightArrow} alt="" className="rightArrow" />
                Proforma
              </li>
              <p className="send_p">Sent</p>
              <img src={DownloadIcon} alt="" className="downlaod_img" />
            </ListItemButton>
            <ListItemButton sx={{ border: '1px solid #EAECF0' }}>
              <li className="table_li2" style={{ marginRight: 'auto', display: 'flex' }}>
                <img src={RightArrow} alt="" className="rightArrow2" />
                Import&nbsp;declaration
              </li>
              <p className="send_p">Sent</p>

              <img src={DownloadIcon} alt="" className="downlaod_img" />
            </ListItemButton>
            <ListItemButton sx={{ border: '1px solid #EAECF0' }}>
              <li className="table_li2" style={{ marginRight: 'auto', display: 'flex' }}>
                <img src={RightArrow} alt="" className="rightArrow" />
                PL
              </li>
              <p className="send_p">Sent</p>
              <img src={DownloadIcon} alt="" className="downlaod_img" />
            </ListItemButton>

            <ListItemButton
              onClick={handleClick}
              sx={{ border: '1px solid #EAECF0', display: 'flex' }}
            >
              <li className="table_li2" style={{ marginRight: 'auto', display: 'flex' }}>
                <img src={RightArrow} alt="" className="rightArrow" />
                8510860
              </li>
              <p className="send_p">Sent</p>
              <img src={DownloadIcon} alt="" className="downlaod_img_main" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <ListItemButton sx={{ border: '1px solid #EAECF0' }}>
                <li className="table_li4" style={{ marginRight: 'auto', display: 'flex' }}>
                  <img src={RightArrow} alt="" className="rightArrow" />
                  8510860_FT
                </li>
                <p className="send_p">Sent</p>
                <img src={DownloadIcon} alt="" className="downlaod_img" />
              </ListItemButton>
              <ListItemButton sx={{ border: '1px solid #EAECF0' }}>
                <li className="table_li4" style={{ marginRight: 'auto', display: 'flex' }}>
                  <img src={RightArrow} alt="" className="rightArrow" />
                  8510860_FT
                </li>
                <p className="send_p">Sent</p>
                <img src={DownloadIcon} alt="" className="downlaod_img" />
              </ListItemButton>
              <ListItemButton sx={{ border: '1px solid #EAECF0' }}>
                <li className="table_li4" style={{ marginRight: 'auto', display: 'flex' }}>
                  <img src={RightArrow} alt="" className="rightArrow" />
                  8510860_FT
                </li>
                <p className="send_p">Sent</p>
                <img src={DownloadIcon} alt="" className="downlaod_img" />
              </ListItemButton>
              <ListItemButton sx={{ border: '1px solid #EAECF0', height: '3rem' }}></ListItemButton>
            </Collapse>
          </List>
        </Collapse>
      </List>
      <List>
        {/* <ListItemButton onClick={handleClick} sx={{ border: '1px solid #EAECF0' }}>
          <li className="table_li" style={{ marginRight: 'auto', display: 'flex' }}>
            8510861
          </li>
          <img src={DownloadIcon} alt="" className="downlaod_img_main" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton> */}
      </List>
    </>
  );
};

export default DocumentsTab;
