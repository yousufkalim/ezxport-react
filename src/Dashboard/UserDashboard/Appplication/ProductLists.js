import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TitleDownArrow from '../../../assets/TitleDownArrow.svg';
import { useTranslation } from 'react-i18next';

const ProductLists = ({ codes, currency }) => {
  const { t } = useTranslation();
  const monetary_value = codes?.code?.reduce((n, { monetary_value }) => n + monetary_value, 0);
  console.log('Codes ', codes);
  return (
    <>
      <div className='ProductLists'>
        <div className='ProductLists_heading'>
          <p className='ProductLists_title'>{t('Product Lists')}</p>
          <p className='total_value_p'>
            {t('Total value')} &nbsp;
            <span>
              – {monetary_value} {currency === 'USD' ? '$' : '€'} –
            </span>
            {codes?.length > 1 ? (
              <span> {codes?.length} codes</span>
            ) : (
              <span> {codes?.length} code</span>
            )}
          </p>
        </div>
        {/* table  */}
        <div className='list_table' style={{ marginBottom: '5%' }}>
          {/* table  */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead style={{ backgroundColor: '#F9FAFB' }}>
                <TableRow>
                  <TableCell align='left' className='country'>
                    Code &nbsp; &nbsp;
                    <img src={TitleDownArrow} alt='' className='title_arrow' />
                  </TableCell>

                  <TableCell align='left' className='country'>
                    {t('Monetary value')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {codes?.map((item) => {
                  return (
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component='th' scope='row' style={{ width: '22%' }}>
                        <p className='AP_plus_title'>{item.code.code}</p>
                      </TableCell>

                      <TableCell align='left' className='country2' style={{ width: '100%' }}>
                        {item.monetary_value}
                        {currency === 'USD' ? '$' : '€'}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default ProductLists;
