import React, { useEffect, useState } from 'react';
import { validate } from 'validate.js';
import API from '../../../../../api/index';
import InputField from '../../../../../components/Common/InputField';
import Modal from '../../../../../components/Common/Modal';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '../../../../../components/Common/Button';
import toaster from '../../../../../utils/toaster';
import { useTranslation } from 'react-i18next';
import { COUNTRIES } from '../../../../../lib/data';

const schema = {
  companyName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    length: { maximum: 64 },
    email: true
  },
  country: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  telephone: {
    presence: { allowEmpty: false, message: 'is required' },
    length: { minimum: 10 }
  },
  address: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 124
    }
  },
  zipcode: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 5,
      minimum: 5
    }
  },
  town: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  }
};

const BuyerModal = ({
  fetchBuyers,
  userId,
  buyer,
  isEdit,
  setIsEdit,
  setOpen,
  setBuyer,
  formState,
  setFormState,
  open
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const countryHandler = e => {
    setFormState(state => ({
      ...state,
      values: { ...state.values, country: e.target.value }
    }));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      values: { ...formState.values, [name]: value },
      touched: { ...formState.touched, [name]: true }
    });
  };

  const handleCloseModal = () => {
    setOpen(false);
    setTimeout(() => {
      setIsEdit(false);
      resetForm();
      setBuyer(null);
    }, 500);
  };

  const resetForm = () => {
    setFormState({
      isValid: false,
      values: {
        companyName: '',
        country: '',
        email: '',
        telephone: '',
        address: '',
        zipcode: '',
        town: ''
      },
      errors: {},
      touched: {}
    });
  };

  const createBuyer = async data => {
    await API('post', '/buyers', data)
      .then(res => {
        toaster('success', t('Buyer added successfully!'), t('Adding Buyer'));
        setOpen(false);
        fetchBuyers();
        resetForm();
      })
      .catch(err => toaster('Failed', t('Something went wrong!')));
  };

  const editBuyer = async data => {
    await API('put', `/buyers/${buyer._id}`, data)
      .then(res => {
        toaster('success', t('Buyer updated sucessfully'), t('Update Buyer'));
        fetchBuyers();
        handleCloseModal();
      })
      .catch(err => toaster('Failed', t('Something went wrong!')));
  };
  const handleSubmit = e => {
    e.preventDefault();
    const {
      companyName: company_name,
      email,
      country,
      town: city,
      telephone: phone_number,
      zipcode,
      address
    } = formState.values;
    const data = {
      company_name,
      email,
      country,
      city,
      phone_number,
      zipcode,
      address,
      user: userId
    };

    if (isEdit) {
      editBuyer(data);
    } else {
      createBuyer(data);
    }
  };

  const hasError = field => (formState.touched[field] && formState.errors[field] ? true : false);
  const MODAL_TITLE = isEdit ? 'Edit buyer' : buyer ? 'View buyer' : 'Add buyer';
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title={MODAL_TITLE}
      handleClose={() => handleCloseModal()}
      Closebtn={true}>
      <div className="buyer_socond">
        <div className="luyer_input_field">
          <InputField
            label="Company name"
            disabled={!isEdit && buyer}
            name="companyName"
            onChange={e => handleChange(e)}
            value={formState.values.companyName}
            isError={hasError('companyName')}
            error={[t(formState.errors?.companyName)]}
            type="text"
            placeholder="Company 1"
          />
        </div>
        <div className="luyer_input_field">
          <FormControl fullWidth>
            <label htmlFor="" className="buyer_label">
              {t('Select a Country')}
            </label>
            <Select
              id="demo-simple-select"
              disabled={!isEdit && buyer}
              name="country"
              value={formState.values.country}
              onChange={e => countryHandler(e)}
              className="buyer_input">
              {COUNTRIES?.map((item, index) => {
                return (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
            {hasError('country') && (
              <div className="input-error">{formState.errors.country ?? null}</div>
            )}
          </FormControl>
        </div>
        <div className="luyer_input_field">
          <div className="second_input_field">
            <div className="input_fields">
              <InputField
                label="Email"
                name="email"
                disabled={!isEdit && buyer}
                onChange={e => handleChange(e)}
                isError={hasError('email')}
                error={[t(formState.errors.email)]}
                value={formState.values.email}
                type="email"
                placeholder="mail@mail.com"
              />
            </div>
            <div className="input_fields">
              <InputField
                label={t('Telephone')}
                isError={hasError('telephone')}
                error={[t(formState.errors.telephone)]}
                name="telephone"
                disabled={!isEdit && buyer}
                onChange={e => handleChange(e)}
                value={formState.values.telephone}
                type="number"
                placeholder="+33 03 32 32 42 42"
              />
            </div>
          </div>
        </div>
        <div className="luyer_input_field">
          <div className="luyer_input_field">
            <InputField
              label="Address"
              name="address"
              disabled={!isEdit && buyer}
              onChange={e => handleChange(e)}
              isError={hasError('address')}
              error={[t(formState.errors.address)]}
              value={formState.values.address}
              type="text"
              placeholder="97 road of rouvroy"
            />
          </div>
        </div>
        <div className="luyer_input_field">
          <div className="second_input_field">
            <div className="input_fields">
              <InputField
                label={t('Postal code')}
                name="zipcode"
                disabled={!isEdit && buyer}
                onChange={e => handleChange(e)}
                isError={hasError('zipcode')}
                error={[t(formState.errors.zipcode)]}
                value={formState.values.zipcode}
                type="number"
                placeholder="34 832"
              />
            </div>
            <div className="input_fields">
              <InputField
                label={t('Town')}
                name="town"
                disabled={!isEdit && buyer}
                onChange={e => handleChange(e)}
                isError={hasError('town')}
                error={[t(formState.errors?.town)]}
                value={formState.values.town}
                type="text"
                placeholder="Congo"
              />
            </div>
          </div>
        </div>
        {((!isEdit && !buyer) || (isEdit && buyer)) && (
          <Button
            text="To Confirm"
            disabled={!formState.isValid}
            type="submit"
            onClick={e => handleSubmit(e)}
            className="luyer_button"
          />
        )}
      </div>
    </Modal>
  );
};

export default BuyerModal;
