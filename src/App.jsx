import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Enquiries from './pages/Enquiries';
import SettingsPage from './pages/Settings';
import AccountPage from './pages/Account';
import DashboardContent from './components/DashboardContent';
import Setup from './pages/Setup';
import StaffPerformance from './pages/StaffPerformance';
import SalesPipeline from './pages/SalesPipeline';
import Companies from './pages/Companies';
import Roles from './pages/Roles';
import Department from './pages/Department';
import WorkMode from './pages/WorkMode';
import CheckoutNote from './pages/CheckoutNote';
import Designation from './pages/Designation';
import Branch from './pages/Branch';
import MailConfig from './pages/MailConfig';
import EmailTemplate from './pages/EmailTemplate';
import Profile from './pages/Profile';
import Password from './pages/Password';
import WhatsAppTemplate from './pages/WhatsAppTemplate';
import LeadPurpose from './pages/LeadPurpose';
import LeadStatus from './pages/LeadStatus';
import LeadSource from './pages/LeadSource';
import LeadTypes from './pages/LeadTypes';
import LeadAdditional from './pages/LeadAdditional';
import DealTypes from './pages/DealTypes';
import DealStages from './pages/DealStages';
import DealAdditionalFields from './pages/DealAdditionalFields';
import CallStatus from './pages/CallStatus';
import CallReason from './pages/CallReason';
import MeetingOutcome from './pages/MeetingOutcome';
import TaskCategories from './pages/TaskCategories';
import NotificationSettings from './pages/NotificationSettings';
import PaymentPlans from './pages/PaymentPlans';
import Integrations from './pages/Integrations';
import LeadGenerationAPI from './pages/LeadGenerationAPI';
import FacebookWorkflows from './pages/FacebookWorkflows';
import FacebookViewLeads from './pages/FacebookViewLeads';
import GeneralSettings from './pages/GeneralSettings';
import Spotlight from './pages/Spotlight';
import Deals from './pages/Deals';
import TasksPage from './pages/Tasks';
import CampaignsPage from './pages/Campaigns';
import FollowupRequired from './pages/FollowupRequired';
import ReportsPage from './pages/Reports';
import Calendar from './pages/Calendar';
import DailyActivity from './pages/DailyActivity';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('crm_token');
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="leads" element={<Enquiries />} />
          <Route path="dashboard" element={<DashboardContent />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="spotlight" element={<Spotlight />} />
          <Route path="user/deals" element={<Deals />} />
          <Route path="campaigns" element={<CampaignsPage />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="daily-activity" element={<DailyActivity />} />
          <Route path="followup-required" element={<FollowupRequired />} />
          <Route path="reports/*" element={<ReportsPage />} />
          <Route path="user/tasks/*" element={<TasksPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="setup" element={<Setup />} />
          <Route path="staff-performance" element={<StaffPerformance />} />
          <Route path="staff-performance/:id" element={<StaffPerformance />} />
          <Route path="sales-pipeline" element={<SalesPipeline />} />
          <Route path="companies" element={<Companies />} />
          <Route path="settings/lead-settings/purpose" element={<LeadPurpose />} />
          <Route path="settings/lead-settings/status" element={<LeadStatus />} />
          <Route path="settings/lead-settings/source" element={<LeadSource />} />
          <Route path="settings/lead-settings/types" element={<LeadTypes />} />
          <Route path="settings/lead-settings/additional" element={<LeadAdditional />} />
          <Route path="user/deal-types" element={<DealTypes />} />
          <Route path="user/deal-stages" element={<DealStages />} />
          <Route path="user/additional-fields-deal" element={<DealAdditionalFields />} />
          <Route path="user/call_status" element={<CallStatus />} />
          <Route path="user/reason" element={<CallReason />} />
          <Route path="user/meeting-outcome" element={<MeetingOutcome />} />
          <Route path="user/task-categories" element={<TaskCategories />} />
          <Route path="user/notifications-users" element={<NotificationSettings />} />
          <Route path="user/payment-plans" element={<PaymentPlans />} />
          <Route path="user/gl-connect" element={<Integrations />} />
          <Route path="user/gl-connect/lead-api" element={<LeadGenerationAPI />} />
          <Route path="facebook/workflows/*" element={<FacebookWorkflows />} />
          <Route path="facebook/view-leads" element={<FacebookViewLeads />} />
          <Route path="user/general-settings" element={<GeneralSettings />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="account/roles" element={<Roles />} />
          <Route path="account/department" element={<Department />} />
          <Route path="account/workmode" element={<WorkMode />} />
          <Route path="account/checkout" element={<CheckoutNote />} />
          <Route path="account/designation" element={<Designation />} />
          <Route path="account/branch" element={<Branch />} />
          <Route path="account/mailconfig" element={<MailConfig />} />
          <Route path="account/emailtemplate" element={<EmailTemplate />} />
          <Route path="account/profile" element={<Profile />} />
          <Route path="account/password" element={<Password />} />
          <Route path="account/whatsapptemplate" element={<WhatsAppTemplate />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;