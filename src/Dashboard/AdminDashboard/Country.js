import React, { useState, useEffect } from "react";
import AdminCountry from "../../components/AdminDashboard/AdminCountry";
import DownArrow from "../../assets/TitleDownArrow.svg";
import API from "../../api/index";
import Button from "../../components/Common/Button";
import SearchField from "../../components/Common/SearchField";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PlusIcon from "../../assets/PlusIcon.svg";
import PaginationPage from "../../components/AdminDashboard/Pagination";
import { useHistory } from "react-router-dom";
import Modal from "../../components/Common/Modal";
import InputField from "../../components/Common/InputField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";

var country_list = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua &amp; Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia &amp; Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Cape Verde",
  "Cayman Islands",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cruise Ship",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyz Republic",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre &amp; Miquelon",
  "Samoa",
  "San Marino",
  "Satellite",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St Kitts &amp; Nevis",
  "St Lucia",
  "St Vincent",
  "St. Lucia",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad &amp; Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks &amp; Caicos",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];
const Country = () => {
  const [dropdown, setDropdown] = useState("default");
  const [open, setOpen] = useState(false);
  const [countries, setCounteries] = useState([]);
  const history = useHistory();

  useEffect(() => {
    handleCountries();
  }, [open]);
  const handleCountries = async () => {
    await API("get", "/countries/")
      .then((res) => {
        setCounteries(res.data.countries);
        console.log(res);
      })
      .catch((err) => {
        console.log(err, "<----");
      });
  };
  const handleClose = () => setOpen(false);
  const handleAddCountry = async () => {
    await API("post", "/countries/", {
      name: dropdown,
    })
      .then((res) => {
        setOpen(false);
        toast.success("Country Added Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.success("Something Went Wrong");
      });
  };
  return (
    <>
      {/* <AdminCountry title="Country" rows={countries} text="Country" img={DownArrow} /> */}
      <div className="list_main_div">
        <div className="list_second_div">
          {/* list head  */}
          <div className="List_heading_div">
            <h1 className="list_h1">Country</h1>
            <div className="searching">
              <SearchField placeholder="Searching" />
              <Button
                className="list_reqst_btn2"
                // text={`${history.location.pathname != "/Admin/Dashboard/Country" ? "Add a service provider" : "Add a country"}`}
                text={"Add a country"}
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
                      Country <img src={DownArrow} alt="" />
                    </TableCell>
                    {history.location.pathname == "/Admin/Dashboard/Service" && (
                      <TableCell sx={{ color: "#667085", backgroundColor: "#F9FAFB" }}>
                        {/* {props.text2} */}
                        &nbsp;
                        <img src={DownArrow} alt="" />
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {countries.map((item) => (
                    <TableRow
                      key={item.name}
                      // sx={{ '&:last-child td, &:last-child th': { border: 0, padding: 1 } }}
                    >
                      <TableCell component="th" scope="row" sx={{ border: "1px solid #E5E5E5;", padding: 2 }}>
                        <Link
                          exact
                          to={`/Admin/Dashboard/Country/NomPays/${item._id}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          {item.name}
                        </Link>
                      </TableCell>
                      {/* {history.location.pathname != "/Admin/Dashboard/Country" && (
                        <TableCell component="th" scope="row" sx={{ border: "1px solid #E5E5E5;", padding: 2 }}>
                          {item.name}
                        </TableCell>
                      )} */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <PaginationPage />
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen} title="Add a country" handleClose={handleClose} Closebtn={true}>
        <div className="add_country_div">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              gap: "3rem",
            }}
          >
            <FormControl fullWidth>
              <label htmlFor="" className="buyer_label">
                Select a country to add
              </label>
              <Select id="demo-simple-select" defaultValue={dropdown} className="buyer_input">
                <MenuItem value="default"> {"Select a Country"}</MenuItem>
                {country_list.map((item) => {
                  return (
                    <MenuItem value={item} onClick={() => setDropdown(item)}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Button text="Add A country" className="add_Country_button" onClick={handleAddCountry} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Country;
