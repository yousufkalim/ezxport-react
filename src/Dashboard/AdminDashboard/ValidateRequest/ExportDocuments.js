import React, { useEffect, useState } from "react";
import ValidateButton from "../../../components/Common/ValidateButton";
import SwitchButton from "../../../components/Common/SwitchButton";
import ProductInputs from "../../../components/Common/ProductInputs";
import { Grid } from "@mui/material";
// import { ReactComponent as Arrow } from "../../../assets/arrow.svg";
import PlusButton from "../../../assets/PlusButton.svg";
import { ReactComponent as Delete } from "../../../assets/DeleteIcon.svg";
import { useTranslation, Trans } from "react-i18next";

const ExportDocuments = (props) => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  console.log("🚀 ~ file: ExportDocuments.js ~ line 10 ~ ExportDocuments ~ props", props);

  useEffect(() => {
    handleCountryDocuments();
  }, [props?.requestById]);
  const handleCountryDocuments = () => {
    let temp = props?.requestById?.documents?.filter((item) => {
      return item.status === "valid";
    });
    if (props?.requestById?.documents?.length === temp.length) {
      props.setValidateCountry(true);
    } else {
      props.setValidateCountry(false);
    }
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...props.inputList];
    list[index][name] = value;
    props.setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...props.inputList];
    list.splice(index, 1);
    props.setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    props.setInputList([...props.inputList, { name: "" }]);
  };
  return (
    <>
      <div className="ExportDocuments" style={{ marginBottom: "5%" }}>
        <ValidateButton
          text={`${t("Import documents specific to")} ${t(props?.requestById?.country?.name)}`}
          className={
            props.validateCountry
              ? "Validator_document_btn_div"
              : "Validator_document_btn_div redclass"
          }
        />
        {/* switch   */}
        <Grid container spacing={2} sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
          {props?.requestById?.documents?.map((item) => {
            return (
              <Grid item xs={6} className="vendors_div">
                <SwitchButton
                  text={item?.doc_id?.name}
                  item={item}
                  onChange={(e) =>
                    props.handleCountryDocsValidate(e.target.checked, item?.doc_id?._id)
                  }
                  label={item.status === "valid" ? "Valid" : "Un-Valid"}
                  checked={item.status === "valid" ? true : false}
                />
              </Grid>
            );
          })}
        </Grid>

        <div className="request_documents">
          <p className="request_documents_title">{`${t("Request other documents for")} ${t(
            props.requestById.country.name
          )}`}</p>
          {/* Request other documents  */}

          {props.inputList?.map((item, index) => {
            return (
              <>
                <div className="request_documents_input_div">
                  <label
                    htmlFor=""
                    className="request_documents_label"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: index !== 0 ? "1rem" : "none",
                    }}
                  >
                    {t("Document name")}
                    <Delete
                      onClick={() => handleRemoveClick(index)}
                      style={{ cursor: "pointer" }}
                    />
                  </label>
                  <input
                    name="name"
                    type="text"
                    className="request_documents_input"
                    placeholder={t("Enter Document name")}
                    onChange={(e) => handleInputChange(e, index)}
                    value={item.name}
                  />
                </div>
              </>
            );
          })}

          <div className="add_ducoment_div" style={{ cursor: "pointer" }}>
            <img src={PlusButton} alt="" onClick={handleAddClick} />
            <p className="add_ducoment_p">{t("Request another document")}</p>
          </div>
        </div>

        {props?.requestById?.codes?.map((code, cIndex) => {
          return (
            <>
              <ValidateButton
                text={`${code.code.code} – ${t("BOM name")}`}
                className="Validator_document_btn_div"
              />
              {code?.products?.map((product, pIndex) => {
                return (
                  <>
                    <ProductInputs
                      requestById={props.requestById}
                      validText="Validated product"
                      product={product}
                      pIndex={pIndex}
                      handleProductDocsValidate={props.handleProductDocsValidate}
                      inputListProduct={props.inputListProduct}
                      setInputListProduct={props.setInputListProduct}
                      validateProduct={props.validateProduct}
                      setValidateProduct={props.setValidateProduct}
                    />
                  </>
                );
              })}
            </>
          );
        })}
      </div>
    </>
  );
};

export default ExportDocuments;
