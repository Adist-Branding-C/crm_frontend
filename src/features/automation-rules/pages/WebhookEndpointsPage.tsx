import PageHeader from '../../../shared/components/layout/PageHeader';
import { Table, THead, TBody, TRow, TCell, EmptyState } from '../../../shared/components/table';
import WebhookEndpointRow from '../components/WebhookEndpointRow';
import { useWebhookEndpointsPage } from '../hooks/useWebhookEndpointsPage';
import '../styles/automation.css';
import './WebhookEndpointsPage.css';

const WebhookEndpointsPage = () => {
  const { webhookEndpoints, handleRowClick } = useWebhookEndpointsPage();

  return (
    <div className="automation-rules-page">
      <PageHeader
        title="Webhook Endpoints Health"
        description="Read-only view of every webhook URL used across your automation rules"
        breadcrumb={[
          { label: 'Automation Rules', link: '/automation-rules' },
          { label: 'Webhook Endpoints', link: null },
        ]}
      />

      <div className="table-container">
        <Table wrapperClassName="table-scroll" className="data-table">
          <THead>
            <TRow>
              <TCell variant="th">URL</TCell>
              <TCell variant="th">Description</TCell>
              <TCell variant="th">Last Status</TCell>
              <TCell variant="th">Last Triggered At</TCell>
              <TCell variant="th">Consecutive Failures</TCell>
            </TRow>
          </THead>
          <TBody>
            {webhookEndpoints.length === 0 ? (
              <EmptyState colSpan={5} message="No webhook endpoints yet" />
            ) : (
              webhookEndpoints.map((endpoint) => (
                <WebhookEndpointRow key={endpoint.id} endpoint={endpoint} onClick={() => handleRowClick(endpoint.url)} />
              ))
            )}
          </TBody>
        </Table>
      </div>
    </div>
  );
};

export default WebhookEndpointsPage;
