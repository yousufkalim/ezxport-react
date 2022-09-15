import React from "react";
import DownloadIcon from "../../assets/Featured_icon.svg";
import { useTranslation, Trans } from "react-i18next";

const FilePicker = (props) => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;

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
          value={props.value}
        />
        <div className="download_icon_div">
          {typeof props.fileName === "string" ? (
            props.fileName
          ) : typeof props.fileName === "object" ? (

            props?.fileName?.map((item, index) => {
              return <p>
                {index + 1}). {item}
              </p>
            }
            )
          )
            : (
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
