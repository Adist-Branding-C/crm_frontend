import React from 'react';
import { Route } from 'react-router-dom';
import ReportsPage from '../features/reports/pages/ReportsPage';

export default (
  <Route path="reports/*" element={<ReportsPage />} />
);
