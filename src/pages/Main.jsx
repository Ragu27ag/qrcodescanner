import React, { useState } from "react";
// import QrReader from "modern-react-qr-reader";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

import "../CSS/main.css";

const Main = () => {
  const [qrData, setQrData] = useState([]);
  const [qrDataStr, setQrDataStr] = useState("");
  const [camera, setCamera] = useState(false);

  const scan = (error, result) => {
    // console.log(typeof JSON.parse(result?.text));
    if (result) {
      setQrData([]);
      setQrDataStr("");
      console.log(result?.text.includes("{"));
      // console.log(JSON.parse(result?.text));
      setCamera(false);
      if (result?.text.includes("{")) {
        setQrData([JSON.parse(result.text)]);
      } else setQrDataStr(result.text);
    } else console.log(error);
  };

  console.log(qrData, qrDataStr);
  return (
    <div className="main-div">
      {" "}
      <div className="heading">
        <h2>QR CODE SCANNER</h2>
      </div>
      <div className="camera-div">
        {camera && (
          // <QrReader
          //   className="camera-window"
          //   onScan={scan}
          //   scanDelay={3000}
          //   constraints={{ facingMode: "environment" }}
          // />
          <BarcodeScannerComponent width={500} height={500} onUpdate={scan} />
        )}
        <div className="data-div">
          {qrDataStr === "" ? (
            qrData.map((val, i) => (
              <>
                <span>Name : </span>
                <p>{val.name.toUpperCase()}</p>
                <br />
                <span>From : </span>
                <p>{val.from.toUpperCase()}</p> <br /> <span>To : </span>
                <p>{val.to.toUpperCase()}</p> <br /> <span>Depature : </span>
                <p>{val.depature}</p> <br />
                <span>Arrival : </span>
                <p>{val.arrival}</p> <br />
                <span>Gate : </span>
                <p>{val.gate}</p>
              </>
            ))
          ) : (
            <p>{qrDataStr}</p>
          )}
        </div>
      </div>
      <div className="butt-div">
        <button className="button-scan" onClick={() => setCamera(!camera)}>
          {camera ? "Close" : "Scan QR"}
        </button>
        <div className="create-qr-div">
          <a
            href="https://extraordinary-cactus-e4a215.netlify.app/"
            className="create-qr"
          >
            Create Your own QR code
          </a>
        </div>
      </div>
      {/* {qrData.map((val) => (
    <p>{val}</p>
  ))} */}
    </div>
  );
};

export default Main;
