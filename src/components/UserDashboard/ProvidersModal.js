import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import ClearIcon from '@mui/icons-material/Clear';
import FormControl from '@mui/material/FormControl';
import MultiSelect from '../../components/Common/MultiSelect';
import API from '../../api/index';
import { toast } from 'react-toastify';

const ProvidersModal = ({ open, setOpen, data, getProviders, isEdit }) => {
  const [formData, setFormData] = useState({firstName: '',lastName: '', email: '', countries: [] });
  const [allCountries, setAllCountries] = useState([]);
  const [countryNames, setCountryNames] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, [])

  useEffect(() => {
    if(data){
      const count = data?.countries?.map(item => allCountries.find(country => country?._id === item)).map(c => c?.name);
      const splitName = data?.name?.split(' ');
      setFormData({firstName: splitName[0], lastName: splitName[1], email: data?.sending_email, countries: count});
    }
  }, [data])

  const fetchCountries = async () => {
    await API('get', '/countries')
      .then((res) => {
        let country_name = [];
        setAllCountries(res?.data?.countries);
        res?.data?.countries?.map((item) => {
          country_name.push(item.name);
        });
        setCountryNames(country_name);
      })
      .catch((err) => {
        toast.error('Something went wrong!');
      });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    const {value, name} = e.target
    setFormData({...formData, [name]: value});
  };

  const handleChangeCountry = (e) => {
    const {
        target: { value },
      } = e;

      setFormData({...formData, countries: typeof value === 'string' ? value.split(',') : value })
  }

  const trimName = (item) => {
    return item.trim();
  }

  const getEditData = () => {
    const {firstName,lastName, email, countries} = formData;
    const {contact_email, phone_number} = data;
    const countryIds = countries?.map((item) => allCountries.find(el => el.name === item )).map((country) => country._id);
    const fname = trimName(firstName);
    const lname = trimName(lastName);
    const name = fname.concat(` ${lname}`);
    const obj = {
        name,
        countries: countryIds,
        sending_email:email,
        contact_email: contact_email,
        phone_number: phone_number

    }

    return obj;
  }

  const editProvider = async (e) => {
    e.preventDefault();
    const editData = getEditData();
    await API('put', `/vendors/${data._id}`, editData).then((res) => {
        toast.success('Servive Provider updated Successfully');
        getProviders();
        setOpen(false);
    }).catch(err => {
        toast.error('Something went wrong!');
    });
  }

  return (
    <>
      <div className="ApPlus_popup">
        <Dialog open={open} onClose={handleClose} fullWidth>
          <div className="ApPlus_popup_form">
            <div className="ApPlus_popup_ha">
              <h3 className="ApPlus_popup_h2">AP Plus</h3>
              <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
            </div>
            {/* inputs  */}
            <div className="buyer_socond">
              <div className="luyer_input_field">
                <FormControl fullWidth>
                  <label htmlFor="" className="buyer_label">
                    Associated countries
                  </label>
                  <MultiSelect
                    disabled={!isEdit}
                    name="country"
                    onChange={handleChangeCountry}
                    value={formData.countries}
                    names={countryNames}
                    select={formData.countries}
                />
                </FormControl>
              </div>
              <div className="luyer_input_field">
                <div className="second_input_field">
                  <div className="input_fields">
                    <label htmlFor="" className="buyer_label">
                      First Name
                    </label>
                    <input disabled={!isEdit} name="firstName" onChange={(e) => handleChange(e)} value={formData.firstName} type="text" className="buyer_input" placeholder="First name" />
                  </div>
                  <div className="input_fields">
                    <label htmlFor="" className="buyer_label">
                        Last Name
                    </label>
                    <input disabled={!isEdit} name="lastName" onChange={(e) => handleChange(e)} value={formData.lastName} type="text" className="buyer_input" placeholder="First name" />
                  </div>
                </div>
                    <div className="luyer_input_field">
                        <label htmlFor="" className="buyer_label">
                            E-mail address
                        </label>
                        <input disabled={!isEdit} name="email" onChange={(e) => handleChange(e)} value={formData.email} type="email" className="buyer_input" placeholder="E-mail address" />
                    </div>
                
              </div>
              {isEdit && <button onClick={(e) => editProvider(e)} className="luyer_button">To Confirm</button> }
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default ProvidersModal;
