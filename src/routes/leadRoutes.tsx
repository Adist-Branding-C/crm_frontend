import React from 'react';
import { Route } from 'react-router-dom';
import EnquiriesPage from '../features/enquiries/pages/EnquiriesPage';
import CampaignsPage from '../features/campaigns/page/CampaignsPage';
import FollowupRequiredPage from '../features/followup-required/pages/FollowupRequiredPage';
import SalesPipelinePage from '../features/sales-pipeline/pages/SalesPipelinePage';
import SpotlightPage from '../features/spotlight/pages/SpotlightPage';
import CompaniesPage from '../features/companies/pages/CompaniesPage';
import CompanySubscriptionPage from '../features/companies/subscription/pages/CompanySubscriptionPage';
import FacebookViewLeadsPage from '../features/facebook-view-leads/pages/FacebookViewLeadsPage';
import FacebookConnectionsPage from '../features/facebook-connect/pages/FacebookConnectionsPage';
import FacebookWorkflowsListPage from '../features/facebook-connect/pages/FacebookWorkflowsListPage';
import CreateWorkflowPage from '../features/facebook-connect/pages/CreateWorkflowPage';
import EditWorkflowPage from '../features/facebook-connect/pages/EditWorkflowPage';

export default (
  <>
    <Route path="leads" element={<EnquiriesPage />} />
    <Route path="enquiries" element={<EnquiriesPage />} />
    <Route path="campaigns" element={<CampaignsPage />} />
    <Route path="followup-required" element={<FollowupRequiredPage />} />
    <Route path="sales-pipeline" element={<SalesPipelinePage />} />
    <Route path="spotlight" element={<SpotlightPage />} />
    <Route path="companies" element={<CompaniesPage />} />
    <Route path="companies/:companyId/subscription" element={<CompanySubscriptionPage />} />
    <Route path="facebook/connections" element={<FacebookConnectionsPage />} />
    <Route path="facebook/workflows" element={<FacebookWorkflowsListPage />} />
    <Route path="facebook/workflows/create" element={<CreateWorkflowPage />} />
    <Route path="facebook/workflows/:id/edit" element={<EditWorkflowPage />} />
    <Route path="facebook/view-leads" element={<FacebookViewLeadsPage />} />
  </>
);
