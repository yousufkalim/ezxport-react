import React from 'react';
import AdminCountry from '../../components/AdminDashboard/AdminCountry';
import DownArrow from '../../assets/TitleDownArrow.svg';

const rows = [
  {
    createData: 'Prestataire',
  },
  {
    createData: 'Prestataire ',
  },
  {
    createData: 'Prestataire ',
  },
  {
    createData: 'Prestataire ',
  },
  {
    createData: 'Prestataire ',
  },
];

const ServiceProviders = () => {
  return (
    <>
      <AdminCountry
        title="Service providers"
        rows={rows}
        text="Prestataire"
        text2="Pays associés"
        img={DownArrow}
      />
    </>
  );
};

export default ServiceProviders;
