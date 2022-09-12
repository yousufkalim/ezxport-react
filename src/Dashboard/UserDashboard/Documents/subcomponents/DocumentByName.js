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

const DocumentByName = ({loading, codes}) => {

  const [request, setRequest] = useState({open: false, id: ""});
  const [product, setProduct] =  useState({open: false, id: ""});


  const handleClick = (id) => {
    setRequest({open: !request.open, id: request.open ? "" : id});
  };

  const handleProduct = (id) => {
      setProduct({open: !product.open, id: product.open ? "" : id});
  }

  const downloadCode = async (e ,reqId, docId) => {
      e.stopPropagation();
      await API('get', `/requests/zipFileCode/${reqId}/${docId}`).then((res) => {
          window.location.href = res.config.url;
      }).catch(err => {
          toast.error("File not found!");
      })
  }

  const downloadProduct = async (e, prodId) => {
      console.log("Document  ", prodId);
      e.stopPropagation();
      await API('get', `/requests/zipFileProduct/${prodId}`).then((res) => {
          window.location.href = res.config.url;
      }).catch(err => {
          toast.error("File not found!");
      })
  }

  const downloadZipFile = async (e,reqId) => {
    e.stopPropagation();
    await API('get', `/requests/zipFile/${reqId}`).then((res) => {
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
                              codes.length > 0 && codes.map(({codes, documents, requestId, title}) => (
                                  <React.Fragment key={requestId}>
                                      <ListItemButton onClick={() =>handleClick(requestId)} sx={{ border: '1px solid #EAECF0' }}>
                                          <li className="table_li" style={{ marginRight: 'auto', display: 'flex' }}>
                                          {title}
                                          </li>
                                          <img onClick={(e) => downloadZipFile(e , requestId)} src={DownloadIcon} alt="" className="downlaod_img_main" />
                                          {request.open && request.id === requestId ? <ExpandLess /> : <ExpandMore />}
                                      </ListItemButton>
                                      <Collapse in={request.open && request.id === requestId} timeout="auto" unmountOnExit>
                                          {   
                                              codes.length > 0 && codes.map(({code, _id, products}) => (
                                                  <React.Fragment>
                                                      {
                                                          codes.length > 0 && (
                                                              <React.Fragment>
                                                                  <ListItemButton
                                                                      onClick={() => handleProduct(_id)}
                                                                      sx={{ border: '1px solid #EAECF0', display: 'flex' }}
                                                                  >
                                                                      <li className="table_li2" style={{ marginRight: 'auto', display: 'flex' }}>
                                                                      <img src={RightArrow} alt="" className="rightArrow" />
                                                                          {code.code}
                                                                      </li>
                                                                      <img onClick={(e) => downloadCode(e ,requestId ,code._id)} src={DownloadIcon} alt="" className="downlaod_img" />
                                                                      {product.open && product.id === _id ? <ExpandLess /> : <ExpandMore />}
                                                                      
                                                                  </ListItemButton>
                                                              </React.Fragment>
                                                              
                                                          )
                                                      }
                                                      <Collapse in={product.open && product.id === _id} timeout="auto" unmountOnExit>
                                                                  {   
                                                                      products.length > 0 && products.map(({name, _id:id}) => (
                                                                          <React.Fragment>
                                                                              {
                                                                                  products.length > 0 && (
                                                                                      <ListItemButton
                                                                                          // onClick={() => handleProduct("1122")}
                                                                                          sx={{ border: '1px solid #EAECF0', display: 'flex' }}
                                                                                      >
                                                                                          <li className="table_li3" style={{ marginRight: 'auto', display: 'flex' }}>
                                                                                          <img src={RightArrow} alt="" className="rightArrow" />
                                                                                              {name}
                                                                                          </li>
                                                                                          <img onClick={(e) => downloadProduct(e, id)} src={DownloadIcon} alt="" className="downlaod_img" />
                                                                                      </ListItemButton>
                                                                                  )
                                                                              }
                                                                          </React.Fragment>
                                                                      ))
                                                                  }
                                                              </Collapse>
                                                  </React.Fragment>
                                              ))
                                          }
                                      </Collapse>
                                  </React.Fragment>
                              ))
                          }
                      </React.Fragment>
                  )
                }
                
      </List>
  </div>
)
}

export default DocumentByName