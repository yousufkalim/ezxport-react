import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DatePicker from '../../../components/Common/DatePicker';
import InputField from '../../../components/Common/InputField';

const AddressBook = (props) => {
  return (
    <>
      <div className="" style={{ marginBottom: '10%', marginTop: '2%' }}>
        <div>
          <span className="seller_title">Seller data</span>
          <div>
            <label className="label_modal">Add or select a seller</label>
            <Select
              name="seller"
              id="demo-simple-select"
              defaultValue={'default'}
              onChange={(e) => {
                props.handleSellerData(e.target.name, e.target.value);
              }}
              className="countrydropdown"
            >
              <MenuItem disabled value="default">
                select a seller
              </MenuItem>
              {props?.sellers?.map((item) => {
                return <MenuItem value={item?._id}>{item?.company_name}</MenuItem>;
              })}
            </Select>
          </div>
          <div className="inspection_textfield">
            <div style={{ width: '48%' }}>
              <label className="label_modal">Company Name</label>
              <InputField
                className="company_name_input"
                placeholder="Company Name"
                name="companyName"
                value={props?.step3?.sellerData?.companyName}
                onChange={(e) => {
                  props.handleSellerData(e.target.name, e.target.value);
                }}
              />
            </div>
            <div style={{ width: '48%' }}>
              <label className="label_modal">Country</label>
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
            <div style={{ width: '48%' }}>
              <label className="label_modal">E-Mail Address</label>
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
            <div style={{ width: '48%' }}>
              <label className="label_modal">Telephone</label>
              <InputField
                className="company_name_input"
                placeholder="33 07 86 36 02 20"
                name="telephone"
                value={props?.step3?.sellerData?.telephone}
                onChange={(e) => {
                  props.handleSellerData(e.target.name, e.target.value);
                }}
              />
            </div>
          </div>
          <div className="inspection_textfield">
            <div style={{ width: '48%' }}>
              <label className="label_modal">Full Address</label>
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
            <div
              style={{
                width: '48%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ width: '35%' }} className="postel_input">
                <label className="label_modal">Postel Code</label>
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
              <div style={{ width: '60%' }}>
                <label className="label_modal">Town</label>
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
            <label className="label_modal" style={{ marginTop: '1rem' }}>
              Add or select a buyer
            </label>
            <Select
              name="buyer"
              id="demo-simple-select"
              defaultValue={'default'}
              onChange={(e) => {
                props.handleBuyerData(e.target.name, e.target.value);
              }}
              className="countrydropdown"
            >
              <MenuItem disabled value="default">
                Company Name
              </MenuItem>
              {props?.buyers?.map((item) => {
                return <MenuItem value={item?._id}>{item?.company_name}</MenuItem>;
              })}
            </Select>
          </div>
          <div className="inspection_textfield">
            <div style={{ width: '48%' }}>
              <label className="label_modal">Company Name</label>
              <InputField
                className="company_name_input"
                placeholder="Company Name"
                name="companyName"
                value={props?.step3?.buyerData?.companyName}
                onChange={(e) => {
                  props.handleBuyerData(e.target.name, e.target.value);
                }}
              />
            </div>
            <div style={{ width: '48%' }}>
              <label className="label_modal">Country</label>
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
            <div style={{ width: '48%' }}>
              <label className="label_modal">E-Mail Address</label>
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
            <div style={{ width: '48%' }}>
              <label className="label_modal">Telephone</label>
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
            <div style={{ width: '48%' }}>
              <label className="label_modal">Full Address</label>
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
            <div
              style={{
                width: '48%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ width: '35%' }}>
                <label className="label_modal">Postel Code</label>
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
              <div style={{ width: '60%' }}>
                <label className="label_modal">Town</label>
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
            <label className="label_modal" style={{ marginTop: '1rem' }}>
              Add or select an inspection location
            </label>
            <Select
              name="InspectionPlace"
              id="demo-simple-select"
              defaultValue={'default'}
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
            <label className="label_modal" style={{ marginTop: '1rem' }}>
              Date on which the goods can be inspected
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
            <div style={{ width: '48%' }}>
              <label className="label_modal">Company Name</label>
              <InputField
                className="company_name_input"
                placeholder="Company Name"
                name="companyName"
                value={props?.step3?.placeOfInspection?.companyName}
                onChange={(e) => {
                  props.handleInspectionData(e.target.name, e.target.value);
                }}
              />
            </div>
            <div style={{ width: '48%' }}>
              <label className="label_modal">Country</label>
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
            <div style={{ width: '48%' }}>
              <label className="label_modal">E-Mail Address</label>
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
            <div style={{ width: '48%' }}>
              <label className="label_modal">Telephone</label>
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
            <div style={{ width: '48%' }}>
              <label className="label_modal">Full Address</label>
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
            <div
              style={{
                width: '48%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ width: '35%' }}>
                <label className="label_modal">Postel Code</label>
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
              <div style={{ width: '60%' }}>
                <label className="label_modal">Town</label>
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
            <div style={{ width: '48%' }}>
              <label className="label_modal">contact name</label>
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
            <div style={{ width: '48%' }}>
              <label className="label_modal">contact first name</label>
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
    </>
  );
};

export default AddressBook;
