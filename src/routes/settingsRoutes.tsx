import React from 'react';
import { Route } from 'react-router-dom';
import SettingsPage from '../features/settings/pages/SettingsPage';
import ErrorBoundary from '../shared/components/ErrorBoundary';
import LeadPurposePage from '../features/lead-settings/lead-purpose/pages/LeadPurposePage';
import LeadStatusPage from '../features/lead-settings/lead-status/pages/LeadStatusPage';
import LeadSourcePage from '../features/lead-settings/lead-source/pages/LeadSourcePage';
import LeadTypesPage from '../features/lead-settings/lead-types/pages/LeadTypesPage';
import LeadAdditionalPage from '../features/lead-settings/lead-additional/pages/LeadAdditionalPage';
import NotificationSettingsPage from '../features/notification-settings/pages/NotificationSettingsPage';
import PaymentPlansPage from '../features/payment-plans/pages/PaymentPlansPage';
import IntegrationsPage from '../features/integrations/pages/IntegrationsPage';
import LeadGenerationAPIPage from '../features/lead-generation-api/pages/LeadGenerationAPIPage';
import GeneralSettingsPage from '../features/general-settings/pages/GeneralSettingsPage';
import UserLayout from '../features/task-settings/components/UserLayout';
import CallStatusPage from '../features/task-settings/call-status/CallStatus';
import CallReasonPage from '../features/task-settings/call-reason/CallReason';
import MeetingOutcomePage from '../features/task-settings/meeting-outcome/MeetingOutcome';
import TaskCategoryPage from '../features/task-settings/task-category/TaskCategory';

export default (
  <>
    <Route path="settings" element={<SettingsPage />} />
    <Route path="settings/lead-settings/purpose" element={<ErrorBoundary><LeadPurposePage /></ErrorBoundary>} />
    <Route path="settings/lead-settings/status" element={<ErrorBoundary><LeadStatusPage /></ErrorBoundary>} />
    <Route path="settings/lead-settings/source" element={<ErrorBoundary><LeadSourcePage /></ErrorBoundary>} />
    <Route path="settings/lead-settings/types" element={<ErrorBoundary><LeadTypesPage /></ErrorBoundary>} />
    <Route path="settings/lead-settings/additional" element={<ErrorBoundary><LeadAdditionalPage /></ErrorBoundary>} />
    <Route path="user/notifications-users" element={<NotificationSettingsPage />} />
    <Route path="user/payment-plans" element={<PaymentPlansPage />} />
    <Route path="user/gl-connect" element={<IntegrationsPage />} />
    <Route path="user/gl-connect/lead-api" element={<LeadGenerationAPIPage />} />
    <Route path="user/general-settings" element={<GeneralSettingsPage />} />
    <Route path="user" element={<UserLayout />}>
      <Route path="call_status" element={<CallStatusPage />} />
      <Route path="call_reasons" element={<CallReasonPage />} />
      <Route path="meeting_outcome" element={<MeetingOutcomePage />} />
      <Route path="task_categories" element={<TaskCategoryPage />} />
    </Route>
  </>
);
