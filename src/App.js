import React, { useEffect, useState } from "react";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Files
import Index from "./routes/index";
import "./css/index.css";

function App() {
  const [role, setRole] = useState("");
  useEffect(() => {
    const UserData = JSON.parse(localStorage.getItem("userData"));
    if (UserData) {
      setRole(UserData.role);
    }
  }, [role]);

  return (
    <div className="App">
      {/* toastify Container for Notification */}
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={true} transition={Flip} />

      {/* Routes */}
      <Index role={role} />
    </div>
  );
}

// Export
export default App;
