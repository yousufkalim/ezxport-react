import React, { useState, useEffect } from "react";
import FilePicker from "../../../components/Common/FilePicker";
import HelperIcon from "../../../assets/Quiz.png";
import { Grid } from "@mui/material";
import { Tooltip } from "@mui/material";
import { ReactComponent as AddProductIcon } from "../../../assets/AddProductIcon.svg";
import API from "../../../api/index";
import ProductForm from "../../../components/Common/ProductForm";
import { useTranslation } from "react-i18next";

const Document = (props) => {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState("");

  const { t } = useTranslation();

  const [validDoc, setValidDoc] = useState(false);
  useEffect(() => {
    handleCountryName();
  }, []);

  useEffect(() => {
    if (props.CountryDoc) {
      validateDocuments();
    }
  }, [props?.CountryDoc]);

  useEffect(() => {
    if (props?.createdCodes?.codes) {
      let product = props.createdCodes.codes.map((item) => {
        item.products = [{ user: props.userData, code: item.code._id }];
        return item;
      });
      props.setProductCodes(product);
    }
    handleAllCountries();
    // handleCountryDocValidate();
    props.handleDocByCountryId();
  }, [props?.createdCodes?.codes]);

  const validateDocuments = () => {
    const filterDocs = props?.CountryDoc?.filter((item) => item.hasOwnProperty("fileName"));
    if (filterDocs?.length === props.CountryDoc?.length) {
      setValidDoc(true);
    } else {
      setValidDoc(false);
    }
  };
  const handleProductChange = (name, value, cindex, index1) => {
    props.setProductCodes((prev) => {
      prev[cindex].products[index1][name] = value;
      return [...prev];
    });
  };
  const addEmptyProduct = (cindex, item) => {
    props.setProductCodes((prev) => {
      prev[cindex].products = [
        ...prev[cindex].products,
        { user: props.userData, code: item.code._id },
      ];
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
  const handleCountryName = () => {
    setCountryName(
      props?.countries?.find((item) => {
        return item._id === props?.CountryName;
      })
    );
  };
  return (
    <div className="documents_main_div">
      <div className="title_Div_documents">
        <span className="title_span">
          {t("Import documents specific to")} {countryName?.name}
        </span>
        {validDoc ? (
          <span className="complete_pill">{t("Complete")}</span>
        ) : (
          <span className="to_complete_pill">{t("To Complete")}</span>
        )}
      </div>
      <div className="divider_line2"></div>
      <Grid container spacing={2} sx={{ width: "100%" }}>
        {props?.CountryDoc?.map((item, index) => {
          return (
            <Grid item xs={6}>
              <label style={{ display: "flex" }}>
                {item?.name}
                <Tooltip title={item?.info} placement="top">
                  <img style={{ paddingLeft: "5px" }} src={HelperIcon} />
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
      </Grid>
      {props?.productCodes?.map((item, cindex) => {
        return (
          <div>
            {item?.products?.map((product, index1) => {
              return (
                <ProductForm
                  handleProductChange={handleProductChange}
                  item={item}
                  cindex={cindex}
                  index1={index1}
                  countries={countries}
                  setCodes={props.setProductCodes}
                  product={product}
                />
              );
            })}
            <div className="addProduct_btn" onClick={() => addEmptyProduct(cindex, item)}>
              <AddProductIcon />
              &nbsp;&nbsp;{t("Add another product")}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Document;
