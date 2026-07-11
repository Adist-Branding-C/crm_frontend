import { useState, useCallback } from 'react';
import { dealStatusService } from '../services/dealStatus.service';
export function useDealStatus() {
    const [dealStatusList, setDealStatusList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const fetchDealStatuses = useCallback(async (currentPage, currentLimit, search) => {
        setIsLoading(true);
        setError('');
        try {
            const response = await dealStatusService.getAllDealStatuses({ pageNumber: currentPage, limit: currentLimit, search });
            if (response.status) {
                const apiData = response.data && typeof response.data === 'object' && 'items' in response.data
                    ? response.data
                    : null;
                const items = apiData?.items ?? (Array.isArray(response.data) ? response.data : []);
                const rawItems = Array.isArray(items) ? items : [];
                const mappedData = rawItems.map((item) => ({
                    ...item,
                    name: item.dealStage || item.name || '',
                }));
                setDealStatusList(mappedData);
                return { ...response, data: mappedData };
            }
            else {
                setError(response.message || 'Failed to fetch deal statuses');
            }
            return response;
        }
        catch (err) {
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosErr = err;
                setError(axiosErr.response?.data?.message || 'Failed to fetch deal statuses');
            }
            else if (err && typeof err === 'object' && 'message' in err) {
                setError(err.message);
            }
            else {
                setError('Network error. Please try again.');
            }
            return null;
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    const handleAddDealStatus = useCallback(async (values) => {
        try {
            const response = await dealStatusService.createDealStatus(values);
            if (!response.status) {
                setError(response.message || 'Failed to add deal status');
            }
            return response;
        }
        catch {
            setError('Network error. Please try again.');
            return null;
        }
    }, []);
    const handleUpdateDealStatus = useCallback(async (id, values) => {
        try {
            const response = await dealStatusService.updateDealStatus(id, values);
            if (!response.status) {
                setError(response.message || 'Failed to update deal status');
            }
            return response;
        }
        catch {
            setError('Network error. Please try again.');
            return null;
        }
    }, []);
    const handleDeleteDealStatus = useCallback(async (id) => {
        try {
            const response = await dealStatusService.deleteDealStatus(id);
            if (!response.status) {
                setError(response.message || 'Failed to delete deal status');
            }
            return response;
        }
        catch {
            setError('Network error. Please try again.');
            return null;
        }
    }, []);
    return { dealStatusList, setDealStatusList, isLoading, error, setError, fetchDealStatuses, handleAddDealStatus, handleUpdateDealStatus, handleDeleteDealStatus };
}
//# sourceMappingURL=useDealStatus.js.map