import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage';
import ResetPasswordPage from '../features/auth/pages/ResetPasswordPage';
import { AUTH_ROUTES } from '../features/auth/constants/auth.constants';

export default (
  <>
    <Route path={AUTH_ROUTES.LOGIN} element={<LoginPage />} />
    <Route path={AUTH_ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
    <Route path={AUTH_ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
  </>
);
