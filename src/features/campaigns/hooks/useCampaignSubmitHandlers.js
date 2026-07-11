import { useCallback } from 'react';
import { useCampaignApi } from './useCampaignApi';
import { useDrawerScroll } from '../../task-settings/hooks/useDrawerScroll';
import { parseApiError } from '../../task-settings/call-reason/utils/parseApiError';
import { applyFieldErrors } from '../../task-settings/call-reason/utils/applyFieldErrors';
import { CampaignMapper } from '../mappers/campaign.mapper';
export function useCampaignSubmitHandlers(config, fetch, toast) {
    const api = useCampaignApi();
    const { scrollAndFocusError, scrollToTop } = useDrawerScroll();
    const handleAddSubmit = useCallback(async (values, { setSubmitting, resetForm, setFieldError }) => {
        fetch.setError('');
        fetch.setIsLoading(true);
        try {
            const payload = CampaignMapper.toRequest(values);
            const response = await api.create(payload);
            if (!response) {
                fetch.setError('Network error. Please try again.');
                return false;
            }
            if (response.status) {
                fetch.setPageNumber(1);
                fetch.setSearchQuery('');
                fetch.refresh();
                resetForm();
                toast.showToastMessage('Campaign added successfully', 'success');
                config.onAddSuccess();
                return true;
            }
            const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
            if (errorField) {
                scrollAndFocusError();
            }
            else {
                fetch.setError(response.message || 'Failed to add campaign');
                scrollToTop();
            }
            return false;
        }
        catch (err) {
            const parsed = parseApiError(err);
            if (parsed.errors || (parsed.field && parsed.message)) {
                const errorField = applyFieldErrors(parsed.errors, parsed.message, parsed.field, setFieldError);
                if (errorField) {
                    scrollAndFocusError();
                }
                else {
                    fetch.setError(parsed.message);
                    scrollToTop();
                }
            }
            else {
                fetch.setError(parsed.message);
                scrollToTop();
            }
            return false;
        }
        finally {
            fetch.setIsLoading(false);
            setSubmitting(false);
        }
    }, [api, fetch, config, toast, scrollAndFocusError, scrollToTop]);
    const handleEditSubmit = useCallback(async (values, { setSubmitting, setFieldError }) => {
        if (!config.editingItem)
            return;
        fetch.setError('');
        fetch.setIsLoading(true);
        try {
            const payload = CampaignMapper.toRequest(values);
            const response = await api.update(String(config.editingItem.id), payload);
            if (!response) {
                fetch.setError('Network error. Please try again.');
                return false;
            }
            if (response.status) {
                fetch.refresh();
                toast.showToastMessage('Campaign updated successfully', 'success');
                config.onEditSuccess();
                return true;
            }
            const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
            if (errorField) {
                scrollAndFocusError();
            }
            else {
                fetch.setError(response.message || 'Failed to update campaign');
                scrollToTop();
            }
            return false;
        }
        catch (err) {
            const parsed = parseApiError(err);
            if (parsed.errors || (parsed.field && parsed.message)) {
                const errorField = applyFieldErrors(parsed.errors, parsed.message, parsed.field, setFieldError);
                if (errorField) {
                    scrollAndFocusError();
                }
                else {
                    fetch.setError(parsed.message);
                    scrollToTop();
                }
            }
            else {
                fetch.setError(parsed.message);
                scrollToTop();
            }
            return false;
        }
        finally {
            fetch.setIsLoading(false);
            setSubmitting(false);
        }
    }, [api, fetch, config, toast, scrollAndFocusError, scrollToTop]);
    const handleConfirmDelete = useCallback(async () => {
        if (!config.deletingItem)
            return;
        fetch.setError('');
        try {
            const response = await api.remove(String(config.deletingItem.id));
            if (response?.status) {
                fetch.refresh();
                config.onDeleteSuccess();
            }
            else {
                fetch.setError(response?.message || 'Failed to delete campaign');
            }
        }
        catch (err) {
            const msg = err && typeof err === 'object' && 'message' in err
                ? err.message
                : 'Failed to delete campaign';
            fetch.setError(msg);
        }
    }, [api, fetch, config]);
    return { handleAddSubmit, handleEditSubmit, handleConfirmDelete };
}
//# sourceMappingURL=useCampaignSubmitHandlers.js.map