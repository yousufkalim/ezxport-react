import React, { useState } from 'react';
import ValidateButton from '../../../components/Common/ValidateButton';
import SwitchButton from '../../../components/Common/SwitchButton';
import AddDocument from '../../../components/Common/AddDocument';
import ProductInputs from '../../../components/Common/ProductInputs';
import { Grid } from '@mui/material';
import { ReactComponent as Arrow } from '../../../assets/arrow.svg';

const ExportDocuments = (props) => {
  const [addDocument, setAddDocument] = useState(false)

  console.log("🚀 ~ file: ExportDocuments.js ~ line 9 ~ ExportDocuments ~ props", props)
  return (
    <>
      <div className="ExportDocuments" style={{ marginBottom: '5%' }}>
        <ValidateButton text={`Import documents specific to ${props.requestById.country.name}`} />
        {/* countryName={props?.requestById?.country?.name}  */}
        {/* switch   */}
        <Grid container spacing={2} sx={{ marginTop: '2rem', marginBottom: "2rem" }}>
          {props?.requestById?.documents?.map((item) => {

            return <Grid item xs={6} className="vendors_div">
              <SwitchButton text={item?.doc_id?.name} item={item} />
            </Grid>
          })}
        </Grid>

        {/* Request other documents  */}
        <AddDocument title={`Request other documents for ${props.requestById.country.name}`} addDocument={addDocument} setAddDocument={setAddDocument} />
        {props?.requestById?.codes?.map((code, cIndex) => {
          return <>
            <ValidateButton text={`${code.code} – Nomenclature name`} />
            {code?.products?.map((product, pIndex) => {
              return <>
                <ProductInputs validText="Validated product" product={product} pIndex={pIndex} />
              </>

            })}

          </>

        })}

        {/* 
        <ProductInputs validText="Validated product" />
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
        <ValidateButton
          redclass="redclass"
          redclass2="redclass2"
          text="8510860 – Nomenclature name"
        />
        <ProductInputs redText2="redText2" Invalid="Invalid product" />
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
        <AddDocument title="Ask for other documents for the product" /> */}
      </div>
    </>
  );
};

export default ExportDocuments;
