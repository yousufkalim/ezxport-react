import React, { useState, useEffect, Fragment } from 'react';
import Inputfield from '../../../components/Common/InputField';
import Button from '../../../components/Common/Button';
import Autocomplete from '../../../components/Common/Autocomplete';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
import DeleteIcon from '../../../assets/DeleteIcon.svg';
import EditIcon from '../../../assets/EditIcon.svg';
import Modal from '../../../components/Common/Modal';
import { ReactComponent as Featured1 } from '../../../assets/Featured1.svg';
import InputField from '../../../components/Common/InputField';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import { ReactComponent as Featured } from '../../../assets/Featured.svg';
import API from '../../../api/index';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Link, useHistory } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import ConfirmModal from '../../../components/Common/ConfirmModal';
import { Store } from '../../../StoreContext';
import { useTranslation } from 'react-i18next';
import toaster from '../../../utils/toaster';
import { ButtonBase } from '@mui/material';

const user = JSON.parse(localStorage.getItem('userData'));
const BOMsForm = props => {
  const {
    step1,
    setStep1,
    allCodes,
    setAllCodes,
    currency,
    setRetrieveRequestId,
    certificationCostOfCode
  } = props;

  const history = useHistory(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [code, setCode] = useState('default');
  const [monetaryValue, setMonetaryValue] = useState('');
  const [requestByCountry, setRequestByCountry] = useState([]);
  const [editModalData, setEditModalData] = useState({});
  const [importedFile, setImportedFile] = useState();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [bomId, setBomId] = useState('');
  const [bomIndex, setBomIndex] = useState('');
  const [adminCodes, setAdminCodes] = useState(null);
  const { request, pastRequest } = Store();

  useEffect(() => {
    if (pastRequest) {
      getSetData();
    }
  }, [request]);

  const getSetData = () => {
    const { country, codes } = request;
    const countryId = country?._id;
    const matched = getMatchedCodes(codes);
    setStep1({ ...step1, country: countryId });
    setAllCodes(matched);
  };

  const getMatchedCodes = codes => {
    const newCodes = [];
    codes?.forEach(item => {
      const { monetary_value } = item;
      const { code, _id: codeID, certification_required, admin_code } = item.code;

      const codeObj = {
        monetary_value,
        admin_code,
        code,
        codeID,
        certification_required
      };
      newCodes.push(codeObj);
    });
    return newCodes;
  };

  const { t } = useTranslation();

  const handleAllRequestByCountryId = async () => {
    await API('get', `/requests/getByCountryandUserId/${step1.country}/${step1?.user}`)
      .then(res => {
        let filteredRequests = res?.data?.requests?.filter(item => item.status !== 'Draft');
        setRequestByCountry(filteredRequests);
      })
      .catch(err => toaster('Failed', t(err.response.data.message)));
  };

  useEffect(() => {
    if (step1?.country !== '') {
      setAdminCodes(null);
      handleAllRequestByCountryId();
      getBomByCountryId();
      handleTitle(step1.country);
    }

    return;
  }, [step1?.country]);

  const handleEditModal = () => setOpenEditModal(false);
  const handleCertificateRequire = () => props.setCertificateRequire(false);
  const handleCertificateNotRequire = () => props.setCertificateNotRequire(false);
  const handleGetAllCountry = async () => {
    await API('get', '/countries/all')
      .then(res => {
        props.setCounteries(res.data.countries);
      })

      .catch(err => toaster('Failed', t(err.response.data.message), 'Countries'));
  };
  useEffect(() => {
    handleGetAllCountry();
  }, []);

  const handleAddCodes = () => {
    const obj = {
      admin_code: code.admin_code,
      code: code?.code,
      codeID: code?._id,
      monetary_value: monetaryValue || '--',
      certification_required: code?.certification_required
    };
    const filtered = adminCodes?.filter(item => {
      return item?._id !== code?._id;
    });

    setAllCodes([...allCodes, obj]);
    setAdminCodes(filtered);
    setMonetaryValue('');
    setCode('default');
  };
  const handleDocument = async file => {
    var filename = file.name.split('.').pop();
    if (filename === 'xlsx') {
      setLoading(true);
      setImportedFile(file);
      let formData = new FormData();
      formData.append('file', file);
      formData.append('country', `${step1.country}`);
      await API('post', '/boms/filterCodes', formData)
        .then(res => {
          setLoading(false);
          let arr1 = [];
          let arr2 = [];
          res?.data?.matchedData.map(item => {
            arr1.push({
              admin_code: item.bom.admin_code,
              code: item?.bom?.code,
              codeID: item?.bom?._id,
              monetary_value: monetaryValue || item?.monetary_value,
              certification_required: item.bom?.certification_required
            });
          });

          res?.data?.unMatched.map(item => {
            arr2.push({
              admin_code: item.bom.admin_code,
              code: item?.bom?.code,
              codeID: item?.bom?._id,
              monetary_value: monetaryValue || item?.monetary_value,
              certification_required: item.bom?.certification_required
            });
          });
          setAllCodes([...allCodes, ...arr1, ...arr2]);
        })
        .catch(err => {
          setLoading(false);
          toaster('Failed', t(err?.response?.data?.message), 'Codes');
          setImportedFile('');
        });
    } else {
      toaster('Failed', t('Can only upload Excel sheet'));
      setLoading(false);
      setImportedFile('');
    }
  };

  const handleDelete = (code, bomIndex) => {
    const codes = [...allCodes];
    const findCode = codes?.find((item, index) => index === bomIndex);
    const adminCode = {
      admin_code: findCode?.admin_code,
      certification_required: findCode?.certification_required,
      code: findCode?.code,
      _id: findCode?.codeID
    };
    let filtered = codes.filter((item, index1) => {
      return index1 !== bomIndex;
    });

    const isCodeExist = adminCodes.find(item => item.code === findCode?.code);

    if (findCode && findCode.certification_required && !pastRequest && !isCodeExist) {
      setAdminCodes([...adminCodes, adminCode]);
    }
    setAllCodes(filtered);
    setOpenModal(false);
  };

  const handleTitle = async () => {
    await API('post', '/requests/createName', {
      userId: user?._id,
      countryId: step1?.country
    })
      .then(res => {
        props.handleChange('title', t(res?.data?.tile).toUpperCase());
        props.setValidateBom(true);
      })

      .catch(err => {
        toaster('Failed', t(err.response.data.message));
        props.setValidateBom(false);
      });
  };
  const handleSearchTitle = async () => {
    await API('post', '/requests/searchName/', {
      title: step1?.title
    })
      .then(res => {})
      .catch(err =>
        toaster('Failed', t(err.response.data.message?.msg) || t(err.response.data.message))
      );
  };
  const handleMonetaryValue = value => {
    const [int, decimal] = value.split('.');

    if (decimal?.length > 2) {
      setMonetaryValue(`${int}.${decimal.slice(0, 2)}`);
      return;
    }

    setMonetaryValue(value);
  };
  const handleEditModaldata = value => {
    const [int, decimal] = value.split('.');

    if (decimal?.length > 2) {
      value = `${int}.${decimal.slice(0, 2)}`;
    }

    if (value === '0') {
      if (editModalData?.item?.monetary_value !== '') {
        setEditModalData(prev => {
          prev.item.monetary_value = value;
          return { ...prev };
        });
      }
    } else {
      setEditModalData(prev => {
        prev.item.monetary_value = value;
        return { ...prev };
      });
    }
  };
  const getBomByCountryId = async () => {
    await API('get', `/boms/getByCountryId/${step1.country}`)
      .then(res => {
        setAdminCodes(res?.data?.bom);
      })
      .catch(err => {
        toaster('failed', t('BOM not found'), "BOM's");
      });
  };

  return (
    <div>
      <div className="mandatory_field_tips">
        <span className="required">{t('Mandatory field')}</span>
      </div>

      <div style={{ width: '100%' }}>
        <label className="BomLabel required">{t('Country')}</label>
        {props?.countries ? (
          <Select
            name="country"
            id="demo-simple-select"
            value={step1?.country || 'default'}
            onChange={e => {
              props?.handleChange(e.target.name, e.target.value);
            }}
            className="countrydropdown">
            <MenuItem disabled value="default">
              {t('Select a Country')}
            </MenuItem>
            {props?.countries?.map(item => {
              return (
                <MenuItem key={item?._id} value={item?._id}>
                  {item?.name}
                </MenuItem>
              );
            })}
          </Select>
        ) : (
          <CircularProgress color="secondary" size="2em" />
        )}

        {step1?.country ? (
          <Fragment>
            <label className="BomLabel required">
              {t('Create a new request or select an old request to retrieve information')}
            </label>
            <Select
              id="demo-simple-select"
              defaultValue={'default'}
              onChange={e => {
                setRetrieveRequestId(e.target.value);
              }}
              className="countrydropdown">
              <MenuItem value="default">{t('Create a new Request')}</MenuItem>
              {requestByCountry?.map(item => {
                return <MenuItem value={item?._id}>{item?.title}</MenuItem>;
              })}
            </Select>
            <label className="BomLabel required">{t('Application title')}</label>
            <Inputfield
              style={{ width: '100%' }}
              name="title"
              placeholder={t('Application title')}
              className="applicationTitle2"
              onChange={e => {
                props.handleChange(e.target.name, e.target.value);
              }}
              onBlur={handleSearchTitle}
              value={step1.title}
            />
            <div className="ProductList_boms">
              <div style={{ textAlign: 'center' }}>
                <span className="title_productList">{t('Product Lists')}</span>
                <br />
                <br />
                <Link
                  to={{ pathname: 'https://www.tarifdouanier.eu/' }}
                  target="_blank"
                  className="download_text">
                  {t("You don't know your product nomenclatures?")}
                </Link>
                <br />
                <br />
              </div>
            </div>

            <Fragment>
              <div
                className="section_code_import file_code_import"
                style={{
                  textAlign: 'center'
                }}>
                <span className="choice_title required">{t('Import from an excel list file')}</span>

                <div
                  style={{
                    marginRight: '7px'
                  }}>
                  {loading ? <CircularProgress color="secondary" /> : ''}
                </div>
                <Link
                  to={'/Files/codeTemplate.xlsx'}
                  target="_blank"
                  className="download_text"
                  download>
                  1. {t('Download XLS file')}
                </Link>
                <br />
                <br />
                <label className="import_Btn" htmlFor="file">
                  2. {t(importedFile?.name || 'Import an XLS file')}
                  <input
                    onClick={event => {
                      event.target.value = null;
                    }}
                    type="file"
                    style={{ display: 'none' }}
                    id="file"
                    onChange={e => handleDocument(e.target.files[0])}
                  />
                </label>
              </div>
            </Fragment>
            <div className="choice_or">Ou</div>
            <Fragment>
              <div
                className="section_code_import manually_code_import"
                style={{
                  textAlign: 'center'
                }}>
                <span className="choice_title required">
                  {t('Fill manually from existing codes')}
                </span>
                <div className="add_code_div">
                  <div className="codedropdown_div">
                    <label className="BomLabel">Code</label>
                    {adminCodes ? (
                      <Autocomplete
                        options={adminCodes.map(adminCode => adminCode)}
                        getOptionLabel={option => option.code}
                        onChange={(_, newValue) => {
                          setCode(newValue);
                        }}
                        placeholder={t('Select a Code')}
                      />
                    ) : (
                      <CircularProgress color="secondary" size="2em" />
                    )}
                  </div>
                  <div className="codedropdown_div">
                    <label className="BomLabel required">{t('Monetary value')}</label>
                    <Inputfield
                      value={monetaryValue}
                      className="applicationTitle"
                      onChange={e => handleMonetaryValue(e.target.value)}
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="codedropdown_div1">
                    <Button
                      text={t('To add')}
                      className={code === 'default' ? 'to_add_btn_disabled' : 'to_add_btn'}
                      onClick={handleAddCodes}
                      disabled={code === 'default' || !monetaryValue ? true : false}
                    />
                  </div>
                </div>
              </div>
            </Fragment>
          </Fragment>
        ) : null}
      </div>

      {step1?.country ? (
        <Fragment>
          <br />
          {allCodes?.length === 0 ? (
            ''
          ) : (
            <Fragment>
              <div className="ProductList_boms">
                <div style={{ textAlign: 'center' }}>
                  <span className="title_productList">{t('Summary')}</span>
                </div>
              </div>
              <TableContainer component={Paper} style={{ width: '100%', marginTop: '2%' }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" className="country">
                        {t('Code')}
                      </TableCell>
                      <TableCell align="center" className="country">
                        {t('Monetary value')}
                      </TableCell>

                      <TableCell align="center" className="country">
                        {t('Actions')}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allCodes?.map((item, index) => {
                      return (
                        <TableRow
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          key={index}>
                          <TableCell align="center" style={{ width: '20%' }}>
                            <p
                              className="AP_plus_title"
                              style={{ color: item?.certification_required === false && 'red' }}>
                              {item?.code}
                            </p>
                          </TableCell>

                          <TableCell align="center" className="country2" style={{ width: '20%' }}>
                            <p
                              className="AP_plus_title"
                              style={{ color: item?.certification_required === false && 'red' }}>
                              {item?.monetary_value}
                            </p>
                          </TableCell>

                          <TableCell align="center" className="country2">
                            <img
                              src={DeleteIcon}
                              alt=""
                              className="dltIcon"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                setOpenModal(true);
                                setBomId(item);
                                setBomIndex(index);
                              }}
                            />
                            <img
                              src={EditIcon}
                              alt=""
                              className="dltIcon"
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                setOpenEditModal(true);
                                setEditModalData({ item: { ...item }, index });
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Fragment>
          )}
        </Fragment>
      ) : null}

      {/* EDIT CODE MODAL */}
      <Modal
        open={openEditModal}
        setOpen={setOpenEditModal}
        title={t('Modify BOM')}
        handleClose={handleEditModal}
        Closebtn={true}>
        <div>
          <div style={{ marginTop: '2.2rem' }}>
            <label className="BomLabel">Code</label>
            <InputField
              className="code_textfield"
              value={editModalData?.item?.code}
              disabled={true}
            />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label className="BomLabel">{t('Monetary value')}</label>
            <Inputfield
              value={editModalData?.item?.monetary_value}
              className="monetary_value"
              onChange={e => handleEditModaldata(e.target.value)}
              type="number"
              step="0.01"
              placeholder="0.00"
            />
          </div>
          <Button
            text="To Confirm"
            className="to_confirm_btn"
            onClick={() => {
              setAllCodes(prev => {
                prev[editModalData.index].monetary_value = editModalData?.item?.monetary_value;
                return [...prev];
              });
              setOpenEditModal(false);
            }}
          />
        </div>
      </Modal>

      <ConfirmModal
        open={openModal}
        setOpen={setOpenModal}
        action={() => handleDelete(bomId, bomIndex)}
      />
      {/* CERTIFICATION REQUIRED MODAL */}
      <Modal
        open={props.certificateRequire}
        setOpen={props.setCertificateRequire}
        handleClose={handleCertificateRequire}>
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              marginTop: '1rem',
              marginBottom: '1rem'
            }}>
            <div className="space">
              <Logo />
            </div>
            <div className="space">
              <Featured />
            </div>

            <div className="space">
              {t('Those products for')} &nbsp;
              <span className="bold_text_in_modal">
                {props.certificationCountryOfCode} {t('require a certification')}
              </span>
            </div>
            <div className="space">
              {t('The cost of this certification is up to')}
              &nbsp;
              <span style={{ fontWeight: 900, fontSize: '19px' }}>
                {parseInt(certificationCostOfCode) - 50} {currency === 'USD' ? '$' : 'Є'}/HT
              </span>
            </div>
          </div>
          <Button
            text={t('Continue my request on Ezxport')}
            className="to_confirm_btn"
            onClick={props.handleStep1}
          />
          <Button
            text={t('Go back to my request')}
            className="delete_bom_btn"
            onClick={handleCertificateRequire}
          />
        </div>
      </Modal>
      <Modal
        open={props.certificateNotRequire}
        setOpen={props.setCertificateNotRequire}
        handleClose={handleCertificateNotRequire}>
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              marginTop: '1rem',
              marginBottom: '1rem'
            }}>
            <div className="space">
              <Logo />
            </div>
            <div className="space">
              <Featured1 />
            </div>

            <div className="space">
              {t('Those products for')} &nbsp;
              <span className="bold_text_in_modal">
                {props.certificationCountryOfCode} {t('do not require a certification')}
              </span>
            </div>
            <div className="space" style={{ textAlign: 'center' }}>
              {t('You can therefore send your goods without going through an organization.')}
            </div>
          </div>
          <Button
            text={t('Make another request')}
            className="to_confirm_btn"
            onClick={() => history.push('/User/Dashboard/ListOfRequests')}
          />
          <Button
            text={t('Go back to my request')}
            className="delete_bom_btn"
            onClick={handleCertificateNotRequire}
          />
        </div>
      </Modal>
    </div>
  );
};

export default BOMsForm;
