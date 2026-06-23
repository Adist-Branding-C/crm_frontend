import { useState, useCallback } from 'react';
import { dealTypeService } from '../services/dealType.service';
import type { DealTypeItem, DealTypeFormData, DealTypeResponse } from '../types/deal-type.types';
import type { PaginationMeta } from '../../shared/types';

export function useDealType() {
  const [dealTypeList, setDealTypeList] = useState<DealTypeItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDealTypes = useCallback(async (currentPage?: number, currentLimit?: number, search?: string): Promise<DealTypeResponse | null> => {
    setIsLoading(true);
    setError('');
    try {
      const response = await dealTypeService.getAllDealTypes({ pageNumber: currentPage, limit: currentLimit, search });
      if (response.status) {
        const apiData = response.data && typeof response.data === 'object' && 'items' in response.data
          ? response.data as { items: DealTypeItem[]; pagination?: PaginationMeta & { total_pages: number } }
          : null;
        const items = apiData?.items ?? (Array.isArray(response.data) ? response.data : []);
        const rawItems = Array.isArray(items) ? items : [];
        const mappedData = rawItems.map((item: DealTypeItem) => ({
          ...item,
          name: (item as { dealType?: string }).dealType || item.name || '',
        }));
        setDealTypeList(mappedData);
        return { ...response, data: mappedData };
      } else {
        setError(response.message || 'Failed to fetch deal types');
      }
      return response;
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to fetch deal types');
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

  const handleAddDealType = useCallback(async (values: DealTypeFormData): Promise<DealTypeResponse | null> => {
    try {
      const response = await dealTypeService.createDealType(values);
      if (!response.status) {
        setError(response.message || 'Failed to add deal type');
      }
      return response;
    } catch {
      setError('Network error. Please try again.');
      return null;
    }
  }, []);

  const handleUpdateDealType = useCallback(async (id: number, values: DealTypeFormData): Promise<DealTypeResponse | null> => {
    try {
      const response = await dealTypeService.updateDealType(id, values);
      if (!response.status) {
        setError(response.message || 'Failed to update deal type');
      }
      return response;
    } catch {
      setError('Network error. Please try again.');
      return null;
    }
  }, []);

  const handleDeleteDealType = useCallback(async (id: number): Promise<Pick<DealTypeResponse, 'status' | 'message'> | null> => {
    try {
      const response = await dealTypeService.deleteDealType(id);
      if (!response.status) {
        setError(response.message || 'Failed to delete deal type');
      }
      return response;
    } catch {
      setError('Network error. Please try again.');
      return null;
    }
  }, []);

  return { dealTypeList, setDealTypeList, isLoading, error, setError, fetchDealTypes, handleAddDealType, handleUpdateDealType, handleDeleteDealType };
}
