import React from 'react';
import { Route } from 'react-router-dom';
import AccountPage from '../features/account-settings/pages/AccountSettings';
import RolesPage from '../features/roles/pages/RolesPage';
import DepartmentPage from '../features/account-settings/department/page/DepartmentPage';
import WorkModePage from '../features/account-settings/staff-work-modes/page/WorkModePage';
import CheckoutNotePage from '../features/account-settings/checkout-note/page/CheckoutNotePage';
import DesignationPage from '../features/account-settings/designations/page/DesignationPage';
import BranchPage from '../features/account-settings/branch/page/BranchPage';
import MailConfigPage from '../features/mail-config/pages/MailConfigPage';
import EmailTemplatePage from '../features/account-settings/email-template/page/EmailTemplatePage';
import ProfilePage from '../features/profile/pages/ProfilePage';
import PasswordPage from '../features/account-settings/password/page/PasswordPage';
import WhatsAppTemplatePage from '../features/account-settings/whatsapp-template/page/WhatsappTemplatePage';

export default (
  <>
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
  </>
);
