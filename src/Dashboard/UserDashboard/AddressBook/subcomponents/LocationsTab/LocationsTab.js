import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TitleDownArrow from "../../../../../assets/TitleDownArrow.svg";
import InputField from "../../../../../components/Common/InputField";
import API from "../../../../../api/index";
import { validate } from "validate.js";
import Modal from "../../../../../components/Common/Modal";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import EditIcon from "../../../../../assets/EditIcon.svg";
import Spinner from "../../../../../components/Common/Spinner";
import Button from "../../../../../components/Common/Button";
import downArrow from "../../../../../assets/TitleDownArrow.svg";
import arrow_up from "../../../../../assets/arrow_up.svg";
import { getSortedData } from "../../../../../lib/getSortedData";
import { COUNTRIES } from "../../../../../lib/data";
import { createFilter } from "react-search-input";
import toaster from "../../../../../utils/toaster";


const title = [
  { heading: "Company name", sortIcon: true, key: "company_name", imgSrc: TitleDownArrow },
  { heading: "Country" },
  { heading: "E-mail address" },
  { heading: "Telephone" },
  { heading: "Address" },
  { heading: "" },
];

const KEYS_TO_FILTERS = ['company_name'];

const schema = {
  companyName: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },
  email: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 64 },
    email: true,
  },
  country: {
    presence: { allowEmpty: false, message: "is required" },
  },
  telephone: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 10, minimum: 10 },
  },
  address: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 124,
    },
  },
  zipcode: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 5,
      minimum: 5,
    },
  },
  town: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },
  lastName: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 64 },
  },
  firstName: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 64 },
  },
};

