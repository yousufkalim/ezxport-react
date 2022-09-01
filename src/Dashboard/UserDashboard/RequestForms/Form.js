import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Button1 from '../../../components/Common/Button';
import Typography from '@mui/material/Typography';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Check from '@mui/icons-material/Check';
import { StepLabel } from '@mui/material';
import BOMsForm from './BOMsForm';
import DispatchForm from './Dispatch';
import DocumentForm from './Document';
import ServiceproviderForm from './ServiceProvider';
import { useHistory } from 'react-router-dom';
import API from '../../../api/index';
import { toast } from 'react-toastify';
const userData = JSON.parse(localStorage.getItem('userData'));
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#7F56D9',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#7F56D9',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));
const steps = ['BOMs', 'Service providers', 'Dispatch', 'Documents'];
export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const history = useHistory(null);
  // requestId of request created
  const [requestId, setRequestedId] = useState('');

  //step 1 states
  const [step1, setStep1] = useState({
    country: '',
    user: userData._id,
    title: '',
  });
  const [matchedData, setMatchedData] = useState([]);
  const [unMatchedData, setUnMatchedData] = useState([]);
  const [codes, setCodes] = useState([]);
  const [certificateRequire, setCertificateRequire] = useState(false);
  const [certificateNotRequire, setCertificateNotRequire] = useState(false);
  const [certificationCostOfCode, setCertificationCostOfCode] = useState('')

  // step 2 states
  const [step2, setStep2] = useState({
    vendorId: '',
    contactInfo: false,
    lastName: '',
    firstName: '',
    email: '',
  });
  // step 3 states
  const [step3, setStep3] = useState({
    sellerData: {
      seller: '',
      companyName: '',
      Country: '',
      CountryId: '',
      email: '',
      telephone: '',
      fullAddress: '',
      postalCode: '',
      town: '',
    },
    buyerData: {
      buyer: '',
      companyName: '',
      Country: '',
      CountryId: '',
      email: '',
      telephone: '',
      fullAddress: '',
      postalCode: '',
      town: '',
    },
    placeOfInspection: {
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
      contactFirsttName: '',
    },
  });
  const [sellers, setSeller] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [places, setPlaces] = useState([]);
  // step 4 states
  const [CountryDoc, setCountryDoc] = useState([]);
  const [createdCodes, setCreatedCodes] = useState({});
  const [productCodes, setProductCodes] = useState([]);
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
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleStep = (step) => () => {
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
      codes: [],
    };
    matchedData.map((item) => {
      data.codes.push({
        code: item.codeID,
        monetary_value: item.monetary_value,
        certification_required: item.certification_required,
      });
    });
    await API('post', '/requests/calculateCost', data).then((res) => {
      console.log("qwertyurtyuiogfvhjvhj", res)
      if (res.data.status === " Required") {
        setCertificateRequire(true)
        setCertificationCostOfCode(res.data.certification_cost)
      } else if (res.data.status === "Not Required") {
        setCertificateNotRequire(true)
      }
    }).catch((err) => {
      console.log("errrrr", err)
    })

  };
  const handleStep1 = async () => {
    let data = {
      country: step1.country,
      user: step1.user,
      title: step1.title,
      codes: [],
    };
    matchedData.map((item) => {
      data.codes.push({
        code: item.codeID,
        monetary_value: item.monetary_value,
        certification_required: item.certification_required,
      });
    });
    await API('post', '/requests/boms', data)
      .then((res) => {
        console.log('hanldeEstimateRequest', res);
        handleNext();
        setRequestedId(res?.data?.request?._id);
      })
      .catch((err) => {
        console.log('hanldeEstimateRequest', err);
        toast.error(err.response.data.message)

      });
  }
  const handleStep2 = async () => {
    await API('put', '/requests/userVendor', {
      user: userData._id,
      request: requestId,
      vendor: step2.vendorId,
      contact_info: step2.contactInfo,
      contact_fname: step2.firstName,
      contact_lname: step2.lastName,
      contact_email: step2.email,
    })
      .then((res) => {
        handleNext();
        toast.success('Service Provider Updated Successfully');
      })
      .catch((err) => {
        console.log('handleStep2', err);
        toast.error(err.response.data.message)
      });
  };
  const handleStep3 = async () => {
    await API('put', '/requests/dispatch', {
      request: requestId,
      inspection_date: step3.placeOfInspection.InspectionDate,
      buyer: {
        phone_number: step3.buyerData.telephone,
        company_name: step3.buyerData.companyName,
        email: step3.buyerData.email,
        country: step3.buyerData.CountryId,
        city: step3.buyerData.town,
        zipcode: step3.buyerData.postalCode,
        address: step3.buyerData.fullAddress,
        user: userData._id,
      },
      seller: {
        phone_number: step3.sellerData.telephone,
        company_name: step3.sellerData.companyName,
        email: step3.sellerData.email,
        country: step3.sellerData.CountryId,
        city: step3.sellerData.town,
        zipcode: step3.sellerData.postalCode,
        address: step3.sellerData.fullAddress,
        user: userData._id,
      },
      place: {
        phone_number: step3.placeOfInspection.telephone,
        company_name: step3.placeOfInspection.companyName,
        email: step3.placeOfInspection.email,
        country: step3.placeOfInspection.CountryId,
        city: step3.placeOfInspection.town,
        zipcode: step3.placeOfInspection.postalCode,
        address: step3.placeOfInspection.fullAddress,
        conatct_fname: step3.placeOfInspection.contactFirsttName,
        contact_lname: step3.placeOfInspection.contactLastName,
        user: userData._id,
      },
    })
      .then((res) => {
        handleNext();
        setCreatedCodes(res.data.request);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log('handleStep3', err);
        toast.error('Some Went Wrong');
        toast.error(err.response.data.message)

      });
  };
  const handleStep4 = async () => {
    let data = {
      request: requestId,
      codes: [],
    };
    productCodes.map((item) => {
      item.products.map((item2) => {
        data.codes.push(item2);
      });
    });
    await API('put', '/requests/documents', data)
      .then((res) => {
        localStorage.setItem("Requested", true)
        history.push('/User/Dashboard/ListOfRequests');
      })
      .catch((err) => {
        console.log('err--->', err);
        toast.error(err.response.data.message)

      });
  };
  const handleDocByCountryId = async () => {
    await API('get', `/documents/getByCountry/62e37dd29a4ffb100c352814`) // country ID will be replaced after testing
      .then((res) => {
        setCountryDoc(res.data.document);
      })
      .catch((err) => {
        console.log('handleDocByCountryId', err);
        toast.error(err.response.data.message)

      });
  };
  const handleUploadDoc = async (file, docId, index) => {
    let formData = new FormData();
    formData.append('doc_id', docId);
    formData.append('file', file);
    await API('put', `/requests/documentsUpload/${requestId}`, formData) 
      .then((res) => {
        console.log('handleUploadDoc', res);
        setCountryDoc((prev) => {
          prev[index].fileName = file.name;
          return [...prev];
        });
      })
      .catch((err) => {
        console.log('handleUploadDoc', err);
        toast.error(err.response.data.message)

      });
  };
  const handleStep1Change = (name, value) => {
    setStep1({ ...step1, [name]: value });
  };
  const handleStep2Change = (name, value) => {
    setStep2({ ...step2, [name]: value });
  };
  const handleSellerData = (name, value) => {
    setStep3((prev) => {
      prev.sellerData = { ...prev.sellerData, [name]: value };
      return { ...prev };
    });
  };
  const handleBuyerData = (name, value) => {
    setStep3((prev) => {
      prev.buyerData = { ...prev.buyerData, [name]: value };
      return { ...prev };
    });
  };
  const handleInspectionData = (name, value) => {
    setStep3((prev) => {
      prev.placeOfInspection = { ...prev.placeOfInspection, [name]: value };
      return { ...prev };
    });
  };
  const handleSeller = async () => {
    await API('get', `/sellers/getByUser/${userData._id}`)
      .then((res) => {
        setSeller(res.data.seller);
      })
      .catch((err) => {
        console.log('handleSeller', err);
        toast.error(err.response.data.message)

      });
  };
  const handleBuyer = async () => {
    await API('get', `/buyers/getByUser/${userData._id}`)
      .then((res) => {
        setBuyers(res.data.buyer);
      })
      .catch((err) => {
        console.log('handleBuyer', err);
        toast.error(err.response.data.message)

      });
  };
  const handlePlaces = async () => {
    await API('put', `/places/getByUser/${userData._id}`)
      .then((res) => {
        setPlaces(res.data.place);
      })
      .catch((err) => {
        console.log('handleBuyer', err);
        toast.error(err.response.data.message)

      });
  };

  useEffect(() => {
    handleSeller();
    handleBuyer();
    handlePlaces();
    handleDocByCountryId();
  }, []);
  return (
    <Box sx={{ width: '100%', marginTop: '3rem' }}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
        className="stepperClass"
      >
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepLabel onClick={handleStep(index)}>
              <p
                style={{
                  color: activeStep === index ? '#6941C6' : 'black',
                }}
              >
                {label}
              </p>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="stepper_form">
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
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
                matchedData={matchedData}
                unMatchedData={unMatchedData}
                  //certificate Require modal
                  certificateRequire={certificateRequire}
                  setCertificateRequire={setCertificateRequire}
                  certificationCostOfCode={certificationCostOfCode}
                  //certificate not Require modal
                  certificateNotRequire={certificateNotRequire}
                  setCertificateNotRequire={setCertificateNotRequire}
                  handleStep1={handleStep1}
                // handleAllRequestByCountryId={handleAllRequestByCountryId}
              />
            ) : activeStep === 1 ? (
              <ServiceproviderForm
                countryId={step1.country}
                step2={step2}
                handleChange={handleStep2Change}
              />
            ) : activeStep === 2 ? (
              <DispatchForm
                step3={step3}
                setStep3={setStep3}
                handleSellerData={handleSellerData}
                handleBuyerData={handleBuyerData}
                handleInspectionData={handleInspectionData}
                sellers={sellers}
                buyers={buyers}
                places={places}
              />
            ) : activeStep === 3 ? (
              <DocumentForm
                handleDocByCountryId={handleDocByCountryId}
                handleUploadDoc={handleUploadDoc}
                CountryDoc={CountryDoc}
                createdCodes={createdCodes}
                userData={userData._id}
                setProductCodes={setProductCodes}
                productCodes={productCodes}
              />
            ) : (
              ''
            )}

            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '5%' }}>
              <div style={{ width: '100%', display: activeStep !== 0 && 'none' }}>
                <Button1
                  onClick={hanldeEstimateRequest}
                  className="request_Estimate_btn"
                  text="Estimate my request"
                />
              </div>

              <div
                style={{
                  display: activeStep === 0 ? 'none' : 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  marginTop: '0rem',
                }}
              >
                <div
                  style={{
                    width: '50%',
                    marginBottom: '5%',
                    display: activeStep === 0 && 'none',
                  }}
                >
                  <Button1
                    text="Previous step"
                    className="import_Btn"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  />
                </div>
                <div
                  style={{
                    width: '50%',
                    justifyContent: 'flex-end',
                    display: activeStep === 0 ? 'none' : 'flex',
                  }}
                >
                  <Button1
                    text={activeStep === 3 ? 'Send my file' : 'Next Step'}
                    className="download_Btn"
                    onClick={
                      activeStep === 1
                        ? handleStep2
                        : activeStep === 2
                        ? handleStep3
                        : activeStep === 3 && handleStep4
                    }
                  />
                </div>
              </div>
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
