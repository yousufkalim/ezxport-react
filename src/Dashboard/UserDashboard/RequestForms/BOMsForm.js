import React, { useState, useEffect, useRef } from "react";
import Inputfield from "../../../components/Common/InputField";
import Button from "../../../components/Common/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DownArrow from "../../../assets/TitleDownArrow.svg";
import Paper from "@mui/material/Paper";
import DeleteIcon from "../../../assets/DeleteIcon.svg";
import EditIcon from "../../../assets/EditIcon.svg";
import Modal from "../../../components/Common/Modal";
import { ReactComponent as Featured1 } from "../../../assets/Featured1.svg";
import InputField from "../../../components/Common/InputField";
import { ReactComponent as Logo } from "../../../assets/logo.svg";
import { ReactComponent as Featured } from "../../../assets/Featured.svg";
import API from "../../../api/index";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Link, useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import ConfirmModal from "../../../components/Common/ConfirmModal";
import { Store , UpdateStore} from "../../../StoreContext";
import { useTranslation } from "react-i18next";
import toaster from "../../../utils/toaster";

const user = JSON.parse(localStorage.getItem("userData"));
const BOMsForm = (props) => {
  const { step1, setStep1, setMatchedData, allCodes, setAllCodes ,currency ,setRetrieveRequestId} = props;

  const history = useHistory(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [verificationModal, setVerificationModal] = useState(false);
  const [code, setCode] = useState("default");
  const [monetaryValue, setMonetaryValue] = useState("");
  const [requestByCountry, setRequestByCountry] = useState([]);
  const [editModalData, setEditModalData] = useState({});
  const [importedFile, setImportedFile] = useState();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  // const [retrieveRequestId, setRetrieveRequestId] = useState("");
  const [bomId, setBomId] = useState("");
  const [bomIndex, setBomIndex] = useState("");
  const [adminCodes, setAdminCodes] = useState([]);
  const { request, pastRequest , previousCodes } = Store();
  console.log("🚀 ~ file: BOMsForm.js ~ line 48 ~ BOMsForm ~ previousCodes", previousCodes)
  console.log("🚀 ~ file: BOMsForm.js ~ line 48 ~ BOMsForm ~ request", request)
  const updateStore = UpdateStore();

  useEffect(() => {
    if (pastRequest) {
      getSetData();
    }
  }, [request]);

  const getSetData = () => {
    const { title, country, codes } = request;
    const countryId = country?._id;
    // handleTitle(countryId);
    const matched = getMatchedCodes(codes);
    setStep1({ ...step1, country: countryId });
    setAllCodes(matched);
  
  };

  const getMatchedCodes = (codes) => {
    const newCodes = [];
    codes?.forEach((item) => {
      const { monetary_value } = item;
      console.log("CODE ID ", item);
      const {
        code,
        _id: codeID,
        certification_required,
        admin_code,
      } = item.code;
      const codeObj = {
        monetary_value,
        admin_code,
        code,
        codeID,
        certification_required,
      };
      newCodes.push(codeObj);
    });
    return newCodes;
  };

  const { t } = useTranslation();

  const fileRef = useRef(null);

  const handleAllRequestByCountryId = async () => {
    await API("get", `/requests/getByCountry/${step1?.country}`)
      .then((res) => {
        setRequestByCountry(res?.data?.request);
      })

      .catch((err) => toaster("Failed", t(err.response.data.message).msg));
  };
  useEffect(() => {
    handleAllRequestByCountryId();
  }, [step1?.country]);
  useEffect(() => {
    if (step1?.country !== "") {
      getBomByCountryId();
    }
  }, [step1?.country]);

  useEffect(() => {
    if (step1?.country !== "") {
      handleTitle(step1.country);
    }
  }, [step1?.country]);

  const handleEditModal = () => setOpenEditModal(false);
  const handleCertificateRequire = () => props.setCertificateRequire(false);
  const handleCertificateNotRequire = () =>
    props.setCertificateNotRequire(false);
  // const handleVerification = () => setVerificationModal(false);
  const handleGetAllCountry = async () => {
    await API("get", "/countries/")
      .then((res) => {
        props.setCounteries(res.data.countries);
      })

      .catch((err) => toaster("Failed", t(err.response.data.message).msg));
  };
  useEffect(() => {
    handleGetAllCountry();
  }, []);

  const handleAddCodes = () => {
    console.log("CODE ID ", code);
    const obj = {
      admin_code: code.admin_code,
      code: code?.code,
      codeID: code?._id,
      monetary_value: monetaryValue || "--",
      certification_required: code?.certification_required,
    };
    // props.matchedData.push(obj);
    console.log("CODE Obj ", obj);
    console.log("CODE ALL codes ", obj);
    console.log("Admin ALL codes ", adminCodes);
    setAllCodes([...allCodes, obj]);
    let filtered = adminCodes?.filter((item) => {
      return item?._id !== code?._id;
    });
    // props.setUnMatchedData(filtered);
    setAdminCodes(filtered);
    setCode("default");
    setMonetaryValue("");
  };


  const handleDocument = async (file) => {
    var filename = file.name.split(".").pop();
    if (filename === "xlsx") {
      setLoading(true);
      setImportedFile(file);
      let formData = new FormData();
      formData.append("file", file);
      formData.append("country", `${step1.country}`);
      await API("post", "/boms/filterCodes", formData)
        .then((res) => {
          setLoading(false);
          let arr1 = [];
          let arr2 = [];
          res?.data?.matchedData.map((item) => {
            arr1.push({
              admin_code: item.bom.admin_code,
              code: item?.bom?.code,
              codeID: item?.bom?._id,
              monetary_value: monetaryValue || item?.monetary_value,
              certification_required: item.bom?.certification_required,
            });
          });

          res?.data?.unMatched.map((item) => {
            arr2.push({
              admin_code: item.bom.admin_code,
              code: item?.bom?.code,
              codeID: item?.bom?._id,
              monetary_value: monetaryValue || item?.monetary_value,
              certification_required: item.bom?.certification_required,
            });
          });

          // props?.setMatchedData([...arr1]);
          // props?.setUnMatchedData(res?.data?.unMatched);
          // props.setUnMatchedCodes(res?.data?.unMatched);
          setAllCodes([...allCodes, ...arr1, ...arr2]);
        })
        .catch((err) => {
          setLoading(false);
          toaster("Failed", t("Country is required for uploading codes"));

          setImportedFile("");
        });
    } else {
      toaster("Failed", t("Can only upload Excel sheet"));
      setLoading(false);
      setImportedFile("");
    }
  };

  const handleDelete = (code , bomIndex) => {
    const codes = [...allCodes]
    const findCode = codes?.find((item , index) => index === bomIndex);
    let filtered = codes.filter((item , index1) => {
      return index1 !== bomIndex;
    });
 
    if (findCode && findCode.certification_required && !pastRequest) {
      setAdminCodes([...adminCodes, findCode]);
    }
    setAllCodes(filtered);
    setOpenModal(false);
  };

  const handleTitle = async () => {
    await API("post", "/requests/createName", {
      userId: user._id,
      countryId: step1.country,
    })
      .then((res) => {
        props.handleChange("title", (res?.data?.tile).toUpperCase());
      })

      .catch((err) => toaster("Failed", t(err.response.data.message).msg));
  };
  const handleSearchTitle = async () => {
    await API("post", "/requests/searchName/", {
      title: step1?.title,
    })
      .then((res) => {
        props.handleChange("title", res?.data?.tile);
      })
      .catch((err) => toaster("Failed", t(err.response.data.message).msg));
  };
  const handleMonetaryValue = (value) => {
    const validatedValue = value.replace(/[^0-9]/g, "");
    if (validatedValue === "0") {
      if (monetaryValue !== "") {
        setMonetaryValue(validatedValue);
      }
    } else {
      setMonetaryValue(validatedValue);
    }
  };
  const getBomByCountryId = async () => {
    await API("get", `/boms/getByCountryId/${step1.country}`)
      .then((res) => {
        setAdminCodes(res?.data?.bom);
      })
      .catch((err) => {
        console.log("first2", err);
      });
  };
  return (
    <div>
      <div style={{ width: "100%" }}>
        <label className="BomLabel">{t("Country")}</label>
        <Select
          name="country"
          id="demo-simple-select"
          // defaultValue={"default"}
          value={step1?.country || "default"}
          onChange={(e) => {
            props?.handleChange(e.target.name, e.target.value);
          }}
          className="countrydropdown"
        >
          <MenuItem disabled value="default">
            {t("Select a Country")}
          </MenuItem>
          {props?.countries?.map((item) => {
            return <MenuItem value={item?._id}>{item?.name}</MenuItem>;
          })}
        </Select>

        <label className="BomLabel">
          {t(
            "Create a new request or select an old request to retrieve information"
          )}
        </label>
        <Select
          id="demo-simple-select"
          defaultValue={"default"}
          onChange={(e) => {
            setRetrieveRequestId(e.target.value);
          }}
          className="countrydropdown"
        >
          <MenuItem value="default">{t("Create a new Request")}</MenuItem>
          {requestByCountry?.map((item) => {
            return <MenuItem value={item?._id}>{item?.title}</MenuItem>;
          })}
        </Select>
        <label className="BomLabel">{t("Application title")}</label>
        <Inputfield
          // label="Application title"
          style={{ width: "100%" }}
          name="title"
          placeholder={t("Application title")}
          className="applicationTitle2"
          onChange={(e) => {
            props.handleChange(e.target.name, e.target.value);
          }}
          onBlur={handleSearchTitle}
          value={step1.title}
        />

        <div className="ProductList_boms" style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            <span className="title_productList">{t("Product Lists")}</span>
            <br />
            <Link
              to={"/Files/codeTemplate.xlsx"}
              target="_blank"
              download
              className="download_text"
            >
              {t("You don't know your product nomenclatures?")}
            </Link>
          </div>
          <div
            style={{
              width: "55%",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                marginRight: "7px",
              }}
            >
              {loading ? <CircularProgress color="secondary" /> : ""}
            </div>
            <label className="import_Btn" htmlFor="file">
              {t(importedFile?.name || "Import an XLS file")}
              <input
                onClick={(event) => {
                  event.target.value = null;
                }}
                type="file"
                style={{ display: "none" }}
                id="file"
                onChange={(e) => handleDocument(e.target.files[0])}
              />
            </label>
          </div>

          <Link
            to={"/Files/codeTemplate.xlsx"}
            target="_blank"
            download
            className="download_Btn"
          >
            {t("Download XLS file")}
          </Link>
        </div>
      </div>

      <div className="add_code_div">
        <div className="codedropdown_div">
          <label className="BomLabel">Code</label>

          <Select
            name="codes"
            id="demo-simple-select"
            defaultValue={"default"}
            onChange={(e) => setCode(e.target.value)}
            className="countrydropdown"
          >
            <MenuItem disabled value="default">
              {t("Select a Code")}
            </MenuItem>
            {adminCodes?.map((item) => {
              return <MenuItem value={item}>{item?.code}</MenuItem>;
            })}
          </Select>
        </div>
        <div className="codedropdown_div">
          <label className="BomLabel">{t("Monetary value")}</label>
          <Inputfield
            value={monetaryValue}
            className="applicationTitle"
            onChange={(e) => handleMonetaryValue(e.target.value)}
          />
        </div>
        <div className="codedropdown_div1">
          <Button
            text={t("To add")}
            className={
              code === "default" ? "to_add_btn_disabled" : "to_add_btn"
            }
            onClick={handleAddCodes}
            disabled={code === "default" ? true : false}
          />
        </div>
      </div>
      {allCodes?.length === 0 ? (
        ""
      ) : (
        <TableContainer
          component={Paper}
          style={{ width: "100%", marginTop: "2%" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className="country">
                  {t("Code")}
                </TableCell>
                <TableCell align="center" className="country">
                  {t("Monetary value")}
                </TableCell>

                <TableCell align="center" className="country">
                  {t("Actions")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allCodes?.map((item, index) => {
                return (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={index}

                  >
                    <TableCell align="center" style={{ width: "20%" }}>
                      <p
                        className="AP_plus_title"

                        style={{ color: item?.certification_required === false && "red" }}
                      >
                        {item?.code}
                      </p>
                    </TableCell>

                    <TableCell align="center" className="country2" style={{ width: "20%" }}>
                      <p
                        className="AP_plus_title"
                        style={{ color: item?.certification_required === false && "red" }}
                      >
                        {item?.monetary_value}
                      </p>
                    </TableCell>

                    <TableCell align="center" className="country2">
                      <img
                        src={DeleteIcon}
                        alt=""
                        className="dltIcon"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setOpenModal(true);
                          setBomId(item);
                          setBomIndex(index)
                        }}
                      />
                      <img
                        src={EditIcon}
                        alt=""
                        className="dltIcon"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setOpenEditModal(true);
                          setEditModalData({ item: { ...item }, index });
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* Edit codes modal */}
      <Modal
        open={openEditModal}
        setOpen={setOpenEditModal}
        title={t("Modify BOM")}
        handleClose={handleEditModal}
        Closebtn={true}
      >
        <div>
          <div style={{ marginTop: "2.2rem" }}>
            <label className="BomLabel">Code</label>
            <InputField
              className="code_textfield"
              value={editModalData?.item?.code}
              disabled={true}
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label className="BomLabel">{t("Monetary value")}</label>
            <InputField
              className="monetary_value"
              value={editModalData?.item?.monetary_value}
              onChange={(e) => {
                setEditModalData((prev) => {
                  prev.item.monetary_value = e.target.value;
                  return { ...prev };
                });
              }}
            />
          </div>
          <Button
            text="To Confirm"
            className="to_confirm_btn"
            onClick={() => {
              setAllCodes((prev) => {
                prev[editModalData.index].monetary_value =
                  editModalData?.item?.monetary_value;
                return [...prev];
              });
              setOpenEditModal(false);
            }}
          />
          <Button
            text={t("Delete BOM")}
            className="delete_bom_btn"
            onClick={() => {
              handleDelete(editModalData);
              setOpenEditModal(false);
            }}
          />
        </div>
      </Modal>

      <ConfirmModal
        open={openModal}
        setOpen={setOpenModal}
        action={() => handleDelete(bomId , bomIndex)}
      />
      {/* certification required modal */}
      <Modal
        open={props.certificateRequire}
        setOpen={props.setCertificateRequire}
        handleClose={handleCertificateRequire}
      >
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
              <Featured />
            </div>

            <div className="space">
              {t("Those products for")} &nbsp;
              <span className="bold_text_in_modal">
                {props.certificationCountryOfCode}{" "}
                {t("require a certification")}
              </span>
            </div>
            <div className="space">
              {t("The cost of this certification is up to")}
              <span style={{ fontWeight: 900, fontSize: "19px" }}>
                {props.certificationCostOfCode} {currency === "USD"  ? "$" : "Є"}/HT
              </span>
            </div>
          </div>
          <Button
            text={t("Continue my request on Ezxport")}
            className="to_confirm_btn"
            onClick={props.handleStep1}
          />
          <Button
            text={t("Go back to my request")}
            className="delete_bom_btn"
            onClick={handleCertificateRequire}
          />
        </div>
      </Modal>
      <Modal
        open={props.certificateNotRequire}
        setOpen={props.setCertificateNotRequire}
        handleClose={handleCertificateNotRequire}
      >
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

            <div className="space">
              {t("Those products for")} &nbsp;
              <span className="bold_text_in_modal">
                {props.certificationCountryOfCode}{" "}
                {t("do not require a certification")}
              </span>
            </div>
            <div className="space" style={{ textAlign: "center" }}>
              {t(
                "You can therefore send your goods without going through an organization."
              )}
            </div>
          </div>
          <Button
            text={t("Make another request")}
            className="to_confirm_btn"
            onClick={() => history.push("/User/Dashboard/ListOfRequests")}
          />
          <Button
            text={t("Go back to my request")}
            className="delete_bom_btn"
            onClick={handleCertificateNotRequire}
          />
        </div>
      </Modal>

    </div>
  );
};

export default BOMsForm;
