import React from "react";
import Button from "../Common/Button";
import SearchField from "../Common/SearchField";
import { NavLink } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PlusIcon from "../../assets/PlusIcon.svg";
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const AdminCountry = props => {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          {/* LIST HEAD */}
          <div className="List_heading_div">
            <h1 className="list_h1">{props.title}</h1>
            <div className="searching">
              <SearchField placeholder={t('Search')} />
              <Button
                className="list_reqst_btn2"
                text={t('Add a service provider')}
                Imgsrc={PlusIcon}
              />
            </div>
          </div>
          {/* LIST TABLE */}
          <div className="list_table">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#667085', backgroundColor: '#F9FAFB' }}>
                      {props.text} <img src={props.img} alt="" />
                    </TableCell>
                    {history.location.pathname == '/Admin/Dashboard/Service' && (
                      <TableCell sx={{ color: '#667085', backgroundColor: '#F9FAFB' }}>
                        {props.text2}
                        &nbsp;
                        <img src={props.img} alt="" />
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.rows.map(row => (
                    <TableRow key={row.createData}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ border: '1px solid #E5E5E5;', padding: 2 }}>
                        <NavLink
                          exact
                          to="/Admin/Dashboard/NomPays"
                          style={{ textDecoration: 'none', color: 'black' }}>
                          {row.createData}
                        </NavLink>
                      </TableCell>

                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ border: '1px solid #E5E5E5;', padding: 2 }}>
                        {row.createData}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCountry;
