import React from "react";
import InputField from "./InputField";
import MenuItem from "@mui/material/MenuItem";
import FilePicker from "./FilePicker";
import Select from "@mui/material/Select";
import { COUNTRIES } from "../../lib/data";
import { useTranslation } from "react-i18next";

const measureUnits = [
  'Barrels',
'Bobbins',
'Boxes',
'Bushels (35,2391 dm3)',
'Bushels (36,36874 dm3)',
'Centigrams',
'Centilitres',
'Centimetres',
'Cubic Centimetres',
'Cubic Cords (3,63 m3)',
'Cubic Decimetres',
'Cubic Feet',
'Cubic Inches',
'Cubic Metres',
'Cubic Tons Timber',
'Cubic Tons Timber',
'Cubic Yards',
'Decilitres',
'Decimetres',
'Dozen Pairs',
'Dozens',
'Drachms GB (3,887935 g)',
'Drams GB (1,771745 g)',
'Drams US (3,887935 g)',
'Dry Barrels (115,627 dm3)',
'Dry Gallons (4,404884 dm3)',
'Dry Pints (0,55061 dm3)',
'Dry Quarts (1,101221 dm3)',
'Feet',
'Fluid Ounces (28,413 cm3)',
'Fluid Ounces (29,5735 cm3)',
'Gallons (Imperial)',
'Gills (0,142065 dm3)',
'Gills (11,8294 cm3)',
'Grains GB, US (64,798910 mg)',
'Grams',
'Great Gross (12 Gross)',
'Gross',
'Gross Tons (2240 lb)',
'Hectograms',
'Hectokilograms',
'Hectolitres',
'Hundreds',
'Hundredweights GB (50,802345 kg)',
'Inches',
'Joules',
'Kilograms',
'Kilograms Dry',
'Kilograms Gross',
'Kilograms Net',
'Kilometres',
'Kilowatt-Hours',
'Liquid Gallons (3,78541 dm3)',
'Liquid Pints (0,473176 dm3)',
'Liquid Quarts (0,946353 dm3)',
'Litres',
'Litres of Pure Alcohol',
'Long Tons (2240 lb)',
'Long Tons Net',
'Lots',
'Megalitres',
'Megametres',
'Megawatt-Hours',
'Metres',
'Metric Carats (200 mg)',
'Metric Tons',
'Milligrams',
'Millilitres',
'Millimetres',
'Numbers',
'Ounces',
'Pairs',
'Pennyweights GB, US (1,555174 g)',
'Pieces',
'Pints',
'Pints (0,568262 dm3)',
'Pounds',
'Quarters, Gb (12,700586 kg)',
'Quarts (1,136523 dm3)',
'Quintals',
'Rolls',
'Sets',
'Short Tons Net',
'Square Centimeters',
'Square Feet',
'Square Inches',
'Square Metres',
'Square Yards',
'Stones GB (6,350293 kg)',
'Ten Pairs',
'Tens',
'Terajoule',
'Thousand Board Feet (2,36 m3)',
'Thousand Square Feet',
'Thousands',
'Tonnes courtes (2000 livres)',
'Troy Pounds, US (373,242 g)',
'Units',
'Yards',
]

const ProductForm = (props) => {
  const { product } = props;
  const { t } = useTranslation();

  
  const handleDataChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price' || name === 'amount') {
      if (!value.match(/[^0-9]/)) {
        return props.handleProductChange(e.target.name, e.target.value, props.cindex, props.index1);
      }
      return;
    }
    props.handleProductChange(e.target.name, e.target.value, props.cindex, props.index1);
  };
  const handleAddDocument = async (name, files, cindex, index1) => {
    const fileExtensions = [];
    for (let i = 0; i < files.length; i++) {
      const fileName = files[i]?.name?.split('.')?.[1];
      fileExtensions.push(fileName);
      
    }

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
            placeholder="1234"
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
              value={product?.unit || 'default'}
              onChange={(e) => handleDataChange(e)}
            >
              <option disabled value='default'>{t('Select unit')}</option>
              {
                measureUnits?.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))
              }
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
              accept="application/pdf,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
              text/plain application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
              accept="application/pdf,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
              text/plain application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
              accept="application/pdf,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
              text/plain application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
              accept="application/pdf,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
              text/plain application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
            accept="application/pdf,.csv,.doc,.docx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
              text/plain application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
