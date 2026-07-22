import React from 'react';
import { Route } from 'react-router-dom';
import SettingsPage from '../features/settings/pages/SettingsPage';
import LeadPurposePage from '../features/lead_settings/lead-purpose/pages/LeadPurposePage';
import LeadStatusPage from '../features/lead_settings/lead-status/pages/LeadStatusPage';
import LeadSourcePage from '../features/lead_settings/lead-source/pages/LeadSourcePage';
import LeadAdditionalPage from '../features/lead_settings/lead-additional/pages/LeadAdditionalPage';
import ErrorBoundary from '../shared/components/ErrorBoundary';
import LeadPurposePage from '../features/lead-settings/lead-purpose/pages/LeadPurposePage';
import LeadStatusPage from '../features/lead-settings/lead-status/pages/LeadStatusPage';
import LeadSourcePage from '../features/lead-settings/lead-source/pages/LeadSourcePage';
import LeadTypesPage from '../features/lead-settings/lead-types/pages/LeadTypesPage';
import LeadAdditionalPage from '../features/lead-settings/lead-additional/pages/LeadAdditionalPage';
import CustomPipelinePage from '../features/pipeline-settings/pages/CustomPipelinePage';
import NotificationSettingsPage from '../features/notification-settings/pages/NotificationSettingsPage';
import PaymentPlansPage from '../features/payment-plans/pages/PaymentPlansPage';
import ConnectPage from '../features/connect/pages/ConnectPage';
import ConnectApiPage from '../features/connect-api/pages/ConnectApiPage';
import UserLayout from '../features/task-settings/components/UserLayout';
import IntegrationsPage from '../features/integrations/pages/IntegrationsPage';
import LeadGenerationAPIPage from '../features/lead_settings/lead-generation-api/pages/LeadGenerationAPIPage';
import GeneralSettingsPage from '../features/general-settings/pages/GeneralSettingsPage';
import CallStatusPage from '../features/call-status/pages/CallStatusPage';
import CallReasonPage from '../features/call-reason/pages/CallReasonPage';
import MeetingOutcomePage from '../features/meeting-outcome/pages/MeetingOutcomePage';
import TaskCategoriesPage from '../features/task-categories/pages/TaskCategoriesPage';
import LeadTypesPage from '../features/lead_settings/lead-types/pages/LeadTypesPage';

export default (
  <>
    <Route path="settings" element={<SettingsPage />} />
    <Route path="settings/lead-settings/purpose" element={<ErrorBoundary><LeadPurposePage /></ErrorBoundary>} />
    <Route path="settings/lead-settings/status" element={<ErrorBoundary><LeadStatusPage /></ErrorBoundary>} />
    <Route path="settings/lead-settings/source" element={<ErrorBoundary><LeadSourcePage /></ErrorBoundary>} />
    <Route path="settings/lead-settings/types" element={<ErrorBoundary><LeadTypesPage /></ErrorBoundary>} />
    <Route path="settings/lead-settings/additional" element={<ErrorBoundary><LeadAdditionalPage /></ErrorBoundary>} />
    <Route path="settings/custom-pipeline" element={<ErrorBoundary><CustomPipelinePage /></ErrorBoundary>} />
    <Route path="user/notifications-users" element={<NotificationSettingsPage />} />
    <Route path="user/payment-plans" element={<PaymentPlansPage />} />
    <Route path="user/connect" element={<ConnectPage />} />
    <Route path="user/connect/api" element={<ConnectApiPage />} />
    <Route path="user" element={<UserLayout />}>
      <Route path="call_status" element={<CallStatusPage />} />
      <Route path="call_reasons" element={<CallReasonPage />} />
      <Route path="meeting_outcome" element={<MeetingOutcomePage />} />
      <Route path="task_categories" element={<TaskCategoryPage />} />
    </Route>
    <Route path="user/gl-connect" element={<IntegrationsPage />} />
    <Route path="user/gl-connect/lead-api" element={<LeadGenerationAPIPage />} />
    <Route path="user/call_status" element={<ErrorBoundary><CallStatusPage /></ErrorBoundary>} />
    <Route path="user/call_reasons" element={<ErrorBoundary><CallReasonPage /></ErrorBoundary>} />
    <Route path="user/meeting_outcome" element={<ErrorBoundary><MeetingOutcomePage /></ErrorBoundary>} />
    <Route path="user/task_categories" element={<ErrorBoundary><TaskCategoryPage /></ErrorBoundary>} />
  </>
);