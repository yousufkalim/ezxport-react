import React from 'react';
import AdminCountry from '../../components/AdminDashboard/AdminCountry';
import DownArrow from '../../assets/TitleDownArrow.svg';

const rows = [
  {
    createData: 'NomPays',
  },
  {
    createData: 'NomPays ',
  },
  {
    createData: 'NomPays ',
  },
  {
    createData: 'NomPays ',
  },
  {
    createData: 'NomPays ',
  },
];

const Country = () => {
  return (
    <>
      <AdminCountry title="Country" rows={rows} text="Country" img={DownArrow} />
    </>
  );
};

export default Country;
