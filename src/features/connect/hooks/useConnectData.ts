import { useState, useCallback } from 'react';
import type { ConnectOption } from '../types';

export function useConnectData() {
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [configuringOption, setConfiguringOption] = useState<ConnectOption | null>(null);
  const [apiToken, setApiToken] = useState('ld_sk_4a7f9e2c1d8b3f5a6e7c9d2a1f8b4e6c7d');
  const [copied, setCopied] = useState(false);
  const [configForm, setConfigForm] = useState<Record<string, string>>({});

  const handleGenerateToken = useCallback(() => {
    setApiToken('ld_sk_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
  }, []);

  const handleCopyToken = useCallback(() => {
    navigator.clipboard.writeText(apiToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [apiToken]);

  const handleConfigClick = useCallback((option: ConnectOption) => {
    if (option.id === 'lead-api') {
      window.location.href = '/user/connect/api';
      return;
    }
    if (option.id === 'facebook') {
      window.location.href = '/facebook/workflows';
      return;
    }
    setConfiguringOption(option);
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
    configuringOption, setConfiguringOption,
    apiToken, setApiToken,
    copied, setCopied,
    configForm, setConfigForm,
    handleGenerateToken, handleCopyToken,
    handleConfigClick, handleViewLeads,
  };
}
