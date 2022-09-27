import React from "react";
import DownloadIcon from "../../assets/Featured_icon.svg";
import { useTranslation } from "react-i18next";

const FilePicker = (props) => {
  const { t } = useTranslation();

  let allFiles = props?.fileName;
  if (props.isMultiple) {
    const file = props?.fileName;
    allFiles = `${file?.filename || file?.url[0]?.split("-").slice(-3).reverse().pop()}  (${file?.url?.length})`
  } else {
    allFiles = props?.fileName;
  }

  return (
    <div className="filepicker_main_div">
      <label htmlFor={`file` + props.index}>
        <input
          multiple={props.multiple}
          id={`file` + props.index}
          name={props.name}
          type="file"
          disabled={props.disabled}
          onChange={props.onChange}
          className="filepicker_input"
          // value={props.value}
        />
        <div className="download_icon_div">
          {typeof allFiles === "string" ? (
            allFiles
          ) : typeof allFiles === "object" ? (
            allFiles?.map((item, index) => {
              return (
                <p>
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
