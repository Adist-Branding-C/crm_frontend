import { useState, useEffect, useCallback } from 'react';
export function useDealAdditionalFieldDropdown() {
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [dropdownDirection, setDropdownDirection] = useState('down');
    useEffect(() => {
        if (!dropdownOpen)
            return;
        const handleClickOutside = (e) => {
            const target = e.target;
            if (!target.closest('.dropdown-menu') && !target.closest('.dropdown-toggle')) {
                setDropdownOpen(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [dropdownOpen]);
    const toggleDropdown = useCallback((key) => {
        setDropdownOpen(prev => prev === key ? null : key);
    }, []);
    const closeDropdown = useCallback(() => {
        setDropdownOpen(null);
    }, []);
    return { dropdownOpen, setDropdownOpen, dropdownDirection, setDropdownDirection, toggleDropdown, closeDropdown };
}
//# sourceMappingURL=useDealAdditionalFieldDropdown.js.map