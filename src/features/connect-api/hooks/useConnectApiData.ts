import { useState, useCallback } from 'react';
import { connectApiService } from '../services/connectApi.service';

export function useConnectApiData() {
  const [apiToken, setApiToken] = useState<string | null>(null);
  const [isTokenVisible, setIsTokenVisible] = useState(false);
  const [isTokenLoading, setIsTokenLoading] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('introduction');

  const handleViewToken = useCallback(async () => {
    if (apiToken) {
      setIsTokenVisible(true);
      return;
    }

    setIsTokenLoading(true);
    setTokenError(null);
    try {
      const response = await connectApiService.getApiToken();
      if (response.status && response.data) {
        setApiToken(response.data.apiToken);
        setIsTokenVisible(true);
      } else {
        setTokenError(response.message || 'Failed to load API token');
      }
    } catch {
      setTokenError('Network error. Please try again.');
    } finally {
      setIsTokenLoading(false);
    }
  }, [apiToken]);

  const handleHideToken = useCallback(() => {
    setIsTokenVisible(false);
  }, []);

  const handleCopyToken = useCallback(() => {
    if (!apiToken) return;
    navigator.clipboard.writeText(apiToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [apiToken]);

  return {
    apiToken,
    isTokenVisible,
    isTokenLoading,
    tokenError,
    copied,
    activeTab, setActiveTab,
    handleViewToken, handleHideToken, handleCopyToken,
  };
}
