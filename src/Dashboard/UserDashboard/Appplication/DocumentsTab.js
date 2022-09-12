import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import RightArrow from "../../../assets/RightArrow.svg";
import TitleDownArrow from "../../../assets/TitleDownArrow.svg";
import DownloadIcon from "../../../assets/DownloadIcon.svg";
import Divider from "@mui/material/Divider";
import { Grid } from "@mui/material";
import FilePicker from "../../../components/Common/FilePicker";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import API from "../../../api/index";
import { toast } from "react-toastify";
import Button from "../../../components/Common/Button";

const DocumentsTab = ({ userRequest }) => {
  const [open, setOpen] = useState(true);
  const [productOpen, setProductOpen] = useState(true);
  const [allDocuments, setAllDocuments] = useState([]);
  useEffect(() => {
    handleDocuments();
  }, []);
  const handleDocuments = async () => {
    await API("get", `/requests/returnFormatedRequest/${userRequest._id}`)
      .then((res) => {
        setAllDocuments(res?.data?.Request);
      })
      .catch((err) => {
        console.log("handleDocuments", err);
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
      .catch((err) => {
        console.log("handleReqDoc", err);
        toast.error("File not found");
      });
  };

  const handleSpecificDoc = async (Doc_Id) => {
    await API("get", `/requests/zipFileDocument/${userRequest._id}/${Doc_Id}`)
      .then((res) => {
        window.location.href = res.config.url;
      })
      .catch((err) => {
        console.log("handleSpecificDoc", err);
        toast.error("File not found");
      });
  };
  const handleCodeDoc = async (Code_Id) => {
    await API("get", `/requests/zipFileCode/${userRequest._id}/${Code_Id}`)
      .then((res) => {
        window.location.href = res.config.url;
      })
      .catch((err) => {
        console.log("handleSpecificDoc", err);
        toast.error("File not found");
      });
  };
  const handleProductDoc = async (Product_Id) => {
    await API("get", `/requests/zipFileProduct/${Product_Id}`)
      .then((res) => {
        window.location.href = res.config.url;
      })
      .catch((err) => {
        console.log("handleProductDoc", err);
        toast.error("File not found");
      });
  };
  return (
    <>
      {userRequest?.missing_docs?.length !== 0 ? (
        <>
          <span>Missing Documents</span>
          <Divider style={{ margin: "1rem 0 1rem 0" }} />
          <span>Code name</span>
          <Grid container spacing={2}>
            {userRequest?.missing_docs?.map((item, index) => {
              return (
                <Grid item xs={6}>
                  <label style={{ display: "flex" }}>{item?.name}</label>

                  <div className="to_download_div">
                    <FilePicker
                      index={index}
                      fileName={item.fileName}
                      name={item.name}
                      // onChange={(e) => {
                      //   props?.handleUploadDoc(e.target.files[0], item._id, index);
                      // }}
                    />
                  </div>
                </Grid>
              );
            })}
          </Grid>
          <Button text="Send Documents" />
          <Divider style={{ margin: "1rem 0 1rem 0" }} />
          <span>Comments by the Admin</span> <br />
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
          <img src={DownloadIcon} alt="" className="downlaod_img_main" onClick={() => handleReqDoc()} />
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
                  {doc.status === "sent" ? (
                    <p className="send_p">{doc?.status}</p>
                  ) : doc.status === "valid" ? (
                    <p className="send_p_valid">{doc?.status}</p>
                  ) : doc.status === "invalid" ? (
                    <p className="send_p_invalid">{doc?.status}</p>
                  ) : (
                    ""
                  )}
                  <img src={DownloadIcon} alt="" className="downlaod_img" onClick={() => handleSpecificDoc(doc?.doc_id?._id)} />
                </ListItemButton>
              );
            })}
            {allDocuments?.codes?.map((code) => {
              console.log("first", code);
              return (
                <>
                  <ListItemButton sx={{ border: "1px solid #EAECF0", display: "flex" }}>
                    <li className="table_li2" style={{ marginRight: "auto", display: "flex" }}>
                      <img src={RightArrow} alt="" className="rightArrow" />
                      {code?.code?.code}
                    </li>
                    {/* <p className="send_p">Sent</p> */}
                    <img src={DownloadIcon} alt="" className="downlaod_img_main" onClick={() => handleCodeDoc(code?.code?._id)} />
                    {productOpen ? <ExpandLess onClick={handleCode} /> : <ExpandMore onClick={handleCode} />}
                  </ListItemButton>

                  <Collapse in={productOpen} timeout="auto" unmountOnExit>
                    {code?.products?.map((product) => {
                      return (
                        <>
                          <ListItemButton sx={{ border: "1px solid #EAECF0" }}>
                            <li className="table_li4" style={{ marginRight: "auto", display: "flex" }}>
                              <img src={RightArrow} alt="" className="rightArrow" />
                              {product?.name}
                            </li>
                            {/* <p className="send_p">Sent</p> */}
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
