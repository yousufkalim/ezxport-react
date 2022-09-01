import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import API from '../../api/index';
import Moment from 'moment';
import Modal from '../../components/Common/Modal';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as Featured1 } from '../../assets/Featured1.svg';
import Button from '../../components/Common/Button';

const FollowUp = () => {
  const [allRequest, setAllRequest] = useState([]);
  const [requestedModal, setRequestedModal] = useState(false);
  const handleAllRequest = async () => {
    await API('get', '/requests')
      .then((res) => {
        setAllRequest(res.data.requets);
      })
      .catch((err) => {
        console.log('handleAllRequest', err);
      });
  };
  useEffect(() => {
    let request = localStorage.getItem('Requested')
    if (request === "true") {
      setRequestedModal(true)
    }
    handleAllRequest();
  }, []);

  const history = useHistory();
  const handleRequested = () => {
    setRequestedModal(false)
    localStorage.removeItem('Requested')
  };

  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          {/* list head  */}
          <div className="List_heading_div">
            <h1 className="list_h1">List of requests</h1>
            <Link to="/User/RequestForm">
              <button className="list_reqst_btn">Create a request</button>
            </Link>
          </div>
          {/* list table   */}
          <div className="list_table">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="left"
                      className="country"
                      style={{ backgrounColor: '#EAECF0' }}
                    >
                      Request
                    </TableCell>
                    <TableCell
                      align="left"
                      className="country"
                      style={{ backgrounColor: '#EAECF0' }}
                    >
                      Date
                    </TableCell>
                    <TableCell
                      align="left"
                      className="country"
                      style={{ backgrounColor: '#EAECF0' }}
                    >
                      Certificate cost
                    </TableCell>

                    <TableCell
                      align="left"
                      className="country"
                      style={{ backgrounColor: '#EAECF0' }}
                    >
                      Service providers
                    </TableCell>
                    <TableCell
                      align="left"
                      className="country"
                      style={{ backgrounColor: '#EAECF0' }}
                    >
                      Statutes
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allRequest?.map((item) => (
                    <TableRow
                      style={{ cursor: 'pointer' }}
                      key={item?._id}
                      onClick={() => history.push('/User/Dashboard/Application')}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {item?.title}
                        <br />
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
                        <p className="clrClass">{item.status}</p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
      <Modal open={requestedModal} setOpen={setRequestedModal} handleClose={handleRequested}>
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

            <div
              className="space"
              style={{ textAlign: 'center', fontSize: '2rem', fontWeight: '600' }}
            >
              Votre demande été effectuée <br />
              avec succès
            </div>
            <div
              className="space"
              style={{ fontSize: '1.2rem', width: '90%', color: '#667085', textAlign: 'center' }}
            >
              Nous allons procéder au traitement de votre dossier
              <br /> dans les meilleurs délais, et reviendrons vers vous. Vous <br />
              pouvez retrouver votre demande dans le tableau de
              <br /> <b>suivi des demandes.</b>
            </div>
          </div>
          <Button text="D’accord" className="to_confirm_btn" onClick={handleRequested} />
        </div>
      </Modal>
    </>
  );
};

export default FollowUp;
