import React, { useEffect, useState } from "react";
import DownArrow from "../../assets/TitleDownArrow.svg";
import Button from "../../components/Common/Button";
import SearchField from "../../components/Common/SearchField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PlusIcon from "../../assets/PlusIcon.svg";
import PaginationPage from "../../components/AdminDashboard/Pagination";
import API from "../../api/index";

const ServiceProviders = () => {
  const [vendors, setVendors] = useState();
  useEffect(() => {
    handleServiceProvider();
  }, []);
  const handleServiceProvider = async () => {
    await API("get", "/vendors/")
      .then((res) => {
        setVendors(res.data.vendor);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="list_main_div">
        <div className="list_second_div">
          {/* list head  */}
          <div className="List_heading_div">
            <h1 className="list_h1">Service providers</h1>
            <div className="searching">
              <SearchField placeholder="Searching" />
              <Button className="list_reqst_btn2" text={"Add a service provider"} Imgsrc={PlusIcon} />
            </div>
          </div>
          {/* list table   */}
          <div className="list_table">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "#667085", backgroundColor: "#F9FAFB" }}>
                      Prestataire <img src={DownArrow} alt="" />
                    </TableCell>
                    <TableCell sx={{ color: "#667085", backgroundColor: "#F9FAFB" }}>
                      Pays associés &nbsp;
                      <img src={DownArrow} alt="" />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vendors?.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell component="th" scope="row" sx={{ border: "1px solid #E5E5E5;", padding: 2 }}>
                        {item.name}
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ border: "1px solid #E5E5E5;", padding: 2 }}>
                        {item.countries.map((country) => {
                          return <p>{country.name}</p>;
                        })}
                      </TableCell>
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

export default ServiceProviders;
