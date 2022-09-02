import React, { useEffect, useState } from 'react';
import DownArrow from '../../assets/TitleDownArrow.svg';
import Button from '../../components/Common/Button';
import SearchField from '../../components/Common/SearchField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PlusIcon from '../../assets/PlusIcon.svg';
import PaginationPage from '../../components/AdminDashboard/Pagination';
import API from '../../api/index';
import Modal from '../../components/Common/Modal';
import { toast } from 'react-toastify';
import InputField from '../../components/Common/InputField';
import MultiSelect from '../../components/Common/MultiSelect';
import { Link, useHistory } from 'react-router-dom';
import validate from 'validate.js';
const schema = {
  fullname: {
    presence: { allowEmpty: false, message: 'is required' },
    length: { minimum: 2 },
  },
  phone_Number: {
    presence: { allowEmpty: false, message: 'is required' },
    length: { minimum: 10, maximum: 10 },
  },
  sendingEmail: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64,
    },
  },
  contactEmail: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64,
    },
  },
};

const ServiceProviders = () => {
  const history = useHistory(null);
  const [open, setOpen] = useState(false);
  const [names, setNames] = useState([]);
  const [vendors, setVendors] = useState();
  const [id, setId] = useState();
  const [options, setOptions] = useState();
  const [select, setSelect] = useState([]);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      fullname: '',
      phone_Number: '',
      sendingEmail: '',
      contactEmail: '',
    },
    touched: {},
    errors: {},
  });
  // useEffect for invoking func
  useEffect(() => {
    handleServiceProvider();
    handleCoutries();
  }, [open]);
  // getting ids against names of country selected by the user
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
    console.log(ids, 'ids');
  }, [select]);

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  // getting all service providers in database
  const handleServiceProvider = async () => {
    await API('get', '/vendors/')
      .then((res) => {
        setVendors(res?.data?.vendor);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClose = () => setOpen(false);
  // adding service providers in database
  const handleAddVendor = async () => {
    await API('post', '/vendors/', {
      phone_number: formState.values.phone_Number,
      name: formState.values.fullname,
      sending_email: formState.values.sendingEmail,
      contact_email: formState.values.contactEmail,
      countries: id,
    })
      .then((res) => {
        console.log('RESSS', res);
        setOpen(false);
        toast.success('Vendor added Successfully');
      })
      .catch((err) => {
        console.log('ERRRR', err);
        toast.error(err.response.data.message);
      });
  };
  // setting data of multiSelect in  state
  const handleMultiSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelect(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  // getting Countries names from database
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
        console.log('errrrr', err);
      });
  };
  // setting data of modal in state
  // const handleModalData = (name, value) => {
  //   setAddVendor({ ...addVendor, [name]: value });
  // };
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

  const handlePhnChange = (event) => {
    if (!event.target.value.match(/[^0-9]/)) {
      console.log('=====>', event.target.value);
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
    }
  };

  const hasError = (field) => (formState.touched[field] && formState.errors[field] ? true : false);
  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          {/* list head  */}
          <div className="List_heading_div">
            <h1 className="list_h1">Service providers</h1>
            <div className="searching3">
              <SearchField placeholder="Searching" />
              <Button
                className="list_reqst_btn2"
                text={'Add a service provider'}
                Imgsrc={PlusIcon}
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
          {/* list table   */}
          <div className="list_table">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#667085', backgroundColor: '#F9FAFB' }}>
                      Prestataire <img src={DownArrow} alt="" />
                    </TableCell>
                    <TableCell sx={{ color: '#667085', backgroundColor: '#F9FAFB' }}>
                      Pays associés &nbsp;
                      <img src={DownArrow} alt="" />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vendors?.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell
                        onClick={() => {
                          history.push(`/Admin/Dashboard/ServiceProvider/nameProvider/${item._id}`);
                        }}
                        component="th"
                        scope="row"
                        sx={{
                          border: '1px solid #E5E5E5;',
                          padding: 2,
                          cursor: 'pointer',
                        }}
                      >
                        <p className="AP_plus_title">{item.name}</p>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          border: '1px solid #E5E5E5;',
                          padding: 2,
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          history.push(`/Admin/Dashboard/ServiceProvider/nameProvider/${item._id}`);
                        }}
                      >
                        {item.countries.map((country) => {
                          return <p className="AP_plus_title">{country.name}</p>;
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <PaginationPage />
          </div>
        </div>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        title="Add a Service Provider"
        handleClose={handleClose}
        Closebtn={true}
      >
        <div className="add_vendor_div">
          <label htmlFor="" className="label_modal">
            Full Name
          </label>{' '}
          <InputField
            name="fullname"
            className={
              hasError('fullname') && formState.errors.fullname
                ? 'textfield_addvendor_red'
                : 'textfield_addvendor'
            }
            value={formState.values.fullname}
            onChange={handleChange}
          />
          <div className="error-format">
            {hasError('fullname') ? formState.errors.fullname[0] : null}
          </div>
          <label htmlFor="" className="label_modal">
            Phone Number
          </label>{' '}
          <InputField
            name="phone_Number"
            value={formState.values.phone_Number}
            type="string"
            className={
              hasError('phone_Number') && formState.errors.phone_Number
                ? 'textfield_addvendor_red'
                : 'textfield_addvendor'
            }
            onChange={handlePhnChange}
          />
          <div className="error-format">
            {hasError('phone_Number') ? formState.errors.phone_Number[0] : null}
          </div>
          <label htmlFor="" className="label_modal">
            Contact
          </label>{' '}
          <InputField
            name="contactEmail"
            className={
              hasError('contactEmail') && formState.errors.contactEmail
                ? 'textfield_addvendor_red'
                : 'textfield_addvendor'
            }
            onChange={handleChange}
            value={formState.values.contactEmail}
          />
          <div className="error-format">
            {hasError('contactEmail') ? formState.errors.contactEmail[0] : null}
          </div>
          <label htmlFor="" className="label_modal">
            Default sending Email address
          </label>
          <InputField
            name="sendingEmail"
            className={
              hasError('sendingEmail') && formState.errors.sendingEmail
                ? 'textfield_addvendor_red'
                : 'textfield_addvendor'
            }
            onChange={handleChange}
            value={formState.values.sendingEmail}
          />
          <div className="error-format">
            {hasError('sendingEmail') ? formState.errors.sendingEmail[0] : null}
          </div>
          <label htmlFor="" className="label_modal">
            Select country to add
          </label>
          <MultiSelect
            name="country"
            onChange={handleMultiSelectChange}
            value={select}
            names={names}
            select={select}
          />
          {/* {console.log("===", select)} */}
          <Button
            text="Add Service Provider"
            className={
              formState.isValid && select.length > 0
                ? 'add_vendor_button'
                : 'add_vendor_button_disabled'
            }
            onClick={handleAddVendor}
            disabled={!formState.isValid || select.length < 1 ? true : false}
          />
          {console.log('selc', select.length)}
          {console.log('selc', !formState.isValid)}
        </div>
      </Modal>
    </>
  );
};

export default ServiceProviders;
