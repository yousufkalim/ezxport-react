import React, { useEffect, useState } from 'react';
import UserTable from '../../components/AdminDashboard/UserTable';
import API from '../../api/index';
import { useTranslation } from 'react-i18next';
import { getSortedData } from '../../lib/getSortedData';
import toaster from '../../utils/toaster';
const HeadTitle = [
  {
    list: 'Last name',
    key: 'last_name',
    sortIcon: true,
  },
  {
    list: 'First name',
    key: 'first_name',
    sortIcon: true,
  },
  {
    list: 'E-mail address',
    key: 'email',
  },
  {
    list: 'Telephone',
    key: 'phone_number',
  },
  {
    list: 'Address',
    key: 'address',
  },
  {
    list: 'Postal code',
    key: 'zipcode',
  },
  {
    list: 'Town',
    key: 'city',
  },
  {
    list: 'Company name',
    key: 'name',
  },
  {
    list: 'Company type',
    key: 'type',
  },
  {
    list: 'VAT number',
    key: 'vat',
  },
  {
    list: '',
    key: 'action',
  },
];

const nestSortTitles = [
  {
    title: 'company',
    fields: ['name', 'type', 'vat'],
  },
];

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState({ key: '', ascend: true });

  const { t } = useTranslation();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    await API('get', '/users/')
      .then((res) => {
        setAllUsers(res?.data?.users);
        setLoading(false);
      })
      .catch((err) => {
        toaster("Failed", t("Users not found"), "User");
        setLoading(false);
      });
  };

  return (
    <>
      <UserTable
        sort={sort}
        loading={loading}
        sortData={(field, ascend) =>
          getSortedData(allUsers, setAllUsers, setSort, nestSortTitles, field, ascend)
        }
        getUsers={fetchUsers}
        headTitle={HeadTitle}
        title={t('Users')}
        rows={allUsers}
      />
    </>
  );
};

export default Users;
