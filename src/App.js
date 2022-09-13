import React, { Suspense, useEffect, useState } from "react";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {I18nextProvider} from "react-i18next";
import i18next from "./utils/translations";
// Files
import Index from "./routes/index";
import "./css/index.css";

function App() {
  const [role, setRole] = useState("");
  useEffect(() => {
    const Role = JSON.parse(localStorage.getItem("role"));
    if (Role) {
      setRole(Role);
    }
  }, [role]);

  return (
    <div className="App">
      <Suspense fallback="loading">
        <I18nextProvider i18n={i18next}>
          {/* toastify Container for Notification */}
          <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={true} transition={Flip} />

          {/* Routes */}
          <Index role={role} />
        </I18nextProvider>
      </Suspense>
    </div>
  );
}

// Export
export default App;
