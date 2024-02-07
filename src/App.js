import { useEffect } from "react";
import "./App.css";
import backendInstance from "./Axios/axios";
// import HtmlQr from "./pages/HtmlQr";
import CustomHtmlQr from "./pages/CustomHtmlQr";

function App() {
  // const handleError = (error) => {
  //   console.log(error);
  // };
  useEffect(() => {
    const { data } = backendInstance.get("/health");
    console.log("health", data);
  }, []);

  return (
    <>
      {
        /* {" "}
      <Main /> */
        // <HtmlQr />
      }
      <CustomHtmlQr />
    </>
  );
}

export default App;
