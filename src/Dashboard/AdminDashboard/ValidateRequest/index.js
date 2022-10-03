import React, { useState, useEffect } from 'react';
import CompanyInformation from '../ValidateRequest/CompanyInformation';
import { useHistory } from 'react-router-dom';
import EzxportIcon from '../../../assets/EzxportIcon.svg';
import { Link } from 'react-router-dom';
import BackArrow from '../../../assets/BackArrow.svg';
import { useParams } from 'react-router-dom';
import API from '../../../api/index';
import Modal from '../../../components/Common/Modal';
import Button from '../../../components/Common/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useTranslation } from 'react-i18next';
import toaster from '../../../utils/toaster';

const Index = () => {
  const history = useHistory();
  const [countTabe, setCountTabe] = useState();
  const [requestById, setRequestById] = useState({});
  const [inputList, setInputList] = useState([]);
  const [inputListProduct, setInputListProduct] = useState([]);
  const [validateCountry, setValidateCountry] = useState(false);
  const [validateProduct, setValidateProduct] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [modalBtn, setModalBtn] = useState(false);
  const [comment, setComment] = useState('');
  const { t } = useTranslation();
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    handlerequestById();
  }, []);
  function TabeProps(data) {
    setCountTabe(data);
  }

  const handlerequestById = async () => {
    await API('get', `/requests/${id}`)
      .then((res) => {
        setRequestById(res?.data?.request);
      })
      .catch((err) => {
        toaster("failed", t("request not found"), "requests");
      });
  };

  const handleCountryDocsValidate = async (checked, id) => {
    await API('put', `/requests/validateDoc/${requestById._id}`, {
      doc_id: id,
      status: checked ? 'Valid' : 'Invalid',
    })
      .then((res) => {
        if (checked) {
          toaster('success', t('Document Validated Successfully'), t('Validated Document'));

          handlerequestById();
        } else {
          toaster(t('warning'), t('Document Un-Validated'));

          handlerequestById();
        }
      })
      .catch((err) => {
        toaster("failed", t("Something wrong with request"), "Requests");
      });
  };

  const handleProductDocsValidate = async (name, checked, id) => {
    const DocName = name;
    await API('put', `/requests/validateProductDoc/${id}`, {
      [DocName]: {
        status: checked ? 'Valid' : 'Invalid',
      },
    })
      .then((res) => {
        if (checked) {
          toaster('success', t('Document Validated Successfully'), t('Validated Document'));

          handlerequestById();
        } else {
          toaster(t('warning'), t('Document Un-Validated'));

          handlerequestById();
        }
      })
      .catch((err) => {
        toaster('failed', t('Document not Validated'), t('Validated Document'));

      });
  };
  const handleRequestDoc = async () => {
    setModalBtn(true);
    await API('put', `/requests/ReqmissingDocs/${requestById._id}`, {
      admin_remarks: comment,
      products: inputListProduct,
      documents: inputList,
    })
      .then((res) => {
        setCommentModal(false);
        setModalBtn(false);
        history.push('/RequestDocuments');
      })
      .catch((err) => {
        setModalBtn(false);
        toaster('failed', t('Document not Validated'), t('Validate Document'));
      });
  };
  const handleValidByAdmin = async () => {
    await API('put', `/requests/validateRequest/${requestById._id}`)
      .then((res) => {
        history.push('/SendDocuments');
      })
      .catch((err) => {
        toaster("failed", t("Something wrong with documents"), "Missing documents");
      });
  };

  const exportDocument = async (e) => {
    const reqId = history.location.pathname.split('/Admin/ValidateRequest/')[1];
    e.stopPropagation();
    await API('get', `/requests/zipFile/${reqId}`)
      .then((res) => {
        window.location.href = res?.config?.url;
      })
      .catch((err) => toaster('failed', t('File not found!')));
  };

  const handleClose = () => setCommentModal(false);
  const handleModalOpen = () => setCommentModal(true);

  return (
    <>
      <div className='Reference_header'>
        <div className='Reference_center_div'>
          <div className='Reference_heading'>
            <Link to='/Admin/Dashboard/Requests' style={{ color: 'black', textDecoration: 'none' }}>
              <p className='Reference_h2'>
                <img src={BackArrow} alt='' />
                &nbsp; {requestById?.title}
              </p>
            </Link>
          </div>
          <div className='Reference_logo_div'>
            <img src={EzxportIcon} alt='' className='header_center_div' />
          </div>
          {countTabe === 2 && (
            <div>
              <Button
                onClick={(e) => exportDocument(e)}
                text={t('Download the file')}
                className='validate_button2'
              />
              &nbsp;
              <Button
                text={t('Validate the file')}
                className='validate_button'
                onClick={handleValidByAdmin}
              />
              &nbsp;
              {inputList?.length !== 0 ? (
                <Button
                  text={t('Request document')}
                  className={'validate_button'}
                  onClick={handleModalOpen}
                  // disabled={disableValidateButton ? true : false}
                />
              ) : inputListProduct?.length !== 0 ?
                (<Button
                  text={t('Request document')}
                    className={'validate_button'}
                    onClick={handleModalOpen}
                // disabled={disableValidateButton ? true : false}
                />)
                : ("")}
            </div>
          )}
        </div>
      </div>

      <CompanyInformation
        TabeProps={TabeProps}
        requestById={requestById}
        handleCountryDocsValidate={handleCountryDocsValidate}
        handleProductDocsValidate={handleProductDocsValidate}
        inputList={inputList}
        setInputList={setInputList}
        inputListProduct={inputListProduct}
        setInputListProduct={setInputListProduct}
        validateCountry={validateCountry}
        setValidateCountry={setValidateCountry}
        validateProduct={validateProduct}
        setValidateProduct={setValidateProduct}
      />
      <Modal
        open={commentModal}
        setOpen={setCommentModal}
        title={t('Please add your comment below')}
        handleClose={handleClose}
        Closebtn={true}
      >
        <TextareaAutosize
          minRows={7}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={t('Start writing from here')}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '1rem',
            marginTop: '1rem',
            borderColor: '#EAECF0',
          }}
        />
        <Button
          text={t('Submit')}
          className={comment !== '' ? 'bom_downloadFile_btn' : "bom_downloadFile_btn_disabled"}
          onClick={handleRequestDoc}
          disabled={modalBtn === true && comment === '' ? true : false} 
        />
      </Modal>
    </>
  );
};

export default Index;
