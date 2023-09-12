import { Box } from "@mui/material";
import React from "react";

const Loading = ({ loadingText }) => {
  return (
    <Box
      sx={{
        height: "90vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2
        className={`text-2xl playfair font-bold ${
          loadingText === "Loading..." ? "text-teal-800" : "text-red-600"
        }`}
      >
        {loadingText}
      </h2>
    </Box>
  );
};

export default Loading;
