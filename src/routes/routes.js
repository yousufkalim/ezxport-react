import React from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom';
import ListOfRequests from '../Dashboard/UserDashboard/ListOfRequests';
import Providers from '../Dashboard/UserDashboard/Providers';
import AddressBook from '../Dashboard/UserDashboard/AddressBook';
import Documents from '../Dashboard/UserDashboard/Documents';
import AskQuestion from '../Dashboard/UserDashboard/AskQuestion';
import Application from '../Dashboard/UserDashboard/Application';
// icons of screen
import { ReactComponent as Logo1 } from '../assets/LILogo1.svg';
import { ReactComponent as Logo2 } from '../assets/LILogo2.svg';
import { ReactComponent as Logo3 } from '../assets/LILogo3.svg';
import { ReactComponent as Logo4 } from '../assets/LILogo4.svg';
import { ReactComponent as Logo5 } from '../assets/LILogo5.svg';

export const UserRoutes = [
  {
    path: '/User/Dashboard/ListOfRequests',
    name: 'Follow-up of requests',
    icon: <Logo1 />,
    component: ListOfRequests,
  },
  {
    path: '/User/Dashboard/Providers',
    name: 'Providers',
    icon: <Logo2 />,
    component: Providers,
  },
  {
    path: '/User/Dashboard/AddressBook',
    name: 'AddressBook',
    icon: <Logo3 />,
    component: AddressBook,
  },
  {
    path: '/User/Dashboard/Documents',
    name: 'Documents',
    icon: <Logo4 />,
    component: Documents,
  },
  {
    path: '/User/Dashboard/AskQuestion',
    name: 'AskQuestion',
    icon: <Logo5 />,
    component: AskQuestion,
  },
  {
    path: '/User/Dashboard/Application',
    name: 'Application',
    // icon: <Logo5 />,
    component: Application,
  },
];

export const AdminRoutes = [];
