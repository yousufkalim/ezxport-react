
// import React, { useEffect, useState } from "react";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import { toast } from "react-toastify";
// import BuyersTab from "./subcomponents/BuyersTab";
// import SellersTab from "./subcomponents/SellersTab";
// import LocationsTab from "./subcomponents/LocationsTab";


// const TabMenu = ({ t, value, handleChange, setOpen, open, title }) => {
//   const user = localStorage.getItem("userData");
//   const userData = JSON.parse(user);

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Box>
//         <Tabs value={value} onChange={handleChange}>
//           <Tab className="tab_btn1" label={t("Buyers")} {...a11yProps(0)} />
//           <Tab className="tab_btn2" label={t("Sellers")} {...a11yProps(1)} />
//           <Tab className="tab_btn3" label={t("Inspection locations")} {...a11yProps(2)} />
//         </Tabs>
//       </Box>
//       {/* Buyers Tab */}
//       <TabPanel value={value} index={0}>
//         <BuyersTab
//           schema={t(schema)}
//           t={t}
//           userId={userData._id}
//           countries={countries}
//           setOpen={setOpen}
//           open={open}
//           value={value}
//         />
//       </TabPanel>

//       {/* Sellers TAB 2  */}
//       <TabPanel value={value} index={1}>
//         <SellersTab
//           schema={t(schema)}
//           t={t}
//           userId={userData._id}
//           countries={countries}
//           setOpen={setOpen}
//           open={open}
//           value={value}
//         />
//       </TabPanel>

//       {/* Locations TAB 3  */}
//       <TabPanel value={value} index={2}>
//         <LocationsTab
//           t={t}
//           userId={userData._id}
//           countries={countries}
//           setOpen={setOpen}
//           open={open}
//           value={value}
//         />
//       </TabPanel>
//     </Box>
//   );
// };

// export default TabMenu;

