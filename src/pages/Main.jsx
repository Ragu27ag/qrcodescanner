import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import "../CSS/main.css";

const Main = () => {
  const [qrData, setQrData] = useState([]);
  const [camera, setCamera] = useState(false);

  const scan = (result, error) => {
    // console.log(typeof JSON.parse(result?.text));
    if (result) {
      console.log(result?.text);
      console.log(JSON.parse(result?.text));
      setCamera(false);
      setQrData([JSON.parse(result?.text)]);
    } else console.log(error);
  };

  console.log(qrData);
  return (
    <div className="main-div">
      {" "}
      <div className="heading">
        <h3>QR CODE SCANNER</h3>
      </div>
      <div className="camera-div">
        {camera && (
          <QrReader
            className="camera-window"
            onResult={scan}
            scanDelay={3000}
          />
        )}
        <div className="data-div">
          {qrData.map((val, i) => (
            <>
              <p>
                <span>Name : </span>
                {val.name}
              </p>
              <p>
                <span>From : </span>
                {val.from}
              </p>{" "}
              <p>
                <span>To : </span>
                {val.to}
              </p>{" "}
              <p>
                <span>Depature : </span>
                {val.depature}
              </p>{" "}
              <p>
                <span>Arrival : </span>
                {val.arrival}
              </p>{" "}
              <p>
                <span>Gate : </span>
                {val.gate}
              </p>
            </>
          ))}
        </div>
      </div>
      <div className="butt-div">
        <button className="button-scan" onClick={() => setCamera(!camera)}>
          {camera ? "Close" : "Scan QR"}
        </button>
      </div>
      {/* {qrData.map((val) => (
    <p>{val}</p>
  ))} */}
    </div>
  );
};

export default Main;
