import React from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom';
import FollowUp from '../Dashboard/UserDashboard/FollowUp';
import Providers from '../Dashboard/UserDashboard/Providers';
import AddressBook from '../Dashboard/UserDashboard/AddressBook';
import Documents from '../Dashboard/UserDashboard/Documents';
import AskQuestion from '../Dashboard/UserDashboard/AskQuestion';
import Application from '../Dashboard/UserDashboard/Appplication/index.js';
import Country from '../Dashboard/AdminDashboard/Country';
import ServiceProviders from '../Dashboard/AdminDashboard/ServiceProviders';
import Users from '../Dashboard/AdminDashboard/Users';
import Requests from '../Dashboard/AdminDashboard/Requests';
// icons of screen
import { ReactComponent as Logo1 } from '../assets/LILogo1.svg';
import { ReactComponent as Logo2 } from '../assets/LILogo2.svg';
import { ReactComponent as Logo3 } from '../assets/LILogo3.svg';
import { ReactComponent as Logo4 } from '../assets/LILogo4.svg';
import Logo5 from '../assets/LILogo5.svg';
import { ReactComponent as AdminLogo1 } from '../assets/AdminLogo1.svg';
import { ReactComponent as AdminLogo2 } from '../assets/AdminLogo2.svg';
import { ReactComponent as AdminLogo3 } from '../assets/AdminLogo3.svg';

export const UserRoutes = [
  {
    path: '/User/Dashboard/ListOfRequests',
    name: 'Follow-up of requests',
    icon: <Logo1 />,
    component: FollowUp,
  },
  {
    path: '/User/Dashboard/Providers',
    name: 'Service providers',
    icon: <Logo2 />,
    component: Providers,
  },
  {
    path: '/User/Dashboard/AddressBook',
    name: 'Address Book',
    icon: <Logo3 />,
    component: AddressBook,
  },
  {
    path: '/User/Dashboard/Documents',
    name: 'Documents',
    icon: <Logo4 />,
    component: Documents,
  },
  // Routes cannot be add after this should be added before this comment
  {
    path: '/User/Dashboard/AskQuestion',
    name: ' Ask a question',
    icon: Logo5,
    component: AskQuestion,
  },
  {
    path: '/User/Dashboard/Application',
    name: 'Application',
    component: Application,
  },
];

export const AdminRoutes = [
  {
    path: '/Admin/Dashboard/Country',
    name: 'Country',
    icon: <AdminLogo1 />,
    component: Country,
  },
  {
    path: '/Admin/Dashboard/Service',
    name: 'Service providers',
    icon: <AdminLogo2 />,
    component: ServiceProviders,
  },
  {
    path: '/Admin/Dashboard/Users',
    name: 'Users',
    icon: <AdminLogo2 />,
    component: Users,
  },
  {
    path: '/Admin/Dashboard/Requests',
    name: 'Requests',
    icon: <AdminLogo3 />,
    component: Requests,
  },
  // Routes cannot be add after this should be added before this comment
];
