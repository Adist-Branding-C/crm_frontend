import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './shared/components/layout/DashboardLayout';
import EnquiriesPage from './features/enquiries/pages/EnquiriesPage';
import AccountPage from './pages/Account';
import DashboardPage from './features/dashboard/pages/DashboardPage';
import SetupPage from './features/setup/pages/SetupPage';
import StaffPerformancePage from './features/staff-performance/pages/StaffPerformancePage';
import SalesPipelinePage from './features/sales-pipeline/pages/SalesPipelinePage';
import CompaniesPage from './features/companies/pages/CompaniesPage';
import NotificationSettingsPage from './features/notification-settings/pages/NotificationSettingsPage';
import PaymentPlansPage from './features/payment-plans/pages/PaymentPlansPage';
import IntegrationsPage from './features/integrations/pages/IntegrationsPage';
import LeadGenerationAPIPage from './features/lead-generation-api/pages/LeadGenerationAPIPage';
import FacebookWorkflows from './pages/FacebookWorkflows';
import FacebookViewLeadsPage from './features/facebook-view-leads/pages/FacebookViewLeadsPage';
import GeneralSettingsPage from './features/general-settings/pages/GeneralSettingsPage';
import SpotlightPage from './features/spotlight/pages/SpotlightPage';
import DealsPage from './features/deals/pages/DealsPage';
import TasksPage from './features/tasks/pages/TasksPage';
import CampaignsPage from './features/campaigns/pages/CampaignsPage';
import FollowupRequiredPage from './features/followup-required/pages/FollowupRequiredPage';
import ReportsPage from './features/reports/pages/ReportsPage';
import CalendarPage from './features/calendar/pages/CalendarPage';
import DailyActivityPage from './features/daily-activity/pages/DailyActivityPage';
import LoginPage from './features/auth/pages/LoginPage';
import ForgotPasswordPage from './features/auth/pages/ForgotPasswordPage';
import ResetPasswordPage from './features/auth/pages/ResetPasswordPage';
import { AUTH_ROUTES } from './features/auth/constants/auth.constants';
// Migrated feature imports
import SettingsPage from './features/settings/pages/SettingsPage';
import BranchPage from './features/branch/pages/BranchPage';
import CheckoutNotePage from './features/checkout-note/pages/CheckoutNotePage';
import DesignationPage from './features/designation/pages/DesignationPage';
import WorkModePage from './features/work-mode/pages/WorkModePage';
import DepartmentPage from './features/department/pages/DepartmentPage';
import MailConfigPage from './features/mail-config/pages/MailConfigPage';
import EmailTemplatePage from './features/email-template/pages/EmailTemplatePage';
import WhatsAppTemplatePage from './features/whatsapp-template/pages/WhatsAppTemplatePage';
import ProfilePage from './features/profile/pages/ProfilePage';
import PasswordPage from './features/password/pages/PasswordPage';
import RolesPage from './features/roles/pages/RolesPage';
import LeadPurposePage from './features/lead-purpose/pages/LeadPurposePage';
import LeadStatusPage from './features/lead-status/pages/LeadStatusPage';
import LeadSourcePage from './features/lead-source/pages/LeadSourcePage';
import LeadTypesPage from './features/lead-types/pages/LeadTypesPage';
import LeadAdditionalPage from './features/lead-additional/pages/LeadAdditionalPage';
import DealTypesPage from './features/deal-types/pages/DealTypesPage';
import DealStagesPage from './features/deal-stages/pages/DealStagesPage';
import DealAdditionalFieldsPage from './features/deal-additional-fields/pages/DealAdditionalFieldsPage';
import CallStatusPage from './features/call-status/pages/CallStatusPage';
import CallReasonPage from './features/call-reason/pages/CallReasonPage';
import MeetingOutcomePage from './features/meeting-outcome/pages/MeetingOutcomePage';
import TaskCategoriesPage from './features/task-categories/pages/TaskCategoriesPage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('crm_token');
  if (!isAuthenticated) {
    return <Navigate to={AUTH_ROUTES.LOGIN} replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AUTH_ROUTES.LOGIN} element={<LoginPage />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
        <Route path={AUTH_ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        <Route path={AUTH_ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="leads" element={<EnquiriesPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="enquiries" element={<EnquiriesPage />} />
          <Route path="spotlight" element={<SpotlightPage />} />
          <Route path="user/deals" element={<DealsPage />} />
          <Route path="campaigns" element={<CampaignsPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="daily-activity" element={<DailyActivityPage />} />
          <Route path="followup-required" element={<FollowupRequiredPage />} />
          <Route path="reports/*" element={<ReportsPage />} />
          <Route path="user/tasks/*" element={<TasksPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="setup" element={<SetupPage />} />
          <Route path="staff-performance" element={<StaffPerformancePage />} />
          <Route path="staff-performance/:id" element={<StaffPerformancePage />} />
          <Route path="sales-pipeline" element={<SalesPipelinePage />} />
          <Route path="companies" element={<CompaniesPage />} />
          <Route path="settings/lead-settings/purpose" element={<LeadPurposePage />} />
          <Route path="settings/lead-settings/status" element={<LeadStatusPage />} />
          <Route path="settings/lead-settings/source" element={<LeadSourcePage />} />
          <Route path="settings/lead-settings/types" element={<LeadTypesPage />} />
          <Route path="settings/lead-settings/additional" element={<LeadAdditionalPage />} />
          <Route path="user/deal-types" element={<DealTypesPage />} />
          <Route path="user/deal-stages" element={<DealStagesPage />} />
          <Route path="user/additional-fields-deal" element={<DealAdditionalFieldsPage />} />
          <Route path="user/call_status" element={<CallStatusPage />} />
          <Route path="user/reason" element={<CallReasonPage />} />
          <Route path="user/meeting-outcome" element={<MeetingOutcomePage />} />
          <Route path="user/task-categories" element={<TaskCategoriesPage />} />
          <Route path="user/notifications-users" element={<NotificationSettingsPage />} />
          <Route path="user/payment-plans" element={<PaymentPlansPage />} />
          <Route path="user/gl-connect" element={<IntegrationsPage />} />
          <Route path="user/gl-connect/lead-api" element={<LeadGenerationAPIPage />} />
          <Route path="facebook/workflows/*" element={<FacebookWorkflows />} />
          <Route path="facebook/view-leads" element={<FacebookViewLeadsPage />} />
          <Route path="user/general-settings" element={<GeneralSettingsPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="account/roles" element={<RolesPage />} />
          <Route path="account/department" element={<DepartmentPage />} />
          <Route path="account/workmode" element={<WorkModePage />} />
          <Route path="account/checkout" element={<CheckoutNotePage />} />
          <Route path="account/designation" element={<DesignationPage />} />
          <Route path="account/branch" element={<BranchPage />} />
          <Route path="account/mailconfig" element={<MailConfigPage />} />
          <Route path="account/emailtemplate" element={<EmailTemplatePage />} />
          <Route path="account/profile" element={<ProfilePage />} />
          <Route path="account/password" element={<PasswordPage />} />
          <Route path="account/whatsapptemplate" element={<WhatsAppTemplatePage />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;