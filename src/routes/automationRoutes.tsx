import { Route, Outlet } from 'react-router-dom';
import ErrorBoundary from '../shared/components/ErrorBoundary';
import { AutomationDataProvider } from '../features/automation-rules/context/AutomationDataContext';
import AutomationRulesListPage from '../features/automation-rules/pages/AutomationRulesListPage';
import RuleBuilderPage from '../features/automation-rules/pages/RuleBuilderPage';
import ExecutionLogsPage from '../features/automation-rules/pages/ExecutionLogsPage';
import WebhookEndpointsPage from '../features/automation-rules/pages/WebhookEndpointsPage';
import WebhookHistoryPage from '../features/automation-rules/pages/WebhookHistoryPage';

const AutomationSection = () => (
  <AutomationDataProvider>
    <Outlet />
  </AutomationDataProvider>
);

export default (
  <Route element={<AutomationSection />}>
    <Route path="automation-rules" element={<ErrorBoundary><AutomationRulesListPage /></ErrorBoundary>} />
    <Route path="automation-rules/new" element={<ErrorBoundary><RuleBuilderPage /></ErrorBoundary>} />
    <Route path="automation-rules/:id/edit" element={<ErrorBoundary><RuleBuilderPage /></ErrorBoundary>} />
    <Route path="automation-rules/:id/execution-logs" element={<ErrorBoundary><ExecutionLogsPage /></ErrorBoundary>} />
    <Route path="automation/webhooks" element={<ErrorBoundary><WebhookEndpointsPage /></ErrorBoundary>} />
    <Route path="automation/webhook-history" element={<ErrorBoundary><WebhookHistoryPage /></ErrorBoundary>} />
  </Route>
);
