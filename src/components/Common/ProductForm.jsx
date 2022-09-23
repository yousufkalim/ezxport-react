import React, { useState } from "react";
import InputField from "./InputField";
import TextFieldSelect from "./TextFieldSelect";
import MenuItem from "@mui/material/MenuItem";
import FilePicker from "./FilePicker";
import Select from "@mui/material/Select";
import { useTranslation } from "react-i18next";

const ProductForm = (props) => {
  const [toComplete, setToComplete] = useState();
  const { t } = useTranslation();

  const handleDataChange = (e) => {
    props.handleProductChange(e.target.name, e.target.value, props.cindex, props.index1);
  };
  const handleAddDocument = async (name, files, cindex, index1) => {
    const base64 = await convertBase64(files);

    props.setCodes((prev) => {
      prev[cindex].products[index1][name] = {
        url: [base64],
        filename: files.name,
      };
      return [...prev];
    });
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const validateProduct = () => {
    let validated = true;

    if (Object.keys(props?.product).length > 14) {
      for (const key in props?.product) {
        if (!props?.product[key]) {
          validated = false;
          break;
        }
      }
    } else {
      validated = false;
    }
    return validated;
  };

  return (
    <>
      <div className="title_Div_documents">
        <span className="title_span">{props.item.code.code}</span>
        {validateProduct() ? (
          <span className="complete_pill">{t("Complete")}</span>
        ) : (
          <span className="to_complete_pill">{t("To Complete")}</span>
        )}
      </div>
      {validateProduct() ? (
        ""
      ) : (
        <span className="to_complete_pill">{t("The product documents are to be completed")}</span>
      )}

      <div className="divider_line"></div>
      {/* <h3 className="steps_3_h3">
        Code # {props.cindex + 1} Product # {props.index1 + 1}
      </h3> */}
      <label className="BomLabel" style={{ marginTop: props.index1 !== 0 ? "2.5rem" : "1rem" }}>
        {t("Product Name")}
      </label>
      <InputField
        className="product_name_textfield"
        name="name"
        onChange={(e) => handleDataChange(e)}
      />
      <label className="BomLabel" style={{ marginTop: "1rem" }}>
        {t("Description")}
      </label>
      <InputField
        className="product_name_textfield"
        name="description"
        onChange={(e) => handleDataChange(e)}
      />
      <div>
        <label className="BomLabel" style={{ marginTop: "1rem" }}>
          {t("Condition")}
        </label>
        <select
          className="countrydropdown"
          defaultValue={"default"}
          name="condition"
          onChange={(e) => handleDataChange(e)}
        >
          <option value={"default"} disabled>
            {t("select type of Condition")}
          </option>
          <option value="DAMAGED">{t("DAMAGED")}</option>
          <option value="NEW">{t("NEW")}</option>
          <option value="RECOND">{t("RECOND")}</option>
          <option value="SECONDHAND">{t("SECONDHAND")}</option>
        </select>
      </div>
      <div className="inspection_textfield">
        <div className="steps_4_inspeciton">
          <label className="BomLabel">{t("Amount")}</label>
          <InputField
            className="company_name_input"
            placeholder="90 road of rouvroy"
            name="amount"
            onChange={(e) => handleDataChange(e)}
          />
        </div>
        <div
          className="steps_4_inspeciton"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div style={{ width: "35%" }}>
            <label className="BomLabel">{t("Unit of measure")}</label>
            <select
              className="company_name_input"
              name="unit"
              onChange={(e) => handleDataChange(e)}
            >
              <option value="millimeter">Mm</option>
              <option value="centimeter">Cm</option>
              <option value="meter">M</option>
              <option value="kilometer">Km</option>
              <option value="inch">In</option>
              <option value="foot/feet">Ft</option>
            </select>
          </div>
          <div style={{ width: "60%" }}>
            <label className="BomLabel">{t("Price")}</label>
            <InputField
              className="product_name_textfield"
              name="price"
              onChange={(e) => handleDataChange(e)}
            />
          </div>
        </div>
      </div>
      <label className="BomLabel" style={{ marginTop: "1rem" }}>
        {t("Mark")}
      </label>
      <InputField
        className="product_name_textfield"
        name="mark"
        onChange={(e) => handleDataChange(e)}
      />
      <label className="BomLabel" style={{ marginTop: "1rem" }}>
        {t("Builder")}
      </label>
      <InputField
        className="product_name_textfield"
        name="builder"
        onChange={(e) => handleDataChange(e)}
      />
      <div>
        <label className="BomLabel" style={{ marginTop: "1rem" }}>
          {t("Country")}
        </label>
        <Select
          id="demo-simple-select"
          defaultValue={"default"}
          name="country"
          onChange={(e) => handleDataChange(e)}
          className="countrydropdown"
        >
          <MenuItem disabled value="default">
            {t("Select a Country")}
          </MenuItem>
          {props?.countries?.map((item) => {
            return <MenuItem value={item?._id}>{item?.name}</MenuItem>;
          })}
        </Select>
      </div>
      <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
        <div style={{ width: "47%" }}>
          <label className="BomLabel">{t("Technical sheet")}</label>
          <div className="to_download_div">
            <FilePicker
              multiple
              index={`1${props.cindex}${props.index1}`}
              fileName={props?.product?.technical_sheet?.filename}
              name="technical_sheet"
              onChange={(e) =>
                handleAddDocument(e.target.name, e.target.files[0], props.cindex, props.index1)
              }
            />
          </div>
        </div>
        <div style={{ width: "47%" }}>
          <label className="BomLabel">{t("Test report")}</label>
          <div className="to_download_div">
            <FilePicker
              multiple
              index={`2${props.cindex}${props.index1}`}
              fileName={props?.product?.test_report?.filename}
              name="test_report"
              onChange={(e) =>
                handleAddDocument(e.target.name, e.target.files[0], props.cindex, props.index1)
              }
            />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
        <div style={{ width: "47%" }}>
          <label className="BomLabel">{t("Analysis Certificate")}</label>
          <div className="to_download_div">
            <FilePicker
              multiple
              index={`3${props.cindex}${props.index1}`}
              fileName={props?.product?.analysis_certificate?.filename}
              name="analysis_certificate"
              onChange={(e) =>
                handleAddDocument(e.target.name, e.target.files[0], props.cindex, props.index1)
              }
            />
          </div>
        </div>
        <div style={{ width: "47%" }}>
          <label className="BomLabel">{t("Plan")}</label>
          <div className="to_download_div">
            <FilePicker
              multiple
              index={`4${props?.cindex}${props?.index1}`}
              fileName={props?.product?.plan?.filename}
              name="plan"
              onChange={(e) =>
                handleAddDocument(e.target.name, e.target.files[0], props.cindex, props.index1)
              }
            />
          </div>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <label className="BomLabel">{t("Other documents")}</label>
        <div className="to_download_div">
          <FilePicker
            multiple
            index={`5${props.cindex}${props.index1}`}
            fileName={props?.product?.other_docs?.filename}
            name="other_docs"
            onChange={(e) =>
              handleAddDocument(e.target.name, e.target.files[0], props.cindex, props.index1)
            }
          />
        </div>
      </div>
    </>
  );
};

export default ProductForm;
