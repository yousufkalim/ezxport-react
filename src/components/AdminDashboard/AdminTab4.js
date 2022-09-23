import React, { useEffect, useState } from 'react';
import CalculationRange from './CalculationRange';
import FormControl from '@mui/material/FormControl';
import Modal from '../Common/Modal';
import Button from '../Common/Button';
import API from '../../api/index';
import CalculationCoefficient from './CalculationCoefficient';
import InputField from '../Common/InputField';
import { useTranslation } from 'react-i18next';
import toaster from '../../utils/toaster';
import { validate } from 'validate.js';

const schema = {
  min_threshold: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64,
    },
  },
  coefficient: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64,
    },
  },
};

const AdminTab4 = (props) => {
  const [thresholdCurrency, setThresholdCurrency] = useState(
    props?.calculation?.min_threshold?.currency
  );
  const [minCostCurrency, setMinCostCurrency] = useState(props?.calculation?.min_cost?.currency);
  const [maxCostCurrency, setMaxCostCurrency] = useState(props?.calculation?.max_cost?.currency);
  // const [MinThreshold, setMinThreshold] = useState(
  //   props?.calculation?.min_threshold?.value
  // );
  // const [coefficient, setCoefficient] = useState(
  //   props?.calculation?.coefficient
  // );
  // const [minCost, setMinCost] = useState(props?.calculation?.min_cost?.value);
  // const [maxCost, setMaxCost] = useState(props?.calculation?.max_cost?.value);
  const [coefficientChange, setCoefficientChange] = useState(props?.calculation);
  const { calculation } = props;

  const [formState, setFormState] = useState({
    isValid: {},
    values: {
      minCost: calculation?.min_cost?.value,
      maxCost: calculation?.max_cost?.value,
      MinThreshold: calculation?.min_threshold?.value,
      coefficient: calculation?.coefficient,
    },
    errors: {},
    touched: {},
  });

  const [allErrors, setAllErrors] = useState({
    minCost: '',
    maxCost: '',
    coefficient: '',
    MinThreshold: '',
  });

  const { minCost, maxCost, MinThreshold } = formState.values;
  const { errors } = formState;

  const { t } = useTranslation();

  useEffect(() => {
    if (formState.values.minCost) {
      const { min, max } = allErrors;
      const { minCost, maxCost, MinThreshold } = formState.values;
      if (!min && !max && minCost && maxCost && MinThreshold && formState.values.coefficient) {
        setFormState({ ...formState, isValid: true });
      } else {
        setFormState({ ...formState, isValid: false });
      }
    }
  }, [formState.values, allErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'coefficient') {
      if (value.includes('.')) {
        const afterDecimal = value.split('.')[1];
        if (afterDecimal.length <= 2) {
          setFormState({
            ...formState,
            values: { ...formState.values, [name]: value },
            touched: { ...formState.touched, [name]: true },
          });
        }
      } else if (!value.includes('00')) {
        setFormState({
          ...formState,
          values: { ...formState.values, [name]: value },
          touched: { ...formState.touched, [name]: true },
        });
      }
    } else {
      !value.match(/[^0-9]/) &&
        setFormState({
          ...formState,
          values: { ...formState.values, [name]: value },
          touched: { ...formState.touched, [name]: true },
        });
    }

    const min = parseInt(minCost);
    const max = parseInt(maxCost);
    const val = parseInt(value);
    const cof = parseFloat(value);

    if (name === 'coefficient') {
      if (!cof) {
        setAllErrors({ ...allErrors, coefficient: 'Coefficient is Required' });
      } else {
        setAllErrors({ ...allErrors, coefficient: '' });
      }
    } else if (name === 'MinThreshold') {
      if (!val) {
        setAllErrors({
          ...allErrors,
          MinThreshold: 'Minmum Threshold is Required',
        });
      } else {
        setAllErrors({ ...allErrors, MinThreshold: '' });
      }
    } else if (name === 'minCost') {
      if (max && val >= max) {
        setAllErrors({
          ...allErrors,
          min: 'Minimum cost should be less than maximum cost',
        });
      } else if (!val) {
        setAllErrors({ ...allErrors, min: 'Minmum cost is Required' });
      } else {
        setAllErrors({ ...allErrors, min: '' });
      }
    } else if (name === 'maxCost') {
      if (min && val <= min) {
        setAllErrors({
          ...allErrors,
          max: 'Maxminm cost should be greater than minimum cost',
        });
      } else if (!val) {
        setAllErrors({ ...allErrors, max: 'Maximum cost is Required' });
      } else {
        setAllErrors({ ...allErrors, max: '' });
      }
    }
  };

  const handleCoefficientChange = async () => {
    await API('put', `/calculations/${props?.calculation?._id}`, {
      country: props.countryId,
      type: 'coefficient',
      min_threshold: { currency: thresholdCurrency, value: MinThreshold },
      coefficient: formState.values?.coefficient,
      min_cost: { currency: minCostCurrency, value: minCost },
      max_cost: { currency: maxCostCurrency, value: maxCost },
    })
      .then((res) => {
        props.setOpenCalculationModal(false);
        props.handleCountryData();
        setCoefficientChange(res?.data?.calculation);

        toaster('success', t('Coefficient Updated Successfully'), t('Update Coefficient'));
      })
      .catch((err) => {
        toaster('failed', t('Something went wrong'));
      });
  };
  const handleAddCoefficient = async () => {
    await API('post', `/calculations/`, {
      country: props.countryId,
      type: 'coefficient',
      coefficient: formState.values?.coefficient,
      min_threshold: { currency: thresholdCurrency, value: MinThreshold },
      min_cost: { currency: minCostCurrency, value: minCost },
      max_cost: { currency: maxCostCurrency, value: maxCost },
    })
      .then((res) => {
        props.handleCountryData();
        setCoefficientChange(res?.data?.calculation);
        props.setOpenCalculationModal(false);

        toaster('success', t('Coefficient Added Successfully'), t('Adding Coefficient'));
      })
      .catch((err) => {
        console.log('handleAddCoefficient', err);
      });
  };

  const closeModal = () => {
    setAllErrors({
      minCost: '',
      maxCost: '',
      coefficient: '',
      MinThreshold: '',
    });
    setFormState({
      ...formState,
      values: {
        minCost: calculation?.min_cost?.value,
        maxCost: calculation?.max_cost?.value,
        MinThreshold: calculation?.min_threshold?.value,
        coefficient: calculation?.coefficient,
      },
    });
    props.handleCalculationClose();
  };
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '2% 0',
        }}
      >
        <input
          name='radio-item-1'
          value='on'
          type='radio'
          onChange={(e) => props.setCurrentRadioValue('coefficient')}
          defaultChecked={props.currentRadioValue === 'coefficient'}
        />
        <label
          htmlFor='radio-item-1'
          style={{
            paddingLeft: '5px',
          }}
        >
          {t('Calculation by coefficient')}
        </label>

        <input
          style={{
            marginLeft: '20px',
          }}
          name='radio-item-1'
          value='off'
          type='radio'
          onChange={(e) => props.setCurrentRadioValue('range')}
          defaultChecked={props.currentRadioValue === 'range'}
        />
        <label
          style={{
            paddingLeft: '5px',
          }}
          htmlFor='radio-item-2'
        >
          {t('Calculation by range')}
        </label>
      </div>

      {props.currentRadioValue === 'range' ? (
        <CalculationRange
          setOpenCalculationModal={props.setOpenCalculationModal}
          id={props?.calculation?._id}
          CountryId={props.countryId}
          Calculation={props.calculation}
          currency={props.currency}
          countryData={props.handleCountryData}
        />
      ) : (
        props.currentRadioValue === 'coefficient' && (
          <CalculationCoefficient values={formState.values} currency={props.currency} />
        )
      )}

      <Modal
        open={props.openCalculationModal}
        setOpen={props.setOpenCalculationModal}
        title={t('Update calculation by coefficient')}
        handleClose={(e) => closeModal(e)}
        Closebtn={true}
      >
        <div className='Coefficient_input_div'>
          <div className='luyer_input_field'>
            <FormControl fullWidth>
              <label htmlFor='' className='buyer_label'>
                {t('Minimum threshold')}
              </label>

              <InputField
                className='calculation_input'
                value={formState.values.MinThreshold}
                name='MinThreshold'
                onChange={(e) => handleChange(e)}
              />
              {allErrors.MinThreshold && (
                <div className='input-error'>{allErrors.MinThreshold ?? null}</div>
              )}
            </FormControl>
          </div>
          <div className='luyer_input_field'>
            <FormControl fullWidth>
              <label htmlFor='' className='buyer_label'>
                {t('Coefficient')} %
              </label>
              <InputField
                className='calculation_input'
                name='coefficient'
                value={formState.values?.coefficient}
                onChange={(e) => handleChange(e)}
                type='number'
              />
              {allErrors.coefficient && (
                <div className='input-error'>{allErrors.coefficient ?? null}</div>
              )}
            </FormControl>
          </div>
          <div className='luyer_input_field'>
            <FormControl fullWidth>
              <label htmlFor='' className='buyer_label'>
                {t('minimum cost')}
              </label>

              <InputField
                className='calculation_input'
                value={minCost}
                name='minCost'
                onChange={(e) => handleChange(e)}
              />
              {allErrors.min && <div className='input-error'>{allErrors.min ?? null}</div>}
            </FormControl>
          </div>
          <div className='luyer_input_field'>
            <FormControl fullWidth>
              <label htmlFor='' className='buyer_label'>
                {t('Maximum cost')}
              </label>

              <InputField
                className='calculation_input'
                value={maxCost}
                name='maxCost'
                onChange={(e) => handleChange(e)}
              />
              {allErrors.max && <div className='input-error'>{allErrors.max ?? null}</div>}
            </FormControl>
          </div>
          <Button
            text={t('Update')}
            className={
              MinThreshold === '' ||
              minCost === '' ||
              maxCost === '' ||
              formState.values?.coefficient === ''
                ? 'bom_downloadFile_btn_disabled'
                : 'bom_downloadFile_btn'
            }
            onClick={props.calculation ? handleCoefficientChange : handleAddCoefficient}
            disabled={!formState.isValid}
          />
        </div>
      </Modal>
    </>
  );
};

export default AdminTab4;
