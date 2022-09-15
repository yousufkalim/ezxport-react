import React, { useState, useEffect } from 'react';
import PaginationPage from './Pagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DownArrow from '../../assets/TitleDownArrow.svg';
import DeleteIcon from '../../assets/DeleteIcon.svg';
import EditIcon from '../../assets/EditIcon.svg';
import API from '../../api/index';
import Modal from '../../components/Common/Modal';
import InputField from '../../components/Common/InputField';
import MultiSelect from '../../components/Common/MultiSelect';
import Button from '../Common/Button';
import { toast } from 'react-toastify';
import validate from 'validate.js';
import ConfirmModal from '../Common/ConfirmModal';

const schema = {
  code: {
    presence: { allowEmpty: false, message: 'is required' },
  },
};
const updateSchema = {
  bomCode: {
    presence: { allowEmpty: false, message: 'is required' },
  },
};

const AdminTab3 = (props) => {
  const [open, setOpen] = useState(false);
  const [names, setNames] = useState([]);
  const [data, setData] = useState({});
  const [id, setId] = useState();
  const [options, setOptions] = useState();
  const [select, setSelect] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [bomId, setBomId] = useState("");

  // const [bomCode, setBomCode] = useState("");
  const [newCertificate_status, setNewCertificate_status] = useState('default');
  const [certificate_status, setCertificate_status] = useState('');

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      code: '',
    },
    touched: {},
    errors: {},
  });
  const [updateBomCode, setUpdateBomCode] = useState({
    isValid: false,
    values: {
      bomCode: '',
    },
    touched: {},
    errors: {},
  });

  const hasError = (field) => (formState.touched[field] && formState.errors[field] ? true : false);

  const updateHasError = (field) =>
    updateBomCode.touched[field] && updateBomCode.errors[field] ? true : false;

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  useEffect(() => {
    const errors = validate(updateBomCode.values, updateSchema);
    setUpdateBomCode((updateBomCode) => ({
      ...updateBomCode,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [updateBomCode.values]);

  const handleChange = (event) => {
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };
  const handleUpdateBomChange = (event) => {
    setUpdateBomCode((updateBomCode) => ({
      ...updateBomCode,
      values: {
        ...updateBomCode.values,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...updateBomCode.touched,
        [event.target.name]: true,
      },
    }));
  };

  useEffect(() => {
    handleCoutries();
  }, []);
  const handleBomUpdate = async (BomId) => {
    await API('put', `/boms/${BomId}`, {
      code: updateBomCode.values.bomCode,
      certification_required: certificate_status,
      countries: id,
    })
      .then((res) => {
        console.log('handleBomUpdate', res);
        props.handleCountryData();
        setOpen(false);
        toast.success('BOMs updated successfully');
      })
      .catch((err) => {
        console.log('handleBomUpdate', err);
      });
  };

  const handleBomDelete = async (BomId) => {
    await API('delete', `/boms/${BomId}`)
      .then((res) => {
        console.log('handleBomDelete', res);
        props.handleCountryData();
        setBomId("");
        setOpenModal(false);
        toast.success('BOMs deleted successfully');
      })
      .catch((err) => {
        console.log('handleBomDelete', err);
      });
  };
  const handleClose = () => {
    setOpen(false);
    setSelect([]);
  };

  const handleCountryChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelect(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  const handleCoutries = async () => {
    await API('get', '/countries/')
      .then((res) => {
        let country_name = [];
        setOptions(res?.data?.countries);
        res.data.countries.map((item) => {
          country_name.push(item.name);
        });
        setNames(country_name);
      })
      .catch((err) => {
        console.log('handleCoutries', err);
      });
  };
  useEffect(() => {
    let ids = [];
    if (options?.length > 0 && select?.length > 0) {
      options?.map((item) => {
        select?.map((item2) => {
          if (item.name === item2) {
            ids.push(item._id);
          }
        });
      });
      setId(ids);
    }
  }, [select]);
  const handleEditBomClick = (bomcode) => {
    setOpen(true);
    setData(bomcode);
    setUpdateBomCode((updateBomCode) => ({
      ...updateBomCode,
      values: {
        ...updateBomCode.values,
        bomCode: bomcode.code,
      },
    }));
    setCertificate_status(bomcode.certification_required);
    let countries = [];
    options?.map((item) => {
      bomcode?.countries.map((item2) => {
        if (item._id === item2) {
          countries.push(item.name);
        }
      });
    });
    setSelect(countries);
  };
  const handleAddBom = async () => {
    await API('post', '/boms', {
      code: formState.values.code,
      certification_required: newCertificate_status,
      countries: id,
    })
      .then((res) => {
        console.log('handleAddBom', res);
        props.handleCountryData();
        props.setOpenAddBomModal(false);
        setFormState((formState) => ({
          ...formState,
          values: {
            ...formState.values,
            code: '',
            certificate_status: '',
            countries: '',
          },
          touched: {
            ...updateBomCode.touched,
            code: false,
            certificate_status: false,
            countries: false,
          },
        }));
        toast.success('BOMs added successfully');
      })
      .catch((err) => {
        console.log('handleAddBom', err);
      });
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#667085', backgroundColor: '#F9FAFB' }}>
                BOMs code <img src={DownArrow} alt="" />
              </TableCell>
              <TableCell sx={{ color: '#667085', backgroundColor: '#F9FAFB' }}>
                Status <img src={DownArrow} alt="" />
              </TableCell>

              <TableCell sx={{ color: '#667085', backgroundColor: '#F9FAFB' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => (
              <TableRow key={row.createData}>
                <TableCell
                  style={{ width: '20%' }}
                  component="th"
                  scope="row"
                  sx={{ padding: 2 }}
                  align="left"
                >
                  <p className="AP_plus_title">{row.code}</p>
                </TableCell>
                <TableCell component="th" scope="row" sx={{ padding: 2 }} align="left">
                  <p
                    style={{
                      background: '#ECFDF3',
                      borderRadius: '16px',
                      display: 'inline-block',
                      padding: '2px 5px',
                      color: '#027A48',
                    }}
                  ></p>
                  {row.certification_required === true ? (
                    <p
                      style={{
                        background: '#ECFDF3',
                        borderRadius: '16px',
                        display: 'inline-block',
                        padding: '2px 5px',
                        color: '#027A48',
                      }}
                    >
                      Subject to inspection
                    </p>
                  ) : (
                    <p
                      style={{
                        background: '#FFFAEB',
                        borderRadius: '16px',
                        display: 'inline-block',
                        padding: '2px 5px',
                        color: '#B54708',
                      }}
                    >
                      Not subject
                    </p>
                  )}
                </TableCell>
                <TableCell align="left" className="country2">
                  <img
                    src={DeleteIcon}
                    alt=""
                    className="dltIcon"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setBomId(row._id);
                      setOpenModal(true);
                    }}
                  />

                  <img
                    src={EditIcon}
                    alt=""
                    className="dltIcon"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      handleEditBomClick(row);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationPage />

      <ConfirmModal open={openModal} setOpen={setOpenModal} action={() => handleBomDelete(bomId)} />

      {/* update modal */}
      <Modal
        open={open}
        setOpen={setOpen}
        title="Update BOMs"
        handleClose={handleClose}
        Closebtn={true}
      >
        <div style={{ height: '20%' }}>
          <label htmlFor="" className="label_modal">
            BOMs code
          </label>{' '}
          <InputField
            name="bomCode"
            value={updateBomCode.values.bomCode}
            className={
              updateHasError('bomCode') && updateBomCode.errors.bomCode
                ? 'textfield_addvendor_red'
                : 'textfield_addvendor'
            }
            onChange={handleUpdateBomChange}
          />
          <div className="error-format">
            {updateHasError('bomCode') ? updateBomCode.errors.bomCode[0] : null}
          </div>
          <label htmlFor="" className="label_modal">
            Status
          </label>{' '}
          <select
            defaultValue={certificate_status}
            name="certificate_status"
            className="textfield_addvendor"
            onChange={(e) => setCertificate_status(e.target.value)}
          >
            <option value={false}>Not subject</option>
            <option value={true}>Subject to inspection</option>
          </select>
          <label htmlFor="" className="label_modal">
            Select country for BOMs
          </label>
          <MultiSelect
            name="countries"
            onChange={handleCountryChange}
            value={select}
            names={names}
            select={select}
          />
          <Button
            text="Update BOM"
            className={
              updateBomCode.isValid && select.length > 0
                ? 'add_vendor_button'
                : 'add_vendor_button_disabled'
            }
            disabled={!updateBomCode.isValid || select.length < 1 ? true : false}
            onClick={() => handleBomUpdate(data._id)}
          />
        </div>
      </Modal>
      {/* Add modal */}
      <Modal
        open={props.openAddBomModal}
        setOpen={props.setOpenAddBomModal}
        title="Add BOMs"
        handleClose={props.handleAddBomModalClose}
        Closebtn={true}
      >
        <div style={{ height: '20%' }}>
          <label htmlFor="" className="label_modal">
            BOMs code
          </label>{' '}
          <InputField
            name="code"
            value={formState.values.code}
            className={
              hasError('code') && formState.errors.code
                ? 'textfield_addvendor_red'
                : 'textfield_addvendor'
            }
            onChange={handleChange}
          />
          <div className="error-format">{hasError('code') ? formState.errors.code[0] : null}</div>
          <label htmlFor="" className="label_modal">
            Status
          </label>{' '}
          <select
            defaultValue={newCertificate_status}
            name="certificate_status"
            className="textfield_addvendor"
            onChange={(e) => setNewCertificate_status(e.target.value)}
          >
            <option disabled value={'default'}>
              Select an Option
            </option>
            <option value={false}>Not subject</option>
            <option value={true}>Subject to inspection</option>
          </select>
          <label htmlFor="" className="label_modal">
            Select country for BOMs
          </label>
          <MultiSelect
            name="countries"
            onChange={handleCountryChange}
            value={select}
            names={names}
            select={select}
          />
          <Button
            text="Add BOMs"
            className={
              formState.isValid && select.length > 0 && newCertificate_status != 'default'
                ? 'add_vendor_button'
                : 'add_vendor_button_disabled'
            }
            onClick={handleAddBom}
            disabled={
              !formState.isValid || select.length < 1 || newCertificate_status === 'default'
                ? true
                : false
            }
          />
        </div>
      </Modal>
    </>
  );
};

export default AdminTab3;
