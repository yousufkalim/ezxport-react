import React, { useEffect, useState } from 'react';
import InputField from '../../../components/Common/InputField';
import API from '../../../api/index';
import { Grid } from '@mui/material';
const ServiceProvider = (props) => {
  const [vendors, setVendors] = useState([]);
  const VendorByCountryId = async () => {
    await API('get', `/vendors/getByCountryId/${props.countryId}`)
      .then((res) => {
        setVendors(res.data.vendor);
      })
      .catch((err) => {
        console.log('VendorByCountryId', err);
      });
  };
  useEffect(() => {
    VendorByCountryId();
  }, []);
  return (
    <div style={{ height: '75vh', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '1.2rem' }}>
          Please select <b>a vendor</b> for this request
        </span>
      </div>
      {/* <div style={{ marginTop: "4rem", height: "15%", display: "flex" }}> */}
      <Grid container spacing={2} sx={{ marginTop: '4rem' }}>
        {vendors?.map((item) => {
          return (
            <Grid item xs={6} className="vendors_div">
              <input
                type={'radio'}
                value={item._id}
                name="vendorId"
                onChange={(e) => {
                  props.handleChange(e.target.name, e.target.value);
                }}
              />
              <label className="vendor_label">{item.name}</label>
            </Grid>
          );
        })}
      </Grid>
      {/* </div> */}
      <div
        style={{ marginBottom: '2rem', marginTop: '4rem', display: 'flex', alignItems: 'center' }}
      >
        <input
          type="checkbox"
          className="checkBox"
          name="contactInfo"
          onChange={(e) => {
            props.handleChange(e.target.name, e.target.checked);
          }}
        />
        <span style={{ paddingLeft: '10px' }}>
          Do you have contact information for this certification company?
        </span>
      </div>
      {props.step2.contactInfo ? (
        <>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '50%' }}>
              <label>Last Name</label>
              <InputField
                className="last_name_input"
                name="lastName"
                onChange={(e) => {
                  props.handleChange(e.target.name, e.target.value);
                }}
              />
            </div>
            <div style={{ width: '50%' }}>
              <label>First Name</label>
              <InputField
                className="last_name_input"
                name="firstName"
                onChange={(e) => {
                  props.handleChange(e.target.name, e.target.value);
                }}
              />
            </div>
          </div>
          <div style={{ width: '50%' }}>
            <label>Email Address</label>
            <InputField
              className="last_name_input"
              name="email"
              onChange={(e) => {
                props.handleChange(e.target.name, e.target.value);
              }}
            />
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default ServiceProvider;
