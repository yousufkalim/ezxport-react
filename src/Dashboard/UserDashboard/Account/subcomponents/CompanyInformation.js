import React from 'react';
import Spinner from '../../../../components/Common/Spinner';
import InputField from '../../../../components/Common/InputField';
import { FormControl, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';

const societyType = [
  { name: 'Select your type', id: 'default' },
  { name: 'Manufacturer', id: 'manufacturer' },
  { name: 'Vendor', id: 'vendor' },
  { name: 'Trader', id: 'trader' },
  { name: 'Freight forwarder', id: 'freight_forwarder' }
];

const CompanyInformation = ({ formState, setFormState, loading, setBtnDisabled }) => {
  const { errors } = formState;

  const companyTypeHandler = e => {
    setFormState({
      ...formState,
      values: { ...formState.values, type: e.target.value },
      touched: { ...formState.touched, type: true }
    });
    setBtnDisabled(false);
  };

  const { t } = useTranslation();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      values: { ...formState.values, [name]: value },
      touched: { ...formState.touched, [name]: true }
    });
    setBtnDisabled(false);
  };

  const hasError = field => (formState.touched[field] && formState.errors[field] ? true : false);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div>
        <div className="company_input_div">
          <div className="company_input_col">
            <label className="email_input_label" htmlFor="">
              {t('Last name')}
            </label>
            <InputField
              value={formState.values?.lastName}
              error={[t(errors.lastName)]}
              isError={hasError('lastName')}
              name="lastName"
              onChange={e => handleChange(e)}
              type="text"
              className="company_input"
              placeholder={t('Last name')}
            />
          </div>
          <div className="company_input_society">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                {t('Type of society')}
              </label>
              <Select
                id="demo-simple-select"
                name="type"
                value={formState.values?.type}
                onChange={e => companyTypeHandler(e)}
                className="buyer_input">
                {societyType?.map(({ name, id }) => (
                  <MenuItem disabled={id === 'default'} key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
              {hasError('type') && <div className="input-error">{errors.type ?? null}</div>}
            </FormControl>
          </div>
        </div>
        <div className="company_input_div">
          <div className="company_input_col">
            <label className="email_input_label" htmlFor="">
              {t('VAT number')}
            </label>
            <InputField
              value={formState.values?.vatNumber}
              name="vatNumber"
              error={[t(errors.vatNumber)]}
              isError={hasError('vatNumber')}
              onChange={e => handleChange(e)}
              type="text"
              className="company_input"
              placeholder="6372890367849"
            />
          </div>
        </div>
      </div>
    );
  }
};

export default CompanyInformation;
