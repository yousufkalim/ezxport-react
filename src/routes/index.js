// Init
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import API from '../api';

// Routes
import { toast } from 'react-toastify';
import Login from '../Auth/Login';
import ForgetPassword from '../Auth/ForgetPassword';
import ResetPassword from '../Auth/ResetPassword';
import ChangePassword from '../Auth/ChangePassword';
import ChangeSuccessfully from '..//Auth/ChangeSuccessfully';
import Registration from '../Auth/Registration';
import UserLayouts from '../Layouts/UserLayouts';
import AdminLayouts from '../Layouts/AdminLayouts';
const queryParams = new URLSearchParams(window.location.search);
const Reset = queryParams.get('reset');
const Token = queryParams.get('token');
const Index = () => {
  const history = useHistory(null);
  const [resetPassword, setResetPassword] = useState(false);
  useEffect(() => {
    if (Reset) {
      if (Token) {
        handleVerifyToken(Token);
      }
    }
  }, []);
  const handleVerifyToken = async (Token) => {
    await API("get", `/auth/verify-token/${Token}`)
      .then((res) => {
        setResetPassword(res.data.success);
        history.push("/changepassword");
      })
      .catch((err) => {
        history.push("/");
        toast.error(err.response.data.message);
      });
  };
  return (
    <>
      <Switch>
        {resetPassword ? (
          <>
            <Route
              exact
              path="/changepassword"
              render={() => <ChangePassword Token={Token} setResetPassword={setResetPassword} />}
            />
          </>
        ) : (
          <>
            <Route exact path="/" component={Login} />
            <Route exact path="/forgetpassword" component={ForgetPassword} />
            <Route exact path="/registration" component={Registration} />
            {/* dashbourd  */}

            <Route path="/User/Dashboard" component={UserLayouts} />
            <Route path="/Admin/Dashboard" component={AdminLayouts} />
          </>
        )}
      </Switch>
    </>
  );
};

export default Index;
