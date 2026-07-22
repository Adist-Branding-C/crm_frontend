import React from 'react';
import { Route } from 'react-router-dom';
import AccountPage from '../features/account-settings/pages/AccountSettings';
import DepartmentPage from '../features/account-settings/department/pages/DepartmentPage';
import WorkModePage from '../features/account-settings/staff-work-modes/pages/WorkModePage';
import CheckoutNotePage from '../features/account-settings/checkout-note/pages/CheckoutNotePage';
import DesignationPage from '../features/account-settings/designations/pages/DesignationPage';
import BranchPage from '../features/account-settings/branch/pages/BranchPage';
import MailConfigPage from '../features/mail-config/pages/MailConfigPage';
import EmailTemplatePage from '../features/account-settings/email-template/pages/EmailTemplatePage';
import ProfilePage from '../features/profile/pages/ProfilePage';
import PasswordPage from '../features/account-settings/password/pages/PasswordPage';
import WhatsAppTemplatePage from '../features/account-settings/whatsapp-template/pages/WhatsappTemplatePage';

export default (
  <>
    <Route path="account" element={<AccountPage />} />
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
