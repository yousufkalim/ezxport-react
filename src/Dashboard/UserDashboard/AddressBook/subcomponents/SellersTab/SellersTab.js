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
import { toast } from "react-toastify";
import { validate } from "validate.js";
import Modal from "../../../../../components/Common/Modal";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import EditIcon from "../../../../../assets/EditIcon.svg";
import Spinner from "../../../../../components/Common/Spinner";
import Button from "../../../../../components/Common/Button";
import { useTranslation, Trans } from "react-i18next";
import downArrow from "../../../../../assets/TitleDownArrow.svg";
import arrow_up from "../../../../../assets/arrow_up.svg";
import { getSortedData } from "../../../../../lib/getSortedData";

const title = [
  { heading: "Company name", sortIcon: true, key: "company_name", imgSrc: TitleDownArrow },
  { heading: "Country" },
  { heading: "E-mail address" },
  { heading: "Telephone" },
  { heading: "Address" },
  { heading: "" },
];

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
      minimum: 5
    },
  },
  town: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 64,
    },
  },
};

const SellersTab = ({ t, open, setOpen, userId, countries }) => {
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      companyName: "",
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

  const [sellers, setSellers] = useState([]);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [sort, setSort] = useState({ key: "", ascend: true });

  const user = localStorage.getItem("userData");
  const userData = JSON.parse(user);

  useEffect(() => {
    fetchSellers();
  }, []);

      useEffect(() => {
        const errors = validate(formState.values, schema);
        setFormState((formState) => ({
          ...formState,
          isValid: errors ? false : true,
          errors: errors || {},
        }));
      }, [formState.values, setFormState]);

      useEffect(() => {
        const errors = validate(formState.values, schema);
        setFormState((formState) => ({
          ...formState,
          isValid: errors ? false : true,
          errors: errors || {},
        }));
      }, [formState.values, setFormState]);

      const fetchSellers = () => {
        setLoading(true);
        API('get', `/sellers/getByUser/${userData._id}`).then((res) => {
            setSellers(res.data.seller);
            setLoading(false);
        }).catch((err) => {
            toast.error(t("Something went wrong"));
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
    setSeller(item);
    setIsEdit(edit);
    setOpen(true);

    if (item) {
      const { company_name, email, country, city, phone_number, zipcode, address } = item;
      const values = {
        companyName: company_name,
        email,
        country: country?._id,
        town: city,
        telephone: phone_number,
        zipcode,
        address,
      };
      setFormState({ ...formState, values: { ...values }, isValid: true });
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setTimeout(() => {
      setIsEdit(false);
      resetForm();
      setSeller(null);
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
      },
      errors: {},
      touched: {},
    });
  };

      const createSeller = async (data) => {
        await API('post', '/sellers', data).then((res) => {
            toast.success('Seller addedd successfully!');
            setOpen(false);
            fetchSellers();
          }).catch(err => toast.success('Something went wrong!'));
      }

  const editSeller = async (data) => {
    await API("put", `/sellers/${seller._id}`, data)
      .then((res) => {
        toast.success(t("Seller updated successfully!"));
        handleCloseModal();
        fetchSellers();
      })
      .catch((err) => toast.success(t("Something went wrong!")));
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
    } = formState.values;
    const data = {
      company_name,
      email,
      country,
      city,
      phone_number,
      zipcode,
      address,
      user: userId,
    };

    if (isEdit) {
      editSeller(data);
    } else {
      createSeller(data);
    }
  };

  const hasError = (field) => (formState.touched[field] && formState.errors[field] ? true : false);

  const MODAL_TITLE = isEdit ? "Edit seller" : seller ? "View seller" : "Add seller";

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
                      style={{ backgrounColor: "#EAECF0" }}
                    >
                      {t(item.heading)} &nbsp;
                      {item.sortIcon && !sort.ascend && sort.key === item.key ? (
                        <img
                          className="sorting-icon"
                          onClick={() =>
                            getSortedData(sellers, setSellers, setSort, [], "company_name", true)
                          }
                          src={arrow_up}
                          alt=""
                        />
                      ) : (
                        item.sortIcon && (
                          <img
                            onClick={() =>
                              getSortedData(sellers, setSellers, setSort, [], "company_name", false)
                            }
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
                sellers?.map((buyer) => (
                  <TableRow
                    key={buyer._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleOpenModal(false, buyer)}
                  >
                    <TableCell component="th" scope="row">
                      <p className="AP_plus_title">{buyer.company_name} </p>
                    </TableCell>
                    <TableCell align="left" className="country2">
                      {buyer?.country?.name}
                      <br />
                    </TableCell>
                    <TableCell align="left" className="country2">
                      {buyer.email}
                    </TableCell>
                    <TableCell align="left" className="country2">
                      {buyer.phone_number}
                    </TableCell>
                    <TableCell align="left" className="country2" style={{ cursor: "pointer" }}>
                      <p className="country2">{buyer.address}</p>
                    </TableCell>

                    <TableCell align="left" className="country2" style={{ cursor: "pointer" }}>
                      <img
                        src={EditIcon}
                        alt=""
                        className="dltIcon"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation(true);
                          handleOpenModal(true, buyer);
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
      <Modal
        open={open}
        setOpen={setOpen}
        title={t(MODAL_TITLE)}
        handleClose={() => handleCloseModal()}
        Closebtn={true}
      >
        <div className="buyer_socond">
          <div className="luyer_input_field">
            <InputField
              label={t("Company name")}
              disabled={!isEdit && seller}
              name="companyName"
              onChange={(e) => handleChange(e)}
              value={formState.values.companyName}
              isError={hasError("companyName")}
              error={formState.errors?.companyName}
              type="text"
              placeholder={t("Company")}
            />
          </div>
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                {t("Select a Country")}
              </label>
              <Select
                id="demo-simple-select"
                name="country"
                disabled={!isEdit && seller}
                value={formState.values.country}
                onChange={(e) => countryHandler(e)}
                className="buyer_input"
              >
                {countries?.map(({ name, _id: id }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
              {hasError("country") && (
                <div className="input-error">{formState.errors.country ?? null}</div>
              )}
            </FormControl>
          </div>
          <div className="luyer_input_field">
            <div className="second_input_field">
              <div className="input_fields">
                <InputField
                  label="E-mail address"
                  name="email"
                  disabled={!isEdit && seller}
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
                  label={t("Telephone")}
                  name="telephone"
                  disabled={!isEdit && seller}
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
                label={t("Address")}
                name="address"
                disabled={!isEdit && seller}
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
                  label={t("Postal code")}
                  name="zipcode"
                  disabled={!isEdit && seller}
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
                  disabled={!isEdit && seller}
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
          {((!isEdit && !seller) || (isEdit && seller)) && (
            <Button
              text={t("To Confirm")}
              disabled={!formState.isValid}
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className="luyer_button"
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default SellersTab;
