import { useState, useCallback } from 'react';
import type { ConnectOption } from '../types';

export function useConnectData() {
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [configuringOption, setConfiguringOption] = useState<ConnectOption | null>(null);
  const [configForm, setConfigForm] = useState<Record<string, string>>({});

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
    showConfigModal, setShowConfigModal,
    configuringOption, setConfiguringOption,
    configForm, setConfigForm,
    handleConfigClick, handleViewLeads,
  };
}
