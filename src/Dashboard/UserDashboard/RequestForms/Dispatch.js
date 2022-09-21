import React, { useEffect, useState } from "react";
import InputField from "../../../components/Common/InputField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import DatePicker from "../../../components/Common/DatePicker";
// import moment from "moment";
import { useTranslation, Trans } from "react-i18next";

const Dispatch = (props) => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  const handleSelectedSeller = () => {
    let SelectedSeller = props?.sellers?.find((item) => {
      return item._id === props?.step3?.sellerData?.seller;
    });
    props.setStep3((prev) => {
      prev.sellerData.companyName = SelectedSeller?.company_name;
      prev.sellerData.Country = SelectedSeller?.country?.name;
      prev.sellerData.CountryId = SelectedSeller?.country?._id;
      prev.sellerData.email = SelectedSeller?.email;
      prev.sellerData.telephone = SelectedSeller?.phone_number;
      prev.sellerData.fullAddress = SelectedSeller?.address;
      prev.sellerData.postalCode = SelectedSeller?.zipcode;
      prev.sellerData.town = SelectedSeller?.city;
      return { ...prev };
    });
  };

  const handleSelectedBuyer = () => {
    let SelectedBuyer = props?.buyers?.find((item) => {
      return item._id === props?.step3?.buyerData?.buyer;
    });
    props.setStep3((prev) => {
      prev.buyerData.companyName = SelectedBuyer?.company_name;
      prev.buyerData.Country = SelectedBuyer?.country?.name;
      prev.buyerData.CountryId = SelectedBuyer?.country?._id;
      prev.buyerData.email = SelectedBuyer?.email;
      prev.buyerData.telephone = SelectedBuyer?.phone_number;
      prev.buyerData.fullAddress = SelectedBuyer?.address;
      prev.buyerData.postalCode = SelectedBuyer?.zipcode;
      prev.buyerData.town = SelectedBuyer?.city;
      return { ...prev };
    });
  };

  const handleSelectedPlace = () => {
    let SelectedPlace = props?.places?.find((item) => {
      return item._id === props?.step3?.placeOfInspection?.InspectionPlace;
    });

    props.setStep3((prev) => {
      prev.placeOfInspection.companyName = SelectedPlace?.company_name;
      prev.placeOfInspection.Country = SelectedPlace?.country?.name;
      prev.placeOfInspection.CountryId = SelectedPlace?.country?._id;
      prev.placeOfInspection.email = SelectedPlace?.email;
      prev.placeOfInspection.telephone = SelectedPlace?.phone_number;
      prev.placeOfInspection.fullAddress = SelectedPlace?.address;
      prev.placeOfInspection.postalCode = SelectedPlace?.zipcode;
      prev.placeOfInspection.town = SelectedPlace?.city;
      prev.placeOfInspection.contactLastName = SelectedPlace?.contact_lname;
      prev.placeOfInspection.contactFirstName = SelectedPlace?.contact_fname;
      return { ...prev };
    });
  };

  useEffect(() => {
    handleSelectedSeller();
  }, [props?.step3?.sellerData.seller]);

  useEffect(() => {
    handleSelectedBuyer();
  }, [props?.step3?.buyerData?.buyer]);
  useEffect(() => {
    handleSelectedPlace();
  }, [props?.step3?.placeOfInspection?.InspectionPlace]);

  return (
    <div className="dispatch_main_Div">
      <div>
        <span className="seller_title">{t("Seller data")}</span>
        <div>
          <label className="BomLabel" style={{ marginTop: "1rem" }}>
            {t("Add or select a seller")}
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
              {t("Company name")}
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
              placeholder={t("Country name")}
              name="companyName"
              value={props?.step3?.sellerData?.companyName}
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
              value={props?.step3?.sellerData?.CountryId || "default"}
              onChange={(e) => {
                props.handleSellerData(e.target.name, e.target.value);
              }}
            >
              <MenuItem disabled value={"default"}>
                {t("Select a Country")}
              </MenuItem>
              {props?.countries?.map((item) => {
                return <MenuItem value={item?._id}>{item?.name}</MenuItem>;
              })}
            </Select>
            {/* <InputField
              className="company_name_input"
              placeholder="CL"
              name="Country"
              value={props?.step3?.sellerData?.Country}
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
              value={props?.step3?.sellerData?.email}
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
              value={props?.step3?.sellerData?.telephone}
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
              name="fullAddress"
              value={props?.step3?.sellerData?.fullAddress}
              onChange={(e) => {
                props.handleSellerData(e.target.name, e.target.value);
              }}
            />
          </div>

          <div className="steps_3_2inFeilds">
            <div style={{ width: "35%" }}>
              <label className="BomLabel">{t("Postel Code")}</label>
              <InputField
                className="company_name_input"
                placeholder="33678"
                name="postalCode"
                value={props?.step3?.sellerData?.postalCode}
                onChange={(e) => {
                  props.handleSellerData(e.target.name, e.target.value);
                }}
              />
            </div>
            <div style={{ width: "60%" }}>
              <label className="BomLabel">{t("Town")}</label>
              <InputField
                className="company_name_input"
                placeholder="Abbeville"
                name="town"
                value={props?.step3?.sellerData?.town}
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
            {t("Add or select a buyer")}
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
              {t("Company name")}
            </MenuItem>
            {props?.buyers?.map((item) => {
              return <MenuItem value={item?._id}>{item?.company_name}</MenuItem>;
            })}
          </Select>
        </div>
        <div className="inspection_textfield">
          <div className="speps_3_feilds">
            <label className="BomLabel">{t("Company name")}</label>
            <InputField
              className="company_name_input"
              placeholder={t("Company name")}
              name="companyName"
              value={props?.step3?.buyerData?.companyName}
              onChange={(e) => {
                props.handleBuyerData(e.target.name, e.target.value);
              }}
            />
          </div>

          <div className="speps_3_feilds">
            <label className="BomLabel">{t("Country")}</label>
            <Select
              className="company_name_input"
              name="CountryId"
              id="demo-simple-select"
              value={props?.step3?.buyerData?.CountryId || "default"}
              onChange={(e) => {
                props?.handleBuyerData(e.target.name, e.target.value);
              }}
            >
              <MenuItem disabled value={"default"}>
                {t("Select a Country")}
              </MenuItem>
              {props?.countries?.map((item) => {
                return <MenuItem value={item?._id}>{item?.name}</MenuItem>;
              })}
            </Select>
            {/* <InputField
              className="company_name_input"
              placeholder="CL"
              name="Country"
              value={props?.step3?.buyerData?.Country}
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
              value={props?.step3?.buyerData?.email}
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
              value={props?.step3?.buyerData?.telephone}
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
              value={props?.step3?.buyerData?.fullAddress}
              onChange={(e) => {
                props.handleBuyerData(e.target.name, e.target.value);
              }}
            />
          </div>

          <div className="steps_3_2inFeilds">
            <div style={{ width: "35%" }}>
              <label className="BomLabel">{t("Postal Code")}e</label>
              <InputField
                className="company_name_input"
                placeholder="33678"
                name="postalCode"
                value={props?.step3?.buyerData?.postalCode}
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
                value={props?.step3?.buyerData?.town}
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
            {t("Add or select an inspection location")}
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
              {t("Place of inspection")}
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
            value={props?.step3?.placeOfInspection?.InspectionDate} //moment().format("LL")
            onChange={(e) => {
              props.handleInspectionData(e.target.name, e.target.value);
            }}
          />
        </div>
        <div className="inspection_textfield">
          <div className="speps_3_feilds">
            <label className="BomLabel">{t("Company name")}</label>
            <InputField
              className="company_name_input"
              placeholder={typeof t("Company name")}
              name="companyName"
              value={props?.step3?.placeOfInspection?.companyName}
              onChange={(e) => {
                props.handleInspectionData(e.target.name, e.target.value);
              }}
            />
          </div>

          <div className="speps_3_feilds">
            <label className="BomLabel">{t("Country")}</label>
            <Select
              className="company_name_input"
              name="CountryId"
              id="demo-simple-select"
              value={props?.step3?.placeOfInspection?.CountryId || "default"}
              onChange={(e) => {
                props?.handleInspectionData(e.target.name, e.target.value);
              }}
            >
              <MenuItem disabled value={"default"}>
                {t("Select a Country")}
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
              value={props?.step3?.placeOfInspection?.email}
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
              value={props?.step3?.placeOfInspection?.telephone}
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
              value={props?.step3?.placeOfInspection?.fullAddress}
              onChange={(e) => {
                props.handleInspectionData(e.target.name, e.target.value);
              }}
            />
          </div>
          <div className="steps_3_2inFeilds">
            <div style={{ width: "35%" }}>
              <label className="BomLabel">{t("Postal Code")}</label>
              <InputField
                className="company_name_input"
                placeholder="33678"
                name="postalCode"
                value={props?.step3?.placeOfInspection?.postalCode}
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
                value={props?.step3?.placeOfInspection?.town}
                onChange={(e) => {
                  props.handleInspectionData(e.target.name, e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="inspection_textfield">
          <div className="speps_3_feilds">
            <label className="BomLabel">{t("Contact last name")}</label>
            <InputField
              className="company_name_input"
              placeholder={t("Contact name")}
              name="contactLastName"
              value={props?.step3?.placeOfInspection?.contactLastName}
              onChange={(e) => {
                props.handleInspectionData(e.target.name, e.target.value);
              }}
            />
          </div>
          <div className="speps_3_feilds">
            <label className="BomLabel">{t("Contact first name")}</label>
            <InputField
              className="company_name_input"
              placeholder={t("Contact first name")}
              name="contactFirstName"
              value={props?.step3?.placeOfInspection?.contactFirstName}
              onChange={(e) => {
                props.handleInspectionData(e.target.name, e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dispatch;
