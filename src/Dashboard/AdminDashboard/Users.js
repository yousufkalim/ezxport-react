import React from 'react';
import UserTable from '../../components/AdminDashboard/UserTable';
import DownArrow from '../../assets/TitleDownArrow.svg';

const rows = [
  {
    fname: 'First name',
    lname: 'Last name',
    Email: 'E-mail address',
    number: '+33 04 93 83 83 20',
    adress: '89 chaussée de rouvroy',
    postal: '75000',
    cntry: 'Paris',
    enterprise: 'NomEntreprise',
    typs: 'Type',
    vatNumber: '6748933483904',
  },
  {
    fname: 'First name',
    lname: 'Last name',
    Email: 'E-mail address',
    number: '+33 04 93 83 83 20',
    adress: '89 chaussée de rouvroy',
    postal: '75000',
    cntry: 'Paris',
    enterprise: 'NomEntreprise',
    typs: 'Type',
    vatNumber: '6748933483904',
  },
  {
    fname: 'First name',
    lname: 'Last name',
    Email: 'E-mail address',
    number: '+33 04 93 83 83 20',
    adress: '89 chaussée de rouvroy',
    postal: '75000',
    cntry: 'Paris',
    enterprise: 'NomEntreprise',
    typs: 'Type',
    vatNumber: '6748933483904',
  },
  {
    fname: 'First name',
    lname: 'Last name',
    Email: 'E-mail address',
    number: '+33 04 93 83 83 20',
    adress: '89 chaussée de rouvroy',
    postal: '75000',
    cntry: 'Paris',
    enterprise: 'NomEntreprise',
    typs: 'Type',
    vatNumber: '6748933483904',
  },
  {
    fname: 'First name',
    lname: 'Last name',
    Email: 'E-mail address',
    number: '+33 04 93 83 83 20',
    adress: '89 chaussée de rouvroy',
    postal: '75000',
    cntry: 'Paris',
    enterprise: 'NomEntreprise',
    typs: 'Type',
    vatNumber: '6748933483904',
  },
];

const HeadTitle = [
  {
    list: 'First name',
  },
  {
    list: 'Last name',
  },
  {
    list: 'E-mail address',
  },
  {
    list: 'Tééphone',
  },
  {
    list: 'Adresse',
  },
  {
    list: 'Code postal',
  },
  {
    list: 'Ville',
  },
  {
    list: 'Nom entreprise',
  },
  {
    list: 'Type société',
  },
  {
    list: 'Numéro de TVA',
  },
];

const Users = () => {
  return (
    <>
      <UserTable headTitle={HeadTitle} title="Users" rows={rows} img={DownArrow} />
    </>
  );
};

export default Users;
