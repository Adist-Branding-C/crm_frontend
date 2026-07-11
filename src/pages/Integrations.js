import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Search, Copy, RefreshCw, ExternalLink, Link as LinkIcon, Settings, X, Check, Zap, MessageSquare, Phone, Send, Users } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { CAMEL_CASE_REGEX, CAPITALIZE_FIRST_REGEX } from '../shared/constants/regex';
import './Integrations.css';
const integrationsData = [
    {
        id: 'lead-api',
        name: 'Lead Generation API',
        subtitle: 'Configure developer API',
        category: 'Developer Tools',
        description: 'Use our API to programmatically create and manage leads in your CRM. Supports REST API with JSON responses.',
        icon: '⚡',
        configFields: ['apiKey', 'endpoint', 'webhook']
    },
    {
        id: 'facebook',
        name: 'Facebook',
        subtitle: 'Social media platform',
        category: 'Social Media',
        description: 'Connect Facebook to capture leads directly from your Facebook ads and pages.',
        icon: '📘',
        configFields: ['appId', 'appSecret', 'webhookUrl'],
        hasViewLeads: true
    },
    {
        id: 'telinfy',
        name: 'Telinfy',
        subtitle: 'Messaging platform',
        category: 'Messaging',
        description: 'Telinfy messaging integration for automated WhatsApp conversations.',
        icon: '💬',
        configFields: ['apiKey', 'instanceId', 'webhookUrl']
    },
    {
        id: 'chatspaz',
        name: 'Chatspaz',
        subtitle: 'Messaging platform',
        category: 'Messaging',
        description: 'Chatspaz integration for customer engagement and support.',
        icon: '💭',
        configFields: ['apiKey', 'webhookUrl']
    },
    {
        id: 'interakt',
        name: 'Interakt',
        subtitle: 'Messaging platform',
        category: 'Messaging',
        description: 'Interakt WhatsApp business solution for CRM integration.',
        icon: '📱',
        configFields: ['apiKey', 'instanceId', 'webhookUrl']
    },
    {
        id: 'waba',
        name: 'WABA',
        subtitle: 'Messaging platform',
        category: 'Messaging',
        description: 'WhatsApp Business API integration for bulk messaging and automation.',
        icon: '✅',
        configFields: ['phoneNumberId', 'token', 'webhookUrl']
    },
];
const IntegrationsPage = () => {
    const [showTokenModal, setShowTokenModal] = useState(false);
    const [showConfigModal, setShowConfigModal] = useState(false);
    const [configuringIntegration, setConfiguringIntegration] = useState(null);
    const [apiToken, setApiToken] = useState('gl_sk_4a7f9e2c1d8b3f5a6e7c9d2a1f8b4e6c7d');
    const [copied, setCopied] = useState(false);
    const [configForm, setConfigForm] = useState({});
    const handleGenerateToken = () => {
        setApiToken('gl_sk_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
    };
    const handleCopyToken = () => {
        navigator.clipboard.writeText(apiToken);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    const handleConfigClick = (integration) => {
        if (integration.id === 'lead-api') {
            window.location.href = '/user/gl-connect/lead-api';
            return;
        }
        if (integration.id === 'facebook') {
            window.location.href = '/facebook/workflows';
            return;
        }
        setConfiguringIntegration(integration);
        setConfigForm({});
        setShowConfigModal(true);
    };
    const handleViewLeads = (source) => {
        if (source === 'facebook') {
            window.location.href = '/facebook/view-leads';
            return;
        }
        console.log('Navigate to leads with source:', source);
    };
    const getIconForCategory = (category) => {
        switch (category) {
            case 'Developer Tools': return _jsx(Zap, { size: 24 });
            case 'Social Media': return _jsx(Users, { size: 24 });
            case 'Messaging': return _jsx(MessageSquare, { size: 24 });
            default: return _jsx(LinkIcon, { size: 24 });
        }
    };
    return (_jsxs("div", { className: "integrations-page", children: [_jsx(PageHeader, { title: "Integrations", description: "Connect your favorite tools and services" }), _jsxs("div", { className: "integrations-content", children: [_jsxs("div", { className: "intro-card", children: [_jsxs("div", { className: "intro-content", children: [_jsx("h2", { children: "Connect" }), _jsx("p", { children: "Getlead connects with tools like Telegram, Gupshup, Voxbay, and other useful platforms to improve sales workflows." }), _jsx("p", { children: "By connecting a webhook, users can receive leads inside CRM. Users may alternatively use Lead Generation API. Only one primary ingestion method should be active at a time to avoid duplicate leads." }), _jsx("p", { className: "last-line", children: "Update APIs and Add Note APIs can still work alongside webhook integrations." })] }), _jsx("div", { className: "intro-illustration", children: _jsx("div", { className: "network-icon", children: _jsx(LinkIcon, { size: 48 }) }) })] }), _jsx("div", { className: "cta-section", children: _jsx("button", { className: "btn btn-primary", onClick: () => setShowTokenModal(true), children: "Generate API Token" }) }), _jsx("div", { className: "integrations-grid", children: integrationsData.map(integration => (_jsxs("div", { className: "integration-card", children: [_jsxs("div", { className: "card-header", children: [_jsx("div", { className: "platform-icon", children: integration.icon }), _jsxs("div", { className: "platform-info", children: [_jsx("h4", { children: integration.name }), _jsx("span", { className: "subtitle", children: integration.subtitle })] }), _jsx("span", { className: "category-badge", children: integration.category })] }), _jsx("p", { className: "description", children: integration.description }), _jsxs("div", { className: "card-actions", children: [_jsx("button", { className: "btn btn-outline", onClick: () => handleConfigClick(integration), children: "Configure" }), integration.hasViewLeads && (_jsx("button", { className: "btn btn-outline", onClick: () => handleViewLeads(integration.id), children: "View Leads" }))] })] }, integration.id))) })] }), showTokenModal && (_jsx("div", { className: "modal-overlay", onClick: () => setShowTokenModal(false), children: _jsxs("div", { className: "modal-content token-modal", onClick: e => e.stopPropagation(), children: [_jsxs("div", { className: "modal-header", children: [_jsx("h3", { children: "API Token" }), _jsx("button", { className: "modal-close", onClick: () => setShowTokenModal(false), children: _jsx(X, { size: 20 }) })] }), _jsxs("div", { className: "modal-body", children: [_jsxs("div", { className: "token-display", children: [_jsx("label", { children: "Your API Token" }), _jsxs("div", { className: "token-input-group", children: [_jsx("input", { type: "text", value: apiToken, readOnly: true, className: "form-control" }), _jsx("button", { className: "copy-btn", onClick: handleCopyToken, children: copied ? _jsx(Check, { size: 18 }) : _jsx(Copy, { size: 18 }) })] })] }), _jsxs("button", { className: "btn btn-outline regenerate-btn", onClick: handleGenerateToken, children: [_jsx(RefreshCw, { size: 16 }), " Regenerate Token"] }), _jsxs("p", { className: "token-note", children: ["Last generated: ", new Date().toLocaleDateString()] }), _jsxs("div", { className: "token-warning", children: [_jsx("strong", { children: "Warning:" }), " Keep your API token secure. Do not share it publicly."] })] })] }) })), showConfigModal && configuringIntegration && (_jsx("div", { className: "modal-overlay", onClick: () => setShowConfigModal(false), children: _jsxs("div", { className: "modal-content config-modal", onClick: e => e.stopPropagation(), children: [_jsxs("div", { className: "modal-header", children: [_jsxs("h3", { children: ["Configure ", configuringIntegration.name] }), _jsx("button", { className: "modal-close", onClick: () => setShowConfigModal(false), children: _jsx(X, { size: 20 }) })] }), _jsxs("div", { className: "modal-body", children: [configuringIntegration.configFields.map(field => (_jsxs("div", { className: "form-group", children: [_jsx("label", { children: field.replace(CAMEL_CASE_REGEX, ' $1').replace(CAPITALIZE_FIRST_REGEX, str => str.toUpperCase()) }), _jsx("input", { type: "text", className: "form-control", placeholder: `Enter ${field}`, value: configForm[field] || '', onChange: (e) => setConfigForm({ ...configForm, [field]: e.target.value }) })] }, field))), _jsxs("div", { className: "api-docs-link", children: [_jsx(ExternalLink, { size: 14 }), _jsx("span", { children: "View API Documentation" })] })] }), _jsxs("div", { className: "modal-footer", children: [_jsx("button", { className: "btn btn-primary", onClick: () => {
                                        console.log('Saving config:', configForm);
                                        setShowConfigModal(false);
                                    }, children: "Save Configuration" }), _jsx("button", { className: "btn btn-secondary", onClick: () => setShowConfigModal(false), children: "Cancel" })] })] }) }))] }));
};
export default IntegrationsPage;
//# sourceMappingURL=Integrations.js.map