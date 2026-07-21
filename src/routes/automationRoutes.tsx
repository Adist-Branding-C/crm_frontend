import React from 'react';
import { Route } from 'react-router-dom';
import AutomationPage from '../features/automation/pages/AutomationPage';
import AutomationBuilderPage from '../features/automation/pages/AutomationBuilderPage';

export default (
  <>
    <Route path="automation" element={<AutomationPage />} />
    <Route path="automation/create" element={<AutomationBuilderPage />} />
    <Route path="automation/:automationId/edit" element={<AutomationBuilderPage />} />
  </>
);
