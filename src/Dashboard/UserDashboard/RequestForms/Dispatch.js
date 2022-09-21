import React, { useEffect, useState } from "react";
import InputField from "../../../components/Common/InputField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import DatePicker from "../../../components/Common/DatePicker";
// import moment from "moment";
import { useTranslation } from "react-i18next";
import { validate } from "validate.js";
import { Store } from "../../../StoreContext";
import moment from "moment";

const inspectionSchema = {
  companyName: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 64 },
  },
  fullAddress: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 64 },
  },
  postalCode: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 5, minimum: 5 },
  },
  town: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 64 },
  },
  email: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 64 },
    email: true,
  },
  telephone: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 10, minimum: 10 },
  },
  contactLastName: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 64 },
  },
  contactFirstName: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 64 },
  },
};

const sellerSchema = {
  companyName: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 64 },
  },
  seller: {
    presence: { allowEmpty: false, message: "is required" },
  },
  fullAddress: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 64 },
  },
  postalCode: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 5, minimum: 5 },
  },
  town: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 64 },
  },
  email: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 64 },
    email: true,
  },
  country: {
    presence: { allowEmpty: false, message: "is required" },
  },
  telephone: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 10, minimum: 10 },
  },
};

const buyerSchema = {
  companyName: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 64 },
  },
  seller: {
    presence: { allowEmpty: false, message: "is required" },
  },
  fullAddress: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 64 },
  },
  postalCode: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 5, minimum: 5 },
  },
  town: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 64 },
  },
  email: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 64 },
    email: true,
  },
  country: {
    presence: { allowEmpty: false, message: "is required" },
  },
  telephone: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 10, minimum: 10 },
  },
};

