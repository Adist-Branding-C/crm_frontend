import type { ReactNode } from 'react';
import { Copy, RefreshCw, ExternalLink, Network, Webhook, Terminal, X, Check } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { connectOptions } from '../constants';
import { useConnectData } from '../hooks/useConnectData';
import { CAMEL_CASE_REGEX, CAPITALIZE_FIRST_REGEX } from '../../../shared/constants/regex';
import './ConnectPage.css';

const FacebookGlyph = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 13.5h2.5l.5-3H14V8.5c0-.98.32-1.85 2-1.85h1.5V4.14C17.16 4.1 16.03 4 14.72 4 11.99 4 10 5.66 10 8.7V10.5H7.5v3H10V20h4v-6.5Z" fill="currentColor" />
  </svg>
);

const iconByOptionId: Record<string, ReactNode> = {
  facebook: <FacebookGlyph />,
  webhook: <Webhook size={22} />,
  'lead-api': <Terminal size={22} />,
};

const ConnectPage = () => {
  const {
    showTokenModal, setShowTokenModal,
    showConfigModal, setShowConfigModal, configuringOption, configForm, setConfigForm,
    apiToken, copied, handleGenerateToken, handleCopyToken,
    handleConfigClick, handleViewLeads,
  } = useConnectData();

  return (
    <div className="connect-page">
      <PageHeader title="Connect" description="Bring leads into Leadist from the tools you already use" breadcrumb={false} />

      <div className="connect-content">
        <div className="connect-hero">
          <div className="connect-hero-text">
            <span className="connect-hero-eyebrow">Leadist Integrations</span>
            <h2>Connect your lead sources</h2>
            <p>Leadist connects with tools like Facebook and other useful platforms to improve your sales workflow.</p>
            <p>By connecting a webhook, you can receive leads inside Leadist automatically. Alternatively, you can use the Lead Generation API. Only one primary ingestion method should be active at a time to avoid duplicate leads.</p>
            <p className="connect-hero-note">Update APIs and Add Note APIs can still work alongside webhook integrations.</p>
          </div>
          <div className="connect-hero-side">
            <div className="connect-hero-icon"><Network size={40} /></div>
            <button className="btn btn-primary" onClick={() => setShowTokenModal(true)}>Generate API Token</button>
          </div>
        </div>

        <div className="connect-grid">
          {connectOptions.map(option => (
            <div key={option.id} className="connect-card">
              <div className="connect-card-top">
                <div className={`connect-icon connect-icon-${option.id}`}>{iconByOptionId[option.id]}</div>
                <span className="connect-category">{option.category}</span>
              </div>
              <h4>{option.name}</h4>
              <span className="connect-subtitle">{option.subtitle}</span>
              <p className="connect-description">{option.description}</p>
              <div className="connect-actions">
                <button className="btn btn-outline" onClick={() => handleConfigClick(option)}>Configure</button>
                {option.hasViewLeads && (
                  <button className="btn btn-ghost" onClick={() => handleViewLeads(option.id)}>View Leads</button>
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

      {showConfigModal && configuringOption && (
        <div className="modal-overlay" onClick={() => setShowConfigModal(false)}>
          <div className="modal-content config-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Configure {configuringOption.name}</h3>
              <button className="modal-close" onClick={() => setShowConfigModal(false)}><X size={20} /></button>
            </div>
            <div className="modal-body">
              {configuringOption.configFields.map(field => (
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

export default ConnectPage;
