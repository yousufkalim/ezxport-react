import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ProvidersModal from "../../components/UserDashboard/ProvidersModal";
import EditIcon from "../../assets/EditIcon.svg";
import API from "../../api/index";
import { toast } from "react-toastify";
import Spinner from "../../components/Common/Spinner";
import { useTranslation, Trans } from "react-i18next";
import downArrow from '../../assets/TitleDownArrow.svg';
import arrow_up from '../../assets/arrow_up.svg';
import { getSortedData } from "../../lib/getSortedData";

const tableHeadings = [ {
  name: "Service provider",
  sortIcon: true,
  key: 'name'
}, {
  name: "Contact"
}, 
{
  name: "Associated countries"
},
{
  name: "Actions"
}
];

const ProvidersTable = (props) => {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [provider, setProvider] = useState(null);
  const [sort, setSort] = useState({key: "", ascend: true});

  const {data, setData} = props;

  const { t, i18n } = useTranslation();
  const { language } = i18n;

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    setLoading(true);
    await API("get", "/countries")
      .then((res) => {
        setCountries(res?.data?.countries);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        setLoading(false);
      });
  };

  const handleModalOpen = (edit, item) => {
    setProvider(item);
    setOpen(true);
    setIsEdit(edit);
  };

  if (loading || props.dataLoading) {
    return <Spinner />;
  } else {
    return (
      <>
        <ProvidersModal
          getProviders={props.getProviders}
          data={provider}
          isEdit={isEdit}
          open={open}
          setOpen={setOpen}
        />
        <div className="list_table">
          {/* table  */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {tableHeadings.map((item) => {
                    return (
                      <TableCell
                        align="left"
                        className="country"
                        style={{ backgrounColor: "#EAECF0" }}
                      >
                        {t(item.name)} &nbsp;
                        {
                          item.sortIcon && !sort.ascend && sort.key === item.key ? (
                            <img className='sorting-icon' onClick={() => getSortedData(data,setData, setSort, [],'name', true)} src={arrow_up} alt="" />
                          ) : item.sortIcon && (
                            <img onClick={() => getSortedData(data,setData, setSort, [],'name', false)} src={downArrow} alt="" />
                          )
                        }
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {props?.data.map((item, index) => (
                  <TableRow
                    key={index}
                    onClick={() => handleModalOpen(false, item)}
                    style={{ cursor: "pointer" }}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <p className="AP_plus_title">{item?.name}</p>
                    </TableCell>
                    <TableCell align="left" className="country2">
                      <p className="AP_plus_title">{item?.sending_email}</p>
                    </TableCell>
                    <TableCell align="left" className="country2">
                      <p className="AP_plus_title">
                        {countries?.length &&
                          item?.countries?.map((country, index) => {
                            const count = countries?.find((el) => el._id === country);
                            return (
                              <span key={item.name}>
                                {count.name}
                                {index !== item.countries.length - 1 &&
                                  item.countries.length > 1 &&
                                  ","}{" "}
                              </span>
                            );
                          })}
                      </p>
                    </TableCell>

                    <TableCell align="left" className="country2">
                      <img
                        src={EditIcon}
                        alt=""
                        className="dltIcon"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation(true);
                          handleModalOpen(true, item);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </>
    );
  }
};

export default ProvidersTable;
