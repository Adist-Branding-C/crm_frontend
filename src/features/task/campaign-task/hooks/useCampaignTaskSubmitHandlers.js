import { useCallback } from 'react';
import { useCreateCampaignTask } from './useCreateCampaignTask';
import { useUpdateCampaignTask } from './useUpdateCampaignTask';
import { useDeleteCampaignTask } from './useDeleteCampaignTask';
import { useDrawerScroll } from '../../hooks/useDrawerScroll';
import { applyFieldErrors } from '../../shared/utils/applyFieldErrors';
export function useCampaignTaskSubmitHandlers(config, fetch, toast) {
    const create = useCreateCampaignTask();
    const update = useUpdateCampaignTask();
    const removal = useDeleteCampaignTask();
    const { scrollAndFocusError, scrollToTop } = useDrawerScroll();
    const handleAddSubmit = useCallback(async (values, { setFieldError, setSubmitting }) => {
        fetch.setError('');
        fetch.setIsLoading(true);
        try {
            const response = await create.create(values);
            if (!response) {
                fetch.setError('Network error. Please try again.');
                return false;
            }
            if (response.status) {
                fetch.refresh();
                toast.showToastMessage('Campaign task added successfully', 'success');
                scrollToTop();
                config.onAddSuccess();
                return true;
            }
            const msg = response.message || 'Failed to add campaign task';
            const mappedField = applyFieldErrors(response.errors, response.field ? (response.errors?.[response.field]?.[0] || msg) : msg, response.field, setFieldError);
            if (!mappedField) {
                fetch.setError(msg);
            }
            scrollAndFocusError();
            return false;
        }
        catch (err) {
            const axiosErr = err;
            const msg = axiosErr.response?.data?.message || 'Failed to add campaign task';
            const mappedField = applyFieldErrors(axiosErr.response?.data?.errors, msg, axiosErr.response?.data?.field, setFieldError);
            if (!mappedField) {
                fetch.setError(msg);
            }
            scrollAndFocusError();
            return false;
        }
        finally {
            fetch.setIsLoading(false);
            setSubmitting(false);
        }
    }, [create, fetch, config, toast, scrollAndFocusError, scrollToTop]);
    const handleEditSubmit = useCallback(async (values, { setFieldError, setSubmitting }) => {
        if (!config.editingItem)
            return;
        const item = config.editingItem;
        const original = {
            title: item.title || '',
            description: item.description || '',
            scheduledDate: item.scheduledDate || '',
            scheduledTime: item.scheduledTime || '',
            assignedTo: item.assignedTo || '',
            leadId: item.leadId || '',
            priority: item.priority || '',
            status: item.status || '',
        };
        if (JSON.stringify(values) === JSON.stringify(original)) {
            setSubmitting(false);
            return;
        }
        fetch.setError('');
        fetch.setIsLoading(true);
        try {
            const response = await update.update(config.editingItem.id, values);
            if (!response) {
                fetch.setError('Network error. Please try again.');
                return false;
            }
            if (response.status) {
                fetch.refresh();
                toast.showToastMessage('Campaign task updated successfully', 'success');
                scrollToTop();
                config.onEditSuccess();
                return true;
            }
            const msg = response.message || 'Failed to update campaign task';
            const mappedField = applyFieldErrors(response.errors, response.field ? (response.errors?.[response.field]?.[0] || msg) : msg, response.field, setFieldError);
            if (!mappedField) {
                fetch.setError(msg);
            }
            scrollAndFocusError();
            return false;
        }
        catch (err) {
            const axiosErr = err;
            const msg = axiosErr.response?.data?.message || 'Failed to update campaign task';
            const mappedField = applyFieldErrors(axiosErr.response?.data?.errors, msg, axiosErr.response?.data?.field, setFieldError);
            if (!mappedField) {
                fetch.setError(msg);
            }
            scrollAndFocusError();
            return false;
        }
        finally {
            fetch.setIsLoading(false);
            setSubmitting(false);
        }
    }, [update, fetch, config, toast, scrollAndFocusError, scrollToTop]);
    const handleConfirmDelete = useCallback(async () => {
        if (!config.deletingItem)
            return;
        try {
            const response = await removal.remove(config.deletingItem.id);
            if (response?.status) {
                fetch.refresh();
                toast.showToastMessage('Campaign task deleted successfully', 'success');
                config.onDeleteSuccess();
            }
            else {
                toast.showToastMessage(response?.message || 'Failed to delete campaign task', 'error');
            }
        }
        catch {
            toast.showToastMessage('Failed to delete campaign task', 'error');
        }
    }, [removal, fetch, config, toast]);
    return { handleAddSubmit, handleEditSubmit, handleConfirmDelete };
}
//# sourceMappingURL=useCampaignTaskSubmitHandlers.js.map