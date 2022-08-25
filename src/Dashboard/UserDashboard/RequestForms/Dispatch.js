import React, { useEffect, useState } from "react";
import InputField from "../../../components/Common/InputField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import DatePicker from "../../../components/Common/DatePicker";
import moment from "moment";
const Dispatch = (props) => {
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
      prev.sellerData.postalCode = SelectedSeller?.zip_code;
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
      prev.buyerData.postalCode = SelectedBuyer?.zip_code;
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
      prev.placeOfInspection.postalCode = SelectedPlace?.zip_code;
      prev.placeOfInspection.town = SelectedPlace?.city;
      prev.placeOfInspection.contactLastName = SelectedPlace?.contact_name;
      prev.placeOfInspection.contactFirsttName = SelectedPlace?.conatct_fname;
      return { ...prev };
    });
  };

  useEffect(() => {
    handleSelectedSeller();
  }, [props?.step3?.sellerData?.seller]);
  useEffect(() => {
    handleSelectedBuyer();
  }, [props?.step3?.buyerData?.buyer]);
  useEffect(() => {
    handleSelectedPlace();
  }, [props?.step3?.placeOfInspection?.InspectionPlace]);
  return (
    <div className="dispatch_main_Div">
      <div>
        <span className="seller_title">Seller data</span>
        <div>
          <label style={{ marginTop: "1rem" }}>Add or select a seller</label>
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
              Add or select a seller
            </MenuItem>
            {props?.sellers?.map((item) => {
              return <MenuItem value={item?._id}>{item?.company_name}</MenuItem>;
            })}
          </Select>
        </div>
        <div className="inspection_textfield">
          <div style={{ width: "48%" }}>
            <label>Company Name</label>
            <InputField
              className="company_name_input"
              placeholder="Country Name"
              name="companyName"
              value={props?.step3?.sellerData?.companyName}
              onChange={(e) => {
                props.handleSellerData(e.target.name, e.target.value);
              }}
            />
          </div>
          <div style={{ width: "48%" }}>
            <label>Country</label>
            <InputField
              className="company_name_input"
              placeholder="CL"
              name="Country"
              value={props?.step3?.sellerData?.Country}
              onChange={(e) => {
                props.handleSellerData(e.target.name, e.target.value);
              }}
            />
          </div>
        </div>
        <div className="inspection_textfield">
          <div style={{ width: "48%" }}>
            <label>E-Mail Address</label>
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
          <div style={{ width: "48%" }}>
            <label>Telephone</label>
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
          <div style={{ width: "48%" }}>
            <label>Full Address</label>
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
          <div style={{ width: "48%", display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "35%" }}>
              <label>Postel Code</label>
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
              <label>Town</label>
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
        <span className="seller_title">Buyer data</span>
        <div>
          <label style={{ marginTop: "1rem" }}>Add or select a buyer</label>
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
              Add or select a Buyer
            </MenuItem>
            {props?.buyers?.map((item) => {
              return <MenuItem value={item?._id}>{item?.company_name}</MenuItem>;
            })}
          </Select>
        </div>
        <div className="inspection_textfield">
          <div style={{ width: "48%" }}>
            <label>Country Name</label>
            <InputField
              className="company_name_input"
              placeholder="Country Name"
              name="companyName"
              value={props?.step3?.buyerData?.companyName}
              onChange={(e) => {
                props.handleBuyerData(e.target.name, e.target.value);
              }}
            />
          </div>
          <div style={{ width: "48%" }}>
            <label>Country</label>
            <InputField
              className="company_name_input"
              placeholder="CL"
              name="Country"
              value={props?.step3?.buyerData?.Country}
              onChange={(e) => {
                props.handleBuyerData(e.target.name, e.target.value);
              }}
            />
          </div>
        </div>
        <div className="inspection_textfield">
          <div style={{ width: "48%" }}>
            <label>E-Mail Address</label>
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
          <div style={{ width: "48%" }}>
            <label>Telephone</label>
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
          <div style={{ width: "48%" }}>
            <label>Full Address</label>
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
          <div style={{ width: "48%", display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "35%" }}>
              <label>Postel Code</label>
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
              <label>Town</label>
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
        <span className="seller_title">Place of inspection</span>
        <div>
          <label style={{ marginTop: "1rem" }}>Add or select an inspection location</label>
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
              Add inspection location
            </MenuItem>
            {props?.places?.map((item) => {
              return <MenuItem value={item?._id}>{item?.company_name}</MenuItem>;
            })}
          </Select>
        </div>
        <div>
          <label style={{ marginTop: "1rem" }}>Date on which the goods can be inspected</label>
          <DatePicker
            name="InspectionDate"
            value={props?.step3?.placeOfInspection?.InspectionDate} //moment().format("LL")
            onChange={(e) => {
              props.handleInspectionData(e.target.name, e.target.value);
            }}
          />
        </div>
        <div className="inspection_textfield">
          <div style={{ width: "48%" }}>
            <label>Company Name</label>
            <InputField
              className="company_name_input"
              placeholder="Country Name"
              name="companyName"
              value={props?.step3?.placeOfInspection?.companyName}
              onChange={(e) => {
                props.handleInspectionData(e.target.name, e.target.value);
              }}
            />
          </div>
          <div style={{ width: "48%" }}>
            <label>Country</label>
            <InputField
              className="company_name_input"
              placeholder="CL"
              name="Country"
              value={props?.step3?.placeOfInspection?.Country}
              onChange={(e) => {
                props.handleInspectionData(e.target.name, e.target.value);
              }}
            />
          </div>
        </div>
        <div className="inspection_textfield">
          <div style={{ width: "48%" }}>
            <label>E-Mail Address</label>
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
          <div style={{ width: "48%" }}>
            <label>Telephone</label>
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
          <div style={{ width: "48%" }}>
            <label>Full Address</label>
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
          <div style={{ width: "48%", display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "35%" }}>
              <label>Postel Code</label>
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
              <label>Town</label>
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
          <div style={{ width: "48%" }}>
            <label>contact name</label>
            <InputField
              className="company_name_input"
              placeholder="contact name"
              name="contactLastName"
              value={props?.step3?.placeOfInspection?.contactLastName}
              onChange={(e) => {
                props.handleInspectionData(e.target.name, e.target.value);
              }}
            />
          </div>
          <div style={{ width: "48%" }}>
            <label>contact first name</label>
            <InputField
              className="company_name_input"
              placeholder="contact first name"
              name="contactFirsttName"
              value={props?.step3?.placeOfInspection?.contactFirsttName}
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
