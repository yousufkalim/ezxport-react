import React, { useState } from 'react';
import InputField from '../Common/InputField';
import TextFieldSelect from '../Common/TextFieldSelect';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import AddProduct from '../Common/AddProduct';
import SwitchButton from '../Common/SwitchButton';

import { ReactComponent as Arrow } from '../../assets/arrow.svg';

const ProductInputs = (props) => {
  const [addProduct, setAddProduct] = useState(false)

  return (
    <>
      <label className="label_modal" style={{ marginTop: props.index1 !== 0 ? '2.5rem' : '1rem' }}>
        Product Name
      </label>
      <InputField
        disabled
        className="product_name_textfield2"
        name="name"
        value={props?.product?.name}
      />
      {/* <div className={`Validator_document_btn_div ${props.redText2}`} style={{ display: "flex", alignItems: "center", }}>
        <p className={`ExportDocuments_btn2 ${props.redText2}`}>Validated products</p>
        <Arrow />
      </div> */}
      <label className="label_modal" style={{ marginTop: '1rem' }}>
        Description
      </label>
      <InputField
        disabled
        className="product_name_textfield2"
        name="description"
        value={props?.product?.description}
      />
        <label className="label_modal" style={{ marginTop: '1rem' }}>
        Condition
      </label>
      <InputField
        disabled
        className="product_name_textfield2"
        name="condition"
        value={props?.product?.condition}
      />
      <div className="inspection_textfield">
        <div style={{ width: '34%' }}>
          <label className="label_modal">Amount</label>
          <InputField
            className="company_name_input"
            disabled
            name="amount"
            value={props?.product?.amount}
          />
        </div>

        <div
          style={{
            width: '63%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >

          <div style={{ width: '48%' }}>
            <label className="label_modal">Unit of measure</label>
            <InputField
              className="company_name_input"
              disabled
              name="unit"
              value={props?.product?.unit}
            />
          </div> 
          <div style={{ width: '48%' }}>
            <label className="label_modal" style={{ marginBottom: '0rem' }}>
              Price
            </label>
            <InputField
              className="company_name_input"
              disabled
              name="price"
              value={`${props?.product?.price?.value} ${props?.product?.price?.currency === "USD" ? "$" : "€"}`}
            />
          </div>
        </div>
      </div>
      <label className="label_modal" style={{ marginTop: '1rem' }}>
        Mark
      </label>
      <InputField
        className="product_name_textfield2"
        disabled
        name="Mark"
        value={props?.product?.mark}
      />
      <label className="label_modal" style={{ marginTop: '1rem' }}>
        Builder
      </label>
      <InputField
        className="product_name_textfield2"
        disabled
        name="builder"
        value={props?.product?.builder}

      />
      <label className="label_modal" style={{ marginTop: '1rem' }}>
        Country
      </label>
      <InputField
        className="product_name_textfield2"
        disabled
        name="country"
        value={props?.product?.country}
      />
      <div className="switch_buttons" style={{ position: 'relative' }}>
        <div className="switch_column">
          <SwitchButton text="Technical sheet" pdfText="Document.pdf" />
        </div>
        <div className="switch_column">
          <SwitchButton text="Test report" />
        </div>
        <div
          className={`Validator_document_btn_div ${props.redText2}`}
          style={{ position: 'absolute', right: '0' }}
        >
          <p className="ExportDocuments_btn">Validated documents <Arrow /></p>
        </div>
      </div>
      <div className="switch_buttons">
        <div className="switch_column">
          <SwitchButton text="Technical sheet" />
        </div>
        <div className="switch_column">
          <SwitchButton text="Test report" />
        </div>
      </div>
      <div className="switch_buttons">
        <div className="switch_column">
          <SwitchButton text="Other documents" pdfText="Document.pdf" pdfText2="Document.pdf" />
        </div>
      </div>
      <AddProduct title="Ask for other documents for the product" addProduct={addProduct}
        setAddProduct={setAddProduct} />
    </>
  );
};

export default ProductInputs;
