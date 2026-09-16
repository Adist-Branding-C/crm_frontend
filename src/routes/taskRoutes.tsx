import React from 'react';
import { Route } from 'react-router-dom';
import TaskPage from '../features/task/task/page/TaskPage';

export default (
  <>
    <Route path="user/tasks" element={<TaskPage />} />
  </>
);