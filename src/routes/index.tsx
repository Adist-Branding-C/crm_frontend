import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../shared/components/layout/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';
import authRoutes from './authRoutes';
import dashboardRoutes from './dashboardRoutes';
import leadRoutes from './leadRoutes';
import settingsRoutes from './settingsRoutes';
import adminRoutes from './adminRoutes';
import salesRoutes from './salesRoutes';
import reportsRoutes from './reportsRoutes';
import taskRoutes from './taskRoutes';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {authRoutes}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {dashboardRoutes}
        {leadRoutes}
        {settingsRoutes}
        {adminRoutes}
        {salesRoutes}
        {reportsRoutes}
        {taskRoutes}
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
