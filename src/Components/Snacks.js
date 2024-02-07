import Snackbar from "@mui/material/Snackbar";
import React from "react";

const Snacks = ({ vertical, horizontal, open, message }) => {
  console.log("snacks");
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      message={message}
      key={vertical + horizontal}
    />
  );
};

export default Snacks;
