import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../../pages/login";
import DashboardLayout from "../../layouts/dashboard";
import ActualDataPage from "../../pages/dashboard/actual-data";
import ReservationForecastPage from "../../pages/dashboard/reservation-forecast";
import PeriodDetailPage from "../../pages/dashboard/period-detail";

function Router() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route
            path="/dashboard"
            element={<Navigate to="actual-data" replace />}
          />
          <Route path="actual-data" element={<ActualDataPage />} />
          <Route
            path="reservation-forecast"
            element={<ReservationForecastPage />}
          />
          <Route path="period-detail" element={<PeriodDetailPage />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default Router;
