import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextFieldSelect from '../Common/TextFieldSelect';
import FormControl from '@mui/material/FormControl';
import DownArrow from '../../assets/TitleDownArrow.svg';
import DeleteIcon from '../../assets/DeleteIcon.svg';
import EditIcon from '../../assets/EditIcon.svg';
import API from '../../api/index';
import { toast } from 'react-toastify';
import Modal from '../Common/Modal';
import validate from 'validate.js';
import Button from '../Common/Button';

const schema = {
  minCost: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 6,
    },
  },
  maxCost: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 6,
    },
  },
  certificate: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 6,
    },
  },
};
const CalculationRange = (props) => {
  const [rangeData, setRangeData] = useState();
  const [itemId, setItemId] = useState();
  const [editModal, setEditModal] = useState(false);
  // const [certificat, setCertificat] = useState();
  // const [minCost, setMinCost] = useState();
  // const [maxCost, setMaxCost] = useState();
  //
  const [rangeCertificat, setRangeCertificat] = useState();
  const [rangeMinCost, setRangeMinCost] = useState();
  const [rangeMaxCost, setRangeMaxCost] = useState();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      minCost: '',
      maxCost: '',
      certificate: '',
    },
    touched: {},
    errors: {},
  });
  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleValuesChange = (event) => {
    const validatedValue = event.target.value.replace(/[^0-9]/g, '');
    if(validatedValue==="0"){
      if(formState.values.minCost!==""){
       return setFormState((formState) => ({
          ...formState,
          values: {
            ...formState.values,
            [event.target.name]: validatedValue,
          },
          touched: {
            ...formState.touched,
            [event.target.name]: true,
          },
        }));  
      }
    }
    else{
      return setFormState((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          [event.target.name]: validatedValue,
        },
        touched: {
          ...formState.touched,
          [event.target.name]: true,
        },
      })); 
    }
    // if (!validatedValue.match(/[^1-9\0\.*$]/)) {
      
    // }
  };
  const handleRangeData = async () => {
    await API('get', `/calculations/${props?.id}`)
      .then((res) => {
        console.log(res, 'handleRangeData');
        setRangeData(res?.data?.calculation?.range);
      })
      .catch((err) => {
        console.log(err, 'handleRangeData');
      });
  };
  const handleAddRange = async () => {
    await API('put', `/calculations/addRange/${props.id}`, {
      range: {
        min: formState.values.minCost,
        max: formState.values.maxCost,
        certificate_cost: formState.values.certificate,
      },
    })
      .then((res) => {
        console.log('handleAddRange', res);
        handleRangeData();
        setFormState((formState) => ({
          ...formState,
          values: {
            minCost: '',
            maxCost: '',
            certificate: '',
          },
        }));
        // setMaxCost("");
        // setCertificat("");
        toast.success('Range added successfully');
      })
      .catch((err) => {
        console.log('handleAddRange', err);
      });
  };

  const handleNewRange = async () => {
    await API('post', `/calculations/`, {
      country: props.CountryId,
      type: 'range',
      range: {
        min: formState.values.minCost,
        max: formState.values.maxCost,
        certificate_cost: formState.values.certificate,
      },
    })
      .then((res) => {
        console.log('handleAddCoefficient', res);
        props.setOpenCalculationModal(false);
        toast.success('Coefficient Added Successfully');
      })
      .catch((err) => {
        console.log('handleAddCoefficient', err);
      });
  };
  const handleDeleteCalculation = async (calId) => {
    await API('put', `/calculations/deleteRange/${props?.id}`, {
      rangeId: calId,
    })
      .then((res) => {
        console.log('handleDeleteCalculation', res);
        handleRangeData();
        toast.success('Range Deleted successfully');
      })
      .catch((err) => {
        console.log('handleDeleteCalculation', err);
      });
  };
  const handleUpdateRange = async () => {
    await API('put', `/calculations/updateRange/${props?.id}`, {
      range: {
        max: rangeMaxCost,
        min: rangeMinCost,
        certificate_cost: rangeCertificat,
      },
      rangeId: itemId,
    })
      .then((res) => {
        setEditModal(false);
        console.log('handleUpdateRange', res);
        handleRangeData();
        toast.success('Range updated successfully');
      })
      .catch((err) => {
        console.log('handleUpdateRange', err);
      });
  };
  useEffect(() => {
    handleRangeData();
  }, []);
  const handleEditModalClose = () => setEditModal(false);
  const hasError = (field) => (formState.touched[field] && formState.errors[field] ? true : false);

  return (
    <>
      <div>
        {/* table  */}
        {rangeData === undefined || rangeData?.length > 0 ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" className="country" style={{ backgrounColor: '#EAECF0' }}>
                    Minimum <img src={DownArrow} alt="" />
                  </TableCell>
                  <TableCell align="left" className="country" style={{ backgrounColor: '#EAECF0' }}>
                    Maximum <img src={DownArrow} alt="" />
                  </TableCell>
                  <TableCell align="left" className="country" style={{ backgrounColor: '#EAECF0' }}>
                    Coût certificat <img src={DownArrow} alt="" />
                  </TableCell>
                  <TableCell align="left" className="country" style={{ backgrounColor: '#EAECF0' }}>
                    Actions <img src={DownArrow} alt="" />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rangeData?.map((item) => (
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row" style={{ width: '20%' }}>
                      <p className="AP_plus_title">{item.min}</p>
                    </TableCell>
                    <TableCell align="left" className="country2" style={{ width: '20%' }}>
                      <p className="AP_plus_title">{item.max}</p>
                    </TableCell>
                    <TableCell align="left" className="country2">
                      <p className="AP_plus_title">{item.certificate_cost}</p>
                    </TableCell>
                    <TableCell align="left" className="country2">
                      <img
                        src={DeleteIcon}
                        alt=""
                        className="dltIcon"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDeleteCalculation(item._id)}
                      />

                      <img
                        src={EditIcon}
                        alt=""
                        className="dltIcon"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setEditModal(true);
                          setItemId(item._id);
                          setRangeCertificat(item.certificate_cost);
                          setRangeMinCost(item.min);
                          setRangeMaxCost(item.max);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          ''
        )}
        <div className="AddSlice_main">
          <div className="AddSlice_senter">
            <h2 className="AddSlice_title">Ajouter une tranche</h2>
            <div className="AddSlice_inputs_div">
              <div className="AddSlice_input_fields">
                <FormControl fullWidth>
                  <label htmlFor="" className="buyer_label">
                    Minimum
                  </label>
                  <TextFieldSelect
                    value={formState.values.minCost}
                    name="minCost"
                    onChange={handleValuesChange}
                    type="tel"
                    // onOptionChange={(e) => {
                    //   setMinCostCurrency(e.target.value);
                    // }}
                  />
                  <div className="error-format">
                    {hasError('minCost') ? formState.errors.minCost[0] : null}
                  </div>
                </FormControl>
              </div>
              <div className="AddSlice_input_fields">
                <FormControl fullWidth>
                  <label htmlFor="" className="buyer_label">
                    Maximum
                  </label>
                  <TextFieldSelect
                    value={formState.values.maxCost}
                    name="maxCost"
                    onChange={handleValuesChange}
                    // onOptionChange={(e) => {
                    //   setMaxCostCurrency(e.target.value);
                    // }}
                  />
                  <div className="error-format">
                    {hasError('maxCost') ? formState.errors.maxCost[0] : null}
                  </div>
                </FormControl>
              </div>
              <div className="AddSlice_input_fields">
                <FormControl fullWidth>
                  <label htmlFor="" className="buyer_label">
                    Coût certificat
                  </label>
                  <TextFieldSelect
                    value={formState.values.certificate}
                    name="certificate"
                    onChange={handleValuesChange}
                    // onOptionChange={(e) => {
                    //   setMaxCostCurrency(e.target.value);
                    // }}
                  />
                  <div className="error-format">
                    {hasError('certificate') ? formState.errors.certificate[0] : null}
                  </div>
                </FormControl>
              </div>
            </div>

            <button
              className={!formState.isValid ? 'AddSlice_button_disabled' : 'AddSlice_button'}
              onClick={props.Calculation ? handleAddRange : handleNewRange}
              disabled={!formState.isValid ? true : false}
            >

              Ajouter la ligne
            </button>
          </div>
        </div>
      </div>
      <Modal
        open={editModal}
        setOpen={setEditModal}
        title="Edit Range"
        handleClose={handleEditModalClose}
        Closebtn={true}
      >
        <div>
          <FormControl fullWidth style={{ marginTop: '1rem' }}>
            <label htmlFor="" className="buyer_label">
              Minimum
            </label>
            <TextFieldSelect
              value={rangeMinCost}
              onChange={(e) => setRangeMinCost(e.target.value)}
              // onOptionChange={(e) => {
              //   setMinCostCurrency(e.target.value);
              // }}
            />
          </FormControl>
          <FormControl fullWidth style={{ marginTop: '1rem' }}>
            <label htmlFor="" className="buyer_label">
              Maximum
            </label>
            <TextFieldSelect
              value={rangeMaxCost}
              onChange={(e) => setRangeMaxCost(e.target.value)}
              // onOptionChange={(e) => {
              //   setMaxCostCurrency(e.target.value);
              // }}
            />
          </FormControl>
          <FormControl fullWidth style={{ marginTop: '1rem' }}>
            <label htmlFor="" className="buyer_label">
              Coût certificat
            </label>
            <TextFieldSelect
              value={rangeCertificat}
              onChange={(e) => setRangeCertificat(e.target.value)}
              // onOptionChange={(e) => {
              //   setMaxCostCurrency(e.target.value);
              // }}
            />
          </FormControl>
          <div style={{ marginTop: '2rem' }}>
            <Button text="Update" className="bom_downloadFile_btn" onClick={handleUpdateRange} />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default CalculationRange;
