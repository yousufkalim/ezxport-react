import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextFieldSelect from "../Common/TextFieldSelect";
import FormControl from "@mui/material/FormControl";
import DownArrow from "../../assets/TitleDownArrow.svg";
import DeleteIcon from "../../assets/DeleteIcon.svg";
import EditIcon from "../../assets/EditIcon.svg";
import API from "../../api/index";
const CalculationRange = (props) => {
  const [rangeData, setRangeData] = useState();
  // const [minCostCurrency, setMinCostCurrency] = useState();
  // const [maxCostCurrency, setMaxCostCurrency] = useState();
  const [certificat, setCertificat] = useState();
  const [minCost, setMinCost] = useState();
  const [maxCost, setMaxCost] = useState();
  const handleRangeData = async () => {
    await API("get", `/calculations/${props.id}`)
      .then((res) => {
        console.log(res, "eeeeeee");
        setRangeData(res?.data?.calculation?.range);
      })
      .catch((err) => {
        console.log(err, "errrrrrr");
      });
  };
  const handleAddRange = async () => {
    await API("put", `/calculations/updateRange/62e3ab964825261f411cf511`, {
      range: { min: minCost, max: maxCost, certificate_cost: certificat },
    })
      .then((res) => {
        console.log("first", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    handleRangeData();
  }, []);
  return (
    <div>
      {/* table  */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" className="country" style={{ backgrounColor: "#EAECF0" }}>
                Minimum <img src={DownArrow} alt="" />
              </TableCell>
              <TableCell align="left" className="country" style={{ backgrounColor: "#EAECF0" }}>
                Maximum <img src={DownArrow} alt="" />
              </TableCell>
              <TableCell align="left" className="country" style={{ backgrounColor: "#EAECF0" }}>
                Coût certificat <img src={DownArrow} alt="" />
              </TableCell>
              <TableCell align="left" className="country" style={{ backgrounColor: "#EAECF0" }}>
                Actions <img src={DownArrow} alt="" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rangeData?.map((item) => (
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row" style={{ width: "20%" }}>
                  {item.min}
                  <br />
                </TableCell>
                <TableCell align="left" className="country2" style={{ width: "20%" }}>
                  {item.max}
                </TableCell>
                <TableCell align="left" className="country2">
                  {item.certificate_cost}
                </TableCell>
                <TableCell align="left" className="country2">
                  <img src={DeleteIcon} alt="" className="dltIcon" style={{ cursor: "pointer" }} />
                  &nbsp; &nbsp;
                  <img src={EditIcon} alt="" className="dltIcon" style={{ cursor: "pointer" }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="AddSlice_main">
        <div className="AddSlice_senter">
          <h2 className="AddSlice_title">Ajouter une tranche</h2>
          <div className="AddSlice_inputs_div">
            <div className="AddSlice_input_fields">
              <FormControl fullWidth>
                <label htmlFor="" className="buyer_label">
                  Minimum
                </label>
                <TextFieldSelect
                  value={minCost}
                  onChange={(e) => setMinCost(e.target.value)}
                  // onOptionChange={(e) => {
                  //   setMinCostCurrency(e.target.value);
                  // }}
                />
              </FormControl>
            </div>
            <div className="AddSlice_input_fields">
              <FormControl fullWidth>
                <label htmlFor="" className="buyer_label">
                  Maximum
                </label>
                <TextFieldSelect
                  value={maxCost}
                  onChange={(e) => setMaxCost(e.target.value)}
                  // onOptionChange={(e) => {
                  //   setMaxCostCurrency(e.target.value);
                  // }}
                />
              </FormControl>
            </div>
            <div className="AddSlice_input_fields">
              <FormControl fullWidth>
                <label htmlFor="" className="buyer_label">
                  Coût certificat
                </label>
                <TextFieldSelect
                  value={certificat}
                  onChange={(e) => setCertificat(e.target.value)}
                  // onOptionChange={(e) => {
                  //   setMaxCostCurrency(e.target.value);
                  // }}
                />
              </FormControl>
            </div>
          </div>
          <button className="AddSlice_button" onClick={handleAddRange}>
            Ajouter la ligne
          </button>
        </div>
      </div>
      {/* table  */}
    </div>
  );
};
export default CalculationRange;
