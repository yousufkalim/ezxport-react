import React from 'react';
import ValidateButton from '../../Common/ValidateButton';
import SwitchButton from '../../Common/SwitchButton';
import AddDocument from '../../Common/AddDocument';
import ProductInputs from '../../Common/ProductInputs';

const ExportDocuments = (props) => {
  return (
    <>
      <div className="ExportDocuments" style={{ marginBottom: '5%' }}>
        <ValidateButton text="Import documents specific to Gabon" />
        {/* switch   */}
        <div className="switch_buttons">
          <div className="switch_column">
            <SwitchButton text="Proforma" />
          </div>
          <div className="switch_column">
            <SwitchButton text="Import declaration" />
          </div>
        </div>
        <div className="switch_buttons">
          <div className="switch_column">
            <SwitchButton text="Quality certificate" />
          </div>
        </div>
        {/* Request other documents  */}
        <AddDocument title="Request other documents for Gabon" />
        <ValidateButton text="8510860 – Nomenclature name" />
        {/* inputs */}
        <ProductInputs validText="Validated product" />
        {/* switch   */}
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
            <select name="cars" id="cars" className="ExportDocuments_btn">
              <option value="volvo">Validated documents</option>
              <option value="saab">Validated documents</option>
              <option value="mercedes">Validated documents</option>
              <option value="audi">Validated documents</option>
            </select>
          </div>
          {/* <button style={{ position: 'absolute', right: '0' }} className="ExportDocuments_btn">
            Validated documents &nbsp; ⮟
          </button> */}
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
        <AddDocument title="Ask for other documents for the product" />
        <ProductInputs validText="Validated product" />
        {/* switch   */}
        <div className="switch_buttons" style={{ position: 'relative' }}>
          <div className="switch_column">
            <SwitchButton text="Technical sheet" pdfText="Document.pdf" />
          </div>
          <div className="switch_column">
            <SwitchButton text="Test report" />
          </div>
        </div>
        <div className="switch_buttons">
          <div className="switch_column">
            <SwitchButton text="Analysis Certificate" />
          </div>
          <div className="switch_column">
            <SwitchButton text="Plan" />
          </div>
        </div>
        <div className="switch_buttons">
          <div className="switch_column">
            <SwitchButton text="Other documents" pdfText="Document.pdf" pdfText2="Document.pdf" />
          </div>
        </div>
        <AddDocument title="Ask for other documents for the product" />
        <ValidateButton text="8510860 – Nomenclature name" />
        <ProductInputs validText="Validated product" />
        {/* switch   */}
        <div className="switch_buttons" style={{ position: 'relative' }}>
          <div className="switch_column">
            <SwitchButton text="Technical sheet" pdfText="Document.pdf" />
          </div>
          <div className="switch_column">
            <SwitchButton text="Test report" />
          </div>
        </div>
        <div className="switch_buttons">
          <div className="switch_column">
            <SwitchButton text="Analysis Certificate" />
          </div>
          <div className="switch_column">
            <SwitchButton text="Plan" />
          </div>
        </div>
        <div className="switch_buttons">
          <div className="switch_column">
            <SwitchButton text="Other documents" pdfText="Document.pdf" pdfText2="Document.pdf" />
          </div>
        </div>
        <AddDocument title="Ask for other documents for the product" />
        {/* extra add documents  */}
        <ValidateButton
          redclass="redclass"
          redclass2="redclass2"
          text="8510860 – Nomenclature name"
        />
        <ProductInputs redText2="redText2" Invalid="Invalid product" />
        {/* switch   */}
        <div className="switch_buttons" style={{ position: 'relative' }}>
          <div className="switch_column">
            <SwitchButton text="Technical sheet" pdfText="Document.pdf" />
          </div>
          <div className="switch_column">
            <SwitchButton text="Test report" />
          </div>
        </div>
        <div className="switch_buttons">
          <div className="switch_column">
            <SwitchButton text="Analysis Certificate" />
          </div>
          <div className="switch_column">
            <SwitchButton text="Plan" />
          </div>
        </div>
        <div className="switch_buttons">
          <div className="switch_column">
            <SwitchButton text="Other documents" pdfText="Document.pdf" pdfText2="Document.pdf" />
          </div>
        </div>
        <AddDocument title="Ask for other documents for the product" />
      </div>
    </>
  );
};

export default ExportDocuments;
