import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Button from "@mui/material/Button";
import Button1 from "../../../components/Common/Button";
import Typography from "@mui/material/Typography";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import { StepLabel } from "@mui/material";
import BOMsForm from "./BOMsForm";
import DispatchForm from "./Dispatch";
import DocumentForm from "./Document";
import ServiceproviderForm from "./ServiceProvider";
import { useHistory } from "react-router-dom";
import API from "../../../api/index";
import Modal from "../../../components/Common/Modal";
import { ReactComponent as Featured } from "../../../assets/Featured.svg";
import { ReactComponent as Logo } from "../../../assets/logo.svg";
import { useTranslation } from "react-i18next";
import { Store,UpdateStore } from "../../../StoreContext";

import toaster from "../../../utils/toaster";

const userData = JSON.parse(localStorage.getItem("userData"));
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#7F56D9",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#7F56D9",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const steps = ["BOMs", "Service providers", "Dispatch", "Documents"];
export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [platformSelect, setPlatformSelect] = useState(false);
  const history = useHistory(null);
  // requestId of request created
  const [requestId, setRequestedId] = useState("");
  const [currency, setCurrency] = useState("");
  const updateStore = UpdateStore();

  const { t } = useTranslation();

  //step 1 states
  const [step1, setStep1] = useState({
    country: "",
    user: userData._id,
    title: "",
  });
  const [matchedData, setMatchedData] = useState([]);
  const [unMatchedData, setUnMatchedData] = useState([]);
  const [unMatchedCodes, setUnMatchedCodes] = useState([]);
  const [codes, setCodes] = useState([]);
  const [certificateRequire, setCertificateRequire] = useState(false);
  const [certificateNotRequire, setCertificateNotRequire] = useState(false);
  const [certificationCostOfCode, setCertificationCostOfCode] = useState("");
  const [certificationCountryOfCode, setCertificationCountryOfCode] = useState("");
  const [countries, setCounteries] = useState();
  const [retrieveRequestId, setRetrieveRequestId] = useState("");
  const [allCodes, setAllCodes] = useState([]);
  const { request } = Store();
  const [prevCodes, setPrevCodes] = useState([]);

  // step 2 states
  const [step2, setStep2] = useState({
    isValid: false,
    values: {
      vendorId: "",
      contactInfo: false,
      lastName: "",
      firstName: "",
      email: "",
    },
    touched: {},
    errors: {},
  });
  // step 3 states
  const [step3, setStep3] = useState({
    sellerData: {
      isValid: false,
      values: {
        seller: "",
        companyName: "",
        Country: "",
        CountryId: "",
        email: "",
        telephone: "",
        fullAddress: "",
        postalCode: "",
        town: "",
      },
      errors: {},
      touched: {},
    },
    buyerData: {
      isValid: false,
      values: {
        buyer: "",
        companyName: "",
        Country: "",
        CountryId: "",
        email: "",
        telephone: "",
        fullAddress: "",
        postalCode: "",
        town: "",
      },
      errors: {},
      touched: {},
    },
    placeOfInspection: {
      isValid: false,
      values: {
        InspectionPlace: "",
        InspectionDate: "",
        companyName: "",
        Country: "",
        CountryId: "",
        email: "",
        telephone: "",
        fullAddress: "",
        postalCode: "",
        town: "",
        contactLastName: "",
        contactFirstName: "",
      },
      errors: {},
      touched: {},
    },
  });

  const [sellers, setSeller] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [places, setPlaces] = useState([]);
  // step 4 states
  const [CountryDoc, setCountryDoc] = useState([]);
  const [createdCodes, setCreatedCodes] = useState({});
  const [productCodes, setProductCodes] = useState([]);

  // all useEffect
  useEffect(() => {
    const countryCurrency = countries?.find((country) => {
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
    handleRequestById();
  }, [retrieveRequestId]);
  const handleRequestById = async () => {
    await API("get", `/requests/${retrieveRequestId}`)
      .then((res) => {
        const request = res.data.request;
        if (request) {
          updateStore({ request: request, pastRequest: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
    allCodes?.map((item) => {
      data.codes.push({
        code: item.codeID,
        monetary_value: item.monetary_value,
        certification_required: item.certification_required,
      });
    });
    await API("post", "/requests/calculateCost", data)
      .then((res) => {
        if (res.data.status === "Required") {
          setCertificateRequire(true);
          setCertificationCostOfCode(res?.data?.certification_cost);
          setCertificationCountryOfCode(res?.data?.country);
        } else if (res.data.status === "Not Required") {
          setCertificateNotRequire(true);
          setCertificationCountryOfCode(res?.data?.country);
        }
      })

      .catch((err) => toaster("Failed", t(err.response.data.message).msg));
  };
  const handleStep1 = async () => {
    if (request?._id ) {
      const allPrevCodes = request?.codes?.map(item => ({id: item?.code?._id, products: item.products}));
      const newAllCodes = allCodes.map((item) => {
        const prevCode = allPrevCodes.find(a => a.id === item.codeID);
        if(prevCode){
          return {...item, newCode: false, products: prevCode.products}
        }
        else{
          return {...item, newCode: false, products: [{user: userData._id, code: item.codeID }]}
        }
      })
      console.log("ALL new cdodes ", newAllCodes);
      updateStore({ previousCodes:newAllCodes });
    }
    let data = {
      country: step1.country,
      user: step1.user,
      title: step1.title,
      codes: [],
      certification_cost: certificationCostOfCode,
    };
    allCodes?.map((item) => {
      data.codes.push({
        code: item.codeID,
        monetary_value: item.monetary_value,
        certification_required: item.certification_required,
      });
    });
    await API("post", "/requests/boms", data)
      .then((res) => {
        handleNext();
        setRequestedId(res?.data?.request?._id);
      })

      .catch((err) => toaster("Failed", t(err.response.data.message).msg));
  };
  const handleStep2 = async () => {
    const { vendorId, contactInfo, firstName, lastName, email } = step2.values;
    await API("put", "/requests/userVendor", {
      user: userData._id,
      request: requestId,
      vendor: vendorId,
      contact_info: contactInfo,
      contact_fname: firstName,
      contact_lname: lastName,
      contact_email: email,
    })
      .then((res) => {
        handleNext();
        toaster(
          "success",
          t("Service Provider Updated Successfully"),
          t("Updated Service Provider")
        );
      })
      .catch((err) => {
        if (err.response?.data?.message?.msg === "vendorId required") {
          toaster("Failed", t("Vendor is required"));
        } else {
          toaster("Failed", t(err.response.data.message).msg);
        }
      });
  };
  const handleStep3 = async () => {
    const placeOfInspection = step3.placeOfInspection.values;
    const sellerData = step3.sellerData.values;
    const buyerData = step3.buyerData.values;
    await API("put", "/requests/dispatch", {
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
        user: userData._id,
      },
      seller: {
        phone_number: sellerData.telephone,
        company_name: sellerData.companyName,
        email: sellerData.email,
        country: sellerData.Country,
        city: sellerData.town,
        zipcode: sellerData.postalCode,
        address: sellerData.fullAddress,
        user: userData._id,
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
        user: userData._id,
      },
    })
      .then((res) => {
        handleNext();
        setCreatedCodes(res.data.request);
        toaster("success", res.data.message);
      })

      .catch((err) => toaster("Failed", t(err.response.data.message).msg));
  };
  const handleSendFile = () => setPlatformSelect(true);

  const handleStep4 = async () => {
    let data = {
      request: requestId,
      codes: [],
    };
    productCodes.map((item) => {
      item?.products?.map((item2) => {
        data.codes.push(item2);
      });
    });
    console.log("qwerty" , data.codes)
    await API("put", "/requests/documents", data)
      .then((res) => {
        localStorage.setItem("Requested", true);
        // history.push("/User/Dashboard/ListOfRequests");
      })
      .catch((err) => toaster("Failed", t(err.response.data.message).msg));
  };
  const handleDocByCountryId = async () => {
    await API("get", `/documents/getByCountry/${step1?.country}`)
      .then((res) => {
        setCountryDoc(res?.data?.documents);
      })

      .catch((err) => toaster("Failed", t(err.response.data.message).msg));
  };
  const handleUploadDoc = async (file, docId, index) => {
    let formData = new FormData();
    formData.append("doc_id", docId);
    formData.append("file", file);
    await API("put", `/requests/documentsUpload/${requestId}`, formData)
      .then((res) => {
        setCountryDoc((prev) => {
          prev[index].fileName = file.name;
          return [...prev];
        });
      })
      .catch((err) => toaster("Failed", t(err.response.data.message).msg));
  };
  const handleStep1Change = (name, value) => {
    setStep1({ ...step1, [name]: value });
  };
  const handleStep2Change = (name, value) => {
    setStep2({
      ...step2,
      values: { ...step2.values, [name]: value },
      touched: { ...step2.touched, [name]: true },
    });
  };
  const handleSellerData = (name, value) => {
    const { sellerData } = step3;
    const { values } = step3.sellerData;
    setStep3({
      ...step3,
      sellerData: {
        ...sellerData,
        values: { ...values, [name]: value },
        touched: { ...sellerData.touched, [name]: true },
      },
    });
  };
  const handleBuyerData = (name, value) => {
    const { buyerData } = step3;
    const { values } = step3.buyerData;
    setStep3({
      ...step3,
      buyerData: {
        ...buyerData,
        values: { ...values, [name]: value },
        touched: { ...buyerData.touched, [name]: true },
      },
    });
  };
  const handleInspectionData = (name, value) => {
    const { placeOfInspection } = step3;
    const { values } = step3.placeOfInspection;
    setStep3({
      ...step3,
      placeOfInspection: {
        ...placeOfInspection,
        values: { ...values, [name]: value },
        touched: { ...placeOfInspection.touched, [name]: true },
      },
    });
  };
  const handleSeller = async () => {
    await API("get", `/sellers/getByUser/${userData._id}`)
      .then((res) => {
        setSeller(res.data.seller);
      })
      .catch((err) => toaster("Failed", t(err.response.data.message).msg));
  };
  const handleBuyer = async () => {
    await API("get", `/buyers/getByUser/${userData._id}`)
      .then((res) => {
        setBuyers(res.data.buyer);
      })
      .catch((err) => toaster("Failed", t(err.response.data.message).msg));
  };
  const handlePlaces = async () => {
    await API("put", `/places/getByUser/${userData._id}`)
      .then((res) => {
        setPlaces(res.data.place);
      })
      .catch((err) => toaster("Failed", t(err.response.data.message).msg));
  };
  const handleStripe = () => {
    handleStep4();
    const line_items = [
      {
        price_data: {
          currency: "USD",
          product_data: {
            name: step1.title,
          },
          unit_amount: (+certificationCostOfCode + 50) * 100,
        },
        quantity: 1,
      },
    ];
    getSessionUrl(requestId, line_items);
  };
  const getSessionUrl = async (id, line_items) => {
    try {
      localStorage.setItem("Requested", true);
      const response = await API("post", "/requests/Checkout", {
        line_items: line_items,
        metaData: { id },
      });
      window.location = response.data.url;
    } catch (e) {
      console.trace(e);
    }
  };

  const handleSendEmail = async () => {
    await API("put", `/requests/sendEmail/${requestId}`)
      .then((res) => {
        handleStep4();
        toaster("success", res.data.message);
        localStorage.setItem("Requested", true);
        history.push("/User/Dashboard/ListOfRequests");
      })
      .catch((err) => toaster("Failed", t(err.response.data.message).msg));
  };
  const handlePlatformSelect = () => setPlatformSelect(false);
  return (
    <Box sx={{ width: "100%", marginTop: "3rem" }}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
        className="stepperClass"
      >
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]} disabled={true}>
            <StepLabel>
              <p
                className="stepper_content"
                style={{
                  color: activeStep === index ? "#6941C6" : "black",
                }}
              >
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
              {t("All steps completed - you")}&apos;{t("re finished")}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
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
                //certificate Require modal
                certificateRequire={certificateRequire}
                setCertificateRequire={setCertificateRequire}
                certificationCostOfCode={certificationCostOfCode}
                certificationCountryOfCode={certificationCountryOfCode}
                //certificate not Require modal
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
                CountryDoc={CountryDoc}
                setCountryDoc={setCountryDoc}
                createdCodes={createdCodes}
                userData={userData._id}
                setProductCodes={setProductCodes}
                productCodes={productCodes}
                countries={countries}
              />
            ) : (
              ""
            )}

            <Box sx={{ display: "flex", flexDirection: "row", width: "100%", marginTop: "5%" }}>
              <div style={{ width: "100%", display: activeStep !== 0 && "none" }}>
                <Button1
                  onClick={hanldeEstimateRequest}
                  className="request_Estimate_btn"
                  text={t("Estimate my request")}
                />
              </div>

              <div
                style={{
                  display: activeStep === 0 ? "none" : "flex",
                  flexDirection: "row",
                  width: "100%",
                  marginTop: "4%",
                }}
              >
                <div
                  style={{
                    width: "50%",
                    marginBottom: "5%",
                    display: activeStep === 0 && "none",
                  }}
                >
                  <Button1
                    text={t("Previous step")}
                    className="import_Btn"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  />
                </div>
                <div
                  style={{
                    width: "50%",
                    justifyContent: "flex-end",
                    display: activeStep === 0 ? "none" : "flex",
                  }}
                >
                  <Button1
                    text={activeStep === 3 ? t("Send my file") : t("Next Step")}
                    className="download_Btn"
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
      <Modal open={platformSelect} setOpen={setPlatformSelect} handleClose={handlePlatformSelect}>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            <div className="space">
              <Logo />
            </div>
            <div className="space">
              <Featured />
            </div>
            <div className="space">{t("Select a Platform to Continue your request")}</div>
          </div>
          <Button1
            text={t("Continue request on Ezxport Platform")}
            className="to_confirm_btn"
            onClick={handleStripe}
          />
          <Button1
            text={t("Continue request on other Platform")}
            className="delete_bom_btn"
            onClick={handleSendEmail}
          />
        </div>
      </Modal>
    </Box>
  );
}
