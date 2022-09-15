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
import { useTranslation, Trans } from "react-i18next";

const title = [
  { heading: "Company Name", imgSrc: TitleDownArrow },
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
  telephone: {
    presence: { allowEmpty: false, message: "is required" },
    length: { maximum: 10, minimum: 10 },
  },
};

const SellersTab = ({ open, setOpen, userId, countries }) => {
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

  const { t, i18n } = useTranslation();
  const { language } = i18n;

  const user = localStorage.getItem("userData");
  const userData = JSON.parse(user);

  useEffect(() => {
    fetchSellers();
  }, []);

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState((formState) => ({
      ...formState,
      errors: errors ?? {},
      isValid: errors ? false : true,
    }));
  }, [formState.values]);

  const fetchSellers = () => {
    setLoading(true);
    API("get", `/sellers/getByUser/${userData._id}`)
      .then((res) => {
        setSellers(res.data.seller);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Something went wrong");
        setLoading(false);
      });
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
      setFormState({ ...formState, values: { ...values } });
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
    await API("post", "/sellers", data)
      .then((res) => {
        toast.success("Seller addedd successfully!");
        setOpen(false);
        fetchSellers();
      })
      .catch((err) => toast.success("Something went wrong!"));
  };

  const editSeller = async (data) => {
    await API("put", `/sellers/${seller._id}`, data)
      .then((res) => {
        toast.success("Seller updated successfully!");
        handleCloseModal();
        fetchSellers();
      })
      .catch((err) => toast.success("Something went wrong!"));
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
                      {item.heading} &nbsp;
                      <img src={item.imgSrc} alt="" className="title_arrow" />
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
                      {buyer.country.name}
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
        title={MODAL_TITLE}
        handleClose={() => handleCloseModal()}
        Closebtn={true}
      >
        <div className="buyer_socond">
          <div className="luyer_input_field">
            <label htmlFor="" className="buyer_label">
              {t("Company Name")}
            </label>
            <InputField
              className={
                hasError("companyName") && formState.errors.companyName
                  ? "input_email_red"
                  : "input_email"
              }
              disabled={!isEdit && seller}
              name="companyName"
              onChange={(e) => handleChange(e)}
              value={formState.values.companyName}
              type="text"
              placeholder="Company 1"
            />
            {hasError("companyName") && <div>{formState.errors.companyName[0] ?? null}</div>}
          </div>
          <div className="luyer_input_field">
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                Select a country
              </label>
              <Select
                id="demo-simple-select"
                disabled={!isEdit && seller}
                name="country"
                defaultValue={formState.values.country}
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
            </FormControl>
          </div>
          <div className="luyer_input_field">
            <div className="second_input_field">
              <div className="input_fields">
                <label htmlFor="" className="buyer_label">
                  {t("E-mail address")}
                </label>
                <InputField
                  className={
                    hasError("email") && formState.errors.email ? "input_email_red" : "input_email"
                  }
                  name="email"
                  disabled={!isEdit && seller}
                  onChange={(e) => handleChange(e)}
                  value={formState.values.email}
                  type="email"
                  placeholder="mail@mail.com"
                />
              </div>
              <div className="input_fields">
                <label htmlFor="" className="buyer_label">
                  {t("Telephone")}
                </label>
                <InputField
                  className={
                    hasError("telephone") && formState.errors.telephone
                      ? "input_email_red"
                      : "input_email"
                  }
                  name="telephone"
                  disabled={!isEdit && seller}
                  onChange={(e) => handleChange(e)}
                  value={formState.values.telephone}
                  type="number"
                  placeholder="+33 03 32 32 42 42"
                />
              </div>
            </div>
          </div>
          <div className="luyer_input_field">
            <div className="luyer_input_field">
              <label htmlFor="" className="buyer_label">
                {t("Address")}
              </label>
              <InputField
                className={
                  hasError("address") && formState.errors.address
                    ? "input_email_red"
                    : "input_email"
                }
                name="address"
                disabled={!isEdit && seller}
                onChange={(e) => handleChange(e)}
                value={formState.values.address}
                type="text"
                placeholder="97 road of rouvroy"
              />
            </div>
          </div>
          <div className="luyer_input_field">
            <div className="second_input_field">
              <div className="input_fields">
                <label htmlFor="" className="buyer_label">
                  {t("Postal code")}
                </label>
                <InputField
                  className={
                    hasError("zipcode") && formState.errors.zipcode
                      ? "input_email_red"
                      : "input_email"
                  }
                  name="zipcode"
                  disabled={!isEdit && seller}
                  onChange={(e) => handleChange(e)}
                  value={formState.values.zipcode}
                  type="number"
                  placeholder="34 832"
                />
              </div>
              <div className="input_fields">
                <label htmlFor="" className="buyer_label">
                  {t("Town")}
                </label>
                <InputField
                  className={
                    hasError("town") && formState.errors.town ? "input_email_red" : "input_email"
                  }
                  name="town"
                  disabled={!isEdit && seller}
                  onChange={(e) => handleChange(e)}
                  value={formState.values.town}
                  type="text"
                  placeholder="Congo"
                />
              </div>
            </div>
          </div>
          {((!isEdit && !seller) || (isEdit && seller)) && (
            <button type="submit" onClick={(e) => handleSubmit(e)} className="luyer_button">
              To Confirm
            </button>
          )}
        </div>
      </Modal>
    </>
  );
};

export default SellersTab;
