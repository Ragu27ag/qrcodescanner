import React from "react";
import imgs from "../images/qrcode.69213645-removebg-preview.jpg";
import "../CSS/main.css";

const Qrloader = () => {
  return (
    <div className="img-div">
      <div className="img-div2">
        <img src={imgs} alt="qr" height={250} width={250} />
      </div>
      <div className="qr-line"></div>
    </div>
  );
};

export default Qrloader;
