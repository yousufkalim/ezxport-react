import React, { useState, useEffect } from "react";
import CompanyInformation from "../ValidateRequest/CompanyInformation";
import { useHistory } from "react-router-dom";
import EzxportIcon from "../../../assets/EzxportIcon.svg";
import { Link } from "react-router-dom";
import BackArrow from "../../../assets/BackArrow.svg";
import { useParams } from "react-router-dom";
import API from "../../../api/index";
import { toast } from "react-toastify";
const Index = () => {
  const history = useHistory();
  const [countTabe, setCountTabe] = useState();
  const [requestById, setRequestById] = useState({});

  const [inputList, setInputList] = useState([]);
  const [inputListProduct, setInputListProduct] = useState([]);
  const [validateCountry, setValidateCountry] = useState(false);
  const [validateProduct, setValidateProduct] = useState(false);

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
        setRequestById(res.data.request);
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
          toast.success("Document Validated Successfully");
          handlerequestById();
        } else {
          toast.warning("Document Un-Validated");
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
          toast.success("Document Validated Successfully");
          handlerequestById();
        } else {
          toast.warning("Document Un-Validated");
          handlerequestById();
        }
      })
      .catch((err) => {
        console.log("handleProductDocsValidate", err);
      });
  };

  const handleRequestDoc = async () => {
    await API("put", `/requests/ReqmissingDocs/${requestById._id}`, {
      products: inputListProduct,
      documents: inputList,
    })
      .then((res) => {
        console.log(res, "handleRequestDoc");
        history.push("/RequestDocuments");
      })
      .catch((err) => {
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
  console.log("length", inputList.length);
  console.log("length", inputListProduct.length);
  return (
    <>
      {countTabe === 2 ? (
        <>
          <div className="Reference_header">
            <div className="Reference_center_div">
              <div className="Reference_heading">
                <Link
                  to="/Admin/Dashboard/Requests"
                  style={{ color: "black", textDecoraion: "none" }}
                >
                  <p className="Reference_h2">
                    <img src={BackArrow} alt="" />
                    &nbsp; Reference{" "}
                  </p>
                </Link>
              </div>
              <div className="Reference_logo_div">
                <img src={EzxportIcon} alt="" className="header_center_div" />
              </div>
              <div className="validate_btn_div">
                <button className="validate_button2">Download the file</button>
                &nbsp;
                {validateCountry &&
                validateProduct &&
                inputList.length === 0 &&
                inputListProduct.length === 0 ? (
                  <button className="validate_button" onClick={handleValidByAdmin}>
                    Validate the file
                  </button>
                ) : (
                  <button className="validate_button" onClick={handleRequestDoc}>
                    Request document
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="Reference_header">
            <div className="Reference_center_div">
              <div className="Reference_heading">
                <Link
                  to="/Admin/Dashboard/Requests"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <p className="Reference_h2">
                    <img src={BackArrow} alt="" />
                    &nbsp; Reference{" "}
                  </p>
                </Link>
              </div>
              <div className="Reference_logo_div">
                <img src={EzxportIcon} alt="" className="header_center_div" />
              </div>
              <div className="validate_btn_div">
                <button className="validate_button">Validate and receive the completed file</button>
              </div>
            </div>
          </div>
        </>
      )}
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
    </>
  );
};

export default Index;
