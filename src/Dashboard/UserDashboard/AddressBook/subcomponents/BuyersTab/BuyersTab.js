import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TitleDownArrow from '../../../../../assets/TitleDownArrow.svg';
import API from '../../../../../api/index';
import { toast } from 'react-toastify';
import Spinner from '../../../../../components/Common/Spinner';
import EditIcon from '../../../../../assets/EditIcon.svg';
import BuyerModal from './BuyerModal';



const title = [
    { heading: 'Name', imgSrc: TitleDownArrow },
    { heading: 'Country' },
    { heading: 'E-mail address' },
    { heading: 'Telephone' },
    { heading: 'Address' },
    { heading: '' },
  ];


const BuyersTab = ({open, setOpen,userId, countries}) => {
      const [buyers, setBuyers] = useState([]);
      const [buyer, setBuyer] = useState(null);
      const [loading, setLoading] = useState(false);
      const [isEdit, setIsEdit] = useState(false);

      const [formState, setFormState] = useState({
        isValid: false,
        values: {companyName: '', country: '', email: '', telephone: '', address: '', zipcode: '', town: ''},
        errors: {},
        touched: {}
      });

      const user = localStorage.getItem('userData')
      const userData = JSON.parse(user);
        
      useEffect(() => {
        fetchBuyers();
      },[])

      const fetchBuyers = () => {
        setLoading(true);
        API('get', `/buyers/getByUser/${userData._id}`).then((res) => {
            console.log("Buyers ", res)
            setBuyers(res.data.buyer);
            setLoading(false);
        }).catch((err) => {
            toast.error('Something went wrong');
            setLoading(false);

        })
      }

      const handleOpenModal = (edit, item) => {
        setBuyer(item);
        setIsEdit(edit);
        setOpen(true);

       if(item){
        const {company_name,
            email,
            country,
            city,
            phone_number,
            zipcode,
            address } = item;
            const values = {
                companyName: company_name,
                email,
                country: country._id,
                town: city,
                telephone: phone_number,
                zipcode,
                address,
            }
            setFormState({...formState, values: {...values}})
       }
      }

  return (
    <>
        <div className="list_table">
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                {title.map((item) => {
                    return (
                    <TableCell
                        align="left"
                        className="country"
                        style={{ backgrounColor: '#EAECF0' }}
                    >
                        {item.heading} &nbsp;
                        <img src={item.imgSrc} alt="" className="title_arrow" />
                    </TableCell>
                    );
                })}
                </TableRow>
            </TableHead>
            <TableBody>
                {loading ? <Spinner /> : buyers?.map((buyer) => (
                <TableRow
                    key={buyer._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleOpenModal(false, buyer) }
                >
                    <TableCell component="th" scope="row" >
                    <p className="AP_plus_title">{buyer.company_name} </p>
                    </TableCell>
                    <TableCell align="left" className="country2" >
                    {buyer.country.name}
                    <br />
                    </TableCell>
                    <TableCell align="left" className="country2" >
                    {buyer.email}
                    </TableCell>
                    <TableCell align="left" className="country2" >
                    {buyer.phone_number}
                    </TableCell>
                    <TableCell
                    align="left"
                    className="country2"
                    style={{ cursor: 'pointer' }}
                    
                    >
                    <p className="country2">{buyer.address}</p>
                    </TableCell>

                    <TableCell
                    align="left"
                    className="country2"
                    style={{ cursor: 'pointer' }}
                
                    >
                    <img
                                src={EditIcon}
                                alt=""
                                className="dltIcon"
                                style={{ cursor: 'pointer' }}
                                onClick={(e) => {
                                    e.stopPropagation(true);
                                    handleOpenModal(true, buyer)
                                }}
                            />
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>

        <BuyerModal userId={userId} countries={countries} formState={formState} setFormState={setFormState} isEdit={isEdit} setBuyer={setBuyer} setIsEdit={setIsEdit} buyer={buyer} fetchBuyers={fetchBuyers} setOpen={setOpen} open={open} />
        {/* table  */}
        </div>
  </>
  )
}

export default BuyersTab