import SearchField from "../../components/Common/SearchField";
import Button from "../../components/Common/Button";
import BackArrow from "../../assets/BackArrow.svg";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import AdminTab1 from "./AdminTab1";
import AdminTab2 from "./AdminTab2";
import AdminTab3 from "./AdminTab3";
import AdminTab4 from "./AdminTab4";
import DownArrow from "../../assets/TitleDownArrow.svg";
import { useParams } from "react-router-dom";
import API from "../../api/index";
import FilePicker from "../../components/Common/FilePicker";
import { useTranslation } from "react-i18next";
import Modal from "../../components/Common/Modal";
import { createFilter } from "react-search-input";
import toaster from "../../utils/toaster";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PROVIDERS_TO_FILTERS = ["name"];
const DOCUMENTS_TO_FILTERS = ["name"];
const CODES_TO_FILTERS = ["code"];

const AdminNomPays = () => {
  const params = useParams();
  const { id } = params;
  const [value, setValue] = useState(0);
  const [vendor, setVendor] = useState();
  const [country, setCountry] = useState("");
  const [document, setDocument] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openCalculationModal, setOpenCalculationModal] = useState(false);
  const [openAddDocument, setOpenAddDocument] = useState(false);
  const [openAddBomModal, setOpenAddBomModal] = useState(false);
  const [boms, setBoms] = useState();
  const [currentRadioValue, setCurrentRadioValue] = useState("coefficient");
  const [calculation, setCalculation] = useState();
  const [currency, setCurrency] = useState("");
  const [file, setFile] = useState("");
  const [providerSerach, setProviderSearch] = useState("");
  const [documentSerach, setDocumentSearch] = useState("");
  const [codeSearch, setCodeSearch] = useState("");

  const { t } = useTranslation();

  useEffect(() => {
    handleCountryData();
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleCountryData = async () => {
    setLoading(true);
    await API("get", `/countries/${id}`)
      .then((res) => {
        setCurrency(res?.data?.country?.currency);
        setCountry(res?.data?.country);
        setVendor(res?.data?.country?.vendors);
        setDocument(res?.data?.country?.documents);
        setBoms(res?.data?.country?.boms);
        setCalculation(res?.data?.country?.calculation);
        // setCurrentRadioValue(res?.data?.country?.calculation?.type);
        setLoading(false);
      })
      .catch((err) => {
        console.log("---->ERR", err);
        setLoading(false);
      });
  };

  const handleClose = () => setOpen(false);
  const handleCalculationClose = () => setOpenCalculationModal(false);
  const handleAddBomModalClose = () => setOpenAddBomModal(false);
  const handleAddDocumentModalClose = () => setOpenAddBomModal(false);

  const handleUplaodFile = async () => {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("country", `${id}`);
    await API("post", "/boms/uploadCodes/", formData)
      .then((res) => {
        handleCountryData();
        setFile({});
        setOpen(false);
        toaster("success", t(res.data.message));
      })
      .catch((err) => {
        toaster("success", t(err?.response?.data?.message));

        console.log("errr", err);
      });
  };
  const handleCodesFile = (file) => setFile(file);

  const searchedProviders = vendor?.filter(createFilter(providerSerach, PROVIDERS_TO_FILTERS));

  const searchedDocuments = document?.filter(createFilter(documentSerach, DOCUMENTS_TO_FILTERS));

  const searchedCodes = boms?.filter(createFilter(codeSearch, CODES_TO_FILTERS));

  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          {/* list head  */}
          <div className="List_heading_div">
            <h1 className="list_nom_h1">
              <Link to="/Admin/Dashboard/Country">
                <img src={BackArrow} alt="" />
              </Link>
              &nbsp; {t(country?.name)}
            </h1>
            {value === 0 ? (
              <div className="searching_div_country">
                <SearchField placeholder="Search" setSearch={setProviderSearch} />
              </div>
            ) : value === 1 ? (
              <div className="searching_div_country">
                <SearchField placeholder="Search" setSearch={setDocumentSearch} />
                <Button
                  text={t("Add Documents")}
                  className="update_Boms_btn"
                  onClick={() => setOpenAddDocument(true)}
                />
              </div>
            ) : value === 2 ? (
              <div className="searching_div_country2">
                <div className="searching_div_style">
                  <SearchField placeholder="Search" setSearch={setCodeSearch} />
                  <Button
                    text={t("Add")}
                    className="Edit_btn_bom"
                    onClick={() => setOpenAddBomModal(true)}
                  />
                </div>
                <Button
                  text={t("Update")}
                  className="update_Boms_btn"
                  onClick={() => setOpen(true)}
                />
              </div>
            ) : value === 3 ? (
              <div className="searching_div_country3">
                {/* {currentRadioValue !== "coefficient" && (
                  <SearchField placeholder="Search" placeholder={t("Searching")} className="Country_search_Calculation" />
                )} */}
                {currentRadioValue === "coefficient" && (
                  <Button
                    text={t("Update")}
                    className="Edit_btn2"
                    onClick={() => setOpenCalculationModal(true)}
                  />
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
          {/* list table   */}
          <div className="list_table">
            <Box sx={{ width: "100%" }}>
              <Box>
                <Tabs value={value} onChange={handleChange} className="tab_menu">
                  <Tab className="admin_tab_btn" label={t("Service providers")} {...a11yProps(0)} />
                  <Tab className="admin_tab_btn" label={t("Documents")} {...a11yProps(1)} />
                  <Tab className="admin_tab_btn" label={t("BOMs")} {...a11yProps(2)} />
                  <Tab className="admin_tab_btn" label={t("Calculation")} {...a11yProps(3)} />
                </Tabs>
              </Box>
              {/* table 1 */}

              <TabPanel value={value} index={0}>
                <div className="list_table">
                  <AdminTab1 loading={loading} setVendor={setVendor} vendor={searchedProviders} />
                </div>
              </TabPanel>
              {/* table 2 */}
              <TabPanel value={value} index={1}>
                <div className="list_table">
                  <AdminTab2
                    rows={searchedDocuments}
                    img={DownArrow}
                    loading={loading}
                    setDocument={setDocument}
                    handleAddDocumentModalClose={handleAddDocumentModalClose}
                    openAddDocument={openAddDocument}
                    setOpenAddDocument={setOpenAddDocument}
                    handleCountryData={handleCountryData}
                    countryId={id}
                  />
                </div>
              </TabPanel>
              {/* table 3 */}
              <TabPanel value={value} index={2}>
                <div className="list_table">
                  <AdminTab3
                    countryId={id}
                    rows={searchedCodes}
                    setBoms={setBoms}
                    loading={loading}
                    handleCountryData={handleCountryData}
                    setOpenAddBomModal={setOpenAddBomModal}
                    openAddBomModal={openAddBomModal}
                    handleAddBomModalClose={handleAddBomModalClose}
                    // handleGetBomByCid={handleGetBomByCid}
                  />
                </div>
              </TabPanel>
              {/* table 4 */}
              <TabPanel value={value} index={3}>
                <AdminTab4
                  handleCountryData={handleCountryData}
                  calculation={calculation}
                  openCalculationModal={openCalculationModal}
                  setOpenCalculationModal={setOpenCalculationModal}
                  handleCalculationClose={handleCalculationClose}
                  countryId={id}
                  currentRadioValue={currentRadioValue}
                  setCurrentRadioValue={setCurrentRadioValue}
                  currency={currency}
                />
              </TabPanel>
            </Box>
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen} title="Update" handleClose={handleClose} Closebtn={true}>
        <div className="buyer_socond">
          <div className="luyer_input_field">
            <label htmlFor="" className="bom_popup_label">
              {t("Download your BOM file")}
            </label>
            <div className="bom_download_File_btn_div">
              <Link
                to={"/Files/Admintemplate.xlsx"}
                target="_blank"
                download
                className="bom_download"
              >
                {t("Download current file")}
              </Link>
            </div>
          </div>

          <label htmlFor="" className="bom_popup_label" style={{ paddingBottom: "10px" }}>
            {t("Upload your BOM file")}
          </label>
          <FilePicker
            index={"01"}
            fileName={file.name}
            name={file.name}
            onChange={(e) => handleCodesFile(e.target.files[0])}
          />
          <Button text={t("Submit")} className="bom_downloadFile_btn" onClick={handleUplaodFile} />
        </div>
      </Modal>
    </>
  );
};

export default AdminNomPays;
