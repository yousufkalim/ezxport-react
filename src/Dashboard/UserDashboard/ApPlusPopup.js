import React from 'react';
import Dialog from '@mui/material/Dialog';
import ClearIcon from '@mui/icons-material/Clear';

const ApPlusPopup = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="ApPlus_popup">
        <Dialog open={open} onClose={handleClose}>
          <div className="ApPlus_popup_form">
            <div className="ApPlus_popup_ha">
              <h2 className="ApPlus_popup_h2">AP Plus</h2>
              <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default ApPlusPopup;
