import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TitleDownArrow from "../../../../../assets/TitleDownArrow.svg";
import API from "../../../../../api/index";
import Spinner from "../../../../../components/Common/Spinner";
import EditIcon from "../../../../../assets/EditIcon.svg";
import BuyerModal from "./BuyerModal";
import downArrow from "../../../../../assets/TitleDownArrow.svg";
import arrow_up from "../../../../../assets/arrow_up.svg";
import { getSortedData } from "../../../../../lib/getSortedData";
import { createFilter } from "react-search-input";
import toaster from "../../../../../utils/toaster";

const title = [
  {
    heading: "Company name",
    sortIcon: true,
    key: "company_name",
    imgSrc: TitleDownArrow,
  },
  { heading: "Country" },
  { heading: "E-mail address" },
  { heading: "Telephone" },
  { heading: "Address" },
  { heading: "" },
];

const KEYS_TO_FILTERS = ["company_name"];


const BuyersTab = ({
  t,
  schema,
  open,
  setOpen,
  userId,
  countries,
  searchTerm,
}) => {
  const [buyers, setBuyers] = useState([]);
  const [buyer, setBuyer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [activeField, setActiveField] = useState("");
  const [sort, setSort] = useState({ key: "", ascend: true });

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      companyName: "",
      country: "",
      email: "",
      telephone: "",
      address: "",
      zipcode: "",
      town: "",
    },
    errors: {},
    touched: {},
  });

  const user = localStorage.getItem("userData");
  const userData = JSON.parse(user);

  useEffect(() => {
    fetchBuyers();
  }, []);

  const fetchBuyers = () => {
    setLoading(true);
    API("get", `/buyers/getByUser/${userData._id}`)
      .then((res) => {
        setBuyers(res.data.buyer);
        setLoading(false);
      })
      .catch((err) => toaster("Failed", t("Something went wrong!")));
    setLoading(false);
  };

  const handleOpenModal = (edit, item) => {
    setBuyer(item);
    setIsEdit(edit);
    setOpen(true);

    if (item) {
      const {
        company_name,
        email,
        country,
        city,
        phone_number,
        zipcode,
        address,
      } = item;
      const values = {
        companyName: company_name,
        email,
        country: country,
        town: city,
        telephone: phone_number,
        zipcode: zipcode?.toString(),
        address,
      };

      setFormState({ ...formState, values: { ...values }, isValid: true });
    }
  };


  const searchedResults = buyers.filter(
    createFilter(searchTerm, KEYS_TO_FILTERS)
  );

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
                      style={{ backgrounColor: "#EAECF0" }}
                    >
                      {t(item.heading)} &nbsp;
                      {item.sortIcon &&
                      !sort.ascend &&
                      sort.key === item.key ? (
                        <img
                          className="sorting-icon"
                          onClick={() =>

                            getSortedData(
                              buyers,
                              setBuyers,
                              setSort,
                              [],
                              "company_name",
                              true
                            )
                          }
                          src={arrow_up}
                          alt=""
                        />
                      ) : (
                        item.sortIcon && (
                          <img
                            onClick={() =>

                              getSortedData(
                                buyers,
                                setBuyers,
                                setSort,
                                [],
                                "company_name",
                                false
                              )
                            }
                            src={downArrow}
                            alt=""
                          />
                        )
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <Spinner />
              ) : (
                searchedResults?.map((buyer) => (
                  <TableRow
                    key={buyer._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleOpenModal(false, buyer)}
                  >
                    <TableCell component="th" scope="row">
                      <p className="AP_plus_title">{buyer.company_name} </p>
                    </TableCell>
                    <TableCell align="left" className="country2">
                      {buyer?.country}
                      <br />
                    </TableCell>
                    <TableCell align="left" className="country2">
                      {buyer.email}
                    </TableCell>
                    <TableCell align="left" className="country2">
                      {buyer.phone_number}
                    </TableCell>
                    <TableCell
                      align="left"
                      className="country2"
                      style={{ cursor: "pointer" }}
                    >
                      <p className="country2">{buyer.address}</p>
                    </TableCell>

                    <TableCell
                      align="left"
                      className="country2"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={EditIcon}
                        alt=""
                        className="dltIcon"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation(true);
                          handleOpenModal(true, buyer);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <BuyerModal
          t={t}
          setActiveField={setActiveField}
          activeField={activeField}
          userId={userId}
          countries={countries}
          formState={formState}
          setFormState={setFormState}
          isEdit={isEdit}
          setBuyer={setBuyer}
          setIsEdit={setIsEdit}
          buyer={buyer}
          fetchBuyers={fetchBuyers}
          setOpen={setOpen}
          open={open}
        />
      </div>
    </>
  );
};

export default BuyersTab;
