import logo from "./logo.svg";
import "./App.css";
import { QrReader } from "react-qr-reader";
import { useState } from "react";

function App() {
  const [qrData, setQrData] = useState("");

  const scan = (data) => {
    if (data) {
      setQrData(data);
    }
  };

  const handleError = (error) => {
    console.log(error);
  };
  return (
    <>
      {" "}
      <QrReader onResult={scan} onError={handleError} scanDelay={3000} />
      <p>{qrData}</p>
    </>
  );
}

export default App;
