import React, { useEffect, useState } from "react";
import UserTable from "../../components/AdminDashboard/UserTable";
import API from "../../api/index";
import { useTranslation, Trans } from "react-i18next";

const HeadTitle = [
  {
    list: "Last name",
  },
  {
    list: "First name",
  },
  {
    list: "E-mail address",
  },
  {
    list: "Telephone",
  },
  {
    list: "Address",
  },
  {
    list: "Postal code",
  },
  {
    list: "Town",
  },
  {
    list: "Company name",
  },
  {
    list: "Company type",
  },
  {
    list: "VAT number",
  },
];

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);

  const { t, i18n } = useTranslation();
  const { language } = i18n;

  useEffect(() => {
    HandleAllUser();
  }, []);

  const HandleAllUser = async () => {
    await API("get", "/users/")
      .then((res) => {
        setAllUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <UserTable headTitle={HeadTitle} title="Users" rows={allUsers} />
    </>
  );
};

export default Users;
