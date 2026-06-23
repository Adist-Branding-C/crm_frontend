import { useState, useCallback } from 'react';
import { dealStatusService } from '../services/dealStatus.service';
import type { DealStatusItem, DealStatusFormData, DealStatusResponse } from '../types/deal-status.types';

export function useDealStatus() {
  const [dealStatusList, setDealStatusList] = useState<DealStatusItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDealStatuses = useCallback(async (currentPage?: number, currentLimit?: number, search?: string): Promise<DealStatusResponse | null> => {
    setIsLoading(true);
    setError('');
    try {
      const response = await dealStatusService.getAllDealStatuses({ pageNumber: currentPage, limit: currentLimit, search });
      if (response.status) {
        const apiData = response.data && typeof response.data === 'object' && 'items' in response.data
          ? response.data as { items: DealStatusItem[]; pagination?: { page: number; limit: number; total: number; total_pages: number } }
          : null;
        const items = apiData?.items ?? (Array.isArray(response.data) ? response.data : []);
        const rawItems = Array.isArray(items) ? items : [];
        const mappedData = rawItems.map((item: DealStatusItem) => ({
          ...item,
          name: (item as { dealStage?: string }).dealStage || item.name || '',
        }));
        setDealStatusList(mappedData);
        return { ...response, data: mappedData };
      } else {
        setError(response.message || 'Failed to fetch deal statuses');
      }
      return response;
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to fetch deal statuses');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAddDealStatus = useCallback(async (values: DealStatusFormData): Promise<DealStatusResponse | null> => {
    try {
      const response = await dealStatusService.createDealStatus(values);
      if (!response.status) {
        setError(response.message || 'Failed to add deal status');
      }
      return response;
    } catch {
      setError('Network error. Please try again.');
      return null;
    }
  }, []);

  const handleUpdateDealStatus = useCallback(async (id: number, values: DealStatusFormData): Promise<DealStatusResponse | null> => {
    try {
      const response = await dealStatusService.updateDealStatus(id, values);
      if (!response.status) {
        setError(response.message || 'Failed to update deal status');
      }
      return response;
    } catch {
      setError('Network error. Please try again.');
      return null;
    }
  }, []);

  const handleDeleteDealStatus = useCallback(async (id: number): Promise<Pick<DealStatusResponse, 'status' | 'message'> | null> => {
    try {
      const response = await dealStatusService.deleteDealStatus(id);
      if (!response.status) {
        setError(response.message || 'Failed to delete deal status');
      }
      return response;
    } catch {
      setError('Network error. Please try again.');
      return null;
    }
  }, []);

  return { dealStatusList, setDealStatusList, isLoading, error, setError, fetchDealStatuses, handleAddDealStatus, handleUpdateDealStatus, handleDeleteDealStatus };
}
