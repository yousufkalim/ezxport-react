import React, { useEffect, useState } from "react";
import SearchIcon from "../../../assets/SearchIcon.svg";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import API from "../../../api/index";
import DocumentByRequest from "./subcomponents/DocumentByRequest";
import DocumentByName from "./subcomponents/DocumentByName";
import { useTranslation } from "react-i18next";
import toaster from "../../../utils/toaster";
import SearchField from "../../../components/Common/SearchField";

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

const Documents = () => {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [codes, setCodes] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { t } = useTranslation();

  const userData = localStorage.getItem("userData");
  const user = JSON.parse(userData);

  useEffect(() => {
    getAllRequests();
  }, []);

  const getAllRequests = async () => {
    setLoading(true);
    await API("get", `/requests/returnMultipleFormatedRequest/${user._id}`)
      .then((res) => {
        const allRequests = res.data?.Request;
        if (allRequests?.length) {
          const allCodes = allRequests?.filter((item) => item?.codes.length > 0);
          const allDocuments = allRequests?.filter((item) => item?.documents.length > 0);
          setDocuments(allDocuments);
          setCodes(allCodes);
        }
        setLoading(false);
      })
      .catch((err) => {
        toaster("Failed", t("Something went wrong!"));
        setLoading(false);
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          <div className="List_heading_div">
            <h1 className="list_h1_doc">{t("Documents")}</h1>
            <div className="searching4">
              <SearchField placeholder="Search" setSearch={setSearchTerm} />
            </div>
          </div>
          <div className="list_table">
            <Box sx={{ width: "100%" }}>
              <Box>
                <Tabs value={value} onChange={handleChange}>
                  <Tab className="tab_btn1" label={t("By Nomenclature")} {...a11yProps(0)} />
                  <Tab className="tab_btn3" label={t("By Request")} {...a11yProps(2)} />
                </Tabs>
              </Box>
              <br />
              <TabPanel value={value} index={0}>
                <DocumentByRequest
                  searchTerm={searchTerm}
                  documents={documents}
                  setDocuments={setDocuments}
                  loading={loading}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <DocumentByName
                  searchTerm={searchTerm}
                  codes={codes}
                  setCodes={setCodes}
                  loading={loading}
                />
              </TabPanel>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default Documents;
