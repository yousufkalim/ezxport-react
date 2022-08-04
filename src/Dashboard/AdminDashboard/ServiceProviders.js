import React, { useEffect, useState } from "react";
import DownArrow from "../../assets/TitleDownArrow.svg";
import Button from "../../components/Common/Button";
import SearchField from "../../components/Common/SearchField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PlusIcon from "../../assets/PlusIcon.svg";
import PaginationPage from "../../components/AdminDashboard/Pagination";
import API from "../../api/index";
import Modal from "../../components/Common/Modal";
import { toast } from "react-toastify";
import InputField from "../../components/Common/InputField";
import MultiSelect from "../../components/Common/MultiSelect";
import { Link, useHistory } from "react-router-dom";
const ServiceProviders = () => {
  const history = useHistory(null);
  const [open, setOpen] = useState(false);
  const [names, setNames] = useState([]);
  const [vendors, setVendors] = useState();
  const [id, setId] = useState();
  const [options, setOptions] = useState();
  const [select, setSelect] = useState([]);
  const [addVendor, setAddVendor] = useState({
    fullname: "",
    phone_Number: "",
    sendingEmail: "",
    contactEmail: "",
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
    console.log(ids, "ids");
  }, [select]);
  // getting all service providers in database
  const handleServiceProvider = async () => {
    await API("get", "/vendors/")
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
    await API("post", "/vendors/", {
      phone_number: addVendor.phone_Number,
      name: addVendor.fullname,
      sending_email: addVendor.sendingEmail,
      contact_email: addVendor.contactEmail,
      countries: id,
    })
      .then((res) => {
        console.log("RESSS", res);
        setOpen(false);
        toast.success("Vendor added Successfully");
      })
      .catch((err) => {
        console.log("ERRRR", err);
        toast.error(err.response.data.message);
      });
  };
  // setting data of multiSelect in  state
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelect(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  // getting Countries names from database
  const handleCoutries = async () => {
    await API("get", "/countries/")
      .then((res) => {
        let country_name = [];
        setOptions(res?.data?.countries);
        res.data.countries.map((item) => {
          country_name.push(item.name);
        });
        setNames(country_name);
      })
      .catch((err) => {
        console.log("errrrr", err);
      });
  };
  // setting data of modal in state
  const handleModalData = (name, value) => {
    setAddVendor({ ...addVendor, [name]: value });
  };
  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          {/* list head  */}
          <div className="List_heading_div">
            <h1 className="list_h1">Service providers</h1>
            <div className="searching">
              <SearchField placeholder="Searching" />
              <Button
                className="list_reqst_btn2"
                text={"Add a service provider"}
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
                    <TableCell sx={{ color: "#667085", backgroundColor: "#F9FAFB" }}>
                      Prestataire <img src={DownArrow} alt="" />
                    </TableCell>
                    <TableCell sx={{ color: "#667085", backgroundColor: "#F9FAFB" }}>
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
                        sx={{ border: "1px solid #E5E5E5;", padding: 2, cursor: "pointer" }}
                      >
                        {item.name}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ border: "1px solid #E5E5E5;", padding: 2, cursor: "pointer" }}
                        onClick={() => {
                          history.push(`/Admin/Dashboard/ServiceProvider/nameProvider/${item._id}`);
                        }}
                      >
                        {item.countries.map((country) => {
                          return <p>{country.name}</p>;
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
      <Modal open={open} setOpen={setOpen} title="Add a Service Provider" handleClose={handleClose} Closebtn={true}>
        <div className="add_vendor_div">
          <label htmlFor="" className="label_modal">
            Full Name
          </label>{" "}
          <InputField
            name="fullname"
            className="textfield_addvendor"
            onChange={(e) => handleModalData(e.target.name, e.target.value)}
          />
          <label htmlFor="" className="label_modal">
            Phone Number
          </label>{" "}
          <InputField
            name="phone_Number"
            className="textfield_addvendor"
            onChange={(e) => handleModalData(e.target.name, e.target.value)}
          />
          <label htmlFor="" className="label_modal">
            Contact
          </label>{" "}
          <InputField
            name="contactEmail"
            className="textfield_addvendor"
            onChange={(e) => handleModalData(e.target.name, e.target.value)}
          />
          <label htmlFor="" className="label_modal">
            Default sending Email address
          </label>
          <InputField
            name="sendingEmail"
            className="textfield_addvendor"
            onChange={(e) => handleModalData(e.target.name, e.target.value)}
          />
          <label htmlFor="" className="label_modal">
            Select country to add
          </label>
          <MultiSelect name="countries" onChange={handleChange} value={select} names={names} select={select} />
          <Button text="Add A country" className="add_vendor_button" onClick={handleAddVendor} />
        </div>
      </Modal>
    </>
  );
};;;

export default ServiceProviders;
