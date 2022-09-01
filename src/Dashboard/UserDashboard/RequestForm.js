import React from 'react';
import { Link } from 'react-router-dom';
import Form from './RequestForms/Form';

const RequestForm = () => {
  return (
    <div style={{ height: '100vh', display: 'flex' }}>
      <div
        style={{
          width: '20%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <Link to="/User/Dashboard/ListOfRequests" style={{ textDecoration: 'none' }}>
          <p
            style={{
              color: '#6941C6',
              marginTop: '1rem',
              textDecoration: 'none',
              fontSize: '1rem',
            }}
          >
            Return to Dashboard
          </p>
        </Link>
      </div>
      <div style={{ width: '80%' }}>
        <Form />
      </div>
    </div>
  );
};

export default RequestForm;
