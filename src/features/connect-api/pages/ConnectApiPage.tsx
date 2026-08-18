import { Fragment } from 'react';
import { Copy, Check, Eye, EyeOff, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { useConnectApiData } from '../hooks/useConnectApiData';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { apiParameters, tabs } from '../constants';
import type { Tab } from '../types';
import type { LeadAdditionalApiItem } from '../../lead-settings/lead-additional/types/interface';
import './ConnectApiPage.css';

const MASKED_TOKEN = '•'.repeat(40);

// Produces a plausible example value per field type for the sample curl -
// dropdowns use the field's own first configured option so the example is
// always something this company could actually submit.
function sampleValueFor(field: LeadAdditionalApiItem): string {
  switch (field.fieldType) {
    case 'Number':
      return '123';
    case 'Date':
      return '2026-08-01';
    case 'DateTime':
      return '2026-08-01T10:00:00Z';
    case 'Dropdown':
      return field.values[0] ?? 'Option 1';
    default:
      return 'Sample value';
  }
}

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

            {d.additionalFields.length > 0 && (
              <>
                <h3>Your Additional Fields</h3>
                <p>Custom fields configured for your account. Send these nested under an <code>additionalFields</code> object, keyed by field name (case-insensitive). All are optional through this API regardless of their required setting in the CRM.</p>
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
                    {d.additionalFields.map((field) => (
                      <tr key={field.fieldId}>
                        <td><code>additionalFields.{field.name}</code></td>
                        <td>{field.fieldType}</td>
                        <td><span className="required-badge no">No</span></td>
                        <td>
                          {field.fieldType === 'Dropdown' && field.values.length > 0
                            ? `One of: ${field.values.join(', ')}`
                            : `Your custom "${field.name}" field.`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        );

      case 'example': {
        const sampleBody: Record<string, unknown> = {
          name: 'John Doe',
          phone: '1234567890',
          email: 'johndoe@email.com',
          status: 'New',
          source: 'Demo request',
          purpose: 'Sales',
          type: 'Individual',
          agent: 'Jane Smith',
          notes: 'Interested in the enterprise plan',
        };
        if (d.additionalFields.length > 0) {
          sampleBody.additionalFields = Object.fromEntries(
            d.additionalFields.map((field) => [field.name, sampleValueFor(field)])
          );
        }

        return (
          <div className="api-tab-content">
            <h3>Sample API Request</h3>
            <p>
              You can use the following sample request to create a lead
              {d.additionalFields.length > 0 ? ', including the additional fields configured for your account' : ''}:
            </p>

            <pre className="code-block">{`curl -X POST https://app.leadistcrm.com/api/v1/integrations/leads \\
  -H "Authorization: Bearer your-api-token" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(sampleBody, null, 4).replace(/\n/g, '\n  ')}'`}</pre>

            <p>
              <code>status</code>, <code>source</code>, <code>purpose</code>, and <code>type</code> above must match the actual
              names you have configured in your account (case-insensitive) — the values shown here are just examples.
            </p>
          </div>
        );
      }

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
            <p>Returned when a value doesn't match the name of any existing Status/Source/Purpose/Type/Agent in your account.</p>
            <pre className="code-block">{`{
  "status": false,
  "message": "Invalid value for field \\"status\\": \\"Unqualified\\"",
  "data": {
    "field": "status"
  }
}`}</pre>

            <h4>Inactive Status / Source / Type</h4>
            <p>Returned when a Status, Source, or Type name matches one that exists in your account but has been deactivated.</p>
            <pre className="code-block">{`{
  "status": false,
  "message": "Source \\"Old Campaign\\" is inactive. Please reactivate it or choose another source.",
  "data": {
    "field": "source"
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

      case 'request-log':
        return (
          <div className="api-tab-content">
            <h3>Request Log</h3>
            <p>Recent requests received through this API — only submissions made via <code>POST /integrations/leads</code>, not leads created in the CRM directly or through bulk import. Click a row to see the exact payload you sent and the exact response we sent back.</p>

            {d.requestLogError && <p className="token-error">{d.requestLogError}</p>}

            {d.requestLogLoading && d.requestLogItems.length === 0 ? (
              <p><Loader2 size={16} className="spin" /> Loading...</p>
            ) : d.requestLogItems.length === 0 ? (
              <p>No requests received yet.</p>
            ) : (
              <>
                <table className="api-table request-log-table">
                  <thead>
                    <tr>
                      <th>Date/Time</th>
                      <th>Status</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Lead ID</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.requestLogItems.map((item) => (
                      <Fragment key={item.id}>
                        <tr className="request-log-row" onClick={() => d.toggleRequestLogRow(item.id)}>
                          <td>{new Date(item.createdAt).toLocaleString()}</td>
                          <td>
                            <span className={`status-badge status-${item.status}`}>
                              {item.status}
                            </span>
                          </td>
                          <td>{item.name ?? '—'}</td>
                          <td>{item.phone ?? '—'}</td>
                          <td>{item.leadId ?? '—'}</td>
                          <td>{d.expandedRequestLogId === item.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</td>
                        </tr>
                        {d.expandedRequestLogId === item.id && (
                          <tr className="request-log-detail-row">
                            <td colSpan={6}>
                              <div className="request-log-detail">
                                <div>
                                  <h4>Payload received</h4>
                                  <pre className="code-block">{JSON.stringify(item.payload, null, 2)}</pre>
                                </div>
                                <div>
                                  <h4>Response sent{item.responseStatus ? ` (HTTP ${item.responseStatus})` : ''}</h4>
                                  <pre className="code-block">
                                    {item.response ? JSON.stringify(item.response, null, 2) : 'Not captured for this entry.'}
                                  </pre>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    ))}
                  </tbody>
                </table>

                {d.requestLogPagination && (
                  <div className="request-log-pagination">
                    <button
                      className="btn btn-outline"
                      disabled={!d.requestLogPagination.has_previous || d.requestLogLoading}
                      onClick={() => d.handleRequestLogPageChange(d.requestLogPage - 1)}
                    >
                      Previous
                    </button>
                    <span>Page {d.requestLogPagination.page} of {d.requestLogPagination.total_pages}</span>
                    <button
                      className="btn btn-outline"
                      disabled={!d.requestLogPagination.has_next || d.requestLogLoading}
                      onClick={() => d.handleRequestLogPageChange(d.requestLogPage + 1)}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
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
