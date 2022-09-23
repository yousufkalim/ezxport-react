import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import API from "../../api/index";
import Moment from "moment";
import Modal from "../../components/Common/Modal";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Featured1 } from "../../assets/Featured1.svg";
import Button from "../../components/Common/Button";
import { useTranslation } from "react-i18next";
import downArrow from "../../assets/TitleDownArrow.svg";
import arrow_up from "../../assets/arrow_up.svg";
import { getSortedData } from "../../lib/getSortedData";
import CreateRequest from "./CreateRequest";
import Spinner from "../../components/Common/Spinner";

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
    name: "Statutes",
    key: "name",
    sortIcon: false,
  },
];

const FollowUp = () => {
  const [allRequest, setAllRequest] = useState([]);
  const [requestedModal, setRequestedModal] = useState(false);
  const [sort, setSort] = useState({ key: "", ascend: true });
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")));

  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let request = localStorage.getItem("Requested");
    if (request === "true") {
      setRequestedModal(true);
    }
  }, []);
  useEffect(() => {
    handleAllRequest();
  }, [userData]);

  const history = useHistory();
  const handleRequested = () => {
    setRequestedModal(false);
    localStorage.removeItem("Requested");
  };
  const handleAllRequest = async () => {
    setLoading(true);
    await API("get", `/requests/getByUser/${userData?._id}`)
      .then((res) => {
        setAllRequest(res.data.request);
        setLoading(false);
      })
      .catch((err) => {
        console.log("handleAllRequest", err);
        setLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : allRequest?.length !== 0 ? (
        <div className="list_main_div">
          <div className="list_second_div">
            {/* list head  */}
            <div className="List_heading_div">
              <h1 className="list_h1">{t("List of requests")}</h1>
              <Link to="/User/RequestForm">
                <button className="list_reqst_btn">{t("Create a request")}</button>
              </Link>
            </div>
            {/* list table   */}
            <div className="list_table">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {TITLES.map((item) => (
                        <TableCell align="left" className="country" style={{ backgrounColor: "#EAECF0" }} key={item?.name}>
                          {t(item.name)} &nbsp;
                          {item.sortIcon && !sort.ascend && sort.key === item.key ? (
                            <img
                              className="sorting-icon"
                              onClick={() => getSortedData(allRequest, setAllRequest, setSort, nestSortTitles, item.key, true)}
                              src={arrow_up}
                              alt=""
                            />
                          ) : (
                            item.sortIcon && (
                              <img
                                onClick={() => getSortedData(allRequest, setAllRequest, setSort, nestSortTitles, item.key, false)}
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
                    {allRequest?.map((item) => (
                      <TableRow
                        style={{ cursor: "pointer" }}
                        key={item?._id}
                        onClick={() => history.push(`/User/Dashboard/Application/${item._id}`)}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          <p className="request_title">{item?.title}</p>
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
                                : item?.certification_cost?.currency === "EURO" && item?.certification_cost?.value + "€"}
                            </>
                          ) : (
                            "--"
                          )}
                        </TableCell>

                        <TableCell align="left" className="country2">
                          {item?.vendor?.vendor ? <>{item?.vendor?.vendor?.name}</> : "--"}
                        </TableCell>
                        <TableCell align="left">

                          {item?.status === "Sent" ? (
                            <p className="send_status">{t(item?.status)}</p>
                          ) : item?.status === "Missing documents" ? (
                            <p className="missingDocStatus">{t(item?.status)}</p>
                          ) : item?.status === "Validated" ? (
                            <p className="clrClass">{t(item?.status)}</p>
                          ) : item?.status === "Being checked by an expert" ? (
                            <p className="process_status">{t(item?.status)}</p>
                          ) : (
                            item?.status
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      ) : (
        <CreateRequest />
      )}

      <Modal open={requestedModal} setOpen={setRequestedModal} handleClose={handleRequested}>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            <div className="space">
              <Logo />
            </div>
            <div className="space">
              <Featured1 />
            </div>

            <div className="space" style={{ textAlign: "center", fontSize: "2rem", fontWeight: "600" }}>
              Votre demande été effectuée <br />
              avec succès
            </div>
            <div className="space" style={{ fontSize: "1.2rem", width: "90%", color: "#667085", textAlign: "center" }}>
              Nous allons procéder au traitement de votre dossier
              <br /> dans les meilleurs délais, et reviendrons vers vous. Vous <br />
              pouvez retrouver votre demande dans le tableau de
              <br /> <b>suivi des demandes.</b>
            </div>
          </div>
          <Button text="D’accord" className="to_confirm_btn" onClick={handleRequested} />
        </div>
      </Modal>
    </>
  );
};

export default FollowUp;
