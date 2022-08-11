import React from "react";

const ServiceProvider = () => {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: "1.2rem" }}>
          Please select <b>a vendor</b> for this request
        </span>
      </div>
      <div>
        <div>
          <div className="vendors_div">
            <input type="radio" />
            <label className="vendor_label">APPP 1</label>
          </div>
          <div className="vendors_div">
            <input type="radio" />
            <label className="vendor_label">APPP 1</label>
          </div>
          <div className="vendors_div">
            <input type="radio" />
            <label className="vendor_label">APPP 1</label>
          </div>
        </div>
        {/* <div>
          <input type="radio" />
          <label className="vendor_label">APPP 1</label>
          <input type="radio" />
          <label className="vendor_label">APPP 1</label>
          <input type="radio" />
          <label className="vendor_label">APPP 1</label>
        </div> */}
      </div>
    </div>
  );
};

export default ServiceProvider;
