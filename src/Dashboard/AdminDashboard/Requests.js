import React, { useState, useEffect } from "react";
import SearchField from "../../components/Common/SearchField";
import { useHistory } from "react-router-dom";
import API from "../../api";
import Moment from "moment";
import { useTranslation } from "react-i18next";

// table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import downArrow from "../../assets/TitleDownArrow.svg";
import arrow_up from "../../assets/arrow_up.svg";
import { getSortedData } from "../../lib/getSortedData";
import Spinner from "../../components/Common/Spinner";
import { createFilter } from "react-search-input";
import toaster from "../../utils/toaster";

const nestSortTitles = [
  {
    title: "country",
    fields: ["name"],
  },
];

const TITLES = [
  {
    name: "Request",
    key: "name",
    sortIcon: true,
  },
  {
    name: "Date",
    key: "createdAt",
    sortIcon: true,
  },
  {
    name: "Certificate cost",
    key: "name",
    sortIcon: false,
  },
  {
    name: "Service providers",
    key: "name",
    sortIcon: false,
  },
  {
    name: "Status",
    key: "name",
    sortIcon: false,
  },
];

const KEYS_TO_FILTERS = ["title"];

const Requests = () => {
  const [allRequest, setAllRequest] = useState([]);
  const [sort, setSort] = useState({ key: "", ascend: true });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { t } = useTranslation();
  const history = useHistory(null);
  useEffect(() => {
    handleAllRequest();
  }, []);
  const handleAllRequest = async () => {
    setLoading(true);
    await API("get", "/requests")
      .then((res) => {
        setAllRequest(res.data.requets);
        setLoading(false);
      })
      .catch((err) => {
        toaster("Failed", t("Failed to fetch data!"));
        setLoading(false);
        console.log("err", err);
      });
  };

  const searchedResults = allRequest?.filter(createFilter(searchTerm, KEYS_TO_FILTERS));

  return (
    <div className="list_main_div">
      <div className="list_second_div">
        {/* list head  */}
        <div className="List_heading_div">
          <h1 className="list_rqst_h1">{t("List of requests")}</h1>
          <div className="searchingRequest">
            <SearchField placeholder={t("Search")} setSearch={setSearchTerm} />
          </div>
        </div>
        {/* list table   */}
        <div className="list_table">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {TITLES.map((item) => (
                    <TableCell
                      align="left"
                      className="country"
                      style={{ backgrounColor: "#EAECF0" }}
                    >
                      {t(item.name)} &nbsp;
                      {item.sortIcon && !sort.ascend && sort.key === item.key ? (
                        <img
                          className="sorting-icon"
                          onClick={() =>
                            getSortedData(
                              allRequest,
                              setAllRequest,
                              setSort,
                              nestSortTitles,
                              item.key,
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
                                allRequest,
                                setAllRequest,
                                setSort,
                                nestSortTitles,
                                item.key,
                                false
                              )
                            }
                            src={downArrow}
                            alt=""
                          />
                        )
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {loading ? (
                <Spinner />
              ) : (
                <TableBody>
                  {searchedResults?.map((item) => {
                    return (
                      <TableRow
                        key={item?._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          cursor: "pointer",
                        }}
                        onClick={() => history.push(`/Admin/ValidateRequest/${item?._id}`)}
                      >
                        <TableCell component="th" scope="row">
                          <p className="AP_plus_title">{item?.title}</p>
                          <p className="country2">{item?.country?.name}</p>
                        </TableCell>
                        <TableCell align="left" className="country2">
                          {Moment(item?.createdAt).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell align="left" className="country2">
                          {item?.certification_cost?.value ? (
                            <>
                              {item?.certification_cost?.currency === "USD"
                                ? item?.certification_cost?.value + "$"
                                : item?.certification_cost?.currency === "EURO" &&
                                  item?.certification_cost?.value + "€"}
                            </>
                          ) : (
                            "--"
                          )}
                        </TableCell>

                        <TableCell align="left" className="country2">
                          {item?.vendor?.vendor ? <>{item?.vendor?.vendor?.name}</> : "--"}
                        </TableCell>
                        <TableCell align="left">
                          {item?.status === "Validate By Admin" ? (
                            <p className="clrClass">{t(item?.status)}</p>
                          ) : item?.status === "Missing documents" ? (
                            <p className="missingDocStatus">{t(item?.status)}</p>
                          ) : item?.status === "Validated" ? (
                            <p className="clrClass">{t(item?.status)}</p>
                          ) : item?.status === "sent" ? (
                            <p className="send_status">{t(item?.status)}</p>
                          ) : item?.status === "Benig Checked By Expert" ? (
                            <p className="process_status">{t(item?.status)}</p>
                          ) : (
                            item?.status
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Requests;
