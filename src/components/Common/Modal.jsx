import React from 'react';
import Dialog from '@mui/material/Dialog';
import ClearIcon from '@mui/icons-material/Clear';


const Models = (props) => {

  return (
    <>
      <div>
        <Dialog
          fullWidth
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="buyer_main">
            <div className="buyer_heading">
              <h2 className="buyer_h2">{props.title}</h2>
              {props.Closebtn &&
              <ClearIcon onClick={() => props.setOpen(false)} style={{ cursor: 'pointer' }} />
              }
            </div>
            {props.children}
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default Models;
