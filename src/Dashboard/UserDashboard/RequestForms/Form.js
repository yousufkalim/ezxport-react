import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Button1 from "../../../components/Common/Button";
import Typography from "@mui/material/Typography";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Check from "@mui/icons-material/Check";
import { StepLabel } from "@mui/material";
import BOMsForm from "./BOMsForm";
import DispatchForm from "./Dispatch";
import DocumentForm from "./Document";
import ServiceproviderForm from "./ServiceProvider";

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
  const [activeStep, setActiveStep] = React.useState(0);
  console.log("🚀 ~ file: Form.js ~ line 40 ~ HorizontalNonLinearStepper ~ activeStep", activeStep);
  const [completed, setCompleted] = React.useState({});

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

  return (
    <Box sx={{ width: "95%", marginTop: "3rem" }}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepLabel onClick={handleStep(index)}>
              <p style={{ color: activeStep === index ? "#6941C6" : "black" }}>{label}</p>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div style={{ width: "90%", marginTop: "3rem", marginLeft: "8%" }}>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 ? (
              <BOMsForm />
            ) : activeStep === 1 ? (
              <ServiceproviderForm />
            ) : activeStep === 2 ? (
              <DispatchForm />
            ) : activeStep === 3 ? (
              <DocumentForm />
            ) : (
              ""
            )}

            {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}

            <Box sx={{ display: "flex", flexDirection: "row", width: "90%" }}>
              <div style={{ width: "100%", display: activeStep !== 0 && "none" }}>
                <Button1 onClick={handleNext} className="request_Estimate_btn" text="Estimate my request" />
              </div>

              <div
                style={{
                  display: activeStep === 0 ? "none" : "flex",
                  flexDirection: "row",
                  width: "100%",
                  marginTop: "1rem",
                }}
              >
                <div style={{ width: "50%", display: activeStep === 0 && "none" }}>
                  <Button1 text="Previous step" className="import_Btn" disabled={activeStep === 0} onClick={handleBack} />
                </div>
                <div style={{ width: "50%", justifyContent: "flex-end", display: activeStep === 0 ? "none" : "flex" }}>
                  <Button1 text="Next Step" className="download_Btn" onClick={handleNext} />
                </div>
              </div>

              {/* <Box sx={{ flex: "1 1 auto" }} /> */}
              {/* {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: "inline-block" }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>{completedSteps() === totalSteps() - 1 ? "Finish" : "Complete Step"}</Button>
                ))} */}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
