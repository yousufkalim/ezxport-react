import React from "react";
import DownloadIcon from "../../assets/Featured_icon.svg";
import { useTranslation } from "react-i18next";

const FilePicker = (props) => {
  const { t } = useTranslation();

  let allFiles = props?.fileName;
  if (props?.isMultiple) {
    const file = props?.fileName;
    if (props?.fileName?.length) {
      allFiles = props?.fileName?.map(item => item?.filename);
    }
    else {
      allFiles = props?.fileName;
    }
  } else {
    allFiles = props?.fileName;
  }

  return (
    <div className="filepicker_main_div">
      <label htmlFor={`file` + props?.index}>
        <input
          multiple={props?.multiple}
          id={`file` + props?.index}
          name={props?.name}
          accept={props.accept || "application/pdf,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"}
          type="file"
          disabled={props?.disabled}
          onChange={props?.onChange}
          className="filepicker_input"
        />
        <div style={{ alignItems: typeof allFiles === 'object' ? 'flex-start' : 'center' }} className="download_icon_div">
          {(typeof allFiles === "string" && allFiles) ? (
            allFiles
          ) : typeof allFiles === "object" && allFiles ? (
            allFiles?.map((item, index) => {
              return (
                <p key={index}>
                  {index + 1}). {item}
                </p>
              );
            })
          ) : (
            <>
              <img src={DownloadIcon} alt="" className="download_icon" />
              <div className="text_div">
                <div className="text_left"> {t("Click")} &nbsp;</div>
                {t("to upload files")}
              </div>
            </>
          )}
        </div>
      </label>
    </div>
  );
};

export default FilePicker;
