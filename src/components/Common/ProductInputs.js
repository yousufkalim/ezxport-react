import React from 'react';
import InputField from '../Common/InputField';
import TextFieldSelect from '../Common/TextFieldSelect';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const ProductInputs = (props) => {
  return (
    <>
      <label className="label_modal" style={{ marginTop: props.index1 !== 0 ? '2.5rem' : '1rem' }}>
        Product Name
      </label>
      <InputField
        className="product_name_textfield2"
        name="productName"
        placeholder="Product name"
        onChange={(e) => {
          props.handleProductChange(e.target.name, e.target.value, props.cindex, props.index1);
        }}
      />
      <select name="cars" id="cars" className={`ExportDocuments_btn2 ${props.redText2}`}>
        <option value="volvo">
          {props.validText} &nbsp; {props.Invalid}
        </option>
        <option value="saab">{props.validText}</option>
        <option value="mercedes">{props.validText}</option>
        <option value="audi">{props.validText}</option>
        &nbsp;{' '}
      </select>
      {/* <button className={`ExportDocuments_btn2 ${props.redText2}`}>
        {props.validText} &nbsp; {props.Invalid}
        <span style={{ marginLeft: 'auto', display: 'inline-block', textAlign: 'right' }}>⮟</span>
      </button> */}

      <label className="label_modal" style={{ marginTop: '1rem' }}>
        Description
      </label>
      <InputField
        className="product_name_textfield2"
        name="description"
        placeholder="Description"
        onChange={(e) => {
          props.handleProductChange(e.target.name, e.target.value, props.cindex, props.index1);
        }}
      />
      <div>
        <label className="label_modal" style={{ marginTop: '1rem' }}>
          Condition
        </label>
        <select
          className="countrydropdown2"
          defaultValue={'default'}
          name="condition"
          onChange={(e) => {
            props.handleProductChange(e.target.name, e.target.value, props.cindex, props.index1);
          }}
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
        <div style={{ width: '34%' }}>
          <label className="label_modal">Amount</label>
          <InputField
            className="company_name_input"
            placeholder="Number"
            name="amount"
            onChange={(e) => {
              props.handleProductChange(e.target.name, e.target.value, props.cindex, props.index1);
            }}
          />
        </div>
        <div style={{ width: '63%', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '48%' }}>
            <label className="label_modal">Unit of measure</label>
            <select
              className="company_name_input"
              name="unit"
              onChange={(e) => {
                props.handleProductChange(
                  e.target.name,
                  e.target.value,
                  props.cindex,
                  props.index1
                );
              }}
            >
              <option value="millimeter">Mm</option>
              <option value="centimeter">Cm</option>
              <option value="meter">M</option>
              <option value="kilometer">Km</option>
              <option value="inch">In</option>
              <option value="foot/feet">Ft</option>
            </select>
          </div>
          <div style={{ width: '48%' }}>
            <label className="label_modal" style={{ marginBottom: '0.5rem' }}>
              Price
            </label>

            <TextFieldSelect
              name="price"
              placeholder="$ Number"
              onChange={(e) => {
                props.handleProductChange(
                  e.target.name,
                  e.target.value,
                  props.cindex,
                  props.index1
                );
              }}
            />
          </div>
        </div>
      </div>
      <label className="label_modal" style={{ marginTop: '1rem' }}>
        Mark
      </label>
      <InputField
        className="product_name_textfield2"
        name="Mark"
        placeholder="Mark"
        onChange={(e) => {
          props.handleProductChange(e.target.name, e.target.value, props.cindex, props.index1);
        }}
      />
      <label className="label_modal" style={{ marginTop: '1rem' }}>
        Builder
      </label>
      <InputField
        className="product_name_textfield2"
        name="builder"
        placeholder="Mark"
        onChange={(e) => {
          props.handleProductChange(e.target.name, e.target.value, props.cindex, props.index1);
        }}
      />
      <div>
        <label className="label_modal" style={{ marginTop: '1rem' }}>
          Country
        </label>
        <Select
          id="demo-simple-select"
          defaultValue={'default'}
          name="country"
          onChange={(e) => {
            props.handleProductChange(e.target.name, e.target.value, props.cindex, props.index1);
          }}
          className="countrydropdown2"
        >
          <MenuItem disabled value="default">
            Select a country
          </MenuItem>
          {props.countries?.map((item) => {
            return <MenuItem value={item?._id}>{item?.name}</MenuItem>;
          })}
        </Select>
      </div>
    </>
  );
};

export default ProductInputs;
