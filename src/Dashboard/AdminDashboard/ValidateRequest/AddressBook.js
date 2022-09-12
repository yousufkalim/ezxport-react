import React from 'react';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
import DatePicker from '../../../components/Common/DatePicker';
import InputField from '../../../components/Common/InputField';
import moment from 'moment';

const AddressBook = (props) => {
  return (
    <>
      <div className="" style={{ marginBottom: '10%', marginTop: '2%' }}>
        <div>
          <span className="seller_title">Seller data</span>

          <div className="inspection_textfield">
            <div className="speps_3_feilds">
              <label className="label_modal">Company Name</label>
              <InputField
                disabled
                className="company_name_input"
                name="companyName"
                value={props?.requestById?.seller?.company_name}
              />
            </div>
            <div className="speps_3_feilds">
              <label className="label_modal">Country</label>
              <InputField
                className="company_name_input"
                disabled
                name="Country"
                value={props?.requestById?.seller?.country?.name}
              />
            </div>
          </div>
          <div className="inspection_textfield">
            <div className="speps_3_feilds">
              <label className="label_modal">E-Mail Address</label>
              <InputField
                className="company_name_input"
                disabled
                name="email"
                value={props?.requestById?.seller?.email}
              />
            </div>
            <div className="speps_3_feilds">
              <label className="label_modal">Telephone</label>
              <InputField
                className="company_name_input"
                disabled
                name="telephone"
                value={props?.requestById?.seller?.phone_number}
              />
            </div>
          </div>
          <div className="inspection_textfield">
            <div className="speps_3_feilds">
              <label className="label_modal">Full Address</label>
              <InputField
                className="company_name_input"
                disabled
                name="fullAddress"
                value={props?.requestById?.seller?.address}
              />
            </div>
            <div className="steps_3_2inFeilds">
              <div className="postel_input">
                <label className="label_modal">Postel Code</label>
                <InputField
                  className="company_name_input"
                  disabled
                  name="postalCode"
                  value={props?.requestById?.seller?.zipcode}
                />
              </div>
              <div style={{ width: '60%' }}>
                <label className="label_modal">Town</label>
                <InputField
                  className="company_name_input"
                  disabled
                  name="town"
                  value={props?.requestById?.seller?.city}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="buyer_data_div">
          <span className="seller_title">Buyer data</span>

          <div className="inspection_textfield">
            <div className="speps_3_feilds">
              <label className="label_modal">Company Name</label>
              <InputField
                className="company_name_input"
                disabled
                name="companyName"
                value={props?.requestById?.buyer?.company_name}
              />
            </div>
            <div className="speps_3_feilds">
              <label className="label_modal">Country</label>
              <InputField
                className="company_name_input"
                disabled
                name="Country"
                value={props?.requestById?.buyer?.country?.name}
              />
            </div>
          </div>
          <div className="inspection_textfield">
            <div className="speps_3_feilds">
              <label className="label_modal">E-Mail Address</label>
              <InputField
                className="company_name_input"
                disabled
                name="email"
                value={props?.requestById?.buyer?.email}
              />
            </div>
            <div className="speps_3_feilds">
              <label className="label_modal">Telephone</label>
              <InputField
                className="company_name_input"
                disabled
                name="telephone"
                value={props?.requestById?.buyer?.phone_number}
              />
            </div>
          </div>
          <div className="inspection_textfield">
            <div className="speps_3_feilds">
              <label className="label_modal">Full Address</label>
              <InputField
                className="company_name_input"
                disabled
                name="fullAddress"
                value={props?.requestById?.buyer?.address}
              />
            </div>
            <div className="steps_3_2inFeilds">
              <div style={{ width: '35%' }}>
                <label className="label_modal">Postel Code</label>
                <InputField
                  className="company_name_input"
                  disabled
                  name="postalCode"
                  value={props?.requestById?.buyer?.zipcode}
                />
              </div>
              <div style={{ width: '60%' }}>
                <label className="label_modal">Town</label>
                <InputField
                  className="company_name_input"
                  disabled
                  name="town"
                  value={props?.requestById?.buyer?.city}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="buyer_data_div">
          <span className="seller_title">Place of inspection</span>

          <div>
            <label className="label_modal" style={{ marginTop: '1rem' }}>
              Date on which the goods can be inspected
            </label>
            <DatePicker
              disabled
              name="InspectionDate"
              value={moment(props?.requestById?.inspection_date).format('YYYY-MM-DD')}
            />
          </div>
          <div className="inspection_textfield">
            <div className="speps_3_feilds">
              <label className="label_modal">Company Name</label>
              <InputField
                className="company_name_input"
                disabled
                name="companyName"
                value={props?.requestById?.place?.company_name}
              />
            </div>
            <div className="speps_3_feilds">
              <label className="label_modal">Country</label>
              <InputField
                className="company_name_input"
                disabled
                name="Country"
                value={props?.requestById?.place?.country?.name}
              />
            </div>
          </div>
          <div className="inspection_textfield">
            <div className="speps_3_feilds">
              <label className="label_modal">E-Mail Address</label>
              <InputField
                disabled
                className="company_name_input"
                name="email"
                value={props?.requestById?.place?.email}
              />
            </div>
            <div className="speps_3_feilds">
              <label className="label_modal">Telephone</label>
              <InputField
                className="company_name_input"
                disabled
                name="telephone"
                value={props?.requestById?.place?.phone_number}
              />
            </div>
          </div>
          <div className="inspection_textfield">
            <div className="speps_3_feilds">
              <label className="label_modal">Full Address</label>
              <InputField
                className="company_name_input"
                disabled
                name="fullAddress"
                value={props?.requestById?.place?.address}
              />
            </div>
            <div className="steps_3_2inFeilds">
              <div style={{ width: '35%' }}>
                <label className="label_modal">Postel Code</label>
                <InputField
                  className="company_name_input"
                  disabled
                  name="postalCode"
                  value={props?.requestById?.place?.zipcode}
                />
              </div>
              <div style={{ width: '60%' }}>
                <label className="label_modal">Town</label>
                <InputField
                  className="company_name_input"
                  disabled
                  name="town"
                  value={props?.requestById?.place?.city}
                />
              </div>
            </div>
          </div>
          <div className="inspection_textfield">
            <div className="speps_3_feilds">
              <label className="label_modal">contact last name</label>
              <InputField
                className="company_name_input"
                disabled
                name="contactLastName"
                value={props?.requestById?.place?.contact_lname}
              />
            </div>
            <div className="speps_3_feilds">
              <label className="label_modal">contact first name</label>
              <InputField
                className="company_name_input"
                disabled
                name="contactFirsttName"
                value={props?.requestById?.place?.contact_fname}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressBook;
