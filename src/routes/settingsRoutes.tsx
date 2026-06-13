import React from 'react';
import { Route } from 'react-router-dom';
import SettingsPage from '../features/settings/pages/SettingsPage';
import LeadPurposePage from '../features/lead-purpose/pages/LeadPurposePage';
import LeadStatusPage from '../features/lead-status/pages/LeadStatusPage';
import LeadSourcePage from '../features/lead-source/pages/LeadSourcePage';
import LeadAdditionalPage from '../features/lead-additional/pages/LeadAdditionalPage';
import NotificationSettingsPage from '../features/notification-settings/pages/NotificationSettingsPage';
import PaymentPlansPage from '../features/payment-plans/pages/PaymentPlansPage';
import IntegrationsPage from '../features/integrations/pages/IntegrationsPage';
import LeadGenerationAPIPage from '../features/lead-generation-api/pages/LeadGenerationAPIPage';
import GeneralSettingsPage from '../features/general-settings/pages/GeneralSettingsPage';
import CallStatusPage from '../features/call-status/pages/CallStatusPage';
import CallReasonPage from '../features/call-reason/pages/CallReasonPage';
import MeetingOutcomePage from '../features/meeting-outcome/pages/MeetingOutcomePage';
import TaskCategoriesPage from '../features/task-categories/pages/TaskCategoriesPage';
import LeadTypesPage from '../features/lead-types/pages/LeadTypesPage';

export default (
  <>
    <Route path="settings" element={<SettingsPage />} />
    <Route path="settings/lead-settings/purpose" element={<LeadPurposePage />} />
    <Route path="settings/lead-settings/status" element={<LeadStatusPage />} />
    <Route path="settings/lead-settings/source" element={<LeadSourcePage />} />
    <Route path="settings/lead-settings/types" element={<LeadTypesPage />} />
    <Route path="settings/lead-settings/additional" element={<LeadAdditionalPage />} />
    <Route path="user/notifications-users" element={<NotificationSettingsPage />} />
    <Route path="user/payment-plans" element={<PaymentPlansPage />} />
    <Route path="user/gl-connect" element={<IntegrationsPage />} />
    <Route path="user/gl-connect/lead-api" element={<LeadGenerationAPIPage />} />
    <Route path="user/general-settings" element={<GeneralSettingsPage />} />
    <Route path="user/call_status" element={<CallStatusPage />} />
    <Route path="user/reason" element={<CallReasonPage />} />
    <Route path="user/meeting-outcome" element={<MeetingOutcomePage />} />
    <Route path="user/task-categories" element={<TaskCategoriesPage />} />
  </>
);
