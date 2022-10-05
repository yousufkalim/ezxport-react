import toaster from '../utils/toaster';

export const checkFileType = (file, t) => {
  const fileTypes = ['pdf', 'xlxs', 'docs', 'doc'];
  const fileType = file?.name?.split('.')[1];
  if (fileTypes.includes(fileType)) {
    return file;
  } else {
    toaster('Failed', t('Invalid file type, only DOCX PDF and EXCEL &nbsp;is allowed!'));
  }
};
