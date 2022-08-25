import React, { useState, useEffect, useMemo } from "react";
import FilePicker from "../../../components/Common/FilePicker";
import HelperIcon from "../../../assets/Quiz.png";
import { Grid } from "@mui/material";
import { Tooltip } from "@mui/material";
import { ReactComponent as AddProductIcon } from "../../../assets/AddProductIcon.svg";
import API from "../../../api/index";
import ProductForm from "../../../components/Common/ProductForm";
const Document = (props) => {
  console.log("🚀 ~ file: Document.js ~ line 10 ~ Document ~ props", props);
  const [codes, setCodes] = useState([]);
  console.log("🚀 ~ file: Document.js ~ line 12 ~ Document ~ codes", codes);

  const [countries, setCountries] = useState([]);
  // const code = useMemo(() =>  props.createdCodes.codes.map((item) => {
  //     item.products = [{}];
  //     return item;
  //   })
  // , []);
  useEffect(() => {
    if(props?.createdCodes?.codes){
      let product = props.createdCodes.codes.map((item) => {
        item.products = [{}];
        return item;
      })
      setCodes(product);
    }
    console.log("njm", props?.createdCodes?.codes);

    handleAllCountries();
  }, [props?.createdCodes?.codes]);
  const handleProductChange = (name, value, cindex, index1) => {
    // setProducts((prev) => {
    //   prev[index][name] = value;
    //   return [...prev];
    // });

    setCodes((prev) => {
      prev[cindex].products[index1][name] = value;
      return [...prev];
    });
  };

  const addEmptyProduct = (cindex) => {
    setCodes((prev) => {
      console.log("prev", prev);
      prev[cindex].products = [...prev[cindex].products, {}];
      return [...prev];
    });
  };
  const handleAllCountries = async () => {
    await API("get", "/countries/")
      .then((res) => {
        setCountries(res.data.countries);
      })
      .catch((err) => {
        console.log("errrrr", err);
      });
  };
  return (
    <div className="documents_main_div">
      <div className="title_Div_documents">
        <span className="title_span">Import documents specific to Gabon</span>
        <span className="to_complete_pill">To Complete</span>
      </div>
      <div className="divider_line"></div>
      <Grid container spacing={2} sx={{ width: "95%" }}>
        {props?.CountryDoc?.map((item, index) => {
          return (
            <Grid item xs={6}>
              <label>
                {item?.name}
                <Tooltip title={item?.info} placement="top">
                  <img src={HelperIcon} />
                </Tooltip>
              </label>

              <div className="to_download_div">
                <FilePicker
                  index={index}
                  fileName={item.fileName}
                  name={item.name}
                  onChange={(e) => {
                    props?.handleUploadDoc(e.target.files[0], item._id, index);
                  }}
                />
              </div>
            </Grid>
          );
        })}
      </Grid>;
      {
        codes?.map((item, cindex) => {
          return (
            <div>
              <div className="title_Div_documents">
                <span className="title_span">{item.code.code} – Nomenclature name</span>
                <span className="to_complete_pill">To Complete</span>
                {/* <span className="complete_pill">Complete</span> */}
              </div>
              <span className="to_complete_pill">The product documents are to be completed</span>
              {item?.products?.map((product, index1) => {
                return (
                  <ProductForm handleProductChange={handleProductChange} cindex={cindex} index1={index1} countries={countries} />
                );
              })}
              <div className="addProduct_btn" onClick={() => addEmptyProduct(cindex)}>
                <AddProductIcon />
                &nbsp;&nbsp;Add another product
              </div>
            </div>
          );
        })
        //
      }
    </div>
  );
};

export default Document;
