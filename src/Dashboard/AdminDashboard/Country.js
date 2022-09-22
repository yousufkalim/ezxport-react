import React, { useState, useEffect } from "react";
import DownArrow from "../../assets/TitleDownArrow.svg";
import API from "../../api/index";
import Button from "../../components/Common/Button";
import SearchInput from "../../components/Common/SearchField";
import { Link, useHistory } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PlusIcon from "../../assets/PlusIcon.svg";
import Modal from "../../components/Common/Modal";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import { ReactComponent as Delete } from "../../assets/DeleteIcon.svg";
import { useTranslation, Trans } from "react-i18next";
import ConfirmModal from "../../components/Common/ConfirmModal";
import { getSortedData } from "../../lib/getSortedData";
import downArrow from "../../assets/TitleDownArrow.svg";
import arrow_up from "../../assets/arrow_up.svg";
import Spinner from "../../components/Common/Spinner";
import { createFilter } from "react-search-input";
import { COUNTRIES } from "../../lib/data.js";
const TITLES = [
  {
    name: "Country",
    key: "name",
    sortIcon: true,
  },
  {
    name: "Actions",
    key: "Actions",
    sortIcon: false,
  },
];

const KEYS_TO_FILTERS = ["name"];

const nestSortTitles = [];

const Country = () => {
  const [dropdown, setDropdown] = useState("default");
  const [currency, setCurrency] = useState("default");
  const [open, setOpen] = useState(false);
  const [countries, setCounteries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countryId, setCountryId] = useState("");
  const history = useHistory();
  const [openModal, setOpenModal] = useState(false);
  const [sort, setSort] = useState({ key: "", ascend: true });
  const [searchTerm, setSearchTerm] = useState("");

  const { t, i18n } = useTranslation();
  const { language } = i18n;

  const handleCountries = async () => {
    setLoading(true);
    await API("get", "/countries/")
      .then((res) => {
        setCounteries(res.data.countries?.reverse());
        setLoading(false);
      })
      .catch((err) => {
        toast.error(t("Error while fetching data!"));
        setLoading(false);
      });
  };

  useEffect(() => {
    handleCountries();
  }, []);

  const handleClose = () => {
    setDropdown("default");
    setCurrency("default");
    setOpen(false);
  };
  const handleAddCountry = async () => {
    await API("post", "/countries/", {
      name: dropdown,
      currency: currency,
    })
      .then(() => {
        setOpen(false);
        handleClose();
        handleCountries();
        toast.success(t("Country Added Successfully"));
      })
      .catch((err) => {
        toast.error(t("Country already exists"));
      });
  };
  const handleCountryDelete = async (countryId) => {
    await API("delete", `/countries/${countryId}`)
      .then((res) => {
        toast.success(t("Country Deleted Successfully"));
        setOpenModal(false);
        setCountryId("");
        handleCountries();
      })
      .catch((err) => {
        toast.error(t("Something went wrong"));
      });
  };

  const searchedCountries = countries.filter(createFilter(searchTerm, KEYS_TO_FILTERS));

  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          <div className="List_heading_div">
            <h1 className="list_h1_Country">{t("Country")}</h1>
            <div className="searching">
              <SearchInput placeholder="Search" setSearch={setSearchTerm} />
              {/* <SearchField placeholder={t("Searching")} /> */}
              <Button className="list_reqst_btn4" text={t("Add a country")} Imgsrc={PlusIcon} onClick={() => setOpen(true)} />
            </div>
          </div>
          {/* list table   */}
          <div className="list_table">
            <TableContainer component={Paper} style={{ overflow: "scroll !important" }}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow sx={{ border: "1px solid #EAECF0" }}>
                    {TITLES.map((item) => (
                      <TableCell sx={{ color: "#667085", backgroundColor: "#F9FAFB" }}>
                        {t(item.name)} &nbsp;
                        {item.sortIcon && !sort.ascend && sort.key === item.key ? (
                          <img
                            className="sorting-icon"
                            onClick={() => getSortedData(countries, setCounteries, setSort, nestSortTitles, item.key, true)}
                            src={arrow_up}
                            alt=""
                          />
                        ) : (
                          item.sortIcon && (
                            <img
                              onClick={() => getSortedData(countries, setCounteries, setSort, nestSortTitles, item.key, false)}
                              src={downArrow}
                              alt=""
                            />
                          )
                        )}
                      </TableCell>
                    ))}
                    {history.location.pathname === "/Admin/Dashboard/Service" && (
                      <TableCell sx={{ color: "#667085", backgroundColor: "#F9FAFB" }}>
                        {/* {props.text2} */}
                        &nbsp;
                        <img src={DownArrow} alt="" />
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                {loading ? (
                  <Spinner />
                ) : (
                  <TableBody>
                    {searchedCountries?.map((item) => {
                      return (
                        <TableRow key={item?.name} sx={{ border: "1px solid #EAECF0" }}>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{
                              padding: 2,
                              cursor: "pointer",
                            }}
                            onClick={() => history.push(`/Admin/Dashboard/Country/NomPays/${item?._id}`)}
                          >
                            <p className="AP_plus_title">{t(item.name)}</p>
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{
                              padding: 2,
                            }}
                          >
                            <Delete
                              onClick={() => {
                                setOpenModal(true);
                                setCountryId(item?._id);
                              }}
                              style={{
                                cursor: "pointer",
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
      <ConfirmModal open={openModal} setOpen={setOpenModal} action={() => handleCountryDelete(countryId)} />
      <Modal open={open} setOpen={setOpen} title={t("Add a country")} handleClose={handleClose} Closebtn={true}>
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
                {COUNTRIES?.map((item) => {
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

              className={dropdown && currency === "default" ? "add_Country_button_disabled" : "add_Country_button"}

              disabled={dropdown === "default" && currency === "default"}
              onClick={handleAddCountry}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Country;
