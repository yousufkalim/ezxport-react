import React from 'react';
import Button from '../Button';
import SearchField from '../SearchField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ExportIcon from '../../assets/ExportIcon.svg';
import PaginationPage from './Pagination';
import { useHistory } from 'react-router-dom';

const UserTable = (props) => {
  const history = useHistory();

  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          {/* list head  */}
          <div className="UserTable">
            <h1 className="list_h1">{props.title}</h1>
            <div className="UserTable_right_div">
              <SearchField placeholder="Searching" />
              <Button className="export_btn" text="Export list" Imgsrc={ExportIcon} />
            </div>
          </div>
          {/* list table   */}
          <div className="list_table">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    {props.headTitle.map((item) => (
                      <TableCell
                        className="table_head"
                        sx={{
                          color: '#667085',
                          backgroundColor: '#F9FAFB;',
                        }}
                      >
                        {item.list}
                        &nbsp;
                        <img src={props.img} alt="" />
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.rows.map((row) => (
                    <TableRow
                      key={row.name}
                      // sx={{ '&:last-child td, &:last-child th': { border: 0, padding: 1 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ border: '1px solid #E5E5E5;', padding: 2 }}
                        className="table_cell"
                      >
                        {row.fname}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ border: '1px solid #E5E5E5;', padding: 2 }}
                        className="table_cell"
                      >
                        {row.lname}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ border: '1px solid #E5E5E5;', padding: 2 }}
                        className="table_cell"
                      >
                        {row.Email}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ border: '1px solid #E5E5E5;', padding: 2 }}
                        className="table_cell"
                      >
                        {row.number}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ border: '1px solid #E5E5E5;', padding: 2 }}
                        className="table_cell"
                      >
                        {row.adress}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ border: '1px solid #E5E5E5;', padding: 2 }}
                        className="table_cell"
                      >
                        {row.postal}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ border: '1px solid #E5E5E5;', padding: 2 }}
                        className="table_cell"
                      >
                        {row.cntry}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ border: '1px solid #E5E5E5;', padding: 2 }}
                        className="table_cell"
                      >
                        {row.enterprise}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ border: '1px solid #E5E5E5;', padding: 2 }}
                        className="table_cell"
                      >
                        {row.typs}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ border: '1px solid #E5E5E5;', padding: 2 }}
                        className="table_cell"
                      >
                        {row.vatNumber}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <PaginationPage />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserTable;
