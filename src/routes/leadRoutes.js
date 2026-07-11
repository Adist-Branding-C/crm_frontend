import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Route } from 'react-router-dom';
import EnquiriesPage from '../features/enquiries/pages/EnquiriesPage';
import CampaignsPage from '../features/campaigns/page/CampaignsPage';
import FollowupRequiredPage from '../features/followup-required/pages/FollowupRequiredPage';
import SalesPipelinePage from '../features/sales-pipeline/pages/SalesPipelinePage';
import CompaniesPage from '../features/companies/pages/CompaniesPage';
import FacebookWorkflows from '../pages/FacebookWorkflows';
import FacebookViewLeadsPage from '../features/facebook-view-leads/pages/FacebookViewLeadsPage';
export default (_jsxs(_Fragment, { children: [_jsx(Route, { path: "leads", element: _jsx(EnquiriesPage, {}) }), _jsx(Route, { path: "enquiries", element: _jsx(EnquiriesPage, {}) }), _jsx(Route, { path: "campaigns", element: _jsx(CampaignsPage, {}) }), _jsx(Route, { path: "followup-required", element: _jsx(FollowupRequiredPage, {}) }), _jsx(Route, { path: "sales-pipeline", element: _jsx(SalesPipelinePage, {}) }), _jsx(Route, { path: "companies", element: _jsx(CompaniesPage, {}) }), _jsx(Route, { path: "facebook/workflows/*", element: _jsx(FacebookWorkflows, {}) }), _jsx(Route, { path: "facebook/view-leads", element: _jsx(FacebookViewLeadsPage, {}) })] }));
//# sourceMappingURL=leadRoutes.js.map