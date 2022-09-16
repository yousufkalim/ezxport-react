import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DownloadIcon from '../../../../assets/DownloadIcon.svg';
import RightArrow from '../../../../assets/RightArrow.svg';
import TitleDownArrow from '../../../../assets/TitleDownArrow.svg';
import API from '../../../../api/index';
import { toast } from 'react-toastify';
import Spinner from '../../../../components/Common/Spinner';

const DocumentByRequest = ({loading, documents}) => {

    const [request, setRequest] = useState({open: false, id: ""});

    const handleClick = (id) => {
      setRequest({open: !request.open, id: request.open ? "" : id});
    };

    const downloadZipFile = async (e,reqId) => {
        e.stopPropagation();
        await API('get', `/requests/zipFile/${reqId}`).then((res) => {
            window.location.href = res.config.url;
        }).catch(err => {
            toast.error("File not found!");
        })
    }

    const downloadDocument = async (e,reqId, docId) => {
        console.log("Document  ", docId);
        e.stopPropagation();
        await API('get', `/requests/zipFileDocument/${reqId}/${docId}`).then((res) => {
            window.location.href = res.config.url;
        }).catch(err => {
            toast.error("File not found!");
        })
    }

  return (
    <div>
        <List>
                  <ListItemButton sx={{ border: '1px solid #EAECF0', background: '#f9fafb' }}>
                    <li className="table_li_name" style={{ marginRight: 'auto', display: 'flex' }}>
                      Folder name &nbsp;
                      <img src={TitleDownArrow} alt="" className="title_arrow" />
                    </li>
                  </ListItemButton>
                  {
                    loading ? <Spinner /> : (      
                        <React.Fragment>
                            {
                                documents.length > 0 && documents.map(({requestId, title}) => {
                                    if(documents?.documents){
                                        return (
                                            <React.Fragment key={requestId}>
                                                <ListItemButton onClick={(e) =>handleClick(requestId)} sx={{ border: '1px solid #EAECF0' }}>
                                                    <li className="table_li" style={{ marginRight: 'auto', display: 'flex' }}>
                                                    {title}
                                                    </li>
                                                    <img onClick={(e) => downloadZipFile(e , requestId)} src={DownloadIcon} alt="" className="downlaod_img_main" />
                                                    {request.open && request.id === requestId ? <ExpandLess /> : <ExpandMore />}
                                                </ListItemButton>
                                                <Collapse in={request.open && request.id === requestId} timeout="auto" unmountOnExit>
                                                    {
                                                        documents?.documents?.length > 0 && documents?.documents?.map(({_id:docId, doc_id}) => (
                                                            <ListItemButton
                                                                sx={{ border: '1px solid #EAECF0', display: 'flex' }}
                                                            >
                                                                <li className="table_li2" style={{ marginRight: 'auto', display: 'flex' }}>
                                                                <img src={RightArrow} alt="" className="rightArrow" />
                                                                    {doc_id?.name}
                                                                </li>
                                                                <img onClick={(e) => downloadDocument(e ,requestId ,doc_id._id)} src={DownloadIcon} alt="" className="downlaod_img" />                                                    
                                                            </ListItemButton>
                                                        ))
                                                    }
                                                </Collapse>
                                            </React.Fragment>
                                        )
                                    }
                                })
                            }
                        </React.Fragment>
                    )
                  }
                  
        </List>
    </div>
  )
}

export default DocumentByRequest