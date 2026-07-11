import { useState, useCallback, useEffect } from 'react';
import { dealService } from '../../deal/services/deal.service';
import { ERROR_MESSAGES } from '../constants/messages';
/**
 * Deals-tab data: fetches deals for a lead and filters to the ones linked to it,
 * plus create. Mirrors useLeadActivities/useLeadRemarks/useLeadTasks so the
 * lead-detail content component never owns fetch/mutation state itself.
 */
export function useLeadDeals(leadId, isOpen) {
    const [deals, setDeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const fetchDeals = useCallback(async () => {
        if (!leadId)
            return;
        setIsLoading(true);
        setError('');
        try {
            const res = await dealService.getAllDeals({ pageNumber: 1, limit: 100 });
            if (res.status) {
                const data = res.data;
                const items = data?.items ?? [];
                setDeals(items.filter((d) => String(d.leadId) === String(leadId)));
            }
            else {
                setError(res.message || ERROR_MESSAGES.FETCH_DEALS);
            }
        }
        catch {
            setError(ERROR_MESSAGES.FETCH_DEALS);
            setDeals([]);
        }
        finally {
            setIsLoading(false);
        }
    }, [leadId]);
    useEffect(() => {
        if (!isOpen || !leadId)
            return;
        fetchDeals();
    }, [isOpen, leadId, fetchDeals]);
    const addDeal = useCallback(async (formData) => {
        setIsAdding(true);
        try {
            // AddDealDrawer supplies the shared drawers.ts DealFormData shape, but
            // dealService.createDeal expects the deal feature's own (larger)
            // DealFormData - the two have drifted apart; this cast preserves the
            // pre-existing (previously `any`-masked) behavior rather than fixing
            // that unrelated duplication in this pass.
            const res = await dealService.createDeal(formData);
            if (res.status) {
                await fetchDeals();
                return true;
            }
            setError(res.message || ERROR_MESSAGES.CREATE_DEAL);
            return false;
        }
        catch {
            setError(ERROR_MESSAGES.CREATE_DEAL);
            return false;
        }
        finally {
            setIsAdding(false);
        }
    }, [fetchDeals]);
    return { deals, isLoading, error, isAdding, addDeal };
}
//# sourceMappingURL=useLeadDeals.js.map