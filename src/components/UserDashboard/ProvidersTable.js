import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ProvidersModal from '../../components/UserDashboard/ProvidersModal';
import EditIcon from '../../assets/EditIcon.svg';
import API from '../../api/index';
import { toast } from 'react-toastify';
import Spinner from '../../components/Common/Spinner';


const tableHeadings = ['Service provider', 'Contact', 'Associated countries', 'Actions']

const ProvidersTable = (props) => {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    fetchCountries();
  }, [])

  const fetchCountries = async () => {
    setLoading(true);
    await API('get', '/countries')
      .then((res) => {
        setCountries(res?.data?.countries);
        setLoading(false);

      })
      .catch((err) => {
        toast.error('Something went wrong!');
        setLoading(false);
      });
  };

  const handleModalOpen = (edit ,item) => {
      setProvider(item)
      setOpen(true);
      setIsEdit(edit);
    };    

  if(loading || props.dataLoading){
    return (
      <Spinner />
    )
  }
  else {
    return(
      
        <>
          <ProvidersModal getProviders={props.getProviders} data={provider} isEdit={isEdit} open={open} setOpen={setOpen} />
          <div className="list_table">
            {/* table  */}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {tableHeadings.map((item) => {
                      return (
                        <TableCell
                          align="left"
                          className="country"
                          style={{ backgrounColor: '#EAECF0' }}
                        >
                          {item} &nbsp;
                          {/* <img src={item.imgSrc} alt="" className="title_arrow" /> */}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props?.data.map((item) => (
                    <TableRow
                      onClick={() => handleModalOpen(false ,item)}
                      style={{ cursor: 'pointer' }}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <p className="AP_plus_title">{item?.name}</p>
                      </TableCell>
                      <TableCell align="left" className="country2">
                        <p className="AP_plus_title">
                            {
                                item?.sending_email
                            }
                        </p>
                      </TableCell>
                      <TableCell align="left" className="country2">
                        <p className="AP_plus_title">
                            {
                                countries?.length && item?.countries?.map((country, index) => {
                                  const count = countries?.find(el => el._id === country);
                                  return (
                                    <span key={item.name}>{count.name}{index !== item.countries.length - 1 && item.countries.length > 1 && ','} </span>
                                )
                                })
                            }
                        </p>
                      </TableCell>
                
                        <TableCell align="left" className="country2">
                            <img
                                src={EditIcon}
                                alt=""
                                className="dltIcon"
                                style={{ cursor: 'pointer' }}
                                onClick={(e) => {
                                    e.stopPropagation(true);
                                    handleModalOpen(true ,item)
                                }}
                            />
                            </TableCell>
                
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      );
    
  }
};

export default ProvidersTable;
