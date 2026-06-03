import React from 'react';
import { Route } from 'react-router-dom';
import TasksPage from '../features/tasks/pages/TasksPage';

export default (
  <Route path="user/tasks/*" element={<TasksPage />} />
);
