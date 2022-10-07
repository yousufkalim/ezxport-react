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
import Spinner from '../../../../components/Common/Spinner';
import { useTranslation } from 'react-i18next';
import toaster from '../../../../utils/toaster';
import { createFilter } from 'react-search-input';
import { getSortedData } from '../../../../lib/getSortedData';
import downArrow from '../../../../assets/TitleDownArrow.svg';
import arrow_up from '../../../../assets/arrow_up.svg';

const KEYS_TO_FILTERS = ['title'];

const DocumentByRequest = ({
  loading,
  documents: allDocuments,
  setDocuments,
  searchTerm,
  setDownloadLoading
}) => {
  const [request, setRequest] = useState({ open: false, id: '' });
  const [sort, setSort] = useState({ key: '', ascend: true });

  const { t } = useTranslation();

  const handleClick = id => {
    setRequest({ open: !request.open, id: request.open ? '' : id });
  };

  const downloadZipFile = async (e, reqId) => {
    e.stopPropagation();
    setDownloadLoading(true);
    await API('get', `/requests/zipFile/${reqId}`)
      .then(res => {
        setDownloadLoading(false);
        window.location.href = res.config.url;
      })
      .catch(err => {
        toaster('Failed', t('File not found!'));
        setDownloadLoading(false);
      });
  };

  const downloadDocument = async (e, reqId, docId) => {
    e.stopPropagation();
    setDownloadLoading(true);
    await API('get', `/requests/zipFileDocument/${reqId}/${docId}`)
      .then(res => {
        setDownloadLoading(false);
        window.location.href = res.config.url;
      })
      .catch(err => {
        toaster('Failed', t('File not found!'));
        setDownloadLoading(false);
      });
  };

  const searchedResults = allDocuments.filter(createFilter(searchTerm, KEYS_TO_FILTERS));
  return (
    <div>
      <List>
        {/* <ListItemButton
          sx={{ border: "1px solid #EAECF0", background: "#f9fafb" }}
        >
          <li
            className="table_li_name"
            style={{ marginRight: "auto", display: "flex" }}
          >
            {t("Folder name")} &nbsp;
            {!sort.ascend ? (
              <img
                className="sorting-icon"
                onClick={() =>
                  getSortedData(
                    documents,
                    setDocuments,
                    setSort,
                    [],
                    "title",
                    true
                  )
                }
                src={arrow_up}
                alt=""
              />
            ) : (
              <img
                onClick={() =>
                  getSortedData(
                    documents,
                    setDocuments,
                    setSort,
                    [],
                    "title",
                    false
                  )
                }
                src={downArrow}
                alt=""
              />
            )}
          </li>
        </ListItemButton> */}
        {loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            {searchedResults?.length > 0 &&
              searchedResults?.map(({ requestId, title, documents, codes }) => {
                if (documents?.length && codes?.[0]?.products?.length) {
                  return (
                    <React.Fragment key={requestId}>
                      <ListItemButton
                        onClick={e => handleClick(requestId)}
                        sx={{ border: '1px solid #EAECF0' }}>
                        <li className="table_li" style={{ marginRight: 'auto', display: 'flex' }}>
                          {title}
                        </li>
                        <img
                          onClick={e => downloadZipFile(e, requestId)}
                          src={DownloadIcon}
                          alt=""
                          className="downlaod_img_main"
                        />
                        {request.open && request.id === requestId ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse
                        in={request.open && request.id === requestId}
                        timeout="auto"
                        unmountOnExit>
                        {documents?.length > 0 &&
                          documents?.map(({ _id: docId, doc_id }) => (
                            <ListItemButton
                              sx={{
                                border: '1px solid #EAECF0',
                                display: 'flex'
                              }}>
                              {doc_id ? (
                                <li
                                  className="table_li2"
                                  style={{
                                    marginRight: 'auto',
                                    display: 'flex',
                                    width: '100%'
                                  }}>
                                  <img src={RightArrow} alt="" className="rightArrow" />
                                  {doc_id?.name}
                                </li>
                              ) : (
                                <li
                                  className="table_li2_error"
                                  style={{
                                    marginRight: 'auto',
                                    display: 'flex',
                                    width: '100%',
                                    color: 'red !important'
                                  }}>
                                  {t('No document uploaded for country')}
                                </li>
                              )}
                              <img
                                onClick={e => downloadDocument(e, requestId, doc_id._id)}
                                src={DownloadIcon}
                                alt=""
                                className="downlaod_img"
                              />
                            </ListItemButton>
                          ))}
                      </Collapse>
                    </React.Fragment>
                  );
                }
              })}
          </React.Fragment>
        )}
      </List>
    </div>
  );
};

export default DocumentByRequest;