const LocationsTab = ({ t, open, setOpen, userId, countries, searchTerm }) => {
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      companyName: "",
      firstName: "",
      lastName: "",
      country: "",
      email: "",
      telephone: "",
      address: "",
      zipcode: "",
      town: "",
    },
    errors: {},
    touched: {},
  });

  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [sort, setSort] = useState({ key: "", ascend: true });

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values, setFormState]);

  const fetchLocations = () => {
    setLoading(true);
    API("put", `/places/getByUser/${userId}`)
      .then((res) => {
        setLocations(res.data.place);
        setLoading(false);
      })
      .catch((err) => toaster("Failed", "Something went wrong!"));
    setLoading(false);
  };

  const countryHandler = (e) => {
    setFormState((state) => ({
      ...state,
      values: { ...state.values, country: e.target.value },
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      values: { ...formState.values, [name]: value },
      touched: { ...formState.touched, [name]: true },
    });
  };

  const handleOpenModal = (edit, item) => {
    setLocation(item);
    setIsEdit(edit);
    setOpen(true);

    if (item) {
      const { company_name, email, country, city, phone_number, zipcode, address, contact_fname, contact_lname } = item;
      const values = {
        companyName: company_name,
        email,
        country: country ? country?._id : null,
        town: city,
        telephone: phone_number,
        zipcode: zipcode?.toString(),
        address,
        firstName: contact_fname,
        lastName: contact_lname,
      };
      setFormState({ ...formState, values: { ...values }, isValid: true });
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setTimeout(() => {
      setIsEdit(false);
      resetForm();
      setLocation(null);
    }, 500);
  };

  const resetForm = () => {
    setFormState({
      isValid: false,
      values: {
        companyName: "",
        country: "",
        email: "",
        telephone: "",
        address: "",
        zipcode: "",
        town: "",
        firstName: "",
        lastName: "",
      },
      errors: {},
      touched: {},
    });
  };

  const createLocation = async (data) => {
    await API("post", "/places", data)
      .then((res) => {
        toaster("success", "Inspection location addedd successfully!", "Adding Inspection location");
        setOpen(false);
        fetchLocations();
      })
      .catch((err) => toaster("Failed", "Something went wrong!"));
  };

  const editLocation = async (data) => {
    await API("put", `/places/${location._id}`, data)
      .then((res) => {
        toaster("success", "Inspection location updated successfully!", "Update Inspection location");
        handleCloseModal();
        fetchLocations();
      })
      .catch((err) => toaster("Failed", "Something went wrong!"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      companyName: company_name,
      email,
      country,
      town: city,
      telephone: phone_number,
      zipcode,
      address,
      firstName: contact_fname,
      lastName: contact_lname,
    } = formState.values;
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
      user: userId,
    };

    if (isEdit) {
      editLocation(data);
    } else {
      createLocation(data);
    }
  };

  const hasError = (field) => (formState.touched[field] && formState.errors[field] ? true : false);

  const MODAL_TITLE = isEdit ? "Edit inspection location" : location ? "View inspection location" : "Add inspection location";

  const searchedResults = locations.filter(createFilter(searchTerm, KEYS_TO_FILTERS));

  return (
    <>
      <div className="list_table">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {title.map((item) => {
                  return (
                    <TableCell align="left" className="country" style={{ backgrounColor: "#EAECF0" }}>
                      {t(item.heading)} &nbsp;
                      {item.sortIcon && !sort.ascend && sort.key === item.key ? (
                        <img
                          className="sorting-icon"
                          onClick={() => getSortedData(locations, setLocations, setSort, [], "company_name", true)}
                          src={arrow_up}
                          alt=""
                        />
                      ) : (
                        item.sortIcon && (
                          <img
                            onClick={() => getSortedData(locations, setLocations, setSort, [], "company_name", false)}
                            src={downArrow}
                            alt=""
                          />
                        )
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <Spinner />
              ) : (
                searchedResults?.map((item) => (
                  <TableRow
                    key={item._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleOpenModal(false, item)}
                  >
                    <TableCell component="th" scope="row">
                      <p className="AP_plus_title">{item.company_name} </p>
                    </TableCell>
                    <TableCell align="left" className="country2">
                      {item?.country}
                      <br />
                    </TableCell>
                    <TableCell align="left" className="country2">
                      {item.email}
                    </TableCell>
                    <TableCell align="left" className="country2">
                      {item.phone_number}
                    </TableCell>
                    <TableCell align="left" className="country2" style={{ cursor: "pointer" }}>
                      <p className="country2">{item.address}</p>
                    </TableCell>

                    <TableCell align="left" className="country2" style={{ cursor: "pointer" }}>
                      <img
                        src={EditIcon}
                        alt=""
                        className="dltIcon"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation(true);
                          handleOpenModal(true, item);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* table  */}
      </div>
      <Modal open={open} setOpen={setOpen} title={t(MODAL_TITLE)} handleClose={() => handleCloseModal()} Closebtn={true}>
        <div className="buyer_socond">
          <div className="luyer_input_field">
            <InputField
              label="Company name"
              disabled={!isEdit && location}
              name="companyName"
              onChange={(e) => handleChange(e)}
              value={formState.values.companyName}
              isError={hasError("companyName")}
              error={formState.errors?.companyName}
              type="text"
              placeholder="Company 1"
            />
          </div>
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                {t("Select a Country")}
              </label>
              <Select
                id="demo-simple-select"
                disabled={!isEdit && location}
                name="country"
                value={formState.values.country}
                onChange={(e) => countryHandler(e)}
                className="buyer_input"
              >
                {COUNTRIES?.map((item, index) => {
                  return (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="luyer_input_field">
            <div className="second_input_field">
              <div className="input_fields">
                <InputField
                  label="E-mail address"
                  name="email"
                  disabled={!isEdit && location}
                  onChange={(e) => handleChange(e)}
                  isError={hasError("email")}
                  error={formState.errors.email}
                  value={formState.values.email}
                  type="email"
                  placeholder="mail@mail.com"
                />
              </div>
              <div className="input_fields">
                <InputField
                  label="Telephone"
                  name="telephone"
                  disabled={!isEdit && location}
                  onChange={(e) => handleChange(e)}
                  isError={hasError("telephone")}
                  error={formState.errors.telephone}
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
                disabled={!isEdit && location}
                onChange={(e) => handleChange(e)}
                isError={hasError("address")}
                error={formState.errors.address}
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
                  label="Postal code"
                  name="zipcode"
                  disabled={!isEdit && location}
                  onChange={(e) => handleChange(e)}
                  isError={hasError("zipcode")}
                  error={formState.errors.zipcode}
                  value={formState.values.zipcode}
                  type="number"
                  placeholder="34 832"
                />
              </div>
              <div className="input_fields">
                <InputField
                  label={t("Town")}
                  name="town"
                  disabled={!isEdit && location}
                  onChange={(e) => handleChange(e)}
                  isError={hasError("town")}
                  error={formState.errors?.town}
                  value={formState.values.town}
                  type="text"
                  placeholder="Congo"
                />
              </div>
            </div>
          </div>
          <div className="luyer_input_field">
            <div className="second_input_field">
              <div className="input_fields">
                <InputField
                  name="firstName"
                  label={t("First name")}
                  disabled={!isEdit && location}
                  onChange={(e) => handleChange(e)}
                  isError={hasError("firstName")}
                  error={formState.errors?.firstName}
                  value={formState.values.firstName}
                  type="text"
                  placeholder="John"
                />
              </div>
              <div className="input_fields">
                <InputField
                  name="lastName"
                  label="Last name"
                  disabled={!isEdit && location}
                  onChange={(e) => handleChange(e)}
                  isError={hasError("lastName")}
                  error={formState.errors?.lastName}
                  value={formState.values.lastName}
                  type="text"
                  placeholder="Congo"
                />
              </div>
            </div>
          </div>
          {/* {((!isEdit && !location) || (isEdit && location)) && ( */}
          <Button
            text={t("To Confirm")}
            // disabled={!formState.isValid}
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="luyer_button"
          />
          {/* )} */}
        </div>
      </Modal>
    </>
  );
};

export default LocationsTab;
