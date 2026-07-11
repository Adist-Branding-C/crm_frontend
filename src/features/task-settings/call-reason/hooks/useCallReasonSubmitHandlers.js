import { useCallback } from 'react';
import { useCreateCallReason } from './useCreateCallReason';
import { useUpdateCallReason } from './useUpdateCallReason';
import { useDeleteCallReason } from './useDeleteCallReason';
import { useDrawerScroll } from '../../hooks/useDrawerScroll';
import { parseApiError } from '../utils/parseApiError';
import { applyFieldErrors } from '../utils/applyFieldErrors';
export function useCallReasonSubmitHandlers(config, fetch, toast) {
    const create = useCreateCallReason();
    const update = useUpdateCallReason();
    const removal = useDeleteCallReason();
    const { scrollAndFocusError, scrollToTop } = useDrawerScroll();
    const handleAddSubmit = useCallback(async (values, { setSubmitting, resetForm, setFieldError }) => {
        fetch.setError('');
        fetch.setIsLoading(true);
        try {
            const { name, status } = values;
            const response = await create.create({ name: name.trim(), status });
            if (!response) {
                fetch.setError('Network error. Please try again.');
                return false;
            }
            if (response.status) {
                fetch.setPageNumber(1);
                fetch.setSearchQuery('');
                fetch.refresh();
                resetForm();
                toast.showToastMessage('Call reason added successfully', 'success');
                config.onAddSuccess();
                return true;
            }
            const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
            if (errorField) {
                scrollAndFocusError();
            }
            else {
                fetch.setError(response.message || 'Failed to add call reason');
                scrollToTop();
            }
            return false;
        }
        catch (err) {
            const parsed = parseApiError(err);
            if (parsed.errors || (parsed.field && parsed.message)) {
                const errorField = applyFieldErrors(parsed.errors, parsed.message, parsed.field, setFieldError);
                if (errorField)
                    scrollAndFocusError();
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
    }, [create, fetch, config, toast, scrollAndFocusError, scrollToTop]);
    const handleEditSubmit = useCallback(async (values, { setSubmitting, setFieldError }) => {
        if (!config.editingItem)
            return;
        const item = config.editingItem;
        const original = {
            name: item.name || '',
            status: item.status || 'Active',
        };
        if (JSON.stringify(values) === JSON.stringify(original)) {
            setSubmitting(false);
            return;
        }
        fetch.setError('');
        fetch.setIsLoading(true);
        try {
            const { name, status } = values;
            const response = await update.update(config.editingItem.id, { name: name.trim(), status });
            if (!response) {
                fetch.setError('Network error. Please try again.');
                return false;
            }
            if (response.status) {
                fetch.refresh();
                toast.showToastMessage('Call reason updated successfully', 'success');
                config.onEditSuccess();
                return true;
            }
            const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
            if (errorField) {
                scrollAndFocusError();
            }
            else {
                fetch.setError(response.message || 'Failed to update call reason');
                scrollToTop();
            }
            return false;
        }
        catch (err) {
            const parsed = parseApiError(err);
            if (parsed.errors || (parsed.field && parsed.message)) {
                const errorField = applyFieldErrors(parsed.errors, parsed.message, parsed.field, setFieldError);
                if (errorField)
                    scrollAndFocusError();
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
    }, [update, fetch, config, toast, scrollAndFocusError, scrollToTop]);
    const handleConfirmDelete = useCallback(async () => {
        if (!config.deletingItem)
            return;
        fetch.setError('');
        try {
            const response = await removal.remove(config.deletingItem.id);
            if (response?.status) {
                fetch.refresh();
                config.onDeleteSuccess();
            }
            else {
                fetch.setError(response?.message || 'Failed to delete call reason');
            }
        }
        catch (err) {
            const parsed = parseApiError(err);
            fetch.setError(parsed.message);
        }
    }, [removal, fetch, config]);
    return { handleAddSubmit, handleEditSubmit, handleConfirmDelete };
}
//# sourceMappingURL=useCallReasonSubmitHandlers.js.map