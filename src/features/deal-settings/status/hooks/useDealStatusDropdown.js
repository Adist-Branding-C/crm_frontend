import { useState, useCallback } from 'react';
export function useDealStatusDropdown() {
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const toggleDropdown = useCallback((key) => {
        setDropdownOpen(prev => prev === key ? null : key);
    }, []);
    const closeDropdown = useCallback(() => {
        setDropdownOpen(null);
    }, []);
    return { dropdownOpen, setDropdownOpen, toggleDropdown, closeDropdown };
}
//# sourceMappingURL=useDealStatusDropdown.js.map