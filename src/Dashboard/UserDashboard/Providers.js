import React, { useEffect, useState } from "react";
import SearchIcon from "../../assets/SearchIcon.svg";
import ProvidersTable from "../../components/UserDashboard/ProvidersTable";
import API from "../../api/index";
import toaster from "../../utils/toaster";
import { useTranslation } from "react-i18next";
import { createFilter } from "react-search-input";
import SearchField from "../../components/Common/SearchField";

const KEYS_TO_FILTERS = ['name'];


const Providers = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const user = localStorage.getItem("userData");
  const userData = JSON.parse(user);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getProviders();
  }, []);

  const getProviders = async () => {
    setLoading(true);
    await API("get", `/vendors/userVendor/${userData._id}`)
      .then((res) => {
        const data = res?.data?.Uservendors?.map((item) => ({
          ...item.vendor,
          email: item.contact_email,
          firstName: item.contact_fname,
          lastName: item.contact_lname,
          userVendorId: item._id,
        }));
        setProviders(data);
        setLoading(false);
      })
      .catch((err) => {
        toaster("Failed", "Something went wrong!");
        setLoading(false);
      });
  };

  const searchedResults = providers.filter(createFilter(searchTerm, KEYS_TO_FILTERS));

  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          <div className="List_heading_div5">
            <h1 className="list_h1_provider">{t("Service providers")}</h1>
            <div className="searching_provider">
              <SearchField setSearch={setSearchTerm} />
            </div>
          </div>
          <ProvidersTable
            data={searchedResults}
            setData={setProviders}
            getProviders={getProviders}
            dataLoading={loading}
            // Icons={false}
          />
        </div>
      </div>
    </>
  );
};
export default Providers;