const Dispatch = (props) => {
  const { step3, setStep3, stepHanlder } = props;
  const { buyerData, sellerData, placeOfInspection } = props.step3;
  const sellerValues = sellerData.values;
  const buyerValues = buyerData.values;
  const placeValues = placeOfInspection.values;
  const { values } = step3.placeOfInspection;
  const { t } = useTranslation();
  const { request, pastRequest } = Store();

  useEffect(() => {
    const { placeOfInspection } = step3;
    const errors = validate(placeOfInspection.values, inspectionSchema);
    setStep3({ ...step3, placeOfInspection: { ...placeOfInspection, isValid: errors ? false : true, errors: errors || {} } });
  }, [step3.placeOfInspection.values]);

  useEffect(() => {
    const { sellerData } = step3;
    const errors = validate(sellerData.values, sellerSchema);
    setStep3({ ...step3, sellerData: { ...sellerData, isValid: errors ? false : true, errors: errors || {} } });
  }, [step3.sellerData.values]);

  useEffect(() => {
    const { buyerData } = step3;
    const errors = validate(buyerData.values, buyerSchema);
    setStep3({ ...step3, buyerData: { ...buyerData, isValid: errors ? false : true, errors: errors || {} } });
  }, [step3.buyerData.values]);

  useEffect(() => {
    handleSelectedSeller();
  }, [props?.step3?.sellerData.seller]);

  useEffect(() => {
    handleSelectedBuyer();
  }, [props?.step3?.buyerData?.buyer]);
  useEffect(() => {
    handleSelectedPlace();
  }, [placeOfInspection?.values.InspectionPlace]);

  useEffect(() => {
    if (pastRequest) {
      getData();
    }
  }, [request]);

  const getData = () => {
    setSeller();
    setBuyer();
    setPlace();
  };

  const setSeller = () => {
    console.log("request", request);
    const { seller } = request;
    const { address, city, company_name, email, phone_number, zipcode, country, _id } = seller;
    const countryId = country?._id;
    stepHanlder((prev) => ({
      ...prev,
      sellerData: {
        ...prev.sellerData,
        values: {
          ...prev.sellerData.values,
          seller: _id,
          companyName: company_name,
          CountryId: countryId,
          email: email,
          telephone: phone_number,
          fullAddress: address,
          postalCode: zipcode,
          town: city,
        },
      },
    }));
  };

  const setBuyer = () => {
    const { buyer } = request;
    const { address, city, company_name, email, phone_number, zipcode, country, _id } = buyer;
    const countryId = country?._id;
    stepHanlder((prev) => ({
      ...prev,
      buyerData: {
        ...prev.buyerData,
        values: {
          ...prev.buyerData.values,
          buyer: _id,
          companyName: company_name,
          CountryId: countryId,
          email: email,
          telephone: phone_number,
          fullAddress: address,
          postalCode: zipcode,
          town: city,
        },
      },
    }));
  };

  const setPlace = () => {
    const { place } = request;
    const { inspection_date } = request;

    const { address, city, company_name, email, phone_number, zipcode, country, contact_fname, contact_lname, _id } = place;
    const countryId = country?._id;
    stepHanlder((prev) => ({
      ...prev,
      placeOfInspection: {
        ...prev.placeOfInspection,
        values: {
          ...prev.placeOfInspection.values,
          InspectionPlace: _id,
          companyName: company_name,
          CountryId: countryId,
          country: countryId,
          email: email,
          telephone: phone_number,
          fullAddress: address,
          postalCode: zipcode,
          town: city,
          InspectionDate: moment(inspection_date).format("YYYY-MM-DD"),
          contactLastName: contact_lname,
          contactFirstName: contact_fname,
        },
      },
    }));
  };

  const handleSelectedSeller = () => {
    let SelectedSeller = props?.sellers?.find((item) => {
      return item._id === props?.step3?.sellerData.values?.seller;
    });
    props.setStep3((prev) => {
      prev.sellerData.values.companyName = SelectedSeller?.company_name;
      prev.sellerData.values.Country = SelectedSeller?.country?.name;
      prev.sellerData.values.CountryId = SelectedSeller?.country?._id;
      prev.sellerData.values.email = SelectedSeller?.email;
      prev.sellerData.values.telephone = SelectedSeller?.phone_number;
      prev.sellerData.values.fullAddress = SelectedSeller?.address;
      prev.sellerData.values.postalCode = SelectedSeller?.zipcode;
      prev.sellerData.values.town = SelectedSeller?.city;
      return { ...prev };
    });
  };

  const handleSelectedBuyer = () => {
    let SelectedBuyer = props?.buyers?.find((item) => {
      return item._id === props?.step3?.buyerData?.values?.buyer;
    });
    props.setStep3((prev) => {
      prev.buyerData.values.companyName = SelectedBuyer?.company_name;
      prev.buyerData.values.Country = SelectedBuyer?.country?.name;
      prev.buyerData.values.CountryId = SelectedBuyer?.country?._id;
      prev.buyerData.values.email = SelectedBuyer?.email;
      prev.buyerData.values.telephone = SelectedBuyer?.phone_number;
      prev.buyerData.values.fullAddress = SelectedBuyer?.address;
      prev.buyerData.values.postalCode = SelectedBuyer?.zipcode;
      prev.buyerData.values.town = SelectedBuyer?.city;
      return { ...prev };
    });
  };

  const handleSelectedPlace = () => {
    let SelectedPlace = props?.places?.find((item) => {
      return item._id === props?.step3?.placeOfInspection?.values;
    });

    props.setStep3((prev) => {
      prev.placeOfInspection.values.companyName = SelectedPlace?.company_name;
      prev.placeOfInspection.values.Country = SelectedPlace?.country?.name;
      prev.placeOfInspection.values.CountryId = SelectedPlace?.country?._id;
      prev.placeOfInspection.values.email = SelectedPlace?.email;
      prev.placeOfInspection.values.telephone = SelectedPlace?.phone_number;
      prev.placeOfInspection.values.fullAddress = SelectedPlace?.address;
      prev.placeOfInspection.values.postalCode = SelectedPlace?.zipcode;
      prev.placeOfInspection.values.town = SelectedPlace?.city;
      prev.placeOfInspection.values.contactLastName = SelectedPlace?.contact_lname;
      prev.placeOfInspection.values.contactFirstName = SelectedPlace?.contact_fname;
      return { ...prev };
    });
  };

  const placeError = (field) => (step3.placeOfInspection.touched[field] && step3.placeOfInspection.errors[field] ? true : false);
  const sellerError = (field) => (step3.sellerData.touched[field] && step3.sellerData.errors[field] ? true : false);
  const buyerError = (field) => (step3.buyerData.touched[field] && step3.buyerData.errors[field] ? true : false);

  return (
    <div className="dispatch_main_Div">
      <div>
        <span className="seller_title">{t("Seller data")}</span>
        <div>
          <label className="BomLabel" style={{ marginTop: "1rem" }}>
            Add or select a seller
          </label>
          <Select
            name="seller"
            id="demo-simple-select"
            defaultValue={"default"}
            onChange={(e) => {
              props.handleSellerData(e.target.name, e.target.value);
            }}
            className="countrydropdown"
          >
            <MenuItem disabled value="default">
              Company Name
            </MenuItem>
            {props?.sellers?.map((item) => {
              return <MenuItem value={item?._id}>{item?.company_name}</MenuItem>;
            })}
          </Select>
        </div>
        <div className="inspection_textfield">
          <div className="speps_3_feilds">
            <label className="BomLabel">{t("Company name")}</label>
            <InputField
              className="company_name_input"
              placeholder="Company Name"
              name="companyName"
              error={sellerData.errors.companyName}
              isError={sellerError("companyName")}
              value={sellerValues?.companyName}
              onChange={(e) => {
                props.handleSellerData(e.target.name, e.target.value);
              }}
            />
          </div>

          <div className="speps_3_feilds">
            <label className="BomLabel">{t("Country")}</label>
            <Select
              className="company_name_input"
              name="CountryId"
              id="demo-simple-select"
              value={sellerValues.CountryId || "default"}
              onChange={(e) => {
                props.handleSellerData(e.target.name, e.target.value);
              }}
            >
              <MenuItem disabled value={"default"}>
                Select a Country
              </MenuItem>
              {props?.countries?.map((item) => {
                return <MenuItem value={item?._id}>{item?.name}</MenuItem>;
              })}
            </Select>
            {/* <InputField
              className="company_name_input"
              placeholder="CL"
              name="Country"
              value={sellerValues.Country}
              onChange={(e) => {
                props.handleSellerData(e.target.name, e.target.value);
              }}
            /> */}
          </div>
        </div>
        <div className="inspection_textfield">
          <div className="speps_3_feilds">
            <label className="BomLabel">{t("E-Mail Address")}</label>
            <InputField
              className="company_name_input"
              placeholder="mail@gmail.com"
              name="email"
              error={sellerData.errors.email}
              isError={sellerError("email")}
              value={sellerValues.email}
              onChange={(e) => {
                props.handleSellerData(e.target.name, e.target.value);
              }}
            />
          </div>

          <div className="speps_3_feilds">
            <label className="BomLabel">{t("Telephone")}</label>
            <InputField
              className="company_name_input"
              placeholder="xx xx xx xx xx"
              name="telephone"
              error={sellerData.errors.telephone}
              isError={sellerError("telephone")}
              value={sellerValues.telephone}
              onChange={(e) => {
                props.handleSellerData(e.target.name, e.target.value);
              }}
            />
          </div>
        </div>
        <div className="inspection_textfield">
          <div className="speps_3_feilds">
            <label className="BomLabel">{t("Full address")}</label>
            <InputField
              className="company_name_input"
              placeholder="90 road of rouvroy"
              error={sellerData.errors.fullAddress}
              isError={sellerError("fullAddress")}
              name="fullAddress"
              value={sellerValues.fullAddress}
              onChange={(e) => {
                props.handleSellerData(e.target.name, e.target.value);
              }}
            />
          </div>

          <div className="steps_3_2inFeilds">
            <div style={{ width: "35%" }}>
              <label className="BomLabel">Postel Code</label>
              <InputField
                className="company_name_input"
                placeholder="33678"
                name="postalCode"
                value={sellerValues.postalCode}
                error={sellerData.errors.postalCode}
                isError={sellerError("postalCode")}
                onChange={(e) => {
                  props.handleSellerData(e.target.name, e.target.value);
                }}
              />
            </div>
            <div style={{ width: "60%" }}>
              <label className="BomLabel">Town</label>
              <InputField
                className="company_name_input"
                placeholder="Abbeville"
                name="town"
                error={sellerData.errors.town}
                isError={sellerError("town")}
                value={sellerValues.town}
                onChange={(e) => {
                  props.handleSellerData(e.target.name, e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="buyer_data_div">
        <span className="seller_title">{t("Buyer data")}</span>
        <div>
          <label className="BomLabel" style={{ marginTop: "1rem" }}>
            Add or select a buyer
          </label>
          <Select
            name="buyer"
            id="demo-simple-select"
            defaultValue={"default"}
            onChange={(e) => {
              props.handleBuyerData(e.target.name, e.target.value);
            }}
            className="countrydropdown"
          >
            <MenuItem disabled value="default">
              Company name
            </MenuItem>
            {props?.buyers?.map((item) => {
              return <MenuItem value={item?._id}>{item?.company_name}</MenuItem>;
            })}
          </Select>
        </div>
        <div className="inspection_textfield">
          <div className="speps_3_feilds">
            <label className="BomLabel">Company Name</label>
            <InputField
              className="company_name_input"
              placeholder="Company Name"
              name="companyName"
              error={buyerData.errors.companyName}
              isError={buyerError("companyName")}
              value={buyerValues?.companyName}
              onChange={(e) => {
                props.handleBuyerData(e.target.name, e.target.value);
              }}
            />
          </div>

          <div className="speps_3_feilds">
            <label className="BomLabel">Country</label>
            <Select
              className="company_name_input"
              name="CountryId"
              id="demo-simple-select"
              value={buyerValues?.CountryId || "default"}
              onChange={(e) => {
                props?.handleBuyerData(e.target.name, e.target.value);
              }}
            >
              <MenuItem disabled value={"default"}>
                Select a Country
              </MenuItem>
              {props?.countries?.map((item) => {
                return <MenuItem value={item?._id}>{item?.name}</MenuItem>;
              })}
            </Select>
            {/* <InputField
              className="company_name_input"
              placeholder="CL"
              name="Country"
              value={buyerValues?.Country}
              onChange={(e) => {
                props.handleBuyerData(e.target.name, e.target.value);
              }}
            /> */}
          </div>
        </div>
        <div className="inspection_textfield">
          <div className="speps_3_feilds">
            <label className="BomLabel">{t("E-Mail Address")}</label>
            <InputField
              className="company_name_input"
              placeholder="mail@gmail.com"
              name="email"
              error={buyerData.errors.email}
              isError={buyerError("email")}
              value={buyerValues?.email}
              onChange={(e) => {
                props.handleBuyerData(e.target.name, e.target.value);
              }}
            />
          </div>

          <div className="speps_3_feilds">
            <label className="BomLabel">{t("Telephone")}</label>
            <InputField
              className="company_name_input"
              placeholder="33 33 44 04 56"
              name="telephone"
              error={buyerData.errors.telephone}
              isError={buyerError("telephone")}
              value={buyerValues?.telephone}
              onChange={(e) => {
                props.handleBuyerData(e.target.name, e.target.value);
              }}
            />
          </div>
        </div>
        <div className="inspection_textfield">
          <div className="speps_3_feilds">
            <label className="BomLabel">{t("Full address")}</label>
            <InputField
              className="company_name_input"
              placeholder="90 road of rouvroy"
              name="fullAddress"
              error={buyerData.errors.fullAddress}
              isError={buyerError("fullAddress")}
              value={buyerValues?.fullAddress}
              onChange={(e) => {
                props.handleBuyerData(e.target.name, e.target.value);
              }}
            />
          </div>

          <div className="steps_3_2inFeilds">
            <div style={{ width: "35%" }}>
              <label className="BomLabel">Postel Code</label>
              <InputField
                className="company_name_input"
                placeholder="33678"
                name="postalCode"
                value={buyerValues?.postalCode}
                error={buyerData.errors.postalCode}
                isError={buyerError("postalCode")}
                onChange={(e) => {
                  props.handleBuyerData(e.target.name, e.target.value);
                }}
              />
            </div>
            <div style={{ width: "60%" }}>
              <label className="BomLabel">{t("Town")}</label>
              <InputField
                className="company_name_input"
                placeholder="Abbeville"
                name="town"
                error={buyerData.errors.town}
                isError={buyerError("town")}
                value={buyerValues?.town}
                onChange={(e) => {
                  props.handleBuyerData(e.target.name, e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="buyer_data_div">
        <span className="seller_title">{t("Place of inspection")}</span>
        <div>
          <label className="BomLabel" style={{ marginTop: "1rem" }}>
            Add or select an inspection location
          </label>
          <Select
            name="InspectionPlace"
            id="demo-simple-select"
            defaultValue={"default"}
            onChange={(e) => {
              props.handleInspectionData(e.target.name, e.target.value);
            }}
            className="countrydropdown"
          >
            <MenuItem disabled value="default">
              Place of inspection
            </MenuItem>
            {props?.places?.map((item) => {
              return <MenuItem value={item?._id}>{item?.company_name}</MenuItem>;
            })}
          </Select>
        </div>
        <div>
          <label className="BomLabel" style={{ marginTop: "1rem" }}>
            {t("Date on which the goods can be inspected")}
          </label>
          <DatePicker
            name="InspectionDate"
            min={moment().clone().add(1, "days").toISOString().split("T")[0]}
            value={placeValues.InspectionDate} //moment().format("LL")
            onChange={(e) => {
              props.handleInspectionData(e.target.name, e.target.value);
            }}
          />
          {placeError("InspectionDate") && <div className="input-error">{placeOfInspection.errors.InspectionDate ?? null}</div>}
        </div>
        <div className="inspection_textfield">
          <div className="speps_3_feilds">
            <label className="BomLabel">{t("Company Name")}</label>
            <InputField
              className="company_name_input"
              placeholder="Company Name"
              name="companyName"
              // error={placeOfInspection.errors.companyName}
              // isError={placeError('companyName')}
              value={placeValues?.companyName}
              onChange={(e) => {
                props.handleInspectionData(e.target.name, e.target.value);
              }}
            />
          </div>

          <div className="speps_3_feilds">
            <label className="BomLabel">Country</label>
            <Select
              className="company_name_input"
              name="CountryId"
              id="demo-simple-select"
              value={placeValues.CountryId || "default"}
              onChange={(e) => {
                props.handleInspectionData(e.target.name, e.target.value);
              }}
            >
              <MenuItem disabled value={"default"}>
                Select a Country
              </MenuItem>
              {props?.countries?.map((item) => {
                return <MenuItem value={item?._id}>{item?.name}</MenuItem>;
              })}
            </Select>
          </div>
        </div>
        <div className="inspection_textfield">
          <div className="speps_3_feilds">
            <label className="BomLabel">{t("E-Mail Address")}</label>
            <InputField
              className="company_name_input"
              placeholder="mail@gmail.com"
              name="email"
              error={placeOfInspection.errors.email}
              isError={placeError("email")}
              value={placeValues?.email}
              onChange={(e) => {
                props.handleInspectionData(e.target.name, e.target.value);
              }}
            />
          </div>

          <div className="speps_3_feilds">
            <label className="BomLabel">{t("Telephone")}</label>
            <InputField
              className="company_name_input"
              placeholder="33 33 44 04 56"
              name="telephone"
              error={placeOfInspection.errors.telephone}
              isError={placeError("telephone")}
              value={placeValues?.telephone}
              onChange={(e) => {
                props.handleInspectionData(e.target.name, e.target.value);
              }}
            />
          </div>
        </div>
        <div className="inspection_textfield">
          <div className="speps_3_feilds">
            <label className="BomLabel">{t("Full address")}</label>
            <InputField
              className="company_name_input"
              placeholder="90 road of rouvroy"
              name="fullAddress"
              error={placeOfInspection.errors.fullAddress}
              isError={placeError("fullAddress")}
              value={placeValues?.fullAddress}
              onChange={(e) => {
                props.handleInspectionData(e.target.name, e.target.value);
              }}
            />
          </div>
          <div className="steps_3_2inFeilds">
            <div style={{ width: "35%" }}>
              <label className="BomLabel">Postel Code</label>
              <InputField
                className="company_name_input"
                placeholder="33678"
                name="postalCode"
                error={placeOfInspection.errors.postalCode}
                isError={placeError("postalCode")}
                value={placeValues?.postalCode}
                onChange={(e) => {
                  props.handleInspectionData(e.target.name, e.target.value);
                }}
              />
            </div>
            <div style={{ width: "60%" }}>
              <label className="BomLabel">{t("Town")}</label>
              <InputField
                className="company_name_input"
                placeholder="Abbeville"
                name="town"
                error={placeOfInspection.errors.town}
                isError={placeError("town")}
                value={placeValues?.town}
                onChange={(e) => {
                  props.handleInspectionData(e.target.name, e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="inspection_textfield">
          <div className="speps_3_feilds">
            <label className="BomLabel">{t("contact last name")}</label>
            <InputField
              className="company_name_input"
              placeholder="contact name"
              name="contactLastName"
              error={placeOfInspection.errors.contactLastName}
              isError={placeError("contactLastName")}
              value={placeValues?.contactLastName}
              onChange={(e) => {
                props.handleInspectionData(e.target.name, e.target.value);
              }}
            />
          </div>
          <div className="speps_3_feilds">
            <label className="BomLabel">{t("contact first name")}</label>
            <InputField
              className="company_name_input"
              placeholder={t("contact first name")}
              name="contactFirstName"
              error={placeOfInspection.errors.contactFirstName}
              isError={placeError("contactFirstName")}
              value={placeValues?.contactFirstName}
              onChange={(e) => {
                props.handleInspectionData(e.target.name, e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};;;;;;;;;;;;;;;;

export default Dispatch;
