import React from "react";
import Button from "../Common/Button";
import SearchField from "../Common/SearchField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ExportIcon from "../../assets/ExportIcon.svg";
import { useHistory } from "react-router-dom";
import downArrow from "../../assets/TitleDownArrow.svg";
import { useTranslation, Trans } from "react-i18next";
import arrow_up from "../../assets/arrow_up.svg";

const UserTable = (props) => {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const { language } = i18n;

  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          {/* list head  */}
          <div className="UserTable">
            <h1 className="list_user_h1">{t(props.title)}</h1>
            <div className="UserTable_right_div">
              <SearchField placeholder={t("Searching")} />
              <Button className="export_btn" text={t("Export")} Imgsrc={ExportIcon} />
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
                        align="left"
                        sx={{
                          color: "#667085",
                          backgroundColor: "#F9FAFB;",
                        }}
                      >
                        {t(item.list)}
                        &nbsp;
                        {item.sortIcon && !props.sort.ascend && props.sort.key === item.key ? (
                          <img
                            className="sorting-icon"
                            onClick={() => props.sortData(item.key, true)}
                            src={arrow_up}
                            alt=""
                          />
                        ) : (
                          item.sortIcon && (
                            <img
                              onClick={() => props.sortData(item.key, false)}
                              src={downArrow}
                              alt=""
                            />
                          )
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.rows.map((row) => (
                    <TableRow
                      onClick={() => {
                        history.push(`/Admin/Dashboard/Users/UserDetails/${row._id}`);
                      }}
                      key={row.name}
                      sx={{ cursor: "pointer", border: "1px solid #E5E5E5;" }}
                    >
                      <TableCell component="th" scope="row" align="left" className="table_cell">
                        <p className="AP_plus_title">{row.last_name}</p>
                      </TableCell>
                      <TableCell component="th" scope="row" align="left" className="table_cell">
                        <p className="AP_plus_title">{row.first_name}</p>
                      </TableCell>

                      <TableCell component="th" scope="row" align="left" className="table_cell">
                        <p className="AP_plus_title">{row.email}</p>
                      </TableCell>
                      <TableCell component="th" scope="row" align="left" className="table_cell">
                        <p className="AP_plus_title">{row.phone_number}</p>
                      </TableCell>
                      <TableCell component="th" scope="row" align="left" className="table_cell">
                        <p className="AP_plus_title">{row.address}</p>
                      </TableCell>
                      <TableCell component="th" scope="row" align="left" className="table_cell">
                        <p className="AP_plus_title">{row.zip_code || row.zipcode}</p>
                      </TableCell>
                      <TableCell component="th" scope="row" align="left" className="table_cell">
                        <p className="AP_plus_title">{row.city}</p>
                      </TableCell>
                      <TableCell component="th" scope="row" align="left" className="table_cell">
                        <p className="AP_plus_title">{row.company.name}</p>
                      </TableCell>
                      <TableCell component="th" scope="row" align="left" className="table_cell">
                        <p className="AP_plus_title">{row.company.type}</p>
                      </TableCell>
                      <TableCell component="th" scope="row" align="left" className="table_cell">
                        <p className="AP_plus_title">{row.company.vat}</p>
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

export default UserTable;
