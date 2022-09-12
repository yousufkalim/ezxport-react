import React, {useEffect, useState} from 'react'
import { validate } from 'validate.js';
import API from '../../../../../api/index';
import { toast } from 'react-toastify';
import InputField from '../../../../../components/Common/InputField';
import Modal from '../../../../../components/Common/Modal';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const schema = {
    companyName: {
      presence: { allowEmpty: false, message: "is required" },
      length: {
        maximum: 64
      },
    },
    email: {
      presence: {allowEmpty: false, message: "is required"},
      length: {maximum: 64},
      email: true
    },
    telephone: {
      presence: {allowEmpty: false, message: "is required"},
      length: {maximum: 10, minimum: 10},
    }
  }
  

const BuyerModal = ({fetchBuyers, userId, buyer,isEdit,setIsEdit, countries, setOpen, setBuyer, formState, setFormState, open}) => {

      useEffect(() => {
        const errors = validate(formState.values, schema);
        setFormState((formState) => ({
          ...formState,
          errors: errors ?? {},
          isValid: errors ? false : true
    
        }))
      }, [formState.values]);

      const countryHandler = (e) => {
        console.log("Country ", e.target.value)
        setFormState((state) => ({
          ...state,
          values: {...state.values, country: e.target.value}
        }))
      };
    
      const handleChange = (e) => {
        const {name, value} = e.target;
        setFormState({...formState, values:{...formState.values, [name]: value}, touched: {...formState.touched, [name]: true}})
      }

      const handleCloseModal = () => {
        setOpen(false);
        setTimeout(() => {
            setIsEdit(false);
            resetForm();
            setBuyer(null);
        }, 500)
      }
    
      const resetForm = () => {
        setFormState({
            isValid: false,
            values: {companyName: '', country: '', email: '', telephone: '', address: '', zipcode: '', town: ''},
            errors: {},
            touched: {}
        })
      }

      const createBuyer = async (data) => {
        await API('post', '/buyers', data).then((res) => {
            toast.success('Buyer addedd successfully!');
            setOpen(false);
            fetchBuyers();
            resetForm();
          }).catch(err => toast.success('Something went wrong!'));
      }

      const editBuyer = async (data) => {
        await API('put', `/buyers/${buyer._id}`, data).then((res) => {
            toast.success('Buyer updated successfully!');
           
            fetchBuyers();
            handleCloseModal()
          }).catch(err => toast.success('Something went wrong!'));
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        const {companyName: company_name, email, country, town: city, telephone :phone_number, zipcode, address  } = formState.values;
        const data = {
          company_name,
          email,
          country,
          city,
          phone_number,
          zipcode,
          address,
          user: userId
        }

        if(isEdit){
            editBuyer(data);
        }else {
            createBuyer(data);
        }
      }


    const hasError = (field) => formState.touched[field] && formState.errors[field] ? true : false;
    const MODAL_TITLE = isEdit ? 'Edit buyer' : buyer ? 'View buyer' : 'Add buyer'
  return (
    <Modal
            open={open}
            setOpen={setOpen}
            title={MODAL_TITLE}
            handleClose={() => handleCloseModal()}
            Closebtn={true}
        >
        <div className="buyer_socond">
          <div className="luyer_input_field">
            <label htmlFor="" className="buyer_label">
              Name
            </label>
            <InputField
              className={
                hasError("companyName") && formState.errors.companyName
                  ? "input_email_red"
                  : "input_email"
              }
              disabled={!isEdit && buyer}
              name='companyName'
              onChange={(e) => handleChange(e)}
              value={formState.values.companyName}
              type="text" placeholder="Company 1" />
              {
                hasError('companyName') && (
                  <div>{formState.errors.companyName[0] ?? null}</div>
                )
              }
          </div>
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                Select a country
              </label>
              <Select
                id="demo-simple-select"
                disabled={!isEdit && buyer}
                name="country"
                // defaultValue={formState.values.country}
                value={formState.values.country}
                onChange={(e) => countryHandler(e)}
                className="buyer_input"
              >
                {
                  countries?.map(({name, _id: id}) => (
                    <MenuItem key={id} value={id}>{name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>
          <div className="luyer_input_field">
            <div className="second_input_field">
              <div className="input_fields">
                <label htmlFor="" className="buyer_label">
                  E-mail address
                </label>
                <InputField 
                  className={
                    hasError("email") && formState.errors.email
                      ? "input_email_red"
                      : "input_email"
                  }
                  name='email'
                  disabled={!isEdit && buyer}
                  onChange={(e) => handleChange(e)}
                  value={formState.values.email}
                  type="email"
                  placeholder="mail@mail.com" />
              </div>
              <div className="input_fields">
                <label htmlFor="" className="buyer_label">
                  Telephone
                </label>
                <InputField 
                  className={
                    hasError("telephone") && formState.errors.telephone
                      ? "input_email_red"
                      : "input_email"
                  }
                  name='telephone'
                  disabled={!isEdit && buyer}
                  onChange={(e) => handleChange(e)}
                  value={formState.values.telephone}
                  type="number"
                  placeholder="+33 03 32 32 42 42" />
              </div>
            </div>
          </div>
          <div className="luyer_input_field">
            <div className="luyer_input_field">
              <label htmlFor="" className="buyer_label">
                Address
              </label>
              <InputField 
                className={
                  hasError("address") && formState.errors.address
                    ? "input_email_red"
                    : "input_email"
                }
                name='address'
                disabled={!isEdit && buyer}
                onChange={(e) => handleChange(e)}
                value={formState.values.address}
                type="text" placeholder="97 road of rouvroy" />
            </div>
          </div>
          <div className="luyer_input_field">
            <div className="second_input_field">
              <div className="input_fields">
                <label htmlFor="" className="buyer_label">
                  Postal code
                </label>
                <InputField 
                  className={
                    hasError("zipcode") && formState.errors.zipcode
                      ? "input_email_red"
                      : "input_email"
                  }
                  name='zipcode'
                  disabled={!isEdit && buyer}
                  onChange={(e) => handleChange(e)}
                  value={formState.values.zipcode}
                  type="number" placeholder="34 832" />
              </div>
              <div className="input_fields">
                <label htmlFor="" className="buyer_label">
                  Town
                </label>
                <InputField 
                  className={
                    hasError("town") && formState.errors.town
                      ? "input_email_red"
                      : "input_email"
                  }
                  name='town'
                  disabled={!isEdit && buyer}
                  onChange={(e) => handleChange(e)}
                  value={formState.values.town}
                  type="text" placeholder="Congo" />
              </div>
            </div>
          </div>
          {
            ((!isEdit && !buyer) || (isEdit && buyer)) && <button type='submit' onClick={(e => handleSubmit(e))} className="luyer_button">To Confirm</button>
          }
        </div>
      </Modal>
  )
}

export default BuyerModal