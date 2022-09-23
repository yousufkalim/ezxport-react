import React from "react";
import Dialog from "@mui/material/Dialog";
import ClearIcon from "@mui/icons-material/Clear";
import { useTranslation } from "react-i18next";

const Models = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <Dialog
          fullWidth
          open={props?.open}
          onClose={props?.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={props.className}
        >
          <div className="buyer_main">
            <div className="buyer_heading">
              <h2 className="buyer_h2">{t(props?.title)}</h2>
              {props?.Closebtn && (
                <ClearIcon
                  onClick={() => {
                    props?.setOpen(false);
                    props?.handleClose();
                  }}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
            {props?.children}
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default Models;
