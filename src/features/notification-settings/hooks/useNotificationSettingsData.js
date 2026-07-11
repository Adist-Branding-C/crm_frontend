import { useState, useMemo, useCallback } from 'react';
import { initialData } from '../constants';
import { UserStatus } from '../../../shared/constants/enums/userStatus';
export function useNotificationSettingsData() {
    const [data, setData] = useState(initialData);
    const [searchQuery, setSearchQuery] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [showConfigModal, setShowConfigModal] = useState(false);
    const [configuringItem, setConfiguringItem] = useState(null);
    const [formData, setFormData] = useState({});
    const filteredData = useMemo(() => data.filter(item => item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase())), [data, searchQuery]);
    const isStatusActive = useCallback((status) => status.toLowerCase() === 'active', []);
    const handleConfigClick = useCallback((item) => {
        setConfiguringItem(item);
        setFormData({ ...item.config });
        setShowConfigModal(true);
        setDropdownOpen(null);
    }, []);
    const handleToggleStatus = useCallback((item) => {
        setData(prev => prev.map(d => d.id === item.id ? { ...d, status: d.status === UserStatus.ACTIVE ? UserStatus.INACTIVE : UserStatus.ACTIVE } : d));
        setDropdownOpen(null);
    }, []);
    const handleCloseModal = useCallback(() => {
        setShowConfigModal(false);
        setConfiguringItem(null);
        setFormData({});
    }, []);
    const handleSaveConfig = useCallback((e) => {
        e.preventDefault();
        setData(prev => prev.map(item => item.id === configuringItem.id ? { ...item, config: { ...formData } } : item));
        handleCloseModal();
    }, [configuringItem, formData, handleCloseModal]);
    return {
        data, setData,
        searchQuery, setSearchQuery,
        rowsPerPage, setRowsPerPage,
        dropdownOpen, setDropdownOpen,
        showConfigModal, setShowConfigModal,
        configuringItem, setConfiguringItem,
        formData, setFormData,
        filteredData, isStatusActive,
        handleConfigClick, handleToggleStatus,
        handleCloseModal, handleSaveConfig,
    };
}
//# sourceMappingURL=useNotificationSettingsData.js.map