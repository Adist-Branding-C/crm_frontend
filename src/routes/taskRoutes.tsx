import React from 'react';
import { Route } from 'react-router-dom';
import TaskPage from '../features/task/task/pages/TaskPage';
import CallTaskPage from '../features/task/call-task/pages/CallTaskPage';
import CampaignTaskPage from '../features/task/campaign-task/pages/CampaignTaskPage';
// import DealTaskPage from '../features/task/deal-task/pages/DealTaskPage';

export default (
  <>
    <Route path="user/tasks" element={<TaskPage />} />
    <Route path="user/tasks/call-tasks" element={<CallTaskPage />} />
    <Route path="user/tasks/campaign-tasks" element={<CampaignTaskPage />} />
    {/* <Route path="user/tasks/deal-tasks" element={<DealTaskPage />} /> */}
  </>
);
