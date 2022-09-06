import React, { useState, useEffect } from 'react';
import SearchField from '../../components/Common/SearchField';
import { useHistory } from 'react-router-dom';
import API from '../../api';
import Moment from 'moment';

// table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Requests = () => {
  const [allRequest, setAllRequest] = useState([]);
  const history = useHistory(null);
  useEffect(() => {
    handleAllRequest();
  }, []);
  const handleAllRequest = async () => {
    await API('get', '/requests')
      .then((res) => {
        setAllRequest(res.data.requets);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };
  return (
    <div className="list_main_div">
      <div className="list_second_div">
        {/* list head  */}
        <div className="List_heading_div">
          <h1 className="list_rqst_h1">List of requests</h1>
          <div className="searchingRequest">
            <SearchField placeholder="Searching" className="rqst_searching" />
          </div>
        </div>
        {/* list table   */}
        <div className="list_table">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" className="country" style={{ backgrounColor: '#EAECF0' }}>
                    Request
                  </TableCell>
                  <TableCell align="left" className="country" style={{ backgrounColor: '#EAECF0' }}>
                    Date
                  </TableCell>
                  <TableCell align="left" className="country" style={{ backgrounColor: '#EAECF0' }}>
                    Certificate cost
                  </TableCell>
                  <TableCell align="left" className="country" style={{ backgrounColor: '#EAECF0' }}>
                    Service providers
                  </TableCell>
                  <TableCell align="left" className="country" style={{ backgrounColor: '#EAECF0' }}>
                    Statutes
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allRequest?.map((item) => (
                  <TableRow
                    key={item?._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                    onClick={() => history.push(`/Admin/ValidateRequest/${item?._id}`)}
                  >
                    <TableCell component="th" scope="row">
                      <p className="AP_plus_title">{item?.title}</p>
                      <p className="country2">{item?.country?.name}</p>
                    </TableCell>
                    <TableCell align="left" className="country2">
                      {Moment(item?.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell align="left" className="country2">
                      {item?.certification_cost?.value ? (
                        <>
                          {item?.certification_cost?.currency === 'USD'
                            ? item?.certification_cost?.value + '$'
                            : item?.certification_cost?.currency === 'EURO' &&
                              item?.certification_cost?.value + '€'}
                        </>
                      ) : (
                        '--'
                      )}
                    </TableCell>

                    <TableCell align="left" className="country2">
                      {item?.vendor?.contact_lname ? (
                        <>
                          {item?.vendor?.contact_lname}
                          {item?.vendor?.contact_fname}
                        </>
                      ) : (
                        '--'
                      )}
                    </TableCell>
                    <TableCell align="left">
                      {item?.status === 'not required' ? (
                        <p className="clrClass">{item?.status}</p>
                      ) : item?.status === 'Missing Documents' ? (
                        <p className="missingDocStatus">{item?.status}</p>
                      ) : (
                        '--'
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Requests;
