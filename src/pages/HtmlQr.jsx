import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const HtmlQr = () => {
  //   const [res, setRes] = useState("");
  const [qrData, setQrData] = useState([]);
  // const [data, setData] = useState("");

  function getDateFromDayOfYear(year, dayOfYear) {
    const date = new Date(year, 0);
    date.setDate(dayOfYear);
    return date;
  }

  useEffect(() => {
    const getRes = (values) => {
      let res = {};

      let str = values.split(" ");
      let setStr = new Set(str);
      str = [...setStr].filter((val) => val !== "");
      // let str = "M1AG/Ragunath RHKN7X CCUMAASG 607 097V00000000 000".split(" ");
      console.log(str);

      let barDate = str[4].slice(0, 3);

      res.name = str[0].slice(2);
      res.pnr = str[1];
      res.from = str[2].slice(0, 3);
      res.to = str[2].slice(3, 6);
      res.airline = str[2].slice(6) + " " + str[3];
      res.date = getDateFromDayOfYear(2023, +barDate).toDateString();
      res.class = str[4].slice(3, 4);
      return res;
    };

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
      let obj = getRes(result);
      console.log(obj);

      setQrData([obj]);
      //   setRes(result);
    }

    function error(err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <div id="reader"></div>
      {qrData.map((val, i) => (
        <>
          <p>{JSON.stringify(val)}</p>
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
      ))}
      {/* <p>{res}</p> */}
    </div>
  );
};

export default HtmlQr;
