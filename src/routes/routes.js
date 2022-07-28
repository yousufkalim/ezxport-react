import React from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom';
import ListOfRequests from '../Dashboard/UserDashboard/ListOfRequests';
import Providers from '../Dashboard/UserDashboard/Providers';
import AddressBook from '../Dashboard/UserDashboard/AddressBook';
import Documents from '../Dashboard/UserDashboard/Documents';
import AskQuestion from '../Dashboard/UserDashboard/AskQuestion';
import Application from '../Dashboard/UserDashboard/Application';
import Country from '../Dashboard/AdimDashboard/Country';
import ServiceProviders from '../Dashboard/AdimDashboard/ServiceProviders';
import Users from '../Dashboard/AdimDashboard/Users';
import Requests from '../Dashboard/AdimDashboard/Requests';
// icons of screen
import { ReactComponent as Logo1 } from '../assets/LILogo1.svg';
import { ReactComponent as Logo2 } from '../assets/LILogo2.svg';
import { ReactComponent as Logo3 } from '../assets/LILogo3.svg';
import { ReactComponent as Logo4 } from '../assets/LILogo4.svg';
import { ReactComponent as Logo5 } from '../assets/LILogo5.svg';

export const UserRoutes = [
  {
    path: "/User/Dashboard/ListOfRequests",
    name: "Follow-up of requests",
    icon: <Logo1 />,
    component: ListOfRequests,
  },
  {
    path: "/User/Dashboard/Providers",
    name: "Service providers",
    icon: <Logo2 />,
    component: Providers,
  },
  {
    path: "/User/Dashboard/AddressBook",
    name: "Address Book",
    icon: <Logo3 />,
    component: AddressBook,
  },
  {
    path: "/User/Dashboard/Documents",
    name: "Documents",
    icon: <Logo4 />,
    component: Documents,
  },
  {
    path: "/User/Dashboard/AskQuestion",
    name: " Ask a question",
    icon: <Logo5 />,
    component: AskQuestion,
  },
  {
    path: "/User/Dashboard/Application",
    name: "Application",
    component: Application,
  },
];

export const AdminRoutes = [
  {
    path: '/admin/Dashboard/Country',
    name: 'Country',
    icon: <Logo1 />,
    component: Country,
  },
  {
    path: '/admin/Dashboard/Service',
    name: 'Service providers',
    icon: <Logo2 />,
    component: ServiceProviders,
  },
  {
    path: '/admin/Dashboard/Users',
    name: 'Users',
    icon: <Logo3 />,
    component: Users,
  },
  {
    path: '/admin/Dashboard/Requests',
    name: 'Requests',
    icon: <Logo4 />,
    component: Requests,
  },
];
