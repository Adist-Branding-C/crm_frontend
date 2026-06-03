import { Search, Copy, RefreshCw, ExternalLink, Link as LinkIcon, Settings, X, Check, Zap, MessageSquare, Users } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { integrationsData } from '../constants';
import { useIntegrationsData } from '../hooks/useIntegrationsData';
import { CAMEL_CASE_REGEX, CAPITALIZE_FIRST_REGEX } from '../../../shared/constants/regex';
import './IntegrationsPage.css';

const getIconForCategory = (category: string) => {
  switch (category) {
    case 'Developer Tools': return <Zap size={24} />;
    case 'Social Media': return <Users size={24} />;
    case 'Messaging': return <MessageSquare size={24} />;
    default: return <LinkIcon size={24} />;
  }
};

const IntegrationsPage = () => {
  const {
    showTokenModal, setShowTokenModal,
    showConfigModal, setShowConfigModal, configuringIntegration, configForm, setConfigForm,
    apiToken, copied, handleGenerateToken, handleCopyToken,
    handleConfigClick, handleViewLeads,
  } = useIntegrationsData();

  return (
    <div className="integrations-page">
      <PageHeader title="Integrations" description="Connect your favorite tools and services" breadcrumb={false} />

      <div className="integrations-content">
        <div className="intro-card">
          <div className="intro-content">
            <h2>Connect</h2>
            <p>Getlead connects with tools like Telegram, Gupshup, Voxbay, and other useful platforms to improve sales workflows.</p>
            <p>By connecting a webhook, users can receive leads inside CRM. Users may alternatively use Lead Generation API. Only one primary ingestion method should be active at a time to avoid duplicate leads.</p>
            <p className="last-line">Update APIs and Add Note APIs can still work alongside webhook integrations.</p>
          </div>
          <div className="intro-illustration">
            <div className="network-icon"><LinkIcon size={48} /></div>
          </div>
        </div>

        <div className="cta-section">
          <button className="btn btn-primary" onClick={() => setShowTokenModal(true)}>Generate API Token</button>
        </div>

        <div className="integrations-grid">
          {integrationsData.map(integration => (
            <div key={integration.id} className="integration-card">
              <div className="card-header">
                <div className="platform-icon">{integration.icon}</div>
                <div className="platform-info">
                  <h4>{integration.name}</h4>
                  <span className="subtitle">{integration.subtitle}</span>
                </div>
                <span className="category-badge">{integration.category}</span>
              </div>
              <p className="description">{integration.description}</p>
              <div className="card-actions">
                <button className="btn btn-outline" onClick={() => handleConfigClick(integration)}>Configure</button>
                {integration.hasViewLeads && (
                  <button className="btn btn-outline" onClick={() => handleViewLeads(integration.id)}>View Leads</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showTokenModal && (
        <div className="modal-overlay" onClick={() => setShowTokenModal(false)}>
          <div className="modal-content token-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>API Token</h3>
              <button className="modal-close" onClick={() => setShowTokenModal(false)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              <div className="token-display">
                <label>Your API Token</label>
                <div className="token-input-group">
                  <input type="text" value={apiToken} readOnly className="form-control" />
                  <button className="copy-btn" onClick={handleCopyToken}>
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
              <button className="btn btn-outline regenerate-btn" onClick={handleGenerateToken}>
                <RefreshCw size={16} /> Regenerate Token
              </button>
              <p className="token-note">Last generated: {new Date().toLocaleDateString()}</p>
              <div className="token-warning"><strong>Warning:</strong> Keep your API token secure. Do not share it publicly.</div>
            </div>
          </div>
        </div>
      )}

      {showConfigModal && configuringIntegration && (
        <div className="modal-overlay" onClick={() => setShowConfigModal(false)}>
          <div className="modal-content config-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Configure {configuringIntegration.name}</h3>
              <button className="modal-close" onClick={() => setShowConfigModal(false)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              {configuringIntegration.configFields.map(field => (
                <div key={field} className="form-group">
                  <label>{field.replace(CAMEL_CASE_REGEX, ' $1').replace(CAPITALIZE_FIRST_REGEX, str => str.toUpperCase())}</label>
                  <input type="text" className="form-control" placeholder={`Enter ${field}`}
                    value={configForm[field] || ''} onChange={(e) => setConfigForm({ ...configForm, [field]: e.target.value })} />
                </div>
              ))}
              <div className="api-docs-link"><ExternalLink size={14} /><span>View API Documentation</span></div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setShowConfigModal(false)}>Save Configuration</button>
              <button className="btn btn-secondary" onClick={() => setShowConfigModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationsPage;
