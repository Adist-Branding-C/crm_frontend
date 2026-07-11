import { useState, useEffect, useCallback, useRef } from 'react';
export function useTaskSettingsSearch(externalSearchQuery, onSearchChange) {
    const [searchValue, setSearchValue] = useState(externalSearchQuery);
    const debounceRef = useRef(undefined);
    useEffect(() => {
        if (searchValue !== externalSearchQuery) {
            setSearchValue(externalSearchQuery);
        }
    }, [externalSearchQuery]); // eslint-disable-line react-hooks/exhaustive-deps
    const handleSearchInput = useCallback((value) => {
        setSearchValue(value);
        if (debounceRef.current)
            clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            onSearchChange(value);
        }, 2000);
    }, [onSearchChange]);
    useEffect(() => {
        return () => {
            if (debounceRef.current)
                clearTimeout(debounceRef.current);
        };
    }, []);
    return { searchValue, handleSearchInput };
}
//# sourceMappingURL=useTaskSettingsSearch.js.map