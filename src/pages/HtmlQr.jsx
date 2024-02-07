import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "../CSS/main.css";
import airlines from "../APIS/airlines";
import airport from "../APIS/airport";
import backendInstance from "../Axios/axios";
import Snacks from "../Components/Snacks";
import Snackbar from "@mui/material/Snackbar";

const HtmlQr = () => {
  //   const [res, setRes] = useState("");
  const [qrData, setQrData] = useState([]);
  const [raw, setRaw] = useState("");
  const [start, setStart] = useState(false);
  const [snacks, setSnacks] = useState(false);

  // const [data, setData] = useState("");

  function getDateFromDayOfYear(year, dayOfYear) {
    const date = new Date(year, 0);
    date.setDate(dayOfYear);
    return date;
  }
  useEffect(() => {
    const getRes = async (values) => {
      let res = {};
      setRaw(values);
      let str = values.split(" ");
      let setStr = new Set(str);
      str = [...setStr].filter((val) => val !== "");
      // let str = "M1AG/Ragunath RHKN7X CCUMAASG 607 097V00000000 000".split(" ");
      console.log(str);

      let air = await airlines(str[2].slice(6));
      let depature = await airport(str[2].slice(0, 3));
      let arrival = await airport(str[2].slice(3, 6));

      console.log(air);

      let barDate = str[4].slice(0, 3);

      res.name = str[0].slice(2);
      res.pnr = str[1];
      res.from = depature;
      res.to = arrival;
      res.airline = air + " " + str[3];
      res.date = getDateFromDayOfYear(2023, +barDate).toDateString();
      res.class = str[4].slice(3, 4);
      res.seat = str[4].slice(6, 8);

      return res;
    };

    let qrCodeScanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 500,
        height: 500,
      },
      fps: 5,
    });

    qrCodeScanner.render(success, error);

    async function success(result) {
      qrCodeScanner.clear();
      console.log(result);
      let obj = await getRes(result);
      console.log(obj);

      setQrData([...qrData, obj]);

      const { data } = await backendInstance.post("/scannedData", obj);
      console.log(data);
      if (data.message === "data inserted") {
        console.log("if");
        setSnacks(true);
        setTimeout(() => setSnacks(false), 2000);
      } else {
        setSnacks(true);
        setTimeout(() => setSnacks(false), 2000);
      }

      //   setRes(result);
    }

    function error(err) {
      console.log(err);
    }

    return () => {
      qrCodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []);

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <div id="reader"></div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snacks}
        message={"Inserted Successfully"}
        key={"topcenter"}
      />
      ;
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
      <button onClick={() => setStart(!start)}>Scan</button>
    </div>
  );
};

export default HtmlQr;
