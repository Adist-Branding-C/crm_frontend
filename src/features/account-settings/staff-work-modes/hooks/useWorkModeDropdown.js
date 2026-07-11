import { useState, useCallback } from 'react';
export function useWorkModeDropdown() {
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const toggleDropdown = useCallback((id) => {
        setDropdownOpen(id);
    }, []);
    const closeDropdown = useCallback(() => {
        setDropdownOpen(null);
    }, []);
    return {
        dropdownOpen,
        toggleDropdown,
        closeDropdown,
    };
}
//# sourceMappingURL=useWorkModeDropdown.js.map