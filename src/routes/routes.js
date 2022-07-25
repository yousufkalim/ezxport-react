import React from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom';
import ListOfRequests from '../components/Dashboard/ListOfRequests';
import Providers from '../components/Dashboard/Providers';
import AddressBook from '../components/Dashboard/AddressBook';
import Documents from '../components/Dashboard/Documents';
// icons of screen
import { ReactComponent as Logo1 } from '../assets/LILogo1.svg';
import { ReactComponent as Logo2 } from '../assets/LILogo2.svg';
import { ReactComponent as Logo3 } from '../assets/LILogo3.svg';
import { ReactComponent as Logo4 } from '../assets/LILogo4.svg';

// const RightSlide = () => {
//   return (
//     <>
//       <div className="dashboard_right_side">
//         <Switch>
//           <Route path="/User/Dashboard/ListOfRequests" render={() => <ListOfRequests />} />
//           <Route path="/User/Dashboard/Providers" render={() => <Providers />} />
//           <Route path="/User/Dashboard/AddressBook" render={() => <AddressBook />} />
//           <Route path="/User/Dashboard/Documents" render={() => <Documents />} />
//           <Redirect from="*" to="/User/Dashboard/ListOfRequests" />
//         </Switch>
//       </div>
//     </>
//   );
// };
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
];

export const AdminRoutes = [];
