import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material";
import LineChart from "components/LineChart";
import Loading from "components/Loading";
import React, { useEffect, useState } from "react";

const HourlyBranchUipTrend = () => {
  const [loadingText, setLoadingText] = useState("Loading...");
  const [view, setView] = useState("count");
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await fetch(`${baseUrl}/hourlytrend/branch`);
    if (response.status !== 200)
      setLoadingText(
        "Unable to load report. Kindly refresh or check the console for errors"
      );
    const jsonData = await response.json();
    console.log(jsonData);

    if (response.ok) setData(jsonData);
  };

  useEffect(() => {
    getData();
  }, []);

  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Box
      m={!isMobile ? "1.5rem 2.5rem" : "20px 15px"}
      pb={isMobile ? "130px" : ""}
    >
      <Box>
        <Typography fontWeight="bold" fontSize="25px">
          UIP at Branch Hourly Trend
        </Typography>
      </Box>
      <Box height={!isMobile ? "75vh" : "78vh"}>
        {data.length > 0 ? (
          <Box sx={{ width: "100%", height: "100%" }}>
            <FormControl
              sx={{
                mt: "1rem",
              }}
            >
              <InputLabel>View</InputLabel>
              <Select
                value={view}
                label="View"
                onChange={(e) => setView(e.target.value)}
              >
                <MenuItem value="amount">Amount</MenuItem>
                <MenuItem value="count">Count</MenuItem>
              </Select>
            </FormControl>
            <LineChart dat={data} view={view} period={"Hour"} />
          </Box>
        ) : (
          <Loading loadingText={loadingText} />
        )}
      </Box>
    </Box>
  );
};

export default HourlyBranchUipTrend;
