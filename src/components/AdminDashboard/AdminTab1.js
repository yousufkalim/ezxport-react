import React from "react";
import PaginationPage from "./Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DownArrow from "../../assets/TitleDownArrow.svg";
import { useTranslation, Trans } from "react-i18next";

const AdminTab1 = (props) => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#667085", backgroundColor: "#F9FAFB" }}>
                {t("Service providers")}
                <img src={DownArrow} alt="" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.vendor?.map((item) => {
              return (
                <TableRow key={item.name}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ border: "1px solid #E5E5E5;", padding: 2 }}
                  >
                    <p className="AP_plus_title">{item.name}</p>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationPage />
    </>
  );
};

export default AdminTab1;
