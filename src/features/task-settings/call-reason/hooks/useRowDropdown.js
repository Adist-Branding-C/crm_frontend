import { useState, useCallback } from 'react';
export function useRowDropdown() {
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const toggleDropdown = useCallback((id) => setDropdownOpen(id), []);
    return { dropdownOpen, toggleDropdown };
}
//# sourceMappingURL=useRowDropdown.js.map