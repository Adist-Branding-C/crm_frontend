import { useState, useCallback, useEffect } from 'react';
import type { FormikHelpers } from 'formik';
import { dealService } from '../services/deal.service';
import { addDealValidationSchema, editDealValidationSchema } from '../validations/deal.validation';
import { ADD_DEAL_INITIAL_VALUES } from '../constants/deal.constants';
import type { DealItem, DealFormData } from '../types';
import type { GetDealsParams } from '../types/request';

export function useDeal() {
  const [dealList, setDealList] = useState<DealItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setPageNumber(1);
  }, []);

  const handleSortChange = useCallback((field: string, direction: string) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder(direction);
    }
    setPageNumber(1);
  }, [sortBy]);

  const fetchDeals = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const params: GetDealsParams = { pageNumber, limit };
      if (searchQuery) params.search = searchQuery;
      if (sortBy) params.sortBy = sortBy;
      if (sortOrder) params.sortOrder = sortOrder;
      const response = await dealService.getAllDeals(params);

      if (response.status) {
        const data = response.data as { items?: DealItem[]; pagination?: { total: number; total_pages: number; has_next: boolean; has_previous: boolean; page: number } } | undefined;
        const pagination = data?.pagination;
        const items = data?.items ?? (Array.isArray(response.data) ? response.data : []);
        setDealList((Array.isArray(items) ? items : []).map((item: any) => ({
          ...item,
          dealId: item.dealId ?? String(item.id),
        })));
        setTotalCount(pagination?.total ?? 0);
        setTotalPages(pagination?.total_pages ?? 1);
        setHasNext(pagination?.has_next ?? false);
        setHasPrevious(pagination?.has_previous ?? false);
      } else {
        setError(response.message || 'Failed to fetch deals');
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to fetch deals');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [pageNumber, limit, searchQuery, sortBy, sortOrder]);

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  const handleAddDeal = useCallback(async (
    values: DealFormData,
    { setSubmitting, resetForm }: FormikHelpers<DealFormData>,
  ) => {
    setError('');
    setIsLoading(true);

    try {
      const response = await dealService.createDeal(values);

      if (response.status) {
        const data = response.data as { id?: number; dealId?: string } | undefined;
        const newItemId = data?.id;
        if (newItemId) {
          setDealList(prev => [...prev, { id: newItemId, ...values } as unknown as DealItem]);
        } else {
          fetchDeals();
        }
        resetForm();
        return true;
      } else {
        setError(response.message || 'Failed to add deal');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to add deal');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  }, [fetchDeals]);

  const handleUpdateDeal = useCallback(async (
    dealId: string,
    values: DealFormData,
    { setSubmitting }: FormikHelpers<DealFormData>,
  ) => {
    setError('');
    setIsLoading(true);

    try {
      const response = await dealService.updateDeal(dealId, values);

      if (response.status) {
        setDealList(prev => prev.map(item =>
          item.dealId === dealId ? { ...item, ...values } as unknown as DealItem : item
        ));
        return true;
      } else {
        setError(response.message || 'Failed to update deal');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to update deal');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  }, []);

  const handleDeleteDeal = useCallback(async (dealId: string) => {
    setError('');

    try {
      const response = await dealService.deleteDeal(dealId);

      if (response.status) {
        setDealList(prev => prev.filter(item => item.dealId !== dealId));
        return true;
      } else {
        setError(response.message || 'Failed to delete deal');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to delete deal');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    }
  }, []);

  return {
    dealList,
    isLoading,
    error,
    totalCount,
    totalPages,
    hasNext,
    hasPrevious,
    pageNumber,
    setPageNumber,
    limit,
    setLimit,
    searchQuery,
    handleSearchChange,
    sortBy,
    sortOrder,
    handleSortChange,
    fetchDeals,
    handleAddDeal,
    handleUpdateDeal,
    handleDeleteDeal,
    validationSchema: addDealValidationSchema,
    editValidationSchema: editDealValidationSchema,
    initialValues: ADD_DEAL_INITIAL_VALUES,
  };
}
