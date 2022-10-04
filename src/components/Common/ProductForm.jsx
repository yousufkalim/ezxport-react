import React from "react";
import InputField from "./InputField";
import MenuItem from "@mui/material/MenuItem";
import FilePicker from "./FilePicker";
import Select from "@mui/material/Select";
import { COUNTRIES } from "../../lib/data";
import { useTranslation } from "react-i18next";

const ProductForm = (props) => {
  const { product } = props;
  const { t } = useTranslation();

  
  const handleDataChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price') {
      if (!value.match(/[^0-9]/)) {
        return props.handleProductChange(e.target.name, e.target.value, props.cindex, props.index1);
      }
      return;
    }
    props.handleProductChange(e.target.name, e.target.value, props.cindex, props.index1);
  };
  const handleAddDocument = async (name, files, cindex, index1) => {
    const newImagesPromises = [];
    for (let i = 0; i < files.length; i++) {
      const fileName = files[i]?.name;
      newImagesPromises.push({ filename: fileName, url: await convertBase64(files[i]) });
    }
    const base64 = newImagesPromises;
    props.setCodes((prev) => {
      prev[cindex].products[index1][name] = prev[cindex]?.products[index1][name]?.files?.length ? {
        files: [...prev[cindex]?.products[index1][name]?.files, ...base64],
      } : {
          files: base64,
      }
      return [...prev];
    });
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result.replace(/^.*,/, ''));
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
    props.setValidProduct(validated)
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
      <label className="BomLabel" style={{ marginTop: props.index1 !== 0 ? "2.5rem" : "1rem" }}>
        {t("Product Name")}
      </label>
      <InputField
        className="product_name_textfield"
        name="name"
        value={product?.name}
        onChange={(e) => handleDataChange(e)}
      />
      <label className="BomLabel" style={{ marginTop: "1rem" }}>
        {t("Description")}
      </label>
      <InputField
        className="product_name_textfield"
        name="description"
        value={product?.description}
        onChange={(e) => handleDataChange(e)}
      />
      <div>
        <label className="BomLabel" style={{ marginTop: "1rem" }}>
          {t("Condition")}
        </label>
        <select
          className="countrydropdown"
          name="condition"
          value={product?.condition || "default"}
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
            value={product?.amount}
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
              value={product?.unit}
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
              value={product?.price ?? ''}
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
        value={product?.mark}
        onChange={(e) => handleDataChange(e)}
      />
      <label className="BomLabel" style={{ marginTop: "1rem" }}>
        {t("Builder")}
      </label>
      <InputField
        className="product_name_textfield"
        name="builder"
        value={product?.builder}
        onChange={(e) => handleDataChange(e)}
      />
      <div>
        <label className="BomLabel" style={{ marginTop: "1rem" }}>
          {t("Country")}
        </label>
        <Select
          id="demo-simple-select"
          name="country"
          value={`${product?.country}`}
          onChange={(e) => handleDataChange(e)}
          className="countrydropdown"
        >
          <MenuItem disabled value="default">
            {t("Select a Country")}
          </MenuItem>
          {COUNTRIES?.map((item, index) => {
            return <MenuItem value={item} key={index}>{item}</MenuItem>;
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
              isMultiple={true}
              fileName={props?.product?.technical_sheet?.files}
              name="technical_sheet"
              onChange={(e) =>
                handleAddDocument(e.target.name, e.target.files, props.cindex, props.index1)
              }
            />
          </div>
        </div>
        <div style={{ width: "47%" }}>
          <label className="BomLabel">{t("Test report")}</label>
          <div className="to_download_div">
            <FilePicker
              multiple
              isMultiple={true}
              index={`2${props.cindex}${props.index1}`}
              fileName={props?.product?.test_report?.files}
              name="test_report"
              onChange={(e) =>
                handleAddDocument(e.target.name, e.target.files, props.cindex, props.index1)
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
              isMultiple={true}
              index={`3${props.cindex}${props.index1}`}
              fileName={props?.product?.analysis_certificate?.files}
              name="analysis_certificate"
              onChange={(e) =>
                handleAddDocument(e.target.name, e.target.files, props.cindex, props.index1)
              }
            />
          </div>
        </div>
        <div style={{ width: "47%" }}>
          <label className="BomLabel">{t("Plan")}</label>
          <div className="to_download_div">
            <FilePicker
              multiple
              isMultiple={true}
              index={`4${props?.cindex}${props?.index1}`}
              fileName={props?.product?.plan?.files}
              name="plan"
              onChange={(e) =>
                handleAddDocument(e.target.name, e.target.files, props.cindex, props.index1)
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
            isMultiple={true}
            index={`5${props.cindex}${props.index1}`}
            fileName={props?.product?.other_docs?.files}
            name="other_docs"
            onChange={(e) =>
              handleAddDocument(e.target.name, e.target.files, props.cindex, props.index1)
            }
          />
        </div>
      </div>
    </>
  );
};

export default ProductForm;
