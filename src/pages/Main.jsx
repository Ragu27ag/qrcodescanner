import React, { useState } from "react";
// import QrReader from "modern-react-qr-reader";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

import "../CSS/main.css";

const Main = () => {
  const [qrData, setQrData] = useState([]);
  const [qrDataStr, setQrDataStr] = useState("");
  const [camera, setCamera] = useState(false);
  let res = {};
  let str;

  function getDateFromDayOfYear(year, dayOfYear) {
    const date = new Date(year, 0); // January 0 (yes, 0) is equivalent to December 31 of the previous year
    date.setDate(dayOfYear); // Set the day of the year

    return date;
  }

  const scan = (error, result) => {
    console.log(result?.text);
    if (result) {
      setQrData([]);
      setQrDataStr("");
      console.log(result?.text.includes("{"));
      // console.log(JSON.parse(result?.text));M1AG/Ragunath RHKN7X CCUMAASG 607 097V00000000 000`
      setCamera(false);
      if (result?.text.includes("{")) {
        setQrData([JSON.parse(result.text)]);
      } else {
        str = result.text.split(" ");
        console.log(str);

        let barDate = str[4].slice(0, 3);

        res.name = str[0].slice(2);
        res.pnr = str[1];
        res.from = str[2].slice(0, 3);
        res.to = str[2].slice(3, 6);
        res.airline = str[2].slice(6) + " " + str[3];
        res.date = getDateFromDayOfYear(2023, +barDate).toDateString();
        res.class = str[4].slice(3, 4);

        console.log(res);

        setQrData([res]);
      }
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
                <p>{val.to.toUpperCase()}</p> <br /> <span>Date : </span>
                <p>{val.date}</p> <br />
                <span>Airline : </span>
                <p>{val.airline}</p> <br />
                <span>Class : </span>
                <p>{val.class}</p>
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
