import React from 'react';
import { Route } from 'react-router-dom';
import EnquiriesPage from '../features/enquiries/pages/EnquiriesPage';
import CampaignsPage from '../features/campaigns/page/CampaignsPage';
import CampaignLeadsPage from '../features/campaigns/page/CampaignLeadsPage';
import FollowupRequiredPage from '../features/followup-required/pages/FollowupRequiredPage';
import SalesPipelinePage from '../features/sales-pipeline/pages/SalesPipelinePage';
import SpotlightPage from '../features/spotlight/pages/SpotlightPage';
import CompaniesPage from '../features/companies/pages/CompaniesPage';
import CompanySubscriptionPage from '../features/companies/subscription/pages/CompanySubscriptionPage';
import FacebookWorkflows from '../pages/FacebookWorkflows';
import FacebookViewLeadsPage from '../features/facebook-view-leads/pages/FacebookViewLeadsPage';

export default (
  <>
    <Route path="leads" element={<EnquiriesPage />} />
    <Route path="enquiries" element={<EnquiriesPage />} />
    <Route path="campaigns" element={<CampaignsPage />} />
    <Route path="campaigns/:campaignId/leads" element={<CampaignLeadsPage />} />
    <Route path="followup-required" element={<FollowupRequiredPage />} />
    <Route path="sales-pipeline" element={<SalesPipelinePage />} />
    <Route path="spotlight" element={<SpotlightPage />} />
    <Route path="companies" element={<CompaniesPage />} />
    <Route path="companies/:companyId/subscription" element={<CompanySubscriptionPage />} />
    <Route path="facebook/workflows/*" element={<FacebookWorkflows />} />
    <Route path="facebook/view-leads" element={<FacebookViewLeadsPage />} />
  </>
);
