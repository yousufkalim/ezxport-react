import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Spinner = ({className, color = 'secondary'}) => {
  return (
    <CircularProgress className={`${className} spinner`} color={color} /> 
  )
}

export default Spinner