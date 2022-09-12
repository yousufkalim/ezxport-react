import React, { useState, useEffect } from 'react';
import Inputfield from '../../../components/Common/InputField';
import Button from '../../../components/Common/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DownArrow from '../../../assets/TitleDownArrow.svg';
import Paper from '@mui/material/Paper';
import DeleteIcon from '../../../assets/DeleteIcon.svg';
import EditIcon from '../../../assets/EditIcon.svg';
import Modal from '../../../components/Common/Modal';
import { ReactComponent as Featured1 } from '../../../assets/Featured1.svg';
import InputField from '../../../components/Common/InputField';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import { ReactComponent as Featured } from '../../../assets/Featured.svg';
import API from '../../../api/index';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const user = JSON.parse(localStorage.getItem('userData'));
const BOMsForm = (props) => {
  const history = useHistory(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [verificationModal, setVerificationModal] = useState(false);
  const [countries, setCounteries] = useState();
  const [code, setCode] = useState('default');
  const [monetaryValue, setMonetaryValue] = useState('');
  const [retrieveRequestId, setRetrieveRequestId] = useState('');
  const [requestByCountry, setRequestByCountry] = useState([]);
  const [editModalData, setEditModalData] = useState({});
  const [importedFile, setImportedFile] = useState();
  const [loading, setLoading] = useState(false);

  const handleAllRequestByCountryId = async () => {
    await API('get', `/requests/getByCountry/${props?.step1?.country}`)
      .then((res) => {
        setRequestByCountry(res?.data?.requet);
      })
      .catch((err) => {
        console.log('handleAllRequestByCountryId=>', err);
        toast.error(err.response.data.message.msg);
      });
  };
  useEffect(() => {
    handleAllRequestByCountryId();
  }, [props?.step1?.country]);
  useEffect(() => {
    if (props?.step1?.country !== '') {
      handleTitle();
    }
  }, [props?.step1?.country]);

  const handleEditModal = () => setOpenEditModal(false);
  const handleCertificateRequire = () => props.setCertificateRequire(false);
  const handleCertificateNotRequire = () => props.setCertificateNotRequire(false);
  const handleVerification = () => setVerificationModal(false);
  const handleGetAllCountry = async () => {
    await API('get', '/countries/')
      .then((res) => {
        setCounteries(res.data.countries);
      })
      .catch((err) => {
        toast.error(err.response.data.message.msg);
      });
  };
  useEffect(() => {
    handleGetAllCountry();
  }, []);
  const handleAddCodes = () => {
    props.matchedData.push({
      code: code?.code,
      codeID: code?._id,
      monetary_value: monetaryValue || '--',
      certification_required: code?.certification_required,
    });
    let filtered = props.unMatchedData.filter((item) => {
      return item?.code !== code.code;
    });
    props.setUnMatchedData(filtered);
    setCode('default');
    setMonetaryValue('');
  };

  const handleDocument = async (file) => {
    setLoading(true);
    setImportedFile(file);
    let formData = new FormData();
    formData.append('file', file);
    formData.append('country', `${props.step1.country}`); //country ID
    await API('post', '/boms/filterCodes', formData)
      .then((res) => {
        console.log('RESSS', res);
        setLoading(false);
        let arr1 = [];
        res?.data?.matchedData.map((item) => {
          arr1.push({
            code: item?.bom?.code,
            codeID: item?.bom?._id,
            monetary_value: monetaryValue || item?.monetary_value,
            certification_required: item.bom?.certification_required,
          });
        });

        props?.setMatchedData([...props.matchedData, ...arr1]);
        props?.setUnMatchedData(res?.data?.unMatched);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.message.msg);
        setImportedFile('');
      });
  };
  const handleDelete = (code) => {
    let filtered = props.matchedData.filter((item) => {
      return item.codeID !== code.codeID;
    });
    props.setMatchedData(filtered);
  };
  const handleTitle = async () => {
    await API('post', '/requests/createName', {
      userId: user._id,
      countryId: props?.step1?.country,
    })
      .then((res) => {
        props.handleChange('title', (res?.data?.tile).toUpperCase());
      })
      .catch((err) => {
        toast.error(err.response.data.message.msg);
      });
  };
  const handleSearchTitle = async () => {
    await API('post', '/requests/searchName/', {
      title: props?.step1?.title,
    })
      .then((res) => {
        props.handleChange('title', res?.data?.tile);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div style={{ width: '100%' }}>
      <label className="BomLabel">Country</label>
      <Select
        name="country"
        id="demo-simple-select"
        defaultValue={'123'}
        onChange={(e) => {
          props.handleChange(e.target.name, e.target.value);
        }}
        className="countrydropdown"
      >
        <MenuItem disabled value="123">
          Select a Country
        </MenuItem>
        {countries?.map((item) => {
          return <MenuItem value={item?._id}>{item?.name}</MenuItem>;
        })}
      </Select>

      <label className="BomLabel">
        Create a new request or select an old request to retrieve information
      </label>
      <Select
        id="demo-simple-select"
        defaultValue={'default'}
        onChange={(e) => {
          setRetrieveRequestId(e.target.value);
        }}
        className="countrydropdown"
      >
        <MenuItem value="default">Create a new Request</MenuItem>
        {requestByCountry?.map((item) => {
          return <MenuItem value={item?._id}>{item?.title}</MenuItem>;
        })}
      </Select>
      <label className="BomLabel">Application title</label>
      <Inputfield
        style={{ width: '100%' }}
        name="title"
        placeholder="Application title"
        className="applicationTitle2"
        onChange={(e) => {
          props.handleChange(e.target.name, e.target.value);
        }}
        onBlur={handleSearchTitle}
        value={props.step1.title}
      />
      <div className="ProductList_boms" style={{ display: 'flex' }}>
        <div style={{ width: '50%' }} className="product_link_btns">
          <span className="title_productList">Product lists</span>
          <br />
          <u className="title_productList_link">You don't know your product nomenclatures?</u>
        </div>
        <div className="product_link_btns_bottons">
          <div className="CircularProgress">
            {loading ? <CircularProgress color="secondary" /> : ''}
          </div>
          <label className="import_Btn" htmlFor="file">
            {importedFile?.name || 'Import an XLS file'}
            <input
              type="file"
              style={{ display: 'none' }}
              id="file"
              onChange={(e) => handleDocument(e.target.files[0])}
            />
          </label>

          <Button text="Download XLS file" className="download_Btn" />
        </div>
      </div>
      <div className="monetary_value_div">
        <div className="codedropdown_div">
          <label className="BomLabel" style={{ marginTop: '1rem' }}>
            Code
          </label>

          <Select
            name="codes"
            id="demo-simple-select"
            defaultValue={'default'}
            onChange={(e) => setCode(e.target.value)}
            className="countrydropdown"
          >
            <MenuItem disabled value="default">
              Select a Code
            </MenuItem>
            {props.unMatchedData?.map((item) => {
              return <MenuItem value={item}>{item?.code}</MenuItem>;
            })}
          </Select>
        </div>
        <div className="codedropdown_div">
          <label className="BomLabel">Monetary value</label>
          <Inputfield
            placeholder="5,000"
            value={monetaryValue}
            className="applicationTitle"
            onChange={(e) => setMonetaryValue(e.target.value)}
          />
        </div>
        <div className="codedropdown_div1">
          <Button text="To Add" className="to_add_btn" onClick={handleAddCodes} />
        </div>
      </div>
      {props.matchedData.length === 0 ? (
        ''
      ) : (
        <TableContainer component={Paper} style={{ width: '100%', marginTop: '2%' }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className="country">
                  Code <img src={DownArrow} alt="" />
                </TableCell>
                <TableCell align="center" className="country">
                  Monetary value <img src={DownArrow} alt="" />
                </TableCell>
                <TableCell align="center" className="country">
                  certificate required
                </TableCell>

                <TableCell align="center" className="country">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.matchedData?.map((item, index) => (
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center" style={{ width: '20%' }}>
                    <p className="AP_plus_title">{item?.code}</p>
                  </TableCell>
                  <TableCell align="center" className="country2" style={{ width: '20%' }}>
                    <p className="AP_plus_title">{item?.monetary_value}</p>
                  </TableCell>
                  <TableCell align="center" className="country2" style={{ width: '20%' }}>
                    {item?.certification_required === true ? 'true' : 'false'}
                  </TableCell>

                  <TableCell align="center" className="country2">
                    <img
                      src={DeleteIcon}
                      alt=""
                      className="dltIcon"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleDelete(item)}
                    />
                    <img
                      src={EditIcon}
                      alt=""
                      className="dltIcon"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setOpenEditModal(true);
                        setEditModalData({ item, index });
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* Edit codes modal */}
      <Modal
        open={openEditModal}
        setOpen={setOpenEditModal}
        title="Modify BOM"
        handleClose={handleEditModal}
        Closebtn={true}
      >
        <div>
          <div style={{ marginTop: '2.2rem' }}>
            <label className="BomLabel">Code</label>
            <InputField
              className="code_textfield"
              value={editModalData?.item?.code}
              disabled={true}
            />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label className="BomLabel">Monetary Value</label>
            <InputField
              className="monetary_value"
              value={editModalData?.item?.monetary_value}
              onChange={(e) => {
                setEditModalData((prev) => {
                  prev.item.monetary_value = e.target.value;
                  return { ...prev };
                });
              }}
            />
          </div>
          <Button
            text="To confirm"
            className="to_confirm_btn"
            onClick={() => {
              props.setMatchedData((prev) => {
                prev[editModalData.index].monetary_value = editModalData?.item?.monetary_value;
                return [...prev];
              });
              setOpenEditModal(false);
            }}
          />
          <Button
            text="Delete BOM"
            className="delete_bom_btn"
            onClick={() => {
              handleDelete(editModalData);
              setOpenEditModal(false);
            }}
          />
        </div>
      </Modal>
      {/* certification required modal */}
      <Modal
        open={props.certificateRequire}
        setOpen={props.setCertificateRequire}
        handleClose={handleCertificateRequire}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              marginTop: '1rem',
              marginBottom: '1rem',
            }}
          >
            <div className="space">
              <Logo />
            </div>
            <div className="space">
              <Featured />
            </div>

            <div className="space">
              Those products for{' '}
              <span className="bold_text_in_modal">
                {props.certificationCountryOfCode} require a certification
              </span>
            </div>
            <div className="space">
              Le tarif de cette certification est à hauteur de{' '}
              <span style={{ fontWeight: 900, fontSize: '19px' }}>
                {props.certificationCostOfCode}$/HT
              </span>
            </div>
          </div>
          <Button
            text="Continue my request on Ezxport"
            className="to_confirm_btn"
            onClick={props.handleStep1}
          />
          <Button
            text="Go back to my request"
            className="delete_bom_btn"
            onClick={handleCertificateRequire}
          />
        </div>
      </Modal>
      <Modal
        open={props.certificateNotRequire}
        setOpen={props.setCertificateNotRequire}
        handleClose={handleCertificateNotRequire}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              marginTop: '1rem',
              marginBottom: '1rem',
            }}
          >
            <div className="space">
              <Logo />
            </div>
            <div className="space">
              <Featured1 />
            </div>

            <div className="space">
              Those products for{' '}
              <span className="bold_text_in_modal">
                {props.certificationCountryOfCode} do not require a certification
              </span>
            </div>
            <div className="space" style={{ textAlign: 'center' }}>
              You can therefore send your goods without going through an organization.
            </div>
          </div>
          <Button
            text="Make another request"
            className="to_confirm_btn"
            onClick={() => history.push('/User/Dashboard/ListOfRequests')}
          />
          <Button
            text="Go back to my request"
            className="delete_bom_btn"
            onClick={handleCertificateNotRequire}
          />
        </div>
      </Modal>
      <Modal
        open={verificationModal}
        setOpen={setVerificationModal}
        handleClose={handleVerification}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              marginTop: '1rem',
              marginBottom: '1rem',
            }}
          >
            <div className="space">
              <Logo />
            </div>
            <div className="space">
              <Featured />
            </div>

            <div className="space" style={{ width: '75%', textAlign: 'center' }}>
              Les nomenclatures listées pour le{' '}
              <b>
                Gabon sont soumises <br />à vérification et certification.
              </b>
            </div>
            <div className="space">
              Le tarif de cette certification est à hauteur de <b>7000€/HT</b>
            </div>
          </div>
          <Button text="Continue my request on Ezxport" className="to_confirm_btn" />
          <Button text="Go back to my request" className="delete_bom_btn" />
        </div>
      </Modal>
    </div>
  );
};

export default BOMsForm;
