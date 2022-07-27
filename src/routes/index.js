// Init
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Routes
import Login from '../Auth/Login';
import ForgetPassword from '../Auth/ForgetPassword';
import ResetPassword from '../Auth/ResetPassword';
import ChangePassword from '../Auth/ChangePassword';
import ChangeSuccessfully from '..//Auth/ChangeSuccessfully';
import Registration from '../Auth/Registration';
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
