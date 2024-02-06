import React, { useCallback, useEffect, useMemo, useState } from "react";
import airlines from "../APIS/airlines";
import { Html5Qrcode } from "html5-qrcode";
import "../CSS/main.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import airport from "../APIS/airport";

const CustomHtmlQr = () => {
  const [qrData, setQrData] = useState([]);
  const [raw, setRaw] = useState("");
  const [start, setStart] = useState(false);
  const [reff, setreff] = useState("");

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

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

    let depature = await airport(str[2].slice(0, 3));
    let arrival = await airport(str[2].slice(3, 6));

    console.log(air, depature, arrival);

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
  }, []);

  const config = useMemo(
    () => ({ fps: 10, qrbox: { width: 250, height: 250 } }),
    []
  );

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("reader", { interval: 4000 });
    setreff(html5QrCode);
    async function success(result) {
      setStart(false);
      html5QrCode.stop();
      console.log(result);
      let obj = await getRes(result);
      console.log(obj);

      setQrData([...qrData, obj]);
      //   setRes(result);
    }

    console.log("rendering");

    if (start) {
      html5QrCode.start({ facingMode: "environment" }, config, success);
    }
  }, [config, getRes, start, qrData]);

  function stopee() {
    setStart(false);
    if (start) reff.stop();
  }

  console.log(start);

  return (
    <div>
      {" "}
      <div className="heading-div">
        <h1>QR Code Scanner</h1>
      </div>
      <div id="reader">
        <p>{raw}</p>
        {/* <p>{JSON.stringify(val)}</p> */}
      </div>
      <div className="map-div">
        <TableContainer sx={{ maxWidth: 550 }} component={Paper}>
          <Table sx={{ maxWidth: 550 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">From</StyledTableCell>
                <StyledTableCell align="right">To</StyledTableCell>
                <StyledTableCell align="right">Date</StyledTableCell>
                <StyledTableCell align="right">Airline</StyledTableCell>
                <StyledTableCell align="right">Class</StyledTableCell>
                <StyledTableCell align="right">Seat</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {qrData.length > 1 ? (
                qrData.map((val, i) => (
                  <>
                    <StyledTableRow key={val.name}>
                      <StyledTableCell component="th" scope="val">
                        {val.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {val.from}
                      </StyledTableCell>
                      <StyledTableCell align="right">{val.to}</StyledTableCell>
                      <StyledTableCell align="right">
                        {val.date}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {val.airline}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {val.class}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {val.seat}
                      </StyledTableCell>
                    </StyledTableRow>
                  </>
                ))
              ) : (
                <StyledTableCell align="center"></StyledTableCell>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* <p>{res}</p> */}
      <div className="butt-div">
        <button className="button-scan" onClick={() => setStart(!start)}>
          Scan
        </button>
        <button className="button-scan" onClick={stopee}>
          Stop
        </button>
      </div>
    </div>
  );
};

export default CustomHtmlQr;
