import React from 'react';
import { Route } from 'react-router-dom';
import EnquiriesPage from '../features/enquiries/pages/EnquiriesPage';
import CampaignsPage from '../features/campaigns/page/CampaignsPage';
import FollowupRequiredPage from '../features/followup-required/pages/FollowupRequiredPage';
import SalesPipelinePage from '../features/sales-pipeline/pages/SalesPipelinePage';
import CompaniesPage from '../features/companies/pages/CompaniesPage';
import FacebookWorkflows from '../pages/FacebookWorkflows';
import FacebookViewLeadsPage from '../features/facebook-view-leads/pages/FacebookViewLeadsPage';

export default (
  <>
    <Route path="leads" element={<EnquiriesPage />} />
    <Route path="enquiries" element={<EnquiriesPage />} />
    <Route path="campaigns" element={<CampaignsPage />} />
    <Route path="followup-required" element={<FollowupRequiredPage />} />
    <Route path="sales-pipeline" element={<SalesPipelinePage />} />
    <Route path="companies" element={<CompaniesPage />} />
    <Route path="facebook/workflows/*" element={<FacebookWorkflows />} />
    <Route path="facebook/view-leads" element={<FacebookViewLeadsPage />} />
  </>
);
