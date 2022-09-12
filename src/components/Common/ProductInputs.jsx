import React, { useState, useEffect } from 'react';
import InputField from '../Common/InputField';
import TextFieldSelect from '../Common/TextFieldSelect';
import SwitchButton from '../Common/SwitchButton';
import { ReactComponent as Delete } from "../../assets/DeleteIcon.svg"
import { ReactComponent as Arrow } from '../../assets/arrow.svg';
import PlusButton from '../../assets/PlusButton.svg';

const ProductInputs = (props) => {
  useEffect(() => {
    handleProductDocuments()
  }, [props?.requestById])


  const handleProductDocuments = () => {
    if (props?.product) {
      if (props?.product?.other_docs?.status === "valid" &&
        props?.product?.plan?.status === "valid" &&
        props?.product?.analysis_certificate?.status === "valid" &&
        props?.product?.test_report?.status === "valid" &&
        props?.product?.technical_sheet?.status === "valid") {
        props.setValidateProduct(true)
      } else { props.setValidateProduct(false) }
    } else {
      props.setValidateProduct(false)
    }
  }


  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...props.inputListProduct];
    list[index][name] = value;
    props.setInputListProduct(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...props.inputListProduct];
    list.splice(index, 1);
    props.setInputListProduct(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    props.setInputListProduct([...props.inputListProduct, { product: props?.product?._id, name: "" }]);
  };
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
              value={`${props?.product?.price?.value} ${props?.product?.price?.currency === 'USD' ? '$' : '€'
                }`}
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
        value={props?.product?.country?.name}
      />
      <div className="switch_buttons" style={{ position: 'relative' }}>
        <div className="switch_column">
          <SwitchButton
            text="Technical sheet"
            name="technical_sheet"
            item={props?.product?.technical_sheet}
            label={props?.product?.technical_sheet?.status === "valid" ? "Valid" : "Un-Valid"}
            checked={props?.product?.technical_sheet?.status === "valid" ? true : false}
            onChange={(e) => props.handleProductDocsValidate(e.target.name, e.target.checked, props?.product?._id)}
          />
        </div>
        <div className="switch_column">
          <SwitchButton
            text="Test report"
            name="test_report"
            item={props?.product?.test_report}
            label={props?.product?.test_report?.status === "valid" ? "Valid" : "Un-Valid"}
            checked={props?.product?.test_report?.status === "valid" ? true : false}
            onChange={(e) => props.handleProductDocsValidate(e.target.name, e.target.checked, props?.product?._id)}
          />
        </div>
        {props.validateProduct ? <>
          <div
            className="Validator_document_btn_div"
            style={{ position: 'absolute', right: '0' }}
          >
            <p>Validated documents <Arrow /></p>
          </div >
        </> :
          <>
            <div
              className="Validator_document_btn_div redclass"
              style={{ position: 'absolute', right: '0' }}
            >
              <p>Invalid documents <Arrow /></p>
            </div>
          </>
        }

      </div >
      <div className="switch_buttons">
        <div className="switch_column">
          <SwitchButton
            text="Analysis Certificate"
            name="analysis_certificate"
            item={props?.product?.analysis_certificate}
            label={props?.product?.analysis_certificate?.status === "valid" ? "Valid" : "Un-Valid"}
            checked={props?.product?.analysis_certificate?.status === "valid" ? true : false}
            onChange={(e) => props.handleProductDocsValidate(e.target.name, e.target.checked, props?.product?._id)}
          />
        </div>
        <div className="switch_column">
          <SwitchButton
            text="Plan"
            name="plan"
            item={props?.product?.plan}
            label={props?.product?.plan?.status === "valid" ? "Valid" : "Un-Valid"}
            checked={props?.product?.plan?.status === "valid" ? true : false}
            onChange={(e) => props.handleProductDocsValidate(e.target.name, e.target.checked, props?.product?._id)}
          />
        </div>
      </div>
      <div className="switch_buttons">
        <div className="switch_column">
          <SwitchButton
            text="Other documents"
            name="other_docs"
            item={props?.product?.other_docs}
            label={props?.product?.other_docs?.status === "valid" ? "Valid" : "Un-Valid"}
            checked={props?.product?.other_docs?.status === "valid" ? true : false}
            onChange={(e) => props.handleProductDocsValidate(e.target.name, e.target.checked, props?.product?._id)}
          />
        </div>
      </div>
      <div className="request_documents">

        <p className="request_documents_title">Ask for other documents for the product</p>
        {/* Request other documents  */}

        {props.inputListProduct?.map((item, index) => {
          return <>
            <div className="request_documents_input_div">
              <label htmlFor="" className="request_documents_label" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: index !== 0 ? "1rem" : "none" }}>
                Document name
                <Delete onClick={() => handleRemoveClick(index)} style={{ cursor: "pointer" }} />
              </label>
              <input
                name='name'
                type="text"
                className="request_documents_input"
                placeholder="Enter Document name"
                onChange={e => handleInputChange(e, index)}
                value={item.name}
              />
            </div>
          </>
        })}

        <div className="add_ducoment_div" style={{ cursor: "pointer" }}>
          <img src={PlusButton} alt="" onClick={handleAddClick} />
          <p className="add_ducoment_p">Request another document</p>
        </div>
      </div>
    </>
  );
};

export default ProductInputs;
