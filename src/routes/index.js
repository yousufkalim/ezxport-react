// Init
import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import API from '../api';

// unAUTH Routes
import { toast } from 'react-toastify';
import Login from '../Auth/Login';
import ForgetPassword from '../Auth/ForgetPassword';
import ChangePassword from '../Auth/ChangePassword';
import Registration from '../Auth/Registration';
// AUTH Routes
import UserLayouts from '../Layouts/UserLayouts';
import AdminLayouts from '../Layouts/AdminLayouts';
import RequestForm from '../Dashboard/UserDashboard/RequestForm';
import ValidateRequest from '../Dashboard/AdminDashboard/ValidateRequest/index';
import SendDocuments from '../components/Common/SendDocuments';

const queryParams = new URLSearchParams(window.location.search);
const Reset = queryParams.get('reset');
const Token = queryParams.get('token');
const Index = ({ role }) => {
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
    await API('get', `/auth/verify-token/${Token}`)
      .then((res) => {
        setResetPassword(res.data.success);
        history.push('/changepassword');
      })
      .catch((err) => {
        history.push('/');
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
            {/* Auth routes */}
            {role === 'user' ? (
              <>
                <Route path="/User/Dashboard" component={UserLayouts} />
                <Route path="/User/RequestForm" component={RequestForm} />
                <Redirect from="/" to="/User/Dashboard/ListOfRequests" />
              </>
            ) : role === 'admin' ? (
              <>
                <Route path="/Admin/Dashboard" component={AdminLayouts} />
                <Route path="/Admin/ValidateRequest/:id" component={ValidateRequest} />
                <Route path="/SendDocuments" component={SendDocuments} />
                <Redirect from="/" to="/Admin/Dashboard/Country" />
              </>
            ) : (
              !role && (
                <>
                  {/* unAuth routes */}
                  <Redirect from="/" to="/" />
                  <Route exact path="/" component={Login} />
                  <Route exact path="/forgetpassword" component={ForgetPassword} />
                  <Route exact path="/registration" component={Registration} />
                </>
              )
            )}
          </>
        )}
      </Switch>
    </>
  );
};

export default Index;
