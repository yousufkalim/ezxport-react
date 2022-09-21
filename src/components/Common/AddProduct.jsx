import React from "react";
import PlusButton from "../../assets/PlusButton.svg";
import { useTranslation, Trans } from "react-i18next";

const AddProduct = (props) => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <div className="request_documents">
        <p className="request_documents_title">{props.title}</p>
        <div
          className="request_documents_input_div"
          style={{ display: !props.addProduct ? "none" : "" }}
        >
          <label htmlFor="" className="request_documents_label">
            {t("Document name")}
          </label>
          <input
            type="text"
            className="request_documents_input"
            placeholder={t("Enter Document name")}
          />
        </div>
        <div className="add_ducoment_div" style={{ cursor: "pointer" }}>
          <img src={PlusButton} alt="" onClick={() => props?.setAddProduct(true)} />
          <p className="add_ducoment_p">{t("Request another document")}</p>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
