import React, {useEffect, useState} from 'react'
import { validate } from 'validate.js';
import API from '../../../../../api/index';
import { toast } from 'react-toastify';
import InputField from '../../../../../components/Common/InputField';
import Modal from '../../../../../components/Common/Modal';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '../../../../../components/Common/Button';
import toaster from '../../../../../utils/toaster';

const BuyerModal = ({t, schema, fetchBuyers,setActiveField, activeField, userId, buyer,isEdit,setIsEdit, countries, setOpen, setBuyer, formState, setFormState, open}) => {

      const handleBlur = (e) => {
        e.preventDefault();
        const {name} = e.target;
        const errors = validate(formState.values, schema);
        console.log("Errors ", errors );
        console.log("Lastest state  ", formState);
        setFormState((formState) => ({
          ...formState,
          errors: errors ?? {},
          touched: {...formState.touched, [name]: true},
          isValid: errors ? false : true
    
        }))
      }

      const countryHandler = (e) => {
        console.log("Country ", e.target.value)
        setFormState((state) => ({
          ...state,
          values: {...state.values, country: e.target.value}
        }))
      };
    
      const handleChange = (e) => {
        const {name, value} = e.target;
        setFormState({...formState, values:{...formState.values, [name]: value}})
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
            toaster('success', "Buyer updated sucessfully");
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

    console.log("has Errorr" , formState);
    const MODAL_TITLE = isEdit ? 'dashboard.user.addressBook.modal.title.edit' : buyer ? 'dashboard.user.addressBook.modal.title.view' : 'dashboard.user.addressBook.modal.title.add'
  return (
    <Modal
            open={open}
            setOpen={setOpen}
            title={t(MODAL_TITLE)}
            handleClose={() => handleCloseModal()}
            Closebtn={true}
        >
        <div className="buyer_socond">
          <div className="luyer_input_field">
            <InputField
              label="dashboard.user.addressBook.modal.form.name.label"
              disabled={!isEdit && buyer}
              name='companyName'
              onChange={(e) => handleChange(e)}
              value={formState.values.companyName}
              onBlur={(e) => handleBlur(e)}
              isError={hasError("companyName")}
              error={formState.errors?.companyName}
              type="text" placeholder="Company 1" />
          </div>
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                {t("dashboard.user.addressBook.modal.form.country.label")}
              </label>
              <Select
                id="demo-simple-select"
                disabled={!isEdit && buyer}
                name='country'
                onBlur={(e) => handleBlur(e)}
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
              {
                hasError('country') && (
                  <div className='input-error'>{formState.errors.country ?? null}</div>
                )
              }
            </FormControl>
          </div>
          <div className="luyer_input_field">
            <div className="second_input_field">
              <div className="input_fields">
                <InputField 
                  label={t("dashboard.user.addressBook.modal.form.email.label")}
                  name='email'
                  disabled={!isEdit && buyer}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleBlur(e)}
                  isError={hasError("email")}
                  error={formState.errors.email}
                  value={formState.values.email}
                  type="email"
                  placeholder="mail@mail.com" />
              </div>
              <div className="input_fields">
                <InputField 
                  label={t("dashboard.user.addressBook.modal.form.telephone.label")}
                  name='telephone'
                  disabled={!isEdit && buyer}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleBlur(e)}
                  isError={hasError("telephone")}
                  error={formState.errors.telephone}
                  value={formState.values.telephone}
                  type="number"
                  placeholder="+33 03 32 32 42 42" />
              </div>
            </div>
          </div>
          <div className="luyer_input_field">
            <div className="luyer_input_field">
              <InputField 
                label={t("dashboard.user.addressBook.modal.form.address.label")}
                name='address'
                disabled={!isEdit && buyer}
                onChange={(e) => handleChange(e)}
                onBlur={(e) => handleBlur(e)}
                isError={hasError("address")}
                error={formState.errors.address}
                value={formState.values.address}
                type="text" placeholder="97 road of rouvroy" />
            </div>
          </div>
          <div className="luyer_input_field">
            <div className="second_input_field">
              <div className="input_fields">
                <InputField 
                  label={t("dashboard.user.addressBook.modal.form.postalCode.label")}
                  name='zipcode'
                  disabled={!isEdit && buyer}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleBlur(e)}
                  isError={hasError("zipcode")}
                  error={formState.errors.zipcode}
                  value={formState.values.zipcode}
                  type="number" placeholder="34 832" />
              </div>
              <div className="input_fields">
                <InputField 
                  label={t("dashboard.user.addressBook.modal.form.town.label")}
                  name='town'
                  disabled={!isEdit && buyer}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleBlur(e)}
                  isError={hasError("town")}
                  error={formState.errors?.town}
                  value={formState.values.town}
                  type="text" placeholder="Congo" />
              </div>
            </div>
          </div>
          {
            ((!isEdit && !buyer) || (isEdit && buyer)) && <Button text="To Confirm" disabled={!formState.isValid} type='submit' onClick={(e => handleSubmit(e))} className="luyer_button" />
          }
        </div>
      </Modal>
  )
}

export default BuyerModal