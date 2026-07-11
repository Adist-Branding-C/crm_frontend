import { useState, useEffect, useCallback, useRef } from 'react';
import { remarkService } from '../services/remarkService';
import { ERROR_MESSAGES } from '../constants/messages';
export function useLeadRemarks(leadId, isOpen, activeTab) {
    const [remarks, setRemarks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [isAdding, setIsAdding] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const fetchedRef = useRef(false);
    useEffect(() => {
        if (!isOpen || !leadId || activeTab !== 'note')
            return;
        if (fetchedRef.current && refreshKey === 0)
            return;
        let cancelled = false;
        const fetch = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await remarkService.getRemarks({
                    referenceId: String(leadId),
                    entityType: 'LEAD',
                });
                if (!cancelled) {
                    setRemarks(response?.data?.items ?? []);
                    fetchedRef.current = true;
                }
            }
            catch {
                if (!cancelled)
                    setError(ERROR_MESSAGES.FETCH_REMARKS);
            }
            finally {
                if (!cancelled)
                    setIsLoading(false);
            }
        };
        fetch();
        return () => {
            cancelled = true;
        };
    }, [leadId, isOpen, activeTab, refreshKey]);
    useEffect(() => {
        fetchedRef.current = false;
    }, [leadId]);
    const refreshRemarks = useCallback(() => {
        fetchedRef.current = false;
        setRefreshKey((k) => k + 1);
    }, []);
    const addRemark = useCallback(async (remarkText) => {
        setIsAdding(true);
        try {
            await remarkService.createRemark({
                referenceId: String(leadId),
                entityType: 'LEAD',
                remark: remarkText,
            });
            refreshRemarks();
        }
        finally {
            setIsAdding(false);
        }
    }, [leadId, refreshRemarks]);
    const updateRemark = useCallback(async (id, remarkText) => {
        setIsUpdating(true);
        try {
            await remarkService.updateRemark(id, { remark: remarkText });
            refreshRemarks();
        }
        finally {
            setIsUpdating(false);
        }
    }, [refreshRemarks]);
    const deleteRemark = useCallback(async (id) => {
        setIsDeleting(true);
        try {
            await remarkService.deleteRemark(id);
            refreshRemarks();
        }
        finally {
            setIsDeleting(false);
        }
    }, [refreshRemarks]);
    return {
        remarks,
        isLoading,
        error,
        isAdding,
        isUpdating,
        isDeleting,
        addRemark,
        updateRemark,
        deleteRemark,
        refreshRemarks,
    };
}
//# sourceMappingURL=useLeadRemarks.js.map