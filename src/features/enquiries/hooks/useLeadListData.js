import { useState, useCallback, useRef } from 'react';
import { leadDataService } from '../services/leadDataService';
import { mapApiToUI } from '../utils/leadMapper';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants/messages';
export function useLeadListData(onShowToast) {
    const [leads, setLeads] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const requestSeqRef = useRef(0);
    const currentFetchParams = useRef({ page: 1, limit: 10, search: '', extraParams: {} });
    const fetchLeads = useCallback(async (page, limit, search, extraParams = {}) => {
        const requestSeq = ++requestSeqRef.current;
        currentFetchParams.current = { page, limit, search, extraParams };
        setIsLoading(true);
        try {
            const params = { pageNumber: page, limit, sort_by: 'createdAt', sort_order: 'DESC', ...extraParams };
            if (search)
                params.search = search;
            const response = await leadDataService.getLeads(params);
            if (requestSeq !== requestSeqRef.current)
                return;
            if (response.status && response.data) {
                setLeads(response.data.items.map(mapApiToUI));
                setTotal(response.data.pagination?.total ?? 0);
                setTotalPages(response.data.pagination?.totalPages ?? 1);
            }
            else {
                setLeads([]);
                setTotal(0);
                setTotalPages(1);
            }
        }
        catch {
            if (requestSeq !== requestSeqRef.current)
                return;
            setLeads([]);
            setTotal(0);
            setTotalPages(1);
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    const refreshCurrentPage = useCallback(() => {
        const { page, limit, search, extraParams } = currentFetchParams.current;
        fetchLeads(page, limit, search, extraParams);
    }, [fetchLeads]);
    const deleteLead = useCallback(async (leadId) => {
        try {
            await leadDataService.deleteLead(leadId);
            onShowToast(SUCCESS_MESSAGES.LEAD_DELETED, 'success');
            refreshCurrentPage();
            return true;
        }
        catch {
            onShowToast(ERROR_MESSAGES.DELETE_LEAD, 'error');
            return false;
        }
    }, [onShowToast, refreshCurrentPage]);
    const handleLeadSaved = useCallback((action) => {
        refreshCurrentPage();
        onShowToast(action === 'created' ? SUCCESS_MESSAGES.LEAD_CREATED : SUCCESS_MESSAGES.LEAD_UPDATED, 'success');
    }, [refreshCurrentPage, onShowToast]);
    return {
        leads,
        total,
        totalPages,
        isLoading,
        fetchLeads,
        refreshCurrentPage,
        deleteLead,
        handleLeadSaved,
    };
}
//# sourceMappingURL=useLeadListData.js.map