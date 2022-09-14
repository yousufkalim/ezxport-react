import SearchField from '../../components/Common/SearchField';
import Button from '../../components/Common/Button';
import BackArrow from '../../assets/BackArrow.svg';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import AdminTab1 from './AdminTab1';
import AdminTab2 from './AdminTab2';
import AdminTab3 from './AdminTab3';
import AdminTab4 from './AdminTab4';
import DownArrow from '../../assets/TitleDownArrow.svg';
import { useParams } from 'react-router-dom';
import API from '../../api/index';
import FilePicker from '../../components/Common/FilePicker';
import Icon from '../../assets/Quiz.png';
import Modal from '../../components/Common/Modal';
import TextFieldSelect from '../Common/TextFieldSelect';
import { toast } from 'react-toastify';

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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AdminNomPays = () => {
  const params = useParams();
  const { id } = params;
  const [value, setValue] = useState(0);
  const [vendor, setVendor] = useState();
  const [country, setCountry] = useState("");
  const [document, setDocument] = useState();
  const [open, setOpen] = useState(false);
  const [openCalculationModal, setOpenCalculationModal] = useState(false);
  const [openAddDocument, setOpenAddDocument] = useState(false);
  const [openAddBomModal, setOpenAddBomModal] = useState(false);
  const [boms, setBoms] = useState();
  const [currentRadioValue, setCurrentRadioValue] = useState("");
  const [calculation, setCalculation] = useState();
  const [currency, setCurrency] = useState("");
  const [file, setFile] = useState("");
  useEffect(() => {
    handleCountryData();
  }, [openCalculationModal]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleCountryData = async () => {
    await API("get", `/countries/${id}`)
      .then((res) => {
        setCurrency(res?.data?.country?.currency)
        setCountry(res?.data?.country);
        setVendor(res?.data?.country?.vendors);
        setDocument(res?.data?.country?.documents);
        setBoms(res?.data?.country?.boms);
        setCalculation(res?.data?.country?.calculation);
        setCurrentRadioValue(res?.data?.country?.calculation?.type);
      })
      .catch((err) => {
        console.log("---->ERR", err);
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
        handleCountryData()
        setFile({})
        setOpen(false)
        toast.success(res.data.message)
      })
      .catch((err) => {
        console.log("errr", err);
      });
  };
  const handleCodesFile = (file) => setFile(file)

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
              &nbsp; {country?.name}
            </h1>
            {value === 0 ? (
              <div className="searching_div_country">
                <SearchField placeholder="Searching" className="Country_search_input" />
                <Button text="Edit" className="Edit_btn" />
              </div>
            ) : value === 1 ? (
              <div className="searching_div_country">
                <SearchField placeholder="Searching" className="Country_search_input" />
                  <Button text="Add " className="Edit_btn" onClick={() => setOpenAddDocument(true)} />
              </div>
            ) : value === 2 ? (
              <div className="searching_div_country2">
                <div className="searching_div_style">
                  <SearchField placeholder="Searching" className="Country_search_input" />
                  <Button text="Update BOMs" className="update_Boms_btn" onClick={() => setOpen(true)} />
                </div>
                <Button text="Add BOMs" className="Edit_btn" onClick={() => setOpenAddBomModal(true)} />
              </div>
            ) : value === 3 ? (
              <div className="searching_div_country3">
                <SearchField placeholder="Searching" className="Country_search_input2" />
                {currentRadioValue === "coefficient" && (
                        <Button text={currentRadioValue === "coefficient" ? "Edit" : "Add"} className="Edit_btn2" onClick={() => setOpenCalculationModal(true)} />
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
                  <Tab className="admin_tab_btn" label="Service providers" {...a11yProps(0)} />
                  <Tab className="admin_tab_btn" label="Documents" {...a11yProps(1)} />
                  <Tab className="admin_tab_btn" label="BOMs" {...a11yProps(2)} />
                  <Tab className="admin_tab_btn" label="Calculation" {...a11yProps(3)} />
                </Tabs>
              </Box>
              {/* table 1 */}

              <TabPanel value={value} index={0}>
                <div className="list_table">
                  <AdminTab1 vendor={vendor} />
                </div>
              </TabPanel>
              {/* table 2 */}
              <TabPanel value={value} index={1}>
                <div className="list_table">
                  <AdminTab2
                    rows={document}
                    img={DownArrow}
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
                    rows={boms}
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
      <Modal open={open} setOpen={setOpen} title="Update BOMs" handleClose={handleClose} Closebtn={true}>
        <div className="buyer_socond">
          <div className="luyer_input_field" >
            <label htmlFor="" className="bom_popup_label">
              Download your BOM file
            </label>
            <div className="bom_download_File_btn_div">
              <Link to={"/Files/Admintemplate.xlsx"} target="_blank" download className='bom_download'>Download current file</Link>
            </div>
          </div>
          <label htmlFor="" className="bom_popup_label" style={{ paddingBottom: "10px" }}>
            Upload your BOM file
          </label>
          <FilePicker
            index={"01"}
            fileName={file.name}
            name={file.name}
            onChange={(e) => handleCodesFile(e.target.files[0])}
          />
          <Button text="Submit" className="bom_downloadFile_btn" onClick={handleUplaodFile} />
        </div>
      </Modal>
    </>
  );
};

export default AdminNomPays;
