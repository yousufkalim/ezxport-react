import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import Button1 from '../../../components/Common/Button';
import Typography from '@mui/material/Typography';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import { StepLabel } from '@mui/material';
import BOMsForm from './BOMsForm';
import DispatchForm from './Dispatch';
import DocumentForm from './Document';
import ServiceproviderForm from './ServiceProvider';
import { useHistory } from 'react-router-dom';
import API from '../../../api/index';
import Modal from '../../../components/Common/Modal';
import { ReactComponent as Featured } from '../../../assets/Featured.svg';
import { ReactComponent as Warning } from '../../../assets/warning.svg';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import { useTranslation } from 'react-i18next';
import { Store, UpdateStore } from '../../../StoreContext';

import toaster from '../../../utils/toaster';
import { checkFileType } from '../../../lib/common';
import Spinner from '../../../components/Common/Spinner';

const userData = JSON.parse(localStorage.getItem('userData'));
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)'
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#7F56D9'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#7F56D9'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1
  }
}));

const steps = ['BOMs', 'Service providers', 'Dispatch', 'Documents'];
export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [platformSelect, setPlatformSelect] = useState(false);
  const [stripeModal, setStripeModal] = useState(false);
  const history = useHistory(null);
  const [requestId, setRequestedId] = useState('');
  const [currency, setCurrency] = useState('');
  const updateStore = UpdateStore();
  const [validDoc, setValidDoc] = useState(false);
  const [validProduct, setValidProduct] = useState(false);
  const { t } = useTranslation();
  //step 1 states
  const [step1, setStep1] = useState({
    country: '',
    user: userData._id,
    title: ''
  });
  const [matchedData, setMatchedData] = useState([]);
  const [unMatchedData, setUnMatchedData] = useState([]);
  const [unMatchedCodes, setUnMatchedCodes] = useState([]);
  const [codes, setCodes] = useState([]);
  const [certificateRequire, setCertificateRequire] = useState(false);
  const [certificateNotRequire, setCertificateNotRequire] = useState(false);
  const [certificationCostOfCode, setCertificationCostOfCode] = useState('');
  const [certificationCountryOfCode, setCertificationCountryOfCode] = useState('');
  const [countries, setCounteries] = useState();
  const [retrieveRequestId, setRetrieveRequestId] = useState('');
  const [allCodes, setAllCodes] = useState([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [docLoading, setDocLoading] = useState(false);
  const { request, pastRequest } = Store();

  // step 2 states
  const [step2, setStep2] = useState({
    isValid: false,
    values: {
      vendorId: '',
      contactInfo: false,
      lastName: '',
      firstName: '',
      email: ''
    },
    touched: {},
    errors: {}
  });
  // step 3 states
  const [step3, setStep3] = useState({
    sellerData: {
      isValid: false,
      values: {
        seller: '',
        companyName: '',
        Country: '',
        CountryId: '',
        email: '',
        telephone: '',
        fullAddress: '',
        postalCode: '',
        town: ''
      },
      errors: {},
      touched: {}
    },
    buyerData: {
      isValid: false,
      values: {
        buyer: '',
        companyName: '',
        Country: '',
        CountryId: '',
        email: '',
        telephone: '',
        fullAddress: '',
        postalCode: '',
        town: ''
      },
      errors: {},
      touched: {}
    },
    placeOfInspection: {
      isValid: false,
      values: {
        InspectionPlace: '',
        InspectionDate: '',
        companyName: '',
        Country: '',
        CountryId: '',
        email: '',
        telephone: '',
        fullAddress: '',
        postalCode: '',
        town: '',
        contactLastName: '',
        contactFirstName: ''
      },
      errors: {},
      touched: {}
    }
  });

  const [sellers, setSeller] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [places, setPlaces] = useState([]);
  // step 4 states
  const [CountryDoc, setCountryDoc] = useState([]);
  const [createdCodes, setCreatedCodes] = useState({});
  const [productCodes, setProductCodes] = useState([]);
  const [formUpdate, setFormUpdate] = useState(false);

  // all useEffect
  useEffect(() => {
    const countryCurrency = countries?.find(country => {
      return country?._id === step1?.country;
    }).currency;
    setCurrency(countryCurrency);
  }, [step1?.country]);
  useEffect(() => {
    handleDocByCountryId();
    handleSeller();
    handleBuyer();
    handlePlaces();
  }, []);

  useEffect(() => {
    if (retrieveRequestId !== 'default') {
      handleRequestById();
    }
  }, [retrieveRequestId]);

  const handleRequestById = async () => {
    await API('get', `/requests/${retrieveRequestId}`)
      .then(res => {
        const request = res.data.request;
        if (request) {
          updateStore({ request: request, pastRequest: true });
        }
      })
      .catch(err => {
        toaster('failed', t('Request not found'), 'Request');
      });
  };

  useEffect(() => {
    if (pastRequest && formUpdate === true) {
      setCountryDoc(request?.documents);
      setFormUpdate(false);
    }
  }, [pastRequest, formUpdate]);

  const totalSteps = () => {
    return steps.length;
  };
  const completedSteps = () => {
    return Object.keys(completed).length;
  };
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };
  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  const handleStep = step => () => {
    setActiveStep(step);
  };
  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  const hanldeEstimateRequest = async () => {
    let data = {
      country: step1.country,
      user: step1.user,
      title: step1.title,
      codes: []
    };
    allCodes?.map(item => {
      return data.codes.push({
        code: item.codeID,
        monetary_value: item.monetary_value,
        certification_required: item.certification_required
      });
    });
    await API('post', '/requests/calculateCost', data)
      .then(res => {
        if (res.data.status === 'Required') {
          setCertificateRequire(true);
          setCertificationCostOfCode(res?.data?.certification_cost);
          setCertificationCountryOfCode(res?.data?.country);
        } else if (res.data.status === 'Not Required') {
          setCertificateNotRequire(true);
          setCertificationCountryOfCode(res?.data?.country);
        }
      })
      .catch(err => {
        toaster('failed', t(err.response.data.message.msg));
      });
  };
  const handleStep1 = async () => {
    if (request?._id) {
      const allPrevCodes = request?.codes?.map(item => ({
        id: item?.code?._id,
        products: item.products
      }));
      const newAllCodes = allCodes.map(item => {
        const prevCode = allPrevCodes.find(a => a.id === item.codeID);
        if (prevCode) {
          return { ...item, newCode: false, products: prevCode.products };
        } else {
          return { ...item, newCode: false, products: [{ user: userData._id, code: item.codeID }] };
        }
      });
      updateStore({ previousCodes: newAllCodes });
    }
    let data = {
      country: step1.country,
      user: step1.user,
      title: step1.title,
      codes: [],
      certification_cost: certificationCostOfCode
    };
    allCodes?.map(item => {
      return data.codes.push({
        code: item.codeID,
        monetary_value: item.monetary_value,
        certification_required: item.certification_required
      });
    });
    await API('post', '/requests/boms', data)
      .then(res => {
        handleNext();
        setRequestedId(res?.data?.request?._id);
      })

      .catch(err =>
        toaster('Failed', t(err.response.data.message?.msg) || t(err.response.data.message))
      );
  };
  const handleStep2 = async () => {
    const { vendorId, contactInfo, firstName, lastName, email } = step2.values;
    await API('put', '/requests/userVendor', {
      user: userData._id,
      request: requestId,
      vendor: vendorId,
      contact_info: contactInfo,
      contact_fname: firstName,
      contact_lname: lastName,
      contact_email: email
    })
      .then(res => {
        handleNext();
        toaster(
          'success',
          t('Service Provider Updated Successfully'),
          t('Updated Service Provider')
        );
      })
      .catch(err => {
        if (err.response?.data?.message?.msg === 'vendorId required') {
          toaster('Failed', t('Vendor is required'));
        } else {
          toaster('Failed', t(err.response.data.message));
        }
      });
  };
  const handleStep3 = async () => {
    const placeOfInspection = step3.placeOfInspection.values;
    const sellerData = step3.sellerData.values;
    const buyerData = step3.buyerData.values;
    await API('put', '/requests/dispatch', {
      request: requestId,
      inspection_date: placeOfInspection.InspectionDate,
      buyer: {
        phone_number: buyerData.telephone,
        company_name: buyerData.companyName,
        email: buyerData.email,
        country: buyerData.Country,
        city: buyerData.town,
        zipcode: buyerData.postalCode,
        address: buyerData.fullAddress,
        user: userData._id
      },
      seller: {
        phone_number: sellerData.telephone,
        company_name: sellerData.companyName,
        email: sellerData.email,
        country: sellerData.Country,
        city: sellerData.town,
        zipcode: sellerData.postalCode,
        address: sellerData.fullAddress,
        user: userData._id
      },
      place: {
        phone_number: placeOfInspection.telephone,
        company_name: placeOfInspection.companyName,
        email: placeOfInspection.email,
        country: placeOfInspection.Country,
        city: placeOfInspection.town,
        zipcode: placeOfInspection.postalCode,
        address: placeOfInspection.fullAddress,
        contact_fname: placeOfInspection.contactFirstName,
        contact_lname: placeOfInspection.contactLastName,
        user: userData._id
      }
    })
      .then(res => {
        handleNext();
        setCreatedCodes(res.data.request);
        toaster('success', t(res.data.message));
      })

      .catch(err => toaster('Failed', t(err?.response?.data?.message?.msg)));
  };
  const handleSendFile = () => setPlatformSelect(true);

  const handleDocByCountryId = async () => {
    await API('get', `/documents/getByCountry/${step1?.country}`)
      .then(res => {
        setCountryDoc(res?.data?.documents);
        setFormUpdate(true);
      })
      .catch(err => toaster('failed', t(err.response.data.message)));
  };

  const handleUploadDoc = async (file, docId, index) => {
    // const files = checkFileType(file, t);

    // if (files) {
    setDocLoading(true);
    let formData = new FormData();
    formData.append('doc_id', docId);
    formData.append('file', file);
    await API('put', `/requests/documentsUpload/${requestId}`, formData)
      .then(res => {
        setCountryDoc(prev => {
          prev[index].filename = file.name;
          return [...prev];
        });
        setValidDoc(true);
        setDocLoading(false);
      })
      .catch(err => {
        if (err?.response?.data?.message) {
          toaster('Failed', t(err?.response?.data?.message));
          setDocLoading(false);
        } else if (err?.response?.data) {
          const error = err?.response?.data
            ?.split('<pre>')?.[1]
            ?.split('Error: ')?.[1]
            ?.split('<br>')[0];
          toaster('Failed', t(error));
          setDocLoading(false);
        }
        setDocLoading(false);
      });
    // }
  };
  const handleStep1Change = (name, value) => {
    setStep1({ ...step1, [name]: value });
  };
  const handleStep2Change = (name, value) => {
    setStep2({
      ...step2,
      values: { ...step2.values, [name]: value },
      touched: { ...step2.touched, [name]: true }
    });
  };
  const handleSellerData = (name, value) => {
    const { sellerData } = step3;
    const { values } = step3.sellerData;
    if (name === 'postalCode' && value === '00000') {
      return;
    } else if (name === 'postalCode' || name === 'telephone') {
      if (!value.match(/[^0-9]/)) {
        return setStep3({
          ...step3,
          sellerData: {
            ...sellerData,
            values: { ...values, [name]: value },
            touched: { ...sellerData.touched, [name]: true }
          }
        });
      }
      return;
    }
    setStep3({
      ...step3,
      sellerData: {
        ...sellerData,
        values: { ...values, [name]: value },
        touched: { ...sellerData.touched, [name]: true }
      }
    });
  };
  const handleBuyerData = (name, value) => {
    const { buyerData } = step3;
    const { values } = step3.buyerData;
    if (name === 'postalCode' && value === '00000') {
      return;
    } else if (name === 'postalCode' || name === 'telephone') {
      if (!value.match(/[^0-9]/)) {
        return setStep3({
          ...step3,
          buyerData: {
            ...buyerData,
            values: { ...values, [name]: value },
            touched: { ...buyerData.touched, [name]: true }
          }
        });
      }
      return;
    }
    setStep3({
      ...step3,
      buyerData: {
        ...buyerData,
        values: { ...values, [name]: value },
        touched: { ...buyerData.touched, [name]: true }
      }
    });
  };
  const handleInspectionData = (name, value) => {
    const { placeOfInspection } = step3;
    const { values } = step3.placeOfInspection;
    if (name === 'postalCode' && value === '00000') {
      return;
    } else if (name === 'postalCode' || name === 'telephone') {
      if (!value.match(/[^0-9]/)) {
        return setStep3({
          ...step3,
          placeOfInspection: {
            ...placeOfInspection,
            values: { ...values, [name]: value },
            touched: { ...placeOfInspection.touched, [name]: true }
          }
        });
      }
      return;
    }
    setStep3({
      ...step3,
      placeOfInspection: {
        ...placeOfInspection,
        values: { ...values, [name]: value },
        touched: { ...placeOfInspection.touched, [name]: true }
      }
    });
  };
  const handleSeller = async () => {
    await API('get', `/sellers/getByUser/${userData?._id}`)
      .then(res => {
        setSeller(res?.data?.seller);
      })
      .catch(err => toaster('Failed', t(err.response.data.message)));
  };
  const handleBuyer = async () => {
    await API('get', `/buyers/getByUser/${userData?._id}`)
      .then(res => {
        setBuyers(res?.data?.buyer);
      })
      .catch(err => toaster('Failed', t(err.response.data.message)));
  };
  const handlePlaces = async () => {
    await API('put', `/places/getByUser/${userData?._id}`)
      .then(res => {
        setPlaces(res?.data?.place);
      })
      .catch(err => toaster('Failed', t(err?.response?.data?.message)));
  };

  const handleStep4 = async () => {
    setCheckoutLoading(true);
    let data = {
      request: requestId,
      codes: []
    };
    productCodes.map(item => {
      item?.products?.map(item2 => {
        data.codes.push(item2);
      });
    });
    await API('put', '/requests/documents', data)
      .then(res => {
        localStorage.setItem('Requested', true);
        const line_items = [
          {
            price_data: {
              currency: 'USD',
              product_data: {
                name: step1?.title
              },
              unit_amount: Math.round(
                (certificationCostOfCode + certificationCostOfCode * 0.2) * 100
              )
            },
            quantity: 1
          }
        ];
        getSessionUrl(requestId, line_items);
      })
      .catch(err => {
        setCheckoutLoading(false);
        toaster('failed', t(err?.response?.data?.message?.msg), t('Documents'));
      });
  };

  // STRIPE PAYMENT FUNCTION
  // const handleStripe = () => {

  // };
  const getSessionUrl = async (id, line_items) => {
    await API('post', '/requests/Checkout', {
      line_items: line_items,
      metaData: { id: id, unit_amount: line_items[0]?.price_data?.unit_amount }
    })
      .then(res => {
        // handleStep4();
        // localStorage.setItem("Requested", true)
        window.location = res?.data?.url;
        // setCheckoutLoading(false);
      })
      .catch(() => {
        // setCheckoutLoading(false);
        localStorage.setItem('Requested', false);
      });
  };

  const handleSendEmail = async () => {
    await API('put', `/requests/sendEmail/${requestId}`)
      .then(res => {
        handleStep4();
        toaster('success', t(res.data.message));
        localStorage.setItem('Requested', true);
        history.push('/User/Dashboard/ListOfRequests');
      })
      .catch(err => toaster('Failed', t(err.response.data.message)));
  };
  const handlePlatformSelect = () => setPlatformSelect(false);
  const handleStripeModal = () => setStripeModal(false);
  const openStripeModal = () => {
    setStripeModal(true);
    setPlatformSelect(false);
  };

  return (
    <Box sx={{ width: '100%', marginTop: '3rem' }}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
        className="stepperClass">
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]} disabled={true}>
            <StepLabel>
              <p
                className="stepper_content"
                style={{
                  color: activeStep === index ? '#6941C6' : 'black'
                }}>
                {t(label)}
              </p>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="stepper_form">
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              {t('All steps completed - you')}&apos;{t('re finished')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 ? (
              <BOMsForm
                step1={step1}
                setStep1={setStep1}
                handleChange={handleStep1Change}
                codes={codes}
                setCodes={setCodes}
                setMatchedData={setMatchedData}
                setUnMatchedData={setUnMatchedData}
                setUnMatchedCodes={setUnMatchedCodes}
                unMatchedCodes={unMatchedCodes}
                matchedData={matchedData}
                unMatchedData={unMatchedData}
                //certificate Required modal
                certificateRequire={certificateRequire}
                setCertificateRequire={setCertificateRequire}
                certificationCostOfCode={certificationCostOfCode}
                certificationCountryOfCode={certificationCountryOfCode}
                //certificate not Required modal
                certificateNotRequire={certificateNotRequire}
                setCertificateNotRequire={setCertificateNotRequire}
                handleStep1={handleStep1}
                countries={countries}
                setCounteries={setCounteries}
                setRetrieveRequestId={setRetrieveRequestId}
                allCodes={allCodes}
                setAllCodes={setAllCodes}
                currency={currency}
              />
            ) : activeStep === 1 ? (
              <ServiceproviderForm
                countryId={step1.country}
                setFormState={setStep2}
                step2={step2}
                setStep2={setStep2}
                handleChange={handleStep2Change}
              />
            ) : activeStep === 2 ? (
              <DispatchForm
                step3={step3}
                setStep3={setStep3}
                stepHanlder={setStep3}
                handleSellerData={handleSellerData}
                handleBuyerData={handleBuyerData}
                handleInspectionData={handleInspectionData}
                sellers={sellers}
                buyers={buyers}
                places={places}
                countries={countries}
              />
            ) : activeStep === 3 ? (
              <DocumentForm
                CountryName={step1.country}
                handleDocByCountryId={handleDocByCountryId}
                handleUploadDoc={handleUploadDoc}
                setValidProduct={setValidProduct}
                docLoading={docLoading}
                CountryDoc={CountryDoc}
                setValidDoc={setValidDoc}
                validDoc={validDoc}
                setCountryDoc={setCountryDoc}
                createdCodes={createdCodes}
                userData={userData._id}
                setProductCodes={setProductCodes}
                productCodes={productCodes}
                countries={countries}
              />
            ) : (
              ''
            )}

            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
              <div style={{ width: '100%', display: activeStep !== 0 && 'none' }}>
                <Button1
                  onClick={hanldeEstimateRequest}
                  className="request_Estimate_btn"
                  text={t('Estimate my request')}
                />
              </div>

              <div
                style={{
                  display: activeStep === 0 ? 'none' : 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  marginTop: '4%'
                }}>
                <div
                  style={{
                    width: '50%',
                    marginBottom: '5%',
                    display: activeStep === 0 && 'none'
                  }}>
                  <Button1
                    text={t('Previous step')}
                    className="import_Btn"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  />
                </div>
                <div
                  style={{
                    width: '50%',
                    justifyContent: 'flex-end',
                    display: activeStep === 0 ? 'none' : 'flex'
                  }}>
                  <Button1
                    text={activeStep === 3 ? t('Send my file') : t('Next Step')}
                    className="download_Btn"
                    disabled={
                      (activeStep === 3 && !validDoc) || (activeStep === 3 && !validProduct)
                    }
                    onClick={
                      activeStep === 1
                        ? handleStep2
                        : activeStep === 2
                        ? handleStep3
                        : activeStep === 3 && handleSendFile
                    }
                  />
                </div>
              </div>
            </Box>
          </React.Fragment>
        )}
      </div>
      {/* SELECT PLATFORM MODAL */}
      <Modal open={platformSelect} setOpen={setPlatformSelect} handleClose={handlePlatformSelect}>
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
            <div className="space">
              <Logo />
            </div>
            <div className="space">
              <Featured />
            </div>
            <div className="space">{t('Select a Platform to Continue your request')}</div>
          </div>
          <Button1
            text={t('Continue request on Ezxport Platform')}
            className="to_confirm_btn"
            onClick={openStripeModal}
          />
          <Button1
            text={t('Continue request on other Platform')}
            className="delete_bom_btn"
            onClick={handleSendEmail}
          />
        </div>
      </Modal>
      {/* REDIRECT TO STRIPE MODAL*/}
      <Modal open={stripeModal} setOpen={setStripeModal} handleClose={handleStripeModal}>
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
            <div className="space">
              <Logo />
            </div>
            <div className="space">
              <Warning />
            </div>
            <div className="space1">
              <h2>
                Your certification cost is
                <h1 style={{ color: 'black' }}>{`${
                  certificationCostOfCode + certificationCostOfCode * 0.2
                } ${currency === 'USD' ? '$' : '€'}`}</h1>
              </h2>
              {t(
                'After agreeing to this you will be redirected to another site and you will need to resubmit data for new products'
              )}
            </div>
          </div>
          {checkoutLoading ? (
            <Spinner className="" />
          ) : (
            <>
              <Button1 text={t('Agree')} className="to_confirm_btn" onClick={handleStep4} />
              <Button1 text={t('Cancel')} className="delete_bom_btn" onClick={handleStripeModal} />
            </>
          )}
        </div>
      </Modal>
    </Box>
  );
}
