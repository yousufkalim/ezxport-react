import React, { useState, useEffect } from "react";
import DownArrow from "../../assets/TitleDownArrow.svg";
import API from "../../api/index";
import Button from "../../components/Common/Button";
import SearchField from "../../components/Common/SearchField";
import { Link, useHistory } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PlusIcon from "../../assets/PlusIcon.svg";
import PaginationPage from "../../components/AdminDashboard/Pagination";
import Modal from "../../components/Common/Modal";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import { ReactComponent as Delete } from "../../assets/DeleteIcon.svg";
import { useTranslation, Trans } from "react-i18next";

var countryList = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua Barbuda",
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
  "Bosnia Herzegovina",
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
  "Saint Pierre Miquelon",
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
  "St Kitts Nevis",
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
  "Trinidad Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks Caicos",
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
  const [currency, setCurrency] = useState("default");
  const [open, setOpen] = useState(false);
  const [countries, setCounteries] = useState([]);
  const history = useHistory();

  const { t, i18n } = useTranslation();
  const { language } = i18n;

  const handleCountries = async () => {
    await API("get", "/countries/")
      .then((res) => {
        setCounteries(res.data.countries);
      })
      .catch((err) => {
        console.log(err, "<----");
      });
  };
  useEffect(() => {
    handleCountries();
    setDropdown("default");
  }, [open]);
  const handleClose = () => setOpen(false);
  const handleAddCountry = async () => {
    await API("post", "/countries/", {
      name: dropdown,
      currency: currency,
    })
      .then(() => {
        setOpen(false);
        toast.success("Country Added Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Country already exists");
      });
  };
  const handleCountryDelete = async (countryId) => {
    await API("delete", `/countries/${countryId}`)
      .then((res) => {
        console.log("handleCountryDelete", res);
        toast.success("Country Deleted Successfully");
        handleCountries();
      })
      .catch((err) => {
        console.log("handleCountryDelete", err);
      });
  };
  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          <div className="List_heading_div">
            <h1 className="list_h1_Country">{t("Country")}</h1>
            <div className="searching">
              <SearchField placeholder={t("Searching")} />
              <Button
                className="list_reqst_btn4"
                text={t("Add a country")}
                Imgsrc={PlusIcon}
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
          {/* list table   */}
          <div className="list_table">
            <TableContainer component={Paper} style={{ overflow: "scroll !important" }}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow sx={{ border: "1px solid #EAECF0" }}>
                    <TableCell sx={{ color: "#667085", backgroundColor: "#F9FAFB" }}>
                      {t("Country")} <img src={DownArrow} alt="" />
                    </TableCell>
                    <TableCell sx={{ color: "#667085", backgroundColor: "#F9FAFB" }}>
                      {t("Actions")} <img src={DownArrow} alt="" />
                    </TableCell>
                    {history.location.pathname === "/Admin/Dashboard/Service" && (
                      <TableCell sx={{ color: "#667085", backgroundColor: "#F9FAFB" }}>
                        {/* {props.text2} */}
                        &nbsp;
                        <img src={DownArrow} alt="" />
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {countries?.map((item) => (
                    <TableRow key={item?.name} sx={{ border: "1px solid #EAECF0" }}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          padding: 2,
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          history.push(`/Admin/Dashboard/Country/NomPays/${item?._id}`)
                        }
                      >
                        <p className="AP_plus_title">{item.name}</p>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          padding: 2,
                        }}
                      >
                        <Delete
                          onClick={() => handleCountryDelete(item?._id)}
                          style={{
                            cursor: "pointer",
                          }}
                        />
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
        title={t("Add a country")}
        handleClose={handleClose}
        Closebtn={true}
      >
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
                {t("Select a country to add")}
              </label>
              <Select id="demo-simple-select" defaultValue={"default"} className="buyer_input">
                <MenuItem disabled value={"default"}>
                  {t("Select a Country")}
                </MenuItem>
                {countryList.map((item) => {
                  return (
                    <MenuItem value={item} onClick={() => setDropdown(item)}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
              <div style={{ marginTop: "1rem" }}>
                <label htmlFor="" className="buyer_label">
                  {t("Select currency against selected country")}
                </label>
                <Select
                  id="demo-simple-select"
                  defaultValue={"default"}
                  className="buyer_input"
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <MenuItem disabled value="default">
                    {t("Select a Currency")}
                  </MenuItem>
                  <MenuItem value={"USD"}> {t("US Dollar $")} </MenuItem>
                  <MenuItem value={"EURO"}>{t("EURO €")}</MenuItem>
                </Select>
              </div>
            </FormControl>
            <Button
              text={t("Add a country")}
              className={
                dropdown && currency === "default"
                  ? "add_Country_button_disabled"
                  : "add_Country_button"
              }
              disabled={dropdown && currency === "default" && true}
              onClick={handleAddCountry}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Country;
