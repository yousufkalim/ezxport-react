
import React from "react";
import InputField from "./InputField";
import TextFieldSelect from "./TextFieldSelect";
import MenuItem from "@mui/material/MenuItem";
import FilePicker from "./FilePicker";
import Select from "@mui/material/Select";

const ProductForm = (props) => {
  const handleDataChange = (e) => {
    props.handleProductChange(e.target.name, e.target.value, props.cindex, props.index1);
  }
  const handleAddDocument = async (name, files, cindex, index1) => {
    const base64 = await convertBase64(files)

    props.setCodes((prev) => {
      prev[cindex].products[index1][name] = {
        url: [base64]
      }
      return [...prev];
    });
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }
  return (
    <>
      <div className="divider_line"></div>
      <h3>
        Code # {props.cindex + 1} Product # {props.index1 + 1}
      </h3>
      <label style={{ marginTop: props.index1 !== 0 ? '2.5rem' : '1rem' }}>Product Name</label>
      <InputField
        className="product_name_textfield"
        name="name"
        onChange={(e) => handleDataChange(e)}
      />
      <label style={{ marginTop: '1rem' }}>Description</label>
      <InputField
        className="product_name_textfield"
        name="description"
        onChange={(e) => handleDataChange(e)}
      />
      <div>
        <label style={{ marginTop: '1rem' }}>Condition</label>
        <select
          className="countrydropdown"
          defaultValue={'default'}
          name="condition"
          onChange={(e) => handleDataChange(e)}
        >
          <option value={'default'} disabled>
            select type of Condition
          </option>
          <option value="Bad">Bad</option>
          <option value="Average">Average</option>
          <option value="Good">Good</option>
          <option value="Excellent">Excellent</option>
        </select>
      </div>
      <div className="inspection_textfield">
        <div style={{ width: '48%' }}>
          <label>Amount</label>
          <InputField
            className="company_name_input"
            placeholder="90 road of rouvroy"
            name="amount"
            onChange={(e) => handleDataChange(e)}
          />
        </div>
        <div style={{ width: '48%', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '35%' }}>
            <label>Unit of measure</label>
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
          <div style={{ width: '60%' }}>
            <label style={{ marginBottom: '1.5rem' }}>Price</label>

            <TextFieldSelect
              className="company_name_input2"
              name="price"

              onChange={(e) => handleDataChange(e)}
              selectName="currency"
              onOptionChange={(e) => handleDataChange(e)}
            />
          </div>
        </div>
      </div>
      <label style={{ marginTop: '1rem' }}>Mark</label>
      <InputField
        className="product_name_textfield"
        name="mark"
        onChange={(e) => handleDataChange(e)}
      />
      <label style={{ marginTop: '1rem' }}>Builder</label>
      <InputField
        className="product_name_textfield"
        name="builder"
        onChange={(e) => handleDataChange(e)}
      />
      <div>
        <label style={{ marginTop: '1rem' }}>Country</label>
        <Select
          id="demo-simple-select"
          defaultValue={'default'}
          name="country"
          onChange={(e) => handleDataChange(e)}
          className="countrydropdown"
        >
          <MenuItem disabled value="default">
            Select a country
          </MenuItem>
          {props.countries?.map((item) => {
            return <MenuItem value={item?._id}>{item?.name}</MenuItem>;
          })}
        </Select>
      </div>
      <div style={{ display: 'flex', width: '95%', justifyContent: 'space-between' }}>
        <div style={{ width: '47%' }}>
          <label>Technical sheet</label>
          <div className="to_download_div">
            <FilePicker
              multiple
              index={`1${props.cindex}${props.index1}`}
              // fileName={item.fileName}
              name="technical_sheet"
              onChange={(e) =>
                handleAddDocument(e.target.name, e.target.files[0], props.cindex, props.index1)
              }
            />
          </div>
        </div>
        <div style={{ width: '47%' }}>
          <label>Test report</label>
          <div className="to_download_div">
            <FilePicker
              multiple
              index={`2${props.cindex}${props.index1}`}
              // fileName={item.fileName}
              name="test_report"
              onChange={(e) =>
                handleAddDocument(e.target.name, e.target.files[0], props.cindex, props.index1)
              }
            />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', width: '95%', justifyContent: 'space-between' }}>
        <div style={{ width: '47%' }}>
          <label>Analysis Certificate</label>
          <div className="to_download_div">
            <FilePicker
              multiple
              index={`3${props.cindex}${props.index1}`}
              // fileName={item.fileName}
              name="analysis_certificate"
              onChange={(e) =>
                handleAddDocument(e.target.name, e.target.files[0], props.cindex, props.index1)
              }
            />
          </div>
        </div>
        <div style={{ width: '47%' }}>
          <label>Plan</label>
          <div className="to_download_div">
            <FilePicker
              multiple
              index={`4${props?.cindex}${props?.index1}`}
              // fileName={item.fileName}
              name="plan"
              onChange={(e) =>
                handleAddDocument(e.target.name, e.target.files[0], props.cindex, props.index1)
              }
            />
          </div>
        </div>
      </div>
      <div style={{ width: '95%' }}>
        <label>Other documents</label>
        <div className="to_download_div">
          <FilePicker
            multiple
            index={`5${props.cindex}${props.index1}`}
            // fileName={item.fileName}
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
