import React, { useState, useEffect } from "react";
import AdminCountry from "../../components/AdminDashboard/AdminCountry";
import DownArrow from "../../assets/TitleDownArrow.svg";
import API from "../../api/index";
import Button from "../../components/Common/Button";
import SearchField from "../../components/Common/SearchField";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PlusIcon from "../../assets/PlusIcon.svg";
import PaginationPage from "../../components/AdminDashboard/Pagination";
import { useHistory } from "react-router-dom";

const Country = () => {
  const [countries, setCounteries] = useState([]);
  const history = useHistory();

  useEffect(() => {
    handleCountries();
  }, []);
  const handleCountries = async () => {
    await API("get", "/countries/")
      .then((res) => {
        setCounteries(res.data.countries);
        console.log(res);
      })
      .catch((err) => {
        console.log(err, "<_-__");
      });
  };
  return (
    <>
      {/* <AdminCountry title="Country" rows={countries} text="Country" img={DownArrow} /> */}
      <div className="list_main_div">
        <div className="list_second_div">
          {/* list head  */}
          <div className="List_heading_div">
            <h1 className="list_h1">Country</h1>
            <div className="searching">
              <SearchField placeholder="Searching" />
              <Button
                className="list_reqst_btn2"
                // text={`${history.location.pathname != "/Admin/Dashboard/Country" ? "Add a service provider" : "Add a country"}`}
                text={"Add a country"}
                Imgsrc={PlusIcon}
              />
            </div>
          </div>
          {/* list table   */}
          <div className="list_table">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "#667085", backgroundColor: "#F9FAFB" }}>
                      Country <img src={DownArrow} alt="" />
                    </TableCell>
                    {history.location.pathname == "/Admin/Dashboard/Service" && (
                      <TableCell sx={{ color: "#667085", backgroundColor: "#F9FAFB" }}>
                        {/* {props.text2} */}
                        &nbsp;
                        <img src={DownArrow} alt="" />
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {countries.map((item) => (
                    <TableRow
                      key={item.name}
                      // sx={{ '&:last-child td, &:last-child th': { border: 0, padding: 1 } }}
                    >
                      <TableCell component="th" scope="row" sx={{ border: "1px solid #E5E5E5;", padding: 2 }}>
                        <Link
                          exact
                          to={`/Admin/Dashboard/Country/NomPays/${item._id}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          {item.name}
                        </Link>
                      </TableCell>
                      {/* {history.location.pathname != "/Admin/Dashboard/Country" && (
                        <TableCell component="th" scope="row" sx={{ border: "1px solid #E5E5E5;", padding: 2 }}>
                          {item.name}
                        </TableCell>
                      )} */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <PaginationPage />
          </div>
        </div>
      </div>
    </>
  );
};

export default Country;
