import { useState, useCallback, useEffect, useMemo } from 'react';
import { mailConfigService } from '../services/mailConfig.service';
import { mapMailConfigToFormData } from '../utils/mapMailConfigToFormData';
import { INITIAL_MAIL_FORM } from '../constants';
function getErrorMessage(err, fallback) {
    if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err;
        return axiosErr.response?.data?.message || fallback;
    }
    if (err && typeof err === 'object' && 'message' in err) {
        return err.message;
    }
    return fallback;
}
export const useMailConfigData = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [deletingItem, setDeletingItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const [showToast, setShowToast] = useState(false);
    const showToastMessage = useCallback((message, type) => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3500);
    }, []);
    const fetchMailConfigs = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await mailConfigService.getAll({ search: searchQuery });
            if (response.status) {
                setData(response.data.items || []);
            }
            else {
                showToastMessage(response.message || 'Failed to load mail configurations', 'error');
            }
        }
        catch (err) {
            showToastMessage(getErrorMessage(err, 'Failed to load mail configurations'), 'error');
        }
        finally {
            setIsLoading(false);
        }
    }, [searchQuery, showToastMessage]);
    useEffect(() => {
        fetchMailConfigs();
    }, [fetchMailConfigs]);
    const filteredData = data.filter(item => item.driver.toLowerCase().includes(searchQuery.toLowerCase()));
    const drawerInitialValues = useMemo(() => (editingItem ? mapMailConfigToFormData(editingItem) : INITIAL_MAIL_FORM), [editingItem]);
    const handleAddClick = () => {
        setEditingItem(null);
        setShowForm(true);
    };
    const handleEditClick = (item) => {
        setEditingItem(item);
        setShowForm(true);
        setDropdownOpen(null);
    };
    const handleDeleteClick = (item) => {
        setDeletingItem(item);
        setDropdownOpen(null);
    };
    const handleConfirmDelete = async () => {
        if (!deletingItem)
            return;
        try {
            const response = await mailConfigService.deleteMailConfig(deletingItem.id);
            if (response.status) {
                showToastMessage(response.message || 'Mail configuration deleted successfully', 'success');
                await fetchMailConfigs();
            }
            else {
                showToastMessage(response.message || 'Failed to delete mail configuration', 'error');
            }
        }
        catch (err) {
            showToastMessage(getErrorMessage(err, 'Failed to delete mail configuration'), 'error');
        }
        finally {
            setDeletingItem(null);
        }
    };
    const handleCloseForm = () => {
        setShowForm(false);
        setEditingItem(null);
    };
    const handleSubmit = async (values, helpers) => {
        try {
            const response = editingItem
                ? await mailConfigService.updateMailConfig(editingItem.id, values)
                : await mailConfigService.createMailConfig(values);
            if (response.status) {
                showToastMessage(response.message || `Mail configuration ${editingItem ? 'updated' : 'saved'} successfully`, 'success');
                handleCloseForm();
                await fetchMailConfigs();
            }
            else {
                showToastMessage(response.message || 'Failed to save mail configuration', 'error');
            }
        }
        catch (err) {
            showToastMessage(getErrorMessage(err, 'Failed to save mail configuration'), 'error');
        }
        finally {
            helpers.setSubmitting(false);
        }
    };
    return {
        isLoading,
        showForm,
        editingItem,
        deletingItem,
        setDeletingItem,
        drawerInitialValues,
        searchQuery,
        setSearchQuery,
        rowsPerPage,
        setRowsPerPage,
        dropdownOpen,
        setDropdownOpen,
        filteredData,
        toastMessage,
        toastType,
        showToast,
        setShowToast,
        handleAddClick,
        handleEditClick,
        handleDeleteClick,
        handleConfirmDelete,
        handleCloseForm,
        handleSubmit,
    };
};
//# sourceMappingURL=useMailConfigData.js.map