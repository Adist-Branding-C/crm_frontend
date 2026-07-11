import { useState, useCallback } from 'react';
import { dealTypeService } from '../services/dealType.service';
export function useDealType() {
    const [dealTypeList, setDealTypeList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const fetchDealTypes = useCallback(async (currentPage, currentLimit, search) => {
        setIsLoading(true);
        setError('');
        try {
            const response = await dealTypeService.getAllDealTypes({ pageNumber: currentPage, limit: currentLimit, search });
            if (response.status) {
                const apiData = response.data && typeof response.data === 'object' && 'items' in response.data
                    ? response.data
                    : null;
                const items = apiData?.items ?? (Array.isArray(response.data) ? response.data : []);
                const rawItems = Array.isArray(items) ? items : [];
                const mappedData = rawItems.map((item) => ({
                    ...item,
                    name: item.dealType || item.name || '',
                }));
                setDealTypeList(mappedData);
                return { ...response, data: mappedData };
            }
            else {
                setError(response.message || 'Failed to fetch deal types');
            }
            return response;
        }
        catch (err) {
            if (err && typeof err === 'object' && 'response' in err) {
                const axiosErr = err;
                setError(axiosErr.response?.data?.message || 'Failed to fetch deal types');
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
    const handleAddDealType = useCallback(async (values) => {
        try {
            const response = await dealTypeService.createDealType(values);
            if (!response.status) {
                setError(response.message || 'Failed to add deal type');
            }
            return response;
        }
        catch {
            setError('Network error. Please try again.');
            return null;
        }
    }, []);
    const handleUpdateDealType = useCallback(async (id, values) => {
        try {
            const response = await dealTypeService.updateDealType(id, values);
            if (!response.status) {
                setError(response.message || 'Failed to update deal type');
            }
            return response;
        }
        catch {
            setError('Network error. Please try again.');
            return null;
        }
    }, []);
    const handleDeleteDealType = useCallback(async (id) => {
        try {
            const response = await dealTypeService.deleteDealType(id);
            if (!response.status) {
                setError(response.message || 'Failed to delete deal type');
            }
            return response;
        }
        catch {
            setError('Network error. Please try again.');
            return null;
        }
    }, []);
    return { dealTypeList, setDealTypeList, isLoading, error, setError, fetchDealTypes, handleAddDealType, handleUpdateDealType, handleDeleteDealType };
}
//# sourceMappingURL=useDealType.js.map