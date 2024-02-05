import React, { useCallback, useEffect, useMemo, useState } from "react";
import airlines from "../APIS/airlines";
import { Html5Qrcode } from "html5-qrcode";
import "../CSS/main.css";

const CustomHtmlQr = () => {
  const [qrData, setQrData] = useState([]);
  const [raw, setRaw] = useState("");
  const [start, setStart] = useState(false);
  const [reff, setreff] = useState("");

  function getDateFromDayOfYear(year, dayOfYear) {
    const date = new Date(year, 0);
    date.setDate(dayOfYear);
    return date;
  }

  const getRes = useCallback(async (values) => {
    let res = {};
    setRaw(values);
    let str = values.split(" ");
    let setStr = new Set(str);
    str = [...setStr].filter((val) => val !== "");
    // let str = "M1AG/Ragunath RHKN7X CCUMAASG 607 097V00000000 000".split(" ");
    console.log(str);

    let air = await airlines(str[2].slice(6));

    console.log(air);

    let barDate = str[4].slice(0, 3);

    res.name = str[0].slice(2);
    res.pnr = str[1];
    res.from = str[2].slice(0, 3);
    res.to = str[2].slice(3, 6);
    res.airline = air + " " + str[3];
    res.date = getDateFromDayOfYear(2023, +barDate).toDateString();
    res.class = str[4].slice(3, 4);
    res.seat = str[4].slice(6, 8);

    return res;
  }, []);

  const config = useMemo(
    () => ({ fps: 10, qrbox: { width: 250, height: 250 } }),
    []
  );

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("reader");
    setreff(html5QrCode);
    async function success(result) {
      setStart(false);
      html5QrCode.stop();
      console.log(result);
      let obj = await getRes(result);
      console.log(obj);

      setQrData([obj]);
      //   setRes(result);
    }

    console.log("rendering");

    if (start) {
      html5QrCode.start({ facingMode: "environment" }, config, success);
    }
  }, [config, getRes, start]);

  function stopee() {
    setStart(false);
    reff.stop();
  }

  console.log(start);

  return (
    <div>
      {" "}
      <div>
      <h1>QR Code Scanner</h1>
      </div>
      <div id="reader"></div>
      <div className="map-div">
        <p>{raw}</p>
        {qrData.map((val, i) => (
          <>
            <p>{JSON.stringify(val)}</p>
            <br />
            <span>Name : </span>
            <p>{val.name?.toUpperCase()}</p>
            <br />
            <span>From : </span>
            <p>{val.from?.toUpperCase()}</p> <br /> <span>To : </span>
            <p>{val.to?.toUpperCase()}</p> <br /> <span>Date : </span>
            <p>{val.date}</p> <br />
            <span>Airline : </span>
            <p>{val.airline}</p> <br />
            <span>Class : </span>
            <p>{val.class}</p>
            <br />
            <span>Seat : </span>
            <p>{val.seat}</p>
          </>
        ))}
      </div>
      {/* <p>{res}</p> */}
      <div className="butt-div">
        <button className="button-scan" onClick={() => setStart(!start)}>Scan</button>
        <button  className="button-scan" onClick={stopee}>Stop</button>
      </div>
    </div>
  );
};

export default CustomHtmlQr;
