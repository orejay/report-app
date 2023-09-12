import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import { Download } from "@mui/icons-material";
import Loading from "components/Loading";

const messages = {
  "07": "Invalid Account",
  21: "No action taken",
  51: "Insufficient funds",
  61: "Transfer limit Exceeded at Beneficiary Bank",
  91: "Beneficiary Bank not available",
  96: "System malfunction at Beneficiary Bank",
  "96M": "Unable to Invoke NIBSS Endpoint",
  97: "Error from Beneficiary Bank",
  X1: "Approved or completed successfully",
  X5: "Error in processing transaction: please try",
  90006: "Transaction could not be processed. please try again.",
  "01": "Something Went wrong.Please try again later",
  90009: "NULL",
  2075: "Profiled blocked",
  25: "Unable to locate record at Beneficiary Bank",
  78012: "Problem processing request. Please try again later.",
  1001: "Account Enquiry Service Call Fail",
  94: "Duplicate Transaction.",
  1005: "Invalid Token",
  "05": "Do not honor",
  1007: "Unable to complete.",
  63: "Security violation at Beneficiary Bank.",
};

const StandUp = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("Loading...");

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getDate = () => {
    const currentDate = new Date();

    // Get yesterday's date
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);

    // Get the date before yesterday
    const dayBeforeYesterday = new Date(currentDate);
    dayBeforeYesterday.setDate(currentDate.getDate() - 2);

    // Format the dates
    const options = { day: "numeric", month: "long" };
    const formattedYesterday = yesterday.toLocaleDateString("en-US", options);
    const formattedDayBeforeYesterday = dayBeforeYesterday.toLocaleDateString(
      "en-US",
      options
    );

    setDates([formattedYesterday, formattedDayBeforeYesterday]);
  };

  // const handleExport = async () => {
  //   const doc = new jsPDF("landscape");

  //   doc.autoTable({ html: "#report-table" });

  //   // Save the PDF locally
  //   doc.save(`report_${new Date().toLocaleDateString()}.pdf`);
  // };
  const handleExportAndSave = async () => {
    const table = document.getElementById("report-table");

    const tableWidth = table.offsetWidth;

    const dpi = window.devicePixelRatio || 1;

    html2canvas(table, { width: tableWidth * dpi, dpi: dpi }).then((canvas) => {
      const tableImage = canvas.toDataURL("image/png");

      const doc = new jsPDF("landscape");
      doc.addImage(tableImage, "PNG", 5, 5);

      doc.save(`report_${new Date().toLocaleDateString()}.pdf`);
    });
  };

  const urls = [
    `${baseUrl}/reports/uip`,
    `${baseUrl}/reports/nip`,
    `${baseUrl}/reports/online`,
    `${baseUrl}/reports/branch`,
    `${baseUrl}/reports/mobile`,
    `${baseUrl}/reports/ussd`,
    `${baseUrl}/reports/agency`,
    `${baseUrl}/reports/validation`,
  ];

  useEffect(() => {
    getDate();
    getData();
  }, []);

  const getData = async () => {
    try {
      const responses = await Promise.all(
        urls.map(async (url) => {
          try {
            const response = await fetch(url);
            if (response.status !== 200)
              setLoadingText(
                "Unable to load report. Kindly refresh or check the console for errors"
              );
            console.log(`Unable to fetch ${url}`);
            return response;
          } catch (error) {
            console.error(`Unable to fetch ${url}`, error);
            setLoadingText(
              "Unable to load report. Kindly refresh or check the console for errors"
            );
          }
        })
      );
      const jsonResponses = await Promise.all(
        responses.map((response) => response.json())
      );
      // Process the jsonResponses here
      if (responses[0].status !== 200)
        setLoadingText(
          "Unable to load report. Kindly refresh or check the console for errors"
        );
      console.log(responses);
      setData(jsonResponses);
      setLoading(false);
      console.log(jsonResponses);
    } catch (error) {
      setLoadingText(
        "Unable to load report. Kindly refresh or check the console for errors"
      );
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pt: "50px",
      }}
    >
      {!loading ? (
        <Box>
          <table id="report-table" className="text-sm">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Platform Name</th>
                <th>Transactions for {dates[1]}</th>
                <th>
                  Count of Successful
                  <br />
                  Transactions on {dates[0]}
                </th>
                <th>
                  Count of Failed
                  <br />
                  Transactions on {dates[0]}
                </th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((each, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-100" : ""}`}
                >
                  <td>{index + 1}</td>
                  <td>{each.count.title}</td>
                  <td>
                    {formatNumberWithCommas(each.count.s2)} (
                    {(
                      (each.count.s2 / (each.count.s2 + each.count.f2)) *
                      100
                    ).toFixed(3)}
                    %)
                    <br />
                    {formatNumberWithCommas(each.count.f2)} (
                    {(
                      (each.count.f2 / (each.count.s2 + each.count.f2)) *
                      100
                    ).toFixed(3)}
                    %)
                  </td>
                  <td>
                    {formatNumberWithCommas(each.count.s1)} (
                    {(
                      (each.count.s1 / (each.count.s1 + each.count.f1)) *
                      100
                    ).toFixed(3)}
                    %)
                  </td>
                  <td>
                    {formatNumberWithCommas(each.count.f1)} (
                    {(
                      (each.count.f1 / (each.count.s1 + each.count.f1)) *
                      100
                    ).toFixed(3)}
                    %)
                  </td>
                  <td className="flex flex-col h-full">
                    {each.message?.map((item, i) => (
                      <span key={i}>
                        {item.COUNT}(
                        {((item.COUNT / each.count.f1) * 100).toFixed(3)}
                        %)-
                        <span className="">
                          ({item.RESPONSE}-
                          {messages[item.RESPONSE.toUpperCase()]})
                        </span>
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button onClick={handleExportAndSave} sx={{ mt: "10px" }}>
            <Typography>
              Download <Download />
            </Typography>
          </Button>
        </Box>
      ) : (
        <Loading loadingText={loadingText} />
      )}
    </Box>
  );
};

export default StandUp;
