import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getSortedData } from '../../lib/getSortedData';
import downArrow from '../../assets/TitleDownArrow.svg';
import arrow_up from '../../assets/arrow_up.svg';
import Spinner from "../Common/Spinner";
import { useTranslation, Trans } from "react-i18next";

const nestSortTitles = [];

const AdminTab1 = ({ vendor, setVendor, loading }) => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  const [sort, setSort] = useState({ key: "", ascend: true });

  console.log("Vendor vendor", vendor);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#667085', backgroundColor: '#F9FAFB' }}>
                {t("Service providers")}
                {
                  !sort.ascend ? (
                    <img className='sorting-icon' onClick={() => getSortedData(vendor, setVendor, setSort, nestSortTitles, 'name', true)} src={arrow_up} alt="" />
                  ) : (
                    <img onClick={() => getSortedData(vendor, setVendor, setSort, nestSortTitles, 'name', false)} src={downArrow} alt="" />
                  )
                }
              </TableCell>
            </TableRow>
          </TableHead>
          {
            loading ? (
              <Spinner />
            ) : (
              <TableBody>
                {vendor?.map((item, index) => {
                  console.log("NAme ", item)
                  return (
                    <TableRow key={index}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ border: '1px solid #E5E5E5;', padding: 2 }}
                      >
                        <p className="AP_plus_title">{item.name}</p>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            )
          }
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminTab1;
