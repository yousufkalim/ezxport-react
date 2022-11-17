import React, { useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form from './RequestForms/Form';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Modal from '../../components/Common/Modal';
import Button1 from '../../components/Common/Button';
import API from '../../api/index';
import toaster from '../../utils/toaster';
import { Store } from '../../StoreContext';

const RequestForm = () => {
  const { request } = Store();
  const history = useHistory();
  const { t } = useTranslation();
  const [step, setStep] = useState(request.draft_step || 0);
  const [modal, setModal] = useState(false);

  const activeStep = data => {
    setStep(data);
  };
  const handleBackToDashboard = () => {
    history.push('/User/Dashboard/ListOfRequests');
  };
  const handleIsQuitting = () => {
    if (step === 0) {
      handleBackToDashboard();
    } else {
      setModal(true);
    }
  };
  const handleSaveDraft = () => {
    setModal(false);
    handleBackToDashboard();
  };
  const handleCloseModal = () => {
    setModal(false);
  };
  const deleteDraft = async () => {
    await API('delete', `/requests/${request._id}`)
      .then(res => {
        if (res.status === 200) {
          toaster(t('Request deleted successfully'), 'success');
        }
      })
      .catch(err => {
        toaster(t('Something went wrong'), 'error');
      });
    handleCloseModal();
    handleBackToDashboard();
  };
  useEffect(() => {
    const onBeforeUnload = ev => {
      // setmodal if step was saved
      if (step > 0) {
        setModal(true);
      }
      ev.returnValue = '';
      return '';
    };

    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, []);

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'space-between' }}>
      <div className="left_back_side">
        <button className="back_to_dashboard_btn" onClick={handleIsQuitting}>
          <p className="return_back">{t('Return to Dashboard')}</p>
          <ArrowBackIcon className="leftArrowIcon back_dashboard" />
        </button>
        {modal && (
          <Modal open="open">
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  marginTop: '1rem',
                  marginBottom: '1rem'
                }}>
                <div className="space">{t('Do you want to save your request for later ?')}</div>
              </div>
              <Button1
                text={t('Yes, I want to save my request')}
                className="save_btn"
                onClick={handleSaveDraft}
              />
              <Button1
                text={t('No, I want to discard my request')}
                className="delete_btn"
                onClick={deleteDraft}
              />
              <Button1
                text={t('Keep editing my request')}
                className="to_confirm_btn"
                onClick={handleCloseModal}
              />
            </div>
          </Modal>
        )}
      </div>
      <div className="rqst_form_div">
        <Form step={activeStep} currentStep={step} />
      </div>
    </div>
  );
};

export default RequestForm;
