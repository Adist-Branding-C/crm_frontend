import { useCallback, useEffect, useState } from 'react';
import { facebookApi } from '../services/facebook.service';
import type { FacebookConnection, FacebookFormSummary, FacebookPageSummary, MappingOptions } from '../types';

// Shared cascading-dropdown data (connection -> pages -> forms) plus the
// independent mapping-options list, reused by both Create and Edit Workflow.
export const useFacebookBrowseOptions = () => {
  const [connections, setConnections] = useState<FacebookConnection[]>([]);
  const [mappingOptions, setMappingOptions] = useState<MappingOptions | null>(null);
  const [pages, setPages] = useState<FacebookPageSummary[]>([]);
  const [forms, setForms] = useState<FacebookFormSummary[]>([]);
  const [loadingPages, setLoadingPages] = useState(false);
  const [loadingForms, setLoadingForms] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    (async () => {
      setInitializing(true);
      const [connectionsRes, mappingOptionsRes] = await Promise.all([
        facebookApi.listConnections(),
        facebookApi.getMappingOptions(),
      ]);
      setConnections(connectionsRes.data ?? []);
      setMappingOptions(mappingOptionsRes.data ?? null);
      setInitializing(false);
    })();
  }, []);

  const loadPages = useCallback(async (connectionId: string) => {
    setLoadingPages(true);
    setPages([]);
    try {
      const response = await facebookApi.listPages(connectionId);
      setPages(response.data ?? []);
    } finally {
      setLoadingPages(false);
    }
  }, []);

  const loadForms = useCallback(async (pageId: string, connectionId: string) => {
    setLoadingForms(true);
    setForms([]);
    try {
      const response = await facebookApi.listForms(pageId, connectionId);
      setForms(response.data ?? []);
    } finally {
      setLoadingForms(false);
    }
  }, []);

  return {
    connections,
    mappingOptions,
    pages,
    forms,
    loadingPages,
    loadingForms,
    initializing,
    loadPages,
    loadForms,
  };
};
