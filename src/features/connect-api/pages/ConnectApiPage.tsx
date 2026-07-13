import { Copy, Check, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useConnectApiData } from '../hooks/useConnectApiData';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { apiParameters, tabs } from '../constants';
import type { Tab } from '../types';
import './ConnectApiPage.css';

const MASKED_TOKEN = '•'.repeat(40);

const ConnectApiPage: React.FC = () => {
  const d = useConnectApiData();

  const renderTabContent = () => {
    switch (d.activeTab) {
      case 'introduction':
        return (
          <div className="api-tab-content">
            <h3>Introduction</h3>
            <p>This API allows you to submit lead information to the Leadist CRM platform. You can create leads by providing customer information such as name, phone, email, and other optional fields.</p>
            <p>By connecting a webhook, users can easily receive their leads in Leadist. Alternatively, you can use our Lead Generation API to achieve the same. However, you must choose only one method (either webhook or API) and not both at the same time. Using both simultaneously may cause duplicate leads or unexpected issues. To ensure smooth lead management, please remove the connected webhook if you decide to use the API, or vice versa.</p>

            <h4>Endpoint</h4>
            <pre className="code-block">POST https://app.leadistcrm.com/api/v1/integrations/leads</pre>

            <h4>Authentication</h4>
            <p>Every request must include your API token as a Bearer token in the Authorization header. Click "View" to reveal yours.</p>

            <div className="token-reveal">
              <div className="token-input-group">
                <input
                  type="text"
                  value={d.isTokenVisible && d.apiToken ? d.apiToken : MASKED_TOKEN}
                  readOnly
                  className="form-control token-reveal-input"
                />
                <button
                  className="copy-btn"
                  onClick={d.handleCopyToken}
                  disabled={!d.isTokenVisible}
                  title="Copy token"
                >
                  {d.copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
              <button
                className="btn btn-outline token-view-btn"
                onClick={d.isTokenVisible ? d.handleHideToken : d.handleViewToken}
                disabled={d.isTokenLoading}
              >
                {d.isTokenLoading ? (
                  <><Loader2 size={16} className="spin" /> Loading</>
                ) : d.isTokenVisible ? (
                  <><EyeOff size={16} /> Hide</>
                ) : (
                  <><Eye size={16} /> View</>
                )}
              </button>
            </div>
            {d.tokenError && <p className="token-error">{d.tokenError}</p>}

            <h4>Authentication Example</h4>
            <pre className="code-block">Authorization: Bearer your-api-token</pre>
          </div>
        );

      case 'parameters':
        return (
          <div className="api-tab-content">
            <h3>Request Parameters</h3>
            <p>Sent as JSON in the request body.</p>
            <table className="api-table">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Type</th>
                  <th>Required</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {apiParameters.map((param, index) => (
                  <tr key={index}>
                    <td><code>{param.parameter}</code></td>
                    <td>{param.type}</td>
                    <td><span className={`required-badge ${param.required.toLowerCase()}`}>{param.required}</span></td>
                    <td>{param.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'example':
        return (
          <div className="api-tab-content">
            <h3>Sample API Request</h3>
            <p>You can use the following sample request to create a lead:</p>

            <pre className="code-block">{`curl -X POST https://app.leadistcrm.com/api/v1/integrations/leads \\
  -H "Authorization: Bearer your-api-token" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Doe",
    "phone": "1234567890",
    "email": "johndoe@email.com",
    "status": "New",
    "source": "Demo request",
    "purpose": "Sales",
    "type": "Individual",
    "agent": "Jane Smith",
    "notes": "Interested in the enterprise plan"
  }'`}</pre>
          </div>
        );

      case 'response':
        return (
          <div className="api-tab-content">
            <h3>Response</h3>
            <p>The API returns a JSON response indicating the success or failure of the request.</p>

            <h4>Sample Success Response</h4>
            <pre className="code-block">{`{
  "status": true,
  "message": "Lead added successfully",
  "data": {
    "leadId": "LED2jmnoof37474"
  }
}`}</pre>

            <h4>Missing or Invalid Field</h4>
            <p>Returned when a required field is missing or the wrong type.</p>
            <pre className="code-block">{`{
  "status": false,
  "message": "phone must be a string"
}`}</pre>

            <h4>Unrecognized Field in Request</h4>
            <p>Returned when the request body includes a field the API doesn't accept.</p>
            <pre className="code-block">{`{
  "status": false,
  "message": "property unknownField should not exist"
}`}</pre>

            <h4>Unrecognized Status / Source / Purpose / Type / Agent</h4>
            <p>Returned when a value doesn't match the name of one already configured in your account (or matches one that's been deleted).</p>
            <pre className="code-block">{`{
  "status": false,
  "message": "Invalid value for field \\"status\\": \\"Unqualified\\"",
  "data": {
    "field": "status"
  }
}`}</pre>

            <h4>Unauthorized</h4>
            <p>Returned when the Authorization header is missing or the token is invalid.</p>
            <pre className="code-block">{`{
  "status": false,
  "message": "Unauthorized",
  "data": {}
}`}</pre>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="lead-api-page">
      <PageHeader
        title="Lead Generation API"
        description="Configure developer API for lead submission"
        breadcrumb={[
          { label: 'Connect', link: '/user/connect' },
          { label: 'Lead Generation API' }
        ]}
      />

      <div className="api-page-content">
        <div className="api-tabs">
          {tabs.map((tab: Tab) => (
            <button
              key={tab.id}
              className={`api-tab ${d.activeTab === tab.id ? 'active' : ''}`}
              onClick={() => d.setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="api-content-section">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ConnectApiPage;
