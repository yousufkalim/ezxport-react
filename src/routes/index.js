// Init
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Routes
import Login from '../components/Screen/Login';
import ForgetPassword from '../components/Screen/ForgetPassword';
import ResetPassword from '../components/Screen/ResetPassword';
import ChangePassword from '../components/Screen/ChangePassword';
import ChangeSuccessfully from '../components/Screen/ChangeSuccessfully';
import Registration from '../components/Screen/Registration';
import UserLayouts from '../Layouts/UserLayouts';

const index = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/forgetpassword" component={ForgetPassword} />
        <Route exact path="/resetpassword" component={ResetPassword} />
        <Route exact path="/changepassword" component={ChangePassword} />
        <Route exact path="/changesuccessfully" component={ChangeSuccessfully} />
        <Route exact path="/registration" component={Registration} />
        {/* dashbourd  */}

        <Route path="/User/Dashboard" component={UserLayouts} />
      </Switch>
    </>
  );
};

export default index;
