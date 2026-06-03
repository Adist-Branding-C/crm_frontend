import { useState, useCallback } from 'react';
import type { Integration } from '../types';

export function useIntegrationsData() {
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [configuringIntegration, setConfiguringIntegration] = useState<Integration | null>(null);
  const [apiToken, setApiToken] = useState('gl_sk_4a7f9e2c1d8b3f5a6e7c9d2a1f8b4e6c7d');
  const [copied, setCopied] = useState(false);
  const [configForm, setConfigForm] = useState<Record<string, string>>({});

  const handleGenerateToken = useCallback(() => {
    setApiToken('gl_sk_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
  }, []);

  const handleCopyToken = useCallback(() => {
    navigator.clipboard.writeText(apiToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [apiToken]);

  const handleConfigClick = useCallback((integration: Integration) => {
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
  }, []);

  const handleViewLeads = useCallback((source: string) => {
    if (source === 'facebook') {
      window.location.href = '/facebook/view-leads';
    }
  }, []);

  return {
    showTokenModal, setShowTokenModal,
    showConfigModal, setShowConfigModal,
    configuringIntegration, setConfiguringIntegration,
    apiToken, setApiToken,
    copied, setCopied,
    configForm, setConfigForm,
    handleGenerateToken, handleCopyToken,
    handleConfigClick, handleViewLeads,
  };
}
