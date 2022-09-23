import React, { useEffect, useState } from "react";
import InputField from "../../../components/Common/InputField";
import API from "../../../api/index";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Store } from "../../../StoreContext";
import validate from "validate.js";

const schema = {
  lasstName: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },
  firstName: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },
  email: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 64 },
    email: true,
  },
};

const ServiceProvider = (props) => {
  const { request, pastRequest } = Store();
  const [vendors, setVendors] = useState([]);

  const { t } = useTranslation();

  const { step2, setFormState, setStep2 } = props;
  useEffect(() => {
    const errors = validate(step2.values, schema);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [step2.values]);
  useEffect(() => {
    if (pastRequest) {
      SetVendorData();
    }
  }, [request]);

  const SetVendorData = () => {
    const { vendor } = request;
    const { contact_email, contact_fname, contact_lname } = vendor;
    const vendorId = vendor?.vendor?._id;

    setStep2({
      ...step2,
      values: {
        ...step2.values,
        vendorId: vendorId,
        lastName: contact_lname,
        firstName: contact_fname,
        email: contact_email,
      },
    });
  };

  const VendorByCountryId = async () => {
    await API("get", `/vendors/getByCountryId/${props.countryId}`)
      .then((res) => {
        setVendors(res.data.vendor);
      })
      .catch((err) => {
        console.log("VendorByCountryId", err);
      });
  };
  useEffect(() => {
    VendorByCountryId();
  }, []);

  const hasError = (field) => (step2.touched[field] && step2.errors[field] ? true : false);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span className="aVendor_heading">
          {t("Please select")} <b>{t("a vendor")}</b> {t("for this request")}
        </span>
      </div>
      {/* <div style={{ marginTop: "4rem", height: "15%", display: "flex" }}> */}
      <Grid container spacing={2} sx={{ marginTop: "4rem" }}>
        {vendors?.map((item) => {
          return (
            <Grid item xs={6} className="vendors_div" key={item?._id}>
              <input
                type={"radio"}
                value={item?._id}
                checked={item?._id === step2?.values?.vendorId}
                name="vendorId"
                onChange={(e) => {
                  console.log("e.target.value", e.target.value);
                  props.handleChange(e.target.name, e.target.value);
                }}
              />
              <label className="vendor_label">{item.name}</label>
            </Grid>
          );
        })}
      </Grid>
      {/* </div> */}
      <div className="DoYouHave">
        <input
          type="checkbox"
          className="checkBox"
          name="contactInfo"
          onChange={(e) => {
            props.handleChange(e.target.name, e.target.checked);
          }}
        />
        <span className="check_company_p">
          {t("Do you have contact information for this certification company?")}
        </span>
      </div>
      {step2.values?.contactInfo ? (
        <>
          <div className="steps_2_main">
            <div className="steps_2_feild">
              <label>{t("Last name")}</label>
              <InputField
                className="last_name_input"
                isError={hasError("lastName")}
                error={step2.errors.lastName}
                value={step2?.values?.lastName}
                placeholder={t("Last name")}
                name="lastName"
                onChange={(e) => {
                  props.handleChange(e.target.name, e.target.value);
                }}
              />
            </div>
            <div className="steps_2_feild">
              <label>{t("First name")}</label>
              <InputField
                placeholder={t("First name")}
                isError={hasError("firstName")}
                value={step2?.values?.firstName}
                error={step2.errors.firstName}
                className="last_name_input"
                name="firstName"
                onChange={(e) => {
                  props.handleChange(e.target.name, e.target.value);
                }}
              />
            </div>
          </div>
          <div className="steps_2_feild">
            <label>{t("Email Address")}</label>
            <InputField
              className="last_name_input"
              isError={hasError("email")}
              error={step2.errors.email}
              value={step2?.values?.email}
              placeholder="mail@mail.com"
              name="email"
              onChange={(e) => {
                props.handleChange(e.target.name, e.target.value);
              }}
            />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default ServiceProvider;
