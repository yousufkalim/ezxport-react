import React, { useEffect, useState } from "react";
import UserTable from "../../components/AdminDashboard/UserTable";
import API from "../../api/index";

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
    list: "Tééphone",
  },
  {
    list: "Adresse",
  },
  {
    list: "Code postal",
  },
  {
    list: "Ville",
  },
  {
    list: "Nom entreprise",
  },
  {
    list: "Type société",
  },
  {
    list: "Numéro de TVA",
  },
];

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
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
