import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TitleDownArrow from '../../../../../assets/TitleDownArrow.svg';
import InputField from '../../../../../components/Common/InputField';
import API from '../../../../../api/index';
import { toast } from 'react-toastify';
import { validate } from 'validate.js';
import Modal from '../../../../../components/Common/Modal';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import EditIcon from '../../../../../assets/EditIcon.svg';
import Spinner from '../../../../../components/Common/Spinner';


const title = [
    { heading: 'Company Name', imgSrc: TitleDownArrow },
    { heading: 'Country' },
    { heading: 'E-mail address' },
    { heading: 'Telephone' },
    { heading: 'Address' },
    { heading: '' },
  ];

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
  


const LocationsTab = ({open, setOpen,userId, countries}) => {

    const [formState, setFormState] = useState({
        isValid: false,
        values: {companyName: '', firstName: '', lastName: '', country: '', email: '', telephone: '', address: '', zipcode: '', town: ''},
        errors: {},
        touched: {}
      });

      const [locations, setLocations] = useState([]);
      const [location, setLocation] = useState(null);
      const [loading, setLoading] = useState(false);
      const [isEdit, setIsEdit] = useState(false);
        
      useEffect(() => {
        fetchLocations();
      },[])
    
      useEffect(() => {
        const errors = validate(formState.values, schema);
        setFormState((formState) => ({
          ...formState,
          errors: errors ?? {},
          isValid: errors ? false : true
        }))
      }, [formState.values]);

      const fetchLocations = () => {
        setLoading(true);
        API('put', `/places/getByUser/${userId}`).then((res) => {
            setLocations(res.data.place);
            setLoading(false);
        }).catch((err) => {
            toast.error('Something went wrong');
            setLoading(false);
        })
      }
    
      const countryHandler = (e) => {
        setFormState((state) => ({
          ...state,
          values: {...state.values, country: e.target.value}
        }))
      };
    
      const handleChange = (e) => {
        const {name, value} = e.target;
        setFormState({...formState, values:{...formState.values, [name]: value}, touched: {...formState.touched, [name]: true}})
      }

      const handleOpenModal = (edit, item) => {
        setLocation(item);
        setIsEdit(edit);
        setOpen(true);

       if(item){
        const {company_name,
            email,
            country,
            city,
            phone_number,
            zipcode,
            address, contact_fname, contact_lname } = item;
            const values = {
                companyName: company_name,
                email,
                country: country ? country?._id : null,
                town: city,
                telephone: phone_number,
                zipcode,
                address,
                firstName: contact_fname,
                lastName: contact_lname
            }
            setFormState({...formState, values: {...values}})
       }
      }

      const handleCloseModal = () => {
        setOpen(false);
       setTimeout(() => {
        setIsEdit(false);
        resetForm();
        setLocation(null);
       }, 500)
      }
    
      const resetForm = () => {
        setFormState({
            isValid: false,
            values: {companyName: '', country: '', email: '', telephone: '', address: '', zipcode: '', town: '', firstName:'', lastName: ''},
            errors: {},
            touched: {}
        })
      }

      const createLocation = async (data) => {
        await API('post', '/places', data).then((res) => {
            toast.success('Inspection location addedd successfully!');
            setOpen(false);
            fetchLocations();
          }).catch(err => toast.success('Something went wrong!'));
      }

      const editLocation = async (data) => {
        await API('put', `/places/${location._id}`, data).then((res) => {
            toast.success('Inspection location updated successfully!');
            handleCloseModal();
            fetchLocations();
          }).catch(err => toast.success('Something went wrong!'));
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        const {companyName: company_name, email, country, town: city, telephone :phone_number, zipcode, address, firstName: contact_fname, lastName: contact_lname  } = formState.values;
        const data = {
          company_name,
          email,
          country,
          city,
          phone_number,
          zipcode,
          address,
          contact_fname,
          contact_lname,
          user: userId
        }

        if(isEdit){
          editLocation(data);
        }else {
          createLocation(data);
        }
      }

      const hasError = (field) => formState.touched[field] && formState.errors[field] ? true : false;

      const MODAL_TITLE = isEdit ? 'Edit inspection location' : location ? 'View inspection location' : 'Add inspection location'

  return (
    <>
        <div className="list_table">
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                {title.map((item) => {
                    return (
                    <TableCell
                        align="left"
                        className="country"
                        style={{ backgrounColor: '#EAECF0' }}
                    >
                        {item.heading} &nbsp;
                        <img src={item.imgSrc} alt="" className="title_arrow" />
                    </TableCell>
                    );
                })}
                </TableRow>
            </TableHead>
            <TableBody>
                {loading ? <Spinner /> : locations?.map((item) => (
                <TableRow
                    key={item._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleOpenModal(false, item) }
                >
                    <TableCell component="th" scope="row" >
                    <p className="AP_plus_title">{item.company_name} </p>
                    </TableCell>
                    <TableCell align="left" className="country2" >
                    {item?.country?.name}
                    <br />
                    </TableCell>
                    <TableCell align="left" className="country2" >
                    {item.email}
                    </TableCell>
                    <TableCell align="left" className="country2" >
                    {item.phone_number}
                    </TableCell>
                    <TableCell
                    align="left"
                    className="country2"
                    style={{ cursor: 'pointer' }}
                    
                    >
                    <p className="country2">{item.address}</p>
                    </TableCell>

                    <TableCell
                    align="left"
                    className="country2"
                    style={{ cursor: 'pointer' }}
                    >
                    <img
                                src={EditIcon}
                                alt=""
                                className="dltIcon"
                                style={{ cursor: 'pointer' }}
                                onClick={(e) => {
                                    e.stopPropagation(true);
                                    handleOpenModal(true, item)
                                }}
                            />
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        {/* table  */}
        </div>
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
              Company Name
            </label>
            <InputField
              className={
                hasError("companyName") && formState.errors.companyName
                  ? "input_email_red"
                  : "input_email"
              }
              disabled={!isEdit && location}
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
                disabled={!isEdit && location}
                name="country"
                defaultValue={formState.values.country}
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
                  disabled={!isEdit && location}
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
                  disabled={!isEdit && location}
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
                disabled={!isEdit && location}
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
                  disabled={!isEdit && location}
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
                  disabled={!isEdit && location}
                  onChange={(e) => handleChange(e)}
                  value={formState.values.town}
                  type="text" placeholder="Congo" />
              </div>
            </div>
          </div>
          <div className="luyer_input_field">
            <div className="second_input_field">
              <div className="input_fields">
                <label htmlFor="" className="buyer_label">
                  First Name
                </label>
                <InputField 
                  className={
                    hasError("firstName") && formState.errors.zipcode
                      ? "input_email_red"
                      : "input_email"
                  }
                  name='firstName'
                  disabled={!isEdit && location}
                  onChange={(e) => handleChange(e)}
                  value={formState.values.firstName}
                  type="text" placeholder="John" />
              </div>
              <div className="input_fields">
                <label htmlFor="" className="buyer_label">
                  Last Name
                </label>
                <InputField 
                  className={
                    hasError("lastName") && formState.errors.lastName
                      ? "input_email_red"
                      : "input_email"
                  }
                  name='lastName'
                  disabled={!isEdit && location}
                  onChange={(e) => handleChange(e)}
                  value={formState.values.lastName}
                  type="text" placeholder="Congo" />
              </div>
            </div>
          </div>
          {
            ((!isEdit && !location) || (isEdit && location)) && <button type='submit' onClick={(e => handleSubmit(e))} className="luyer_button">To Confirm</button>
          }
        </div>
      </Modal>
  </>
  )
}

export default LocationsTab