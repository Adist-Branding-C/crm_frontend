import { useState, useCallback, useEffect } from 'react';
import { connectApiService } from '../services/connectApi.service';
import { leadAdditionalService } from '../../lead-settings/lead-additional/services/leadAdditionalService';
import type { LeadAdditionalApiItem } from '../../lead-settings/lead-additional/types/interface';
import type { ApiRequestLogItem, ApiRequestLogPagination } from '../types';

const REQUEST_LOG_PAGE_SIZE = 10;

export function useConnectApiData() {
  const [apiToken, setApiToken] = useState<string | null>(null);
  const [isTokenVisible, setIsTokenVisible] = useState(false);
  const [isTokenLoading, setIsTokenLoading] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('introduction');
  const [additionalFields, setAdditionalFields] = useState<LeadAdditionalApiItem[]>([]);

  const [requestLogItems, setRequestLogItems] = useState<ApiRequestLogItem[]>([]);
  const [requestLogPagination, setRequestLogPagination] = useState<ApiRequestLogPagination | null>(null);
  const [requestLogPage, setRequestLogPage] = useState(1);
  const [requestLogLoading, setRequestLogLoading] = useState(false);
  const [requestLogError, setRequestLogError] = useState<string | null>(null);
  const [requestLogLoaded, setRequestLogLoaded] = useState(false);
  const [expandedRequestLogId, setExpandedRequestLogId] = useState<number | null>(null);

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

  // Drives the Parameters/Example tabs' "your additional fields" section -
  // fetched once on load since it's reference data (this company's own
  // configured custom fields), not something that changes mid-visit.
  useEffect(() => {
    leadAdditionalService.getAll(1, 500).then((response) => {
      if (response.status && response.data) {
        setAdditionalFields(response.data.items);
      }
    }).catch(() => {
      // Non-critical - docs page still works with just the base parameters.
    });
  }, []);

  const fetchRequestLog = useCallback(async (page: number) => {
    setRequestLogLoading(true);
    setRequestLogError(null);
    try {
      const response = await connectApiService.getApiRequestLog(page, REQUEST_LOG_PAGE_SIZE);
      if (response.status && response.data) {
        setRequestLogItems(response.data.items);
        setRequestLogPagination(response.data.pagination);
        setRequestLogPage(page);
      } else {
        setRequestLogError(response.message || 'Failed to load request log');
      }
    } catch {
      setRequestLogError('Network error. Please try again.');
    } finally {
      setRequestLogLoading(false);
      setRequestLogLoaded(true);
    }
  }, []);

  // Lazy: only fetch once the tab is actually opened, not on page mount -
  // this is a potentially large, paginated dataset unlike the additional
  // fields reference data above.
  useEffect(() => {
    if (activeTab === 'request-log' && !requestLogLoaded) {
      fetchRequestLog(1);
    }
  }, [activeTab, requestLogLoaded, fetchRequestLog]);

  const handleRequestLogPageChange = useCallback((page: number) => {
    fetchRequestLog(page);
  }, [fetchRequestLog]);

  const toggleRequestLogRow = useCallback((id: number) => {
    setExpandedRequestLogId((current) => (current === id ? null : id));
  }, []);

  return {
    apiToken,
    isTokenVisible,
    isTokenLoading,
    tokenError,
    copied,
    activeTab, setActiveTab,
    additionalFields,
    handleViewToken, handleHideToken, handleCopyToken,
    requestLogItems,
    requestLogPagination,
    requestLogPage,
    requestLogLoading,
    requestLogError,
    expandedRequestLogId,
    handleRequestLogPageChange,
    toggleRequestLogRow,
  };
}
