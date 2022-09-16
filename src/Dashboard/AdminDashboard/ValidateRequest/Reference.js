// import React from "react";
// import { useHistory } from "react-router-dom";
// import EzxportIcon from "../../../assets/EzxportIcon.svg";
// import { Link } from "react-router-dom";
// import BackArrow from "../../../assets/BackArrow.svg";

// const Reference = (props) => {
//   const history = useHistory();
//   return (
//     <>
//       {props.TabePropsCount === 2 ? (
//         <>
//           <div className="Reference_header">
//             <div className="Reference_center_div">
//               <div className="Reference_heading">
//                 <Link
//                   to="/Admin/Dashboard/Requests"
//                   style={{ textDecoration: "none", color: "red" }}
//                 >
//                   <p className="Reference_h2">
//                     <img src={BackArrow} alt="" />
//                     &nbsp; Reference{" "}
//                   </p>
//                 </Link>
//               </div>
//               <div className="Reference_logo_div">
//                 <img src={EzxportIcon} alt="" className="header_center_div" />
//               </div>
//               <div className="validate_btn_div">
//                 <button className="validate_button2">Download the file</button>
//                 &nbsp;
//                 <button className="validate_button" onClick={() => history.push("/SendDocuments")}>
//                   Validate the file
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           <div className="Reference_header">
//             <div className="Reference_center_div">
//               <div className="Reference_heading">
//                 <Link
//                   to="/Admin/Dashboard/Requests"
//                   style={{ textDecoration: "none", color: "black" }}
//                 >
//                   <p className="Reference_h2">
//                     <img src={BackArrow} alt="" />
//                     &nbsp; Reference
//                   </p>
//                 </Link>
//               </div>
//               <div className="Reference_logo_div">
//                 <img src={EzxportIcon} alt="" className="header_center_div" />
//               </div>
//               <div className="validate_btn_div">
//                   {/* <button className="validate_button">Validate and receive the completed file</button> */}
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default Reference;
