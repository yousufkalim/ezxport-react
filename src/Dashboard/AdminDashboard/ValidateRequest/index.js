import React, { useState, useEffect } from "react";
import CompanyInformation from "../ValidateRequest/CompanyInformation";
import { useHistory } from "react-router-dom";
import EzxportIcon from "../../../assets/EzxportIcon.svg";
import { Link } from "react-router-dom";
import BackArrow from "../../../assets/BackArrow.svg";
import { useParams } from "react-router-dom";
import API from "../../../api/index";
import Modal from "../../../components/Common/Modal";
import Button from "../../../components/Common/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useTranslation } from "react-i18next";
import toaster from "../../../utils/toaster";

const Index = () => {
  const history = useHistory();
  const [countTabe, setCountTabe] = useState();
  const [requestById, setRequestById] = useState({});
  const [inputList, setInputList] = useState([]);
  const [inputListProduct, setInputListProduct] = useState([]);
  const [validateCountry, setValidateCountry] = useState(false);
  const [validateProduct, setValidateProduct] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [modalBtn, setModalBtn] = useState(false);
  const [comment, setComment] = useState("");

  const { t } = useTranslation();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    handlerequestById();
  }, []);
  function TabeProps(data) {
    setCountTabe(data);
  }

  const handlerequestById = async () => {
    await API("get", `/requests/${id}`)
      .then((res) => {
        setRequestById(res?.data?.request);
      })
      .catch((err) => {
        console.log(err, "errrrrr");
      });
  };

  const handleCountryDocsValidate = async (checked, id) => {
    await API("put", `/requests/validateDoc/${requestById._id}`, {
      doc_id: id,
      status: checked ? "valid" : "invalid",
    })
      .then((res) => {
        console.log("handleCountryDocsValidate", res);
        if (checked) {
          toaster("success", "Document Validated Successfully", "Validated Document");

          handlerequestById();
        } else {
          toaster("warning", "Document Un-Validated");

          handlerequestById();
        }
      })
      .catch((err) => {
        console.log("handleCountryDocsValidate", err);
      });
  };

  const handleProductDocsValidate = async (name, checked, id) => {
    const DocName = name;
    await API("put", `/requests/validateProductDoc/${id}`, {
      [DocName]: {
        status: checked ? "valid" : "invalid",
      },
    })
      .then((res) => {
        if (checked) {
          console.log("handleProductDocsValidate", res);
          toaster("success", "Document Validated Successfully", "Validated Document");

          handlerequestById();
        } else {
          toaster("warning", "Document Un-Validated");

          handlerequestById();
        }
      })
      .catch((err) => {
        console.log("handleProductDocsValidate", err);
      });
  };
  // console.log();
  const handleRequestDoc = async () => {
    setModalBtn(true);
    await API("put", `/requests/ReqmissingDocs/${requestById._id}`, {
      admin_remarks: comment,
      products: inputListProduct,
      documents: inputList,
    })
      .then((res) => {
        console.log(res, "handleRequestDoc");
        setCommentModal(false);
        setModalBtn(false);
        history.push("/RequestDocuments");
      })
      .catch((err) => {
        setModalBtn(false);
        console.log("err", err);
      });
  };
  const handleValidByAdmin = async () => {
    await API("put", `/requests/validateRequest/${requestById._id}`)
      .then((res) => {
        console.log(res, "handleValidByAdmin");
        history.push("/SendDocuments");
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleClose = () => setCommentModal(false);
  const handleModalOpen = () => setCommentModal(true);

  return (
    <>
      <div className="Reference_header">
        <div className="Reference_center_div">
          <div className="Reference_heading">
            <Link to="/Admin/Dashboard/Requests" style={{ color: "black", textDecoration: "none" }}>
              <p className="Reference_h2">
                <img src={BackArrow} alt="" />
                &nbsp; {t("Reference")}{" "}
              </p>
            </Link>
          </div>
          <div className="Reference_logo_div">
            <img src={EzxportIcon} alt="" className="header_center_div" />
          </div>
          {/* <div> */}
          {countTabe === 2 && (
            <div>
              <Button text={t("Download the file")} className="validate_button2" />
              &nbsp;
              {validateCountry &&
              validateProduct &&
              inputList.length === 0 &&
              inputListProduct.length === 0 ? (
                <Button
                  text={t("Validate the file")}
                  className="validate_button"
                  onClick={handleValidByAdmin}
                />
              ) : (
                <Button
                  text={t("Request document")}
                  className="validate_button"
                  onClick={handleModalOpen}
                />
              )}
            </div>
          )}
          {/* </div> */}
        </div>
      </div>

      <CompanyInformation
        TabeProps={TabeProps}
        requestById={requestById}
        handleCountryDocsValidate={handleCountryDocsValidate}
        handleProductDocsValidate={handleProductDocsValidate}
        inputList={inputList}
        setInputList={setInputList}
        inputListProduct={inputListProduct}
        setInputListProduct={setInputListProduct}
        validateCountry={validateCountry}
        setValidateCountry={setValidateCountry}
        validateProduct={validateProduct}
        setValidateProduct={setValidateProduct}
      />
      <Modal
        open={commentModal}
        setOpen={setCommentModal}
        title={t("Please add your comment below")}
        handleClose={handleClose}
        Closebtn={true}
      >
        <TextareaAutosize
          minRows={10}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={t("Start writing from here")}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "1rem",
            marginTop: "1rem",
            borderColor: "#EAECF0",
          }}
        />
        <Button
          text={t("Submit")}
          className="bom_downloadFile_btn"
          onClick={handleRequestDoc}
          disabled={modalBtn === true && comment === "" && true}
        />
      </Modal>
    </>
  );
};

export default Index;
