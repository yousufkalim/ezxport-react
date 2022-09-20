import React, { useEffect, useState } from "react";
import UserTable from "../../components/AdminDashboard/UserTable";
import API from "../../api/index";
import { useTranslation, Trans } from "react-i18next";
import { getSortedData } from '../../lib/getSortedData';

const HeadTitle = [
  {
    list: 'Last name',
    key: 'last_name',
    sortIcon: true
  },
  {
    list: 'First name',
    key: 'first_name',
    sortIcon: true
  },
  {
    list: 'E-mail address',
    key: 'email'

  },
  {
    list: 'Telephone',
    key:'phone_number'
  },
  {
    list: 'Address',
    key: 'address'
  },
  {
    list: 'Postal code',
    key: 'zipcode'
  },
  {
    list: 'Town',
    key: 'city'

  },
  {
    list: 'Company name',
    key: 'name'

  },
  {
    list: 'Company type',
    key: 'type'

  },
  {
    list: 'VAT number',
    key: 'vat'

  },
];

const nestSortTitles = [
  {
    title: 'company',
    fields: ['name', 'type', 'vat']
  }
]

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [sort, setSort] = useState({key: "", ascend: true});


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
      <UserTable
        sort={sort}
        sortData={(field, ascend) => getSortedData(allUsers, setAllUsers, setSort, nestSortTitles, field, ascend)}
        headTitle={HeadTitle}
        title="Users"
        rows={allUsers}
      />
    </>
  );
};

export default Users;
