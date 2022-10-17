import React from 'react';
import DownloadIcon from '../../assets/Featured_icon.svg';
import { useTranslation } from 'react-i18next';
import crossIcon from '../../assets/close.png';
import mime from 'mime';

const FilePicker = props => {
  const { t } = useTranslation();

  let allFiles = props?.fileName;
  if (props?.isMultiple) {
    const file = props?.fileName;
    if (props?.fileName?.length) {
      allFiles = props?.fileName?.map(item => item?.filename);
    } else {
      allFiles = props?.fileName;
    }
  } else {
    allFiles = props?.fileName;
  }

  const mimeTypes =
    props.accept ||
    'application/pdf,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  const extensions = mimeTypes
    .replace(' ', '')
    .split(',')
    .map(extension => `.${mime.getExtension(extension)}`)
    .filter(Boolean);

  return (
    <div className="filepicker_main_div">
      <label htmlFor={`file` + props?.index}>
        <input
          multiple={props?.multiple}
          id={`file` + props?.index}
          name={props?.name}
          accept={mimeTypes}
          type="file"
          disabled={props?.disabled}
          onChange={props?.onChange}
          className="filepicker_input"
        />
        <div
          style={{
            alignItems: typeof allFiles === 'object' && allFiles.length ? 'flex-start' : 'center'
          }}
          className="download_icon_div">
          {typeof allFiles === 'string' && allFiles ? (
            allFiles
          ) : typeof allFiles === 'object' && allFiles?.length ? (
            allFiles?.map((item, index) => {
              return (
                <p key={index} style={{ display: 'flex', alignItems: 'center' }}>
                  {index + 1}). {item} &nbsp;{' '}
                  {props.isDelete && (
                    <p
                      className="delete_product_file"
                      onClick={e => props.handleDelete(e, item, index)}>
                      <img src={crossIcon} alt="cross" />
                    </p>
                  )}
                </p>
              );
            })
          ) : (
            <>
              <img src={DownloadIcon} alt="" className="download_icon" />
              <div className="text_div">
                <div className="text_left"> {t('Click')} &nbsp;</div>
                <div>{t('to upload files')}</div>
              </div>
              <div className="extension_accepted required">{extensions.join(',')}</div>
            </>
          )}
        </div>
      </label>
    </div>
  );
};

export default FilePicker;
