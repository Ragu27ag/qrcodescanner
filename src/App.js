import { useEffect, useState } from "react";
import "./App.css";
import backendInstance from "./Axios/axios";
// import HtmlQr from "./pages/HtmlQr";
import CustomHtmlQr from "./pages/CustomHtmlQr";
import Qrloader from "./Components/Qrloader";

function App() {
  // const handleError = (error) => {
  //   console.log(error);
  // };
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const { data } = backendInstance.get("/health");
    if (data === "up and running") setLoad(true);
  }, []);

  return (
    <>
      {
        /* {" "}
      <Main /> */
        // <HtmlQr />
      }
      {load ? <CustomHtmlQr /> : <Qrloader />}
    </>
  );
}

export default App;
