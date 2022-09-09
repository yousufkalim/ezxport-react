import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Spinner = ({color = 'secondary'}) => {
  return (
    <CircularProgress className='spinner' color={color} /> 
  )
}

export default Spinner