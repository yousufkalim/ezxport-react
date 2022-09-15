import { Dialog } from '@mui/material';
import React from 'react'
import Button from './Button';

const ConfirmModal = ({open, setOpen, action}) => {

    const handleClose = () => {
        setOpen(false);
    }

  return (
    <Dialog
          fullWidth
          open={open}
          className="confirm_modal"
          onClose={() => handleClose(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="buyer_main">
            <div className="buyer_heading">
              <h2 className="buyer_h2">Are you sure to delete?</h2>
            </div>
            <div className="confirm_modal_buttons">
                <Button text="Yes" className="confirm_modal_btn" onClick={(id) => action(id)} />
                <Button text="No" className="confirm_modal_btn confirm_modal_btn_no" onClick={() => handleClose()} />
            </div>  
          </div>
        </Dialog>
  )
}

export default ConfirmModal