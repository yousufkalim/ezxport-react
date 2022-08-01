import React, { useState } from "react";
import Header from "../components/Common/Header";
import { Link, useHistory } from "react-router-dom";
import BackArrow from "../assets/BackArrow.svg";
import API from "../api";
import { toast } from "react-toastify";
import Button from "../components/Common/Button";

const Registration = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    fullAddress: "",
    postelCode: "",
    town: "",
    password: "",
    confirmPassword: "",
    companyLastName: "",
    typeOfSociety: "",
    vatNumber: "",
  });
  const history = useHistory();
  const handleFormData = (name, value) => {
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = async () => {
    await API("post", "/users/create", {
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      password: form.password,
      confirm_password: form.confirmPassword,
      phone_number: form.phone,
      address: form.fullAddress,
      city: form.town,
      zip_code: form.postelCode,
      company:{
        name:form.companyLastName,
        type:form.typeOfSociety,
        vat:form.vatNumber,
      }
    })
      .then(() => {
        toast.success("User created successfully");
        history.push("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <>
      <Header />
      <div className="login_mainDiv">
        <Link to="/">
        <img
          src={BackArrow}
          alt="back"
          className="backArrow"
          />
          </Link>

        <div className="registration_div">
          {/* first input fields  */}
          <h2 className="user_info">User information</h2>
          <div className="regist_form">
            <div className="regist_input_div">
              <div className="regist_col1">
                <label htmlFor="">First name</label>
                <input
                  type="text"
                  className="reg_input"
                  placeholder="Firs name"
                  required
                  value={form.firstName}
                  name="firstName"
                  onChange={(e) => handleFormData(e.target.name, e.target.value)}
                />
              </div>
              <div className="regist_col1">
                <label htmlFor="">Last name</label>
                <input
                  type="text"
                  className="reg_input"
                  placeholder="Last name"
                  required
                  value={form.lastName}
                  name="lastName"
                  onChange={(e) => handleFormData(e.target.name, e.target.value)}
                />
              </div>
            </div>
            <div className="regist_input_div">
              <div className="regist_col1">
                <label htmlFor="">E-mail address</label>
                <input
                  type="text"
                  className="reg_input"
                  placeholder="mail@mail.com"
                  required
                  value={form.email}
                  name="email"
                  onChange={(e) => handleFormData(e.target.name, e.target.value)}
                />
              </div>
              <div className="regist_col1">
                <label htmlFor="">Telephone</label>
                <input
                  type="number"
                  className="reg_input"
                  placeholder="33 07 86 36 02 20"
                  required
                  value={form.phone}
                  name="phone"
                  onChange={(e) => handleFormData(e.target.name, e.target.value)}
                />
              </div>
            </div>
            <div className="regist_input_div">
              <div className="regist_col1">
                <label htmlFor="">Full address</label>
                <input
                  type="text"
                  className="reg_input"
                  placeholder="90 road of rouvroy"
                  required
                  value={form.fullAddress}
                  name="fullAddress"
                  onChange={(e) => handleFormData(e.target.name, e.target.value)}
                />
              </div>
              <div className="regist_col2">
                <div className="city_inputs">
                  <label htmlFor="">Code postal</label>
                  <input
                    type="number"
                    className="reg_input2"
                    placeholder="80100"
                    required
                    value={form.postelCode}
                    name="postelCode"
                    onChange={(e) => handleFormData(e.target.name, e.target.value)}
                  />
                </div>
                <div className="city_inputs2">
                  <label htmlFor="">Town</label>
                  <input
                    type="text"
                    className="reg_input3"
                    placeholder="Abbeville"
                    required
                    value={form.town}
                    name="town"
                    onChange={(e) => handleFormData(e.target.name, e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="regist_input_div">
              <div className="regist_col1">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  className="reg_input"
                  placeholder="Password"
                  required
                  value={form.password}
                  name="password"
                  onChange={(e) => handleFormData(e.target.name, e.target.value)}
                />
              </div>
              <div className="regist_col1">
                <label htmlFor="">Confirming your password</label>
                <input
                  type="password"
                  className="reg_input"
                  placeholder="Confirm password"
                  required
                  value={form.confirmPassword}
                  name="confirmPassword"
                  onChange={(e) => handleFormData(e.target.name, e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* second input fields  */}
          <h2 className="user_info">Company information</h2>
          {/* ///  */}
          <div className="regist_form">
            <div className="regist_input_div">
              <div className="regist_col1">
                <label htmlFor="">Last name</label>
                <input
                  type="text"
                  className="reg_input"
                  placeholder="Last name"
                  required
                  value={form.companyLastName}
                  name="companyLastName"
                  onChange={(e) => handleFormData(e.target.name, e.target.value)}
                />
              </div>
              <div className="regist_col1">
                <label htmlFor="">Type of society</label>
                <select
                  name="typeOfSociety"
                  id=""
                  className="reg_input"
                  value={form.typeOfSociety}
                  onChange={(e) => handleFormData(e.target.name, e.target.value)}
                >
                  <option value="1">Type 1</option>
                  <option value="2">Type 2</option>
                  <option value="3">Type 3</option>
                  <option value="4">Type 4</option>
                  <option value="5">Type 5</option>
                </select>
              </div>
            </div>
            <div className="regist_input_div">
              <div className="regist_col1">
                <label htmlFor="">VAT number</label>
                <input
                  type="number"
                  className="reg_input"
                  placeholder="6372890367849"
                  required
                  value={form.vatNumber}
                  name="vatNumber"
                  onChange={(e) => handleFormData(e.target.name, e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* ///  */}
          <Button className="register_fm" onClick={handleSubmit} text="Register" />
        </div>
      </div>
    </>
  );
};

export default Registration;
