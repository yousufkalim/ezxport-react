import React from 'react';
import Button from "../Common/Button";
import SearchField from "../Common/SearchField";
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
import icon from "../../assets/TitleDownArrow.svg";

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
                          color: "#667085",
                          backgroundColor: "#F9FAFB;",
                        }}
                      >
                        {item.list}
                        &nbsp;
                        <img src={icon} alt="" />
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {console.log("ROWS", props.rows)}
                  {props.rows.map((row) => (
                    <TableRow
                      onClick={() => {
                        history.push(`/Admin/Dashboard/Users/UserDetails/${row._id}`);
                      }}
                      key={row.name}
                      sx={{ cursor: "pointer", border: "1px solid #E5E5E5;" }}
                    >
                      <TableCell component="th" scope="row" sx={{ border: "none", padding: 2 }} className="table_cell">
                        {row.first_name}
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ border: "none", padding: 2 }} className="table_cell">
                        {row.last_name}
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ border: "none", padding: 2 }} className="table_cell">
                        {row.email}
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ border: "none", padding: 2 }} className="table_cell">
                        {row.phone_number}
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ border: "none", padding: 2 }} className="table_cell">
                        {row.address}
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ border: "none", padding: 2 }} className="table_cell">
                        {row.zip_code}
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ border: "none", padding: 2 }} className="table_cell">
                        {row.city}
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ border: "none", padding: 2 }} className="table_cell">
                        {row.company.name}
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ border: "none", padding: 2 }} className="table_cell">
                        {row.company.type}
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ border: "none", padding: 2 }} className="table_cell">
                        {row.company.vat}
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
