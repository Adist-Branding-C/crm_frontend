import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../features/auth/login/page/Login';
import ForgotPassword from '../features/auth/forgot-password/page/ForgotPassword';
import ResetPassword from '../features/auth/reset-password/page/ResetPassword';
import { AUTH_ROUTES } from '../features/auth/constants/auth.constants';

export default (
  <>
    <Route path={AUTH_ROUTES.LOGIN} element={<Login />} />
    <Route path={AUTH_ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
    <Route path={AUTH_ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
  </>
);
