import React from 'react';
import { Route } from 'react-router-dom';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import CalendarPage from '../features/calendar/pages/CalendarPage';
import DailyActivityPage from '../features/daily-activity/pages/DailyActivityPage';
import SetupPage from '../features/setup/pages/SetupPage';
import StaffPerformancePage from '../features/staff-performance/pages/StaffPerformancePage';

export default (
  <>
    <Route path="dashboard" element={<DashboardPage />} />
    <Route path="calendar" element={<CalendarPage />} />
    <Route path="daily-activity" element={<DailyActivityPage />} />
    <Route path="setup" element={<SetupPage />} />
    <Route path="staff-performance" element={<StaffPerformancePage />} />
    <Route path="staff-performance/:id" element={<StaffPerformancePage />} />
  </>
);
