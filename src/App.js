import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DailyBranchUipTrend from "scenes/daily trend/branch UIP";
import DailyNipTrend from "scenes/daily trend/nip incoming";
import DailyUipTrend from "scenes/daily trend/uip outgoing";
import HourlyBranchUipTrend from "scenes/hourly trend/branch uip";
import HourlyNipTrend from "scenes/hourly trend/nip incoming";
import Layout from "scenes/layout";
import MonthlyBranchUipTrend from "scenes/monthly trend/branch uip";
import MonthlyNipTrend from "scenes/monthly trend/nip incoming";
import MonthlyUipTrend from "scenes/monthly trend/uip outgoing";
import OnlineBankingTrend from "scenes/monthly trend/union online";
import StandUp from "scenes/standup";

const App = () => {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/standup" replace />} />
            <Route path="/standup" element={<StandUp />} />
            <Route
              path="/monthly/branch-uip"
              element={<MonthlyBranchUipTrend />}
            />
            <Route path="/monthly/nip" element={<MonthlyNipTrend />} />
            <Route path="/monthly/uip" element={<MonthlyUipTrend />} />
            <Route path="/monthly/online" element={<OnlineBankingTrend />} />
            <Route path="/daily/branch-uip" element={<DailyBranchUipTrend />} />
            <Route path="/daily/nip" element={<DailyNipTrend />} />
            <Route path="/daily/uip" element={<DailyUipTrend />} />
            <Route
              path="/hourly/branch-uip"
              element={<HourlyBranchUipTrend />}
            />
            <Route path="/hourly/nip" element={<HourlyNipTrend />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
