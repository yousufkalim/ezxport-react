import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import RightArrow from "../../../assets/RightArrow.svg";
import DownloadIcon from "../../../assets/DownloadIcon.svg";
import Divider from "@mui/material/Divider";
import { Grid } from "@mui/material";
import FilePicker from "../../../components/Common/FilePicker";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import API from "../../../api/index";
import Button from "../../../components/Common/Button";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import toaster from "../../../utils/toaster";
import { useHistory } from "react-router-dom";
const DocumentsTab = ({ userRequest }) => {
  let history = useHistory(null);
  const [open, setOpen] = useState(true);
  const [productLength, setProductLength] = useState(0);
  const [productOpen, setProductOpen] = useState(true);
  const [allDocuments, setAllDocuments] = useState([]);
  const [countryMissingDocs, setCountryMissingDocs] = useState([]);
  const [productMissingDocs, setProductMissingDocs] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    handleDocuments();
    handleProdLength();
  }, []);

  const convertBase64 = (file, fileName) => { 
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve({ file: fileReader.result, name: fileName });
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleCountryMissingDocs = async (files, doc_id) => {
    const newImagesPromises = [];
    for (let i = 0; i < files.length; i++) {
      const fileName = files[i]?.name;
      newImagesPromises.push(convertBase64(files[i], fileName));
    }
    const newImages = await Promise.all(newImagesPromises);
    const obj = {
      doc_id,
      files: newImages,
    };
    setCountryMissingDocs([...countryMissingDocs, obj]);
  };

  const handleProductMissingDocs = async (files, obj_id, productId) => {
    const newImagesPromises = [];
    for (let i = 0; i < files.length; i++) {
      const fileName = files[i]?.name;
      newImagesPromises.push(convertBase64(files[i], fileName));
    }
    const newImages = await Promise.all(newImagesPromises);
    const obj = {
      productId,
      obj_id,
      files: newImages,
    };
    setProductMissingDocs([...productMissingDocs, obj]);
  };

  const handleDocuments = async () => {
    await API("get", `/requests/returnFormatedRequest/${userRequest._id}`)
      .then((res) => {
        setAllDocuments(res?.data?.Request);
      })
      .catch((err) => {
        // console.log("handleDocuments", err);
      });
  };

  const handleRequest = () => {
    setOpen(!open);
  };

  const handleCode = () => {
    setProductOpen(!productOpen);
  };

  const handleReqDoc = async () => {
    await API("get", `/requests/zipFile/${userRequest._id}`)
      .then((res) => {
        window.location.href = res.config.url;
      })

      .catch((err) => toaster("Failed", t("File not found")));
  };

  const handleSpecificDoc = async (Doc_Id) => {
    await API("get", `/requests/zipFileDocument/${userRequest._id}/${Doc_Id}`)
      .then((res) => {
        window.location.href = res.config.url;
      })

      .catch((err) => toaster("Failed", t("File not found")));
  };
  const handleCodeDoc = async (Code_Id) => {
    await API("get", `/requests/zipFileCode/${userRequest._id}/${Code_Id}`)
      .then((res) => {
        window.location.href = res.config.url;
      })

      .catch((err) => toaster("Failed", t("File not found")));
  };
  const handleProductDoc = async (Product_Id) => {
    await API("get", `/requests/zipFileProduct/${Product_Id}`)
      .then((res) => {
        window.location.href = res.config.url;
      })

      .catch((err) => toaster("Failed", t("File not found")));
  };
  const handleMissingDocUpload = async () => {
    const data = {
      documents: countryMissingDocs?.map((item) => ({
        ...item,
        files: item?.files?.map(({ file }) => file),
      })),
      products: productMissingDocs?.map((item) => ({
        ...item,
        files: item?.files?.map(({ file }) => file),
      })),
    };
    await API("put", `/requests/UploadmissingDocs/${userRequest._id}`, data)
      .then((res) => {
        toaster("success", t("Documents uploaded"));
        history.push("/User/Dashboard/ListOfRequests");
      })

      .catch((err) => toaster("Failed", t("File not found")));
  };
  const handleProdLength = () => {
    userRequest?.codes?.map((code) => {
      code?.products?.map((product) => {
        const prodLength = productLength + product?.missing_docs?.length;
        setProductLength(prodLength);
      });
    });
  };
  return (
    <>
      {userRequest?.missing_docs?.length !== 0 ? (
        <>
          <Typography>{t("Missing Documents")}</Typography>
          <Divider style={{ margin: "1rem 0 1rem 0" }} />
          <Grid container spacing={2}>
            {userRequest?.missing_docs?.map((item, index) => {
              const findName = countryMissingDocs.find((doc) => {
                return doc.doc_id === item._id;
              });
              const names = findName?.files?.map((item) => item.name);
              return (
                <Grid item xs={6} key={item._id}>
                  <label style={{ display: "flex" }}>{item?.name}</label>
                  <div className="to_download_div">
                    <FilePicker
                      multiple
                      index={item._id}
                      fileName={names}
                      name={item.name}
                      onChange={(e) => {
                        handleCountryMissingDocs(e.target.files, item._id);
                      }}
                    />
                  </div>
                </Grid>
              );
            })}
          </Grid>
          <Divider style={{ margin: "1rem 0 1rem 0" }} />
          {userRequest?.codes?.map((code) => {
            return (
              <>
                {code?.products?.filter((_) => _.missing_docs.length > 0).length > 0 && (
                  <span>Product's Code: {code?.code?.code}</span>
                )}
                {code?.products?.map((product, index) => {
                  return (
                    <>
                      <Grid container spacing={2}>
                        {product?.missing_docs?.map((item, index1) => {
                          const findName = productMissingDocs.find((doc) => {
                            return doc.obj_id === item._id;
                          });
                          const names = findName?.files?.map((item) => item.name);
                          return (
                            <Grid item xs={6} key={item._id}>
                              <label style={{ display: "flex" }}>{item?.name}</label>
                              <div className="to_download_div">
                                <FilePicker
                                  multiple
                                  index={item._id}
                                  fileName={names}
                                  name={item.name}
                                  onChange={(e) => {
                                    handleProductMissingDocs(e.target.files, item._id, product._id);
                                  }}
                                />
                              </div>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </>
                  );
                })}
              </>
            );
          })}
          <Button
            text="Send documents"
            className="send_documents_btn"
            // countryMissingDocs.length === userRequest?.missing_docs?.length && productMissingDocs.length === productLength
            // ?
            // : "send_documents_btn_disabled"
            onClick={handleMissingDocUpload}
            // disabled={countryMissingDocs.length === 0 || productMissingDocs.length === 0 ? true : false}
          />
          <Divider style={{ margin: "1rem 0 1rem 0" }} />
          <span>{t("Comments by the Admin")}</span> <br />
          <TextareaAutosize
            value={userRequest?.admin_remarks}
            disabled
            minRows={8}
            placeholder="Comments by admin will be shown here"
            style={{ width: "100%", padding: "10px", fontSize: "1rem", marginTop: "1rem" }}
          />
          <Divider style={{ margin: "1rem 0 1rem 0" }} />
        </>
      ) : (
        ""
      )}
      <List>
        <ListItemButton sx={{ border: "1px solid #EAECF0" }}>
          <li className="table_li" style={{ marginRight: "auto", display: "flex" }}>
            {allDocuments.title}
          </li>
          <img
            src={DownloadIcon}
            alt=""
            className="downlaod_img_main"
            onClick={() => handleReqDoc()}
          />
          {open ? <ExpandLess onClick={handleRequest} /> : <ExpandMore onClick={handleRequest} />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {allDocuments?.documents?.map((doc) => {
              return (
                <ListItemButton sx={{ border: "1px solid #EAECF0", position: "relative" }}>
                  <li className="table_li2" style={{ marginRight: "auto", display: "flex" }}>
                    <img src={RightArrow} alt="" className="rightArrow" />
                    {doc?.doc_id?.name}
                  </li>
                  {doc.status === "Valid" ? (
                    <p className="send_p_valid">{t(doc?.status)}</p>
                  ) : doc.status === "Invalid" ? (
                    <p className="send_p_invalid">{t(doc?.status)}</p>
                  ) : (
                    <p className="send_p">{t("Sent")}</p>
                  )}
                  <img
                    src={DownloadIcon}
                    alt=""
                    className="downlaod_img"
                    onClick={() => handleSpecificDoc(doc?.doc_id?._id)}
                  />
                </ListItemButton>
              );
            })}
            {allDocuments?.codes?.map((code) => {
              return (
                <>
                  <ListItemButton sx={{ border: "1px solid #EAECF0", display: "flex" }}>
                    <li className="table_li2" style={{ marginRight: "auto", display: "flex" }}>
                      <img src={RightArrow} alt="" className="rightArrow" />
                      {code?.code?.code}
                    </li>
                    <img
                      src={DownloadIcon}
                      alt=""
                      className="downlaod_img_main"
                      onClick={() => handleCodeDoc(code?.code?._id)}
                    />
                    {productOpen ? (
                      <ExpandLess onClick={handleCode} />
                    ) : (
                      <ExpandMore onClick={handleCode} />
                    )}
                  </ListItemButton>

                  <Collapse in={productOpen} timeout="auto" unmountOnExit>
                    {code?.products?.map((product) => {
                      return (
                        <>
                          <ListItemButton sx={{ border: "1px solid #EAECF0" }}>
                            <li
                              className="table_li4"
                              style={{ marginRight: "auto", display: "flex" }}
                            >
                              <img src={RightArrow} alt="" className="rightArrow" />
                              {product?.name}
                            </li>
                            <img
                              src={DownloadIcon}
                              alt=""
                              className="downlaod_img"
                              onClick={() => handleProductDoc(product?._id)}
                            />
                          </ListItemButton>
                        </>
                      );
                    })}
                  </Collapse>
                </>
              );
            })}
          </List>
        </Collapse>
      </List>
    </>
  );
};

export default DocumentsTab;
