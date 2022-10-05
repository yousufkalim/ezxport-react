import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import DeleteIcon from '../../assets/DeleteIcon.svg';
import EditIcon from '../../assets/EditIcon.svg';
import API from '../../api/index';
import Modal from '../Common/Modal';
import Button from '../Common/Button';
import InputField from '../Common/InputField';
import { useTranslation } from 'react-i18next';
import ConfirmModal from '../Common/ConfirmModal';
import downArrow from '../../assets/TitleDownArrow.svg';
import arrow_up from '../../assets/arrow_up.svg';
import { getSortedData } from '../../lib/getSortedData';
import Spinner from '../Common/Spinner';
import toaster from '../../utils/toaster';

const TITLE = [
  { heading: 'Minimum' },
  { heading: 'Maximum' },
  {
    heading: 'Certificate cost',
    key: 'certificate_cost',
    sortIcon: true,
    imgSrc: downArrow
  },
  { heading: 'Actions' }
];

const CalculationRange = props => {
  const [rangeData, setRangeData] = useState();
  const [itemId, setItemId] = useState();
  const [editModal, setEditModal] = useState(false);
  const [rangeCertificat, setRangeCertificat] = useState();
  const [rangeMinCost, setRangeMinCost] = useState();
  const [rangeMaxCost, setRangeMaxCost] = useState();
  const [allErrors, setAllErrors] = useState({
    min: '',
    max: '',
    certificate: ''
  });
  const [openModal, setOpenModal] = useState(false);
  const [rangeId, setRangeId] = useState('');
  const [sort, setSort] = useState({ key: '', ascend: true });
  const [loading, setLoading] = useState(false);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      minCost: '',
      maxCost: '',
      certificate: ''
    }
  });

  const { t } = useTranslation();

  useEffect(() => {
    if (props?.id) {
      handleRangeData();
    }
  }, []);

  useEffect(() => {
    if (formState.values.minCost) {
      const { min, max } = allErrors;
      const { minCost, maxCost, certificate } = formState.values;
      if (!min && !max && !allErrors.certificate && minCost && maxCost && certificate) {
        setFormState({ ...formState, isValid: true });
      } else {
        setFormState({ ...formState, isValid: false });
      }
    }
  }, [formState.values, allErrors]);

  const handleValuesChange = event => {
    const validatedValue = event.target.value.replace(/[^0-9]/g, '');
    if (validatedValue === '0') {
      if (formState.values.minCost !== '') {
        setFormState(formState => ({
          ...formState,
          values: { ...formState.values, [event.target.name]: validatedValue }
        }));
      }
    } else {
      setFormState(formState => ({
        ...formState,
        values: { ...formState.values, [event.target.name]: validatedValue }
      }));
    }

    const { name, value } = event.target;
    const val = parseInt(value);
    const { minCost, maxCost } = formState.values;
    let latestValues = {};
    let latestMax = null;
    let latestCertificate = null;
    if (rangeData) {
      latestValues = rangeData[rangeData?.length - 1];
      latestMax = latestValues?.max + 1;
      latestCertificate = latestValues?.certificate_cost;
    }

    if (name === 'minCost') {
      if (rangeData?.length && val !== latestMax) {
        setAllErrors({ ...allErrors, min: 'Please enter valid minimum cost' });
      } else if (maxCost && val >= maxCost) {
        setAllErrors({
          ...allErrors,
          min: 'Minimum cost should be less than maximum cost'
        });
      } else {
        setAllErrors({ ...allErrors, min: '' });
      }
    } else if (name === 'maxCost') {
      if (val <= minCost) {
        setAllErrors({
          ...allErrors,
          max: 'Maxminm cost should be greater than minimum cost'
        });
      } else {
        setAllErrors({ ...allErrors, max: '' });
      }
    } else if (name === 'certificate') {
      if (rangeData?.length && val <= latestCertificate) {
        setAllErrors({
          ...allErrors,
          certificate: 'Certificate cost should be greater than previous one'
        });
      } else {
        setAllErrors({ ...allErrors, certificate: '' });
      }
    }
  };

  const handleRangeData = async () => {
    setLoading(true);
    await API('get', `/calculations/${props?.id}`)
      .then(res => {
        setRangeData(res?.data?.calculation?.range);
        setLoading(false);
      })
      .catch(err => {
        toaster('failed', t('Range calculations not found'), t('Error'));
        setLoading(false);
      });
  };
  const handleAddRange = async () => {
    handleRangeData();

    await API('put', `/calculations/addRange/${props.id}`, {
      range: {
        min: formState.values.minCost,
        max: formState.values.maxCost,
        certificate_cost: formState.values.certificate
      }
    })
      .then(res => {
        handleRangeData();
        setFormState(formState => ({
          ...formState,
          values: {
            minCost: '',
            maxCost: '',
            certificate: ''
          },
          isValid: false
        }));
        toaster('success', t('Range added successfully'), t('Adding Range'));
      })
      .catch(err => {
        toaster('failed', t('Something went wrong'), t('Adding Range'));
      });
  };

  const handleNewRange = async () => {
    await API('post', `/calculations/`, {
      country: props.CountryId,
      type: 'range',
      range: {
        min: formState.values.minCost,
        max: formState.values.maxCost,
        certificate_cost: formState.values.certificate
      }
    })
      .then(res => {
        props?.setOpenCalculationModal(false);
        props?.countryData();
        setFormState(formState => ({
          ...formState,
          values: {
            minCost: '',
            maxCost: '',
            certificate: ''
          },
          isValid: true
        }));

        toaster('success', t('Coefficient Added Successfully'), t('Adding Coefficient'));
      })
      .catch(err => {
        toaster('failed', t('Something went wrong'), t('Adding Coefficient'));
      });
  };
  const handleDeleteCalculation = async calId => {
    await API('put', `/calculations/deleteRange/${props?.id}`, {
      rangeId: calId
    })
      .then(res => {
        handleRangeData();
        setOpenModal(false);
        setRangeId('');
        toaster('success', t('Range Deleted successfully'), t('Delete Range'));
      })
      .catch(err => {
        toaster('failed', t('Something went wrong'), t('Delete Range'));
      });
  };
  const handleUpdateRange = async () => {
    await API('put', `/calculations/updateRange/${props?.id}`, {
      range: {
        max: rangeMaxCost,
        min: rangeMinCost,
        certificate_cost: rangeCertificat
      },
      rangeId: itemId
    })
      .then(res => {
        setEditModal(false);
        handleRangeData();
        toaster('success', t('Range updated successfully'), t('Updated Range'));
      })
      .catch(err => {
        toaster('failed', t('Something went wrong'), t('Updated Range'));
      });
  };

  const handleEditModalClose = () => setEditModal(false);
  const hasError = name => (allErrors[name] && allErrors[name] ? true : false);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        <div>
          {/* TABLE  */}
          {rangeData === undefined || rangeData?.length > 0 ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {TITLE.map(item => (
                      <TableCell
                        align="left"
                        className="country"
                        style={{ backgrounColor: '#EAECF0' }}>
                        {t(item.heading)} &nbsp;
                        {item.sortIcon && !sort.ascend && sort.key === item.key ? (
                          <img
                            className="sorting-icon"
                            onClick={() =>
                              getSortedData(
                                rangeData,
                                setRangeData,
                                setSort,
                                [],
                                'certificate_cost',
                                true
                              )
                            }
                            src={arrow_up}
                            alt=""
                          />
                        ) : (
                          item.sortIcon && (
                            <img
                              onClick={() =>
                                getSortedData(
                                  rangeData,
                                  setRangeData,
                                  setSort,
                                  [],
                                  'certificate_cost',
                                  false
                                )
                              }
                              src={downArrow}
                              alt=""
                            />
                          )
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rangeData?.map(item => (
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row" style={{ width: '20%' }}>
                        <p className="AP_plus_title">{`${item.min} ${
                          props.currency === 'USD' ? '$' : '€'
                        }`}</p>
                      </TableCell>
                      <TableCell align="left" className="country2" style={{ width: '20%' }}>
                        <p className="AP_plus_title">{`${item.max} ${
                          props.currency === 'USD' ? '$' : '€'
                        }`}</p>
                      </TableCell>
                      <TableCell align="left" className="country2">
                        <p className="AP_plus_title">{`${item.certificate_cost} ${
                          props.currency === 'USD' ? '$' : '€'
                        }`}</p>
                      </TableCell>
                      <TableCell align="left" className="country2">
                        <img
                          src={DeleteIcon}
                          alt=""
                          className="dltIcon"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            setOpenModal(true);
                            setRangeId(item._id);
                          }}
                        />

                        <img
                          src={EditIcon}
                          alt=""
                          className="dltIcon"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            setEditModal(true);
                            setItemId(item._id);
                            setRangeCertificat(item.certificate_cost);
                            setRangeMinCost(item.min);
                            setRangeMaxCost(item.max);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            ''
          )}
          <div className="AddSlice_main">
            <div className="AddSlice_senter">
              <h2 className="AddSlice_title">{t('Add a slice')}</h2>
              <div className="AddSlice_inputs_div">
                <div className="AddSlice_input_fields">
                  <FormControl fullWidth>
                    <InputField
                      label="Minimum"
                      isError={hasError('min')}
                      error={[t(allErrors.min)]}
                      value={formState.values.minCost}
                      name="minCost"
                      onChange={e => handleValuesChange(e)}
                      type="tel"
                      className="calculation_input"
                    />
                  </FormControl>
                </div>
                <div className="AddSlice_input_fields">
                  <FormControl fullWidth>
                    <InputField
                      label="Maximum"
                      isError={hasError('max')}
                      error={[t(allErrors.max)]}
                      value={formState.values.maxCost}
                      name="maxCost"
                      disabled={!formState.values.maxCost && allErrors.min}
                      onChange={e => handleValuesChange(e)}
                      className="calculation_input"
                    />
                  </FormControl>
                </div>
                <div className="AddSlice_input_fields">
                  <FormControl fullWidth>
                    <label htmlFor="" className="buyer_label">
                      {t('Cost certificate')}
                    </label>
                    <InputField
                      value={formState.values.certificate}
                      isError={hasError('certificate')}
                      error={[t(allErrors.certificate)]}
                      name="certificate"
                      onChange={e => handleValuesChange(e)}
                      className="calculation_input"
                    />
                  </FormControl>
                </div>
              </div>
              <button
                className={!formState.isValid ? 'AddSlice_button_disabled' : 'AddSlice_button'}
                onClick={props.Calculation ? handleAddRange : handleNewRange}
                disabled={!formState.isValid}>
                {t('Add line')}
              </button>
            </div>
          </div>
        </div>
        <ConfirmModal
          open={openModal}
          setOpen={setOpenModal}
          action={() => handleDeleteCalculation(rangeId)}
        />
        <Modal
          open={editModal}
          setOpen={setEditModal}
          title={t('Edit Range')}
          handleClose={handleEditModalClose}
          Closebtn={true}>
          <div>
            <FormControl fullWidth style={{ marginTop: '1rem' }}>
              <label htmlFor="" className="buyer_label">
                {t('Minimum')}
              </label>
              <InputField
                value={rangeMinCost}
                onChange={e => setRangeMinCost(e.target.value)}
                className="calculation_input"
              />
            </FormControl>
            <FormControl fullWidth style={{ marginTop: '1rem' }}>
              <label htmlFor="" className="buyer_label">
                {t('Maximum')}
              </label>
              <InputField
                value={rangeMaxCost}
                onChange={e => setRangeMaxCost(e.target.value)}
                className="calculation_input"
              />
            </FormControl>
            <FormControl fullWidth style={{ marginTop: '1rem' }}>
              <label htmlFor="" className="buyer_label">
                {t('Cost certificate')}
              </label>
              <InputField
                value={rangeCertificat}
                onChange={e => setRangeCertificat(e.target.value)}
                className="calculation_input"
              />
            </FormControl>
            <div style={{ marginTop: '2rem' }}>
              <Button
                text={t('Update')}
                className="bom_downloadFile_btn"
                onClick={handleUpdateRange}
              />
            </div>
          </div>
        </Modal>
      </>
    );
  }
};
export default CalculationRange;
