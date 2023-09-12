import { Box, useMediaQuery } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import React, { useMemo } from "react";

const LineChart = ({ dat, view, period }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const getMinimum = (list) => {
    const smallest = list.reduce(
      (minObj, obj) => (obj.y < minObj.y ? obj : minObj),
      list[0]
    );
    console.log(list);
    console.log(smallest);

    return smallest.y;
  };

  const [amount, count] = useMemo(() => {
    if (!dat.length > 0) return [];

    const totalTransactionsLine = {
      id: "totalTransactions",
      color: "#FB8500",
      data: [],
    };
    const totalAmountLine = {
      id: "totalAmount",
      color: "#FFB703",
      data: [],
    };

    if (period.toLowerCase() === "month") {
      dat.forEach(({ month, count, amount }) => {
        totalTransactionsLine.data = [
          ...totalTransactionsLine.data,
          { x: month, y: count },
        ];

        totalAmountLine.data = [
          ...totalAmountLine.data,
          { x: month, y: amount },
        ];
      });
    } else if (period.toLowerCase() === "day") {
      dat.forEach(({ day, count, amount }) => {
        totalTransactionsLine.data = [
          ...totalTransactionsLine.data,
          { x: day, y: count },
        ];

        totalAmountLine.data = [...totalAmountLine.data, { x: day, y: amount }];
      });
    } else if (period.toLowerCase() === "hour") {
      dat.forEach(({ hour, count, amount }) => {
        totalTransactionsLine.data = [
          ...totalTransactionsLine.data,
          { x: hour, y: count },
        ];

        totalAmountLine.data = [
          ...totalAmountLine.data,
          { x: hour, y: amount },
        ];
      });
      console.log("dat", dat);
      console.log("hourly", totalTransactionsLine);
    }

    return [[totalAmountLine], [totalTransactionsLine]];
  }, [dat]);

  return (
    <Box sx={{ height: "100%" }}>
      <ResponsiveLine
        data={view === "amount" ? amount : count}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: "#000",
              },
            },
            legend: {
              text: {
                fill: "#000",
              },
            },
            ticks: {
              line: {
                stroke: "#000",
                strokeWidth: 1,
              },
              text: {
                fill: "#000",
              },
            },
          },
          legends: {
            text: {
              fill: "#000",
            },
          },
          tooltip: {
            container: {
              color: "#000",
            },
          },
        }}
        colors={{ datum: "color" }}
        margin={{
          top: 50,
          right: !isMobile ? 50 : 6,
          bottom: 70,
          left: !isMobile ? 120 : 43,
        }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min:
            view === "amount"
              ? getMinimum(amount[0].data) - getMinimum(amount[0].data) / 12
              : getMinimum(count[0].data) - getMinimum(count[0].data) / 12,
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve={period.toLowerCase() === "month" ? "catmullRom" : "linear"}
        enableArea={false}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 90,
          legend: period,
          legendOffset: 65,
          legendPosition: !isMobile ? "middle" : "start",
        }}
        axisLeft={{
          orient: "left",
          tickValues: 5,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Total",
          legendOffset: -80,
          legendPosition: !isMobile ? "middle" : "start",
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={6}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "top-left",
            direction: "column",
            justify: false,
            translateX: 50,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </Box>
  );
};

export default LineChart;
