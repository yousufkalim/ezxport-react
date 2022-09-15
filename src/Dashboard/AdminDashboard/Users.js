import React, { useEffect, useState } from 'react';
import UserTable from '../../components/AdminDashboard/UserTable';
import API from '../../api/index';
import { getSortedData } from '../../lib/getSortedData';

const HeadTitle = [
  {
    list: 'Last name',
    key: 'last_name'
  },
  {
    list: 'First name',
    key: 'first_name'

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

  useEffect(() => {
    HandleAllUser();
  }, []);

  const HandleAllUser = async () => {
    await API('get', '/users/')
      .then((res) => {
        setAllUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSort = (field, ascend, data, setData,setSort ,nestedTitles) => {
    console.log("handle field ===>  ", field);
    console.log("handle ascend ===>  ", ascend);
    console.log("handle data ===>  ", data);
    console.log("handle data ===>  ", nestedTitles);
    getSortedData(data, setData,setSort ,nestedTitles,field, ascend, (res) => {
      console.log("Get sorted data ", res);
    })
    // setData(sortedUsers)
  }

  return (
    <>
      <UserTable sort={sort} sortData={(field, ascend) => getSortedData( allUsers,setAllUsers, setSort, nestSortTitles, field, ascend)} headTitle={HeadTitle} title="Users" rows={allUsers} />
    </>
  );
};

export default Users;
