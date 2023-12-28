import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const HtmlQr = () => {
  const [res, setRes] = useState("");
  useEffect(() => {
    const qrCodeScanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    qrCodeScanner.render(success, error);

    function success(result) {
      qrCodeScanner.clear();
      console.log(result);
      setRes(result);
    }

    function error(err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <div id="reader"></div>
      <p>{res}</p>
    </div>
  );
};

export default HtmlQr;
