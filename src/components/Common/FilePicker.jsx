import React from "react";
import DownloadIcon from "../../assets/Featured_icon.svg";

const FilePicker = (props) => {
  return (
    <div className="filepicker_main_div">
      <label htmlFor={`file` + props.label}>
        <input
        multiple
          id={`file` + props.label}
          name={props.name}
          type="file"
          disabled={props.disabled}
          onChange={props.onChange}
          className="filepicker_input"
          value={props.value}
        />
        <div  className="download_icon_div">
        <img src={DownloadIcon} alt="" className="download_icon"/>
        <div className="text_div"><div className="text_left">Cliquer&nbsp;</div>pour télécharger le fichier nomenclature</div>
        </div>
      </label>
    </div>
  );
};

export default FilePicker;
