import React from 'react';
import "../../css/ErrorPage.css";
import Button from './Button';
import ERROR from "../../assets/not-found.jpg";

const ErrorFallback = () => {

    const reloadPage = () => {
        window.location.reload();
    }

  return (
    <div className='error-screen'>
        <img className='error-placeholder' src={ERROR} alt='page-error' />
        <Button className="error-reload-btn" text='Reload' onClick={reloadPage} />
    </div>
  )
}

export default ErrorFallback