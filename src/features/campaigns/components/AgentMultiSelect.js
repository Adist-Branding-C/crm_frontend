import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Search, X, ChevronDown, Check, Loader2 } from 'lucide-react';
const AVATAR_COLORS = ['#f1414f', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];
function getInitials(name) {
    return name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}
function getAvatarColor(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}
const AgentMultiSelect = ({ agents, selected, onChange, isLoading, error }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const containerRef = useRef(null);
    const searchInputRef = useRef(null);
    const optionsRef = useRef(null);
    const filtered = useMemo(() => {
        if (!search.trim())
            return agents;
        const q = search.toLowerCase();
        return agents.filter((a) => a.name.toLowerCase().includes(q) ||
            a.id.toLowerCase().includes(q) ||
            (a.designation && a.designation.toLowerCase().includes(q)) ||
            (a.email && a.email.toLowerCase().includes(q)));
    }, [agents, search]);
    useEffect(() => {
        setHighlightedIndex(-1);
    }, [search]);
    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => searchInputRef.current?.focus());
        }
    }, [isOpen]);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
                setSearch('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    useEffect(() => {
        if (highlightedIndex >= 0 && optionsRef.current) {
            const items = optionsRef.current.querySelectorAll('.multi-select-option');
            if (items[highlightedIndex]) {
                items[highlightedIndex].scrollIntoView({ block: 'nearest' });
            }
        }
    }, [highlightedIndex]);
    const toggleAgent = useCallback((agentId) => {
        onChange(selected.includes(agentId)
            ? selected.filter((id) => id !== agentId)
            : [...selected, agentId]);
    }, [selected, onChange]);
    const removeAgent = useCallback((agentId) => {
        onChange(selected.filter((id) => id !== agentId));
    }, [selected, onChange]);
    const selectedAgents = useMemo(() => agents.filter((a) => selected.includes(a.id)), [agents, selected]);
    const handleKeyDown = useCallback((e) => {
        if (!isOpen)
            return;
        switch (e.key) {
            case 'Escape':
                e.preventDefault();
                setIsOpen(false);
                setSearch('');
                break;
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0 && highlightedIndex < filtered.length) {
                    toggleAgent(filtered[highlightedIndex].id);
                }
                break;
        }
    }, [isOpen, filtered, highlightedIndex, toggleAgent]);
    const toggleOpen = () => {
        setIsOpen((prev) => !prev);
        if (isOpen)
            setSearch('');
    };
    return (_jsxs("div", { ref: containerRef, className: `multi-select-container${error ? ' input-error' : ''}`, onKeyDown: handleKeyDown, children: [_jsxs("div", { className: `multi-select-trigger${isOpen ? ' multi-select-trigger--open' : ''}`, onClick: toggleOpen, tabIndex: 0, role: "combobox", "aria-expanded": isOpen, "aria-haspopup": "listbox", children: [_jsx("div", { className: "multi-select-trigger-inner", children: selectedAgents.length === 0 ? (_jsx("span", { className: "multi-select-placeholder", children: "Select agents..." })) : (_jsx("div", { className: "multi-select-tags", children: selectedAgents.map((agent) => (_jsxs("span", { className: "multi-select-tag", children: [_jsx("span", { className: "multi-select-tag-avatar", style: { backgroundColor: getAvatarColor(agent.name) }, children: getInitials(agent.name) }), _jsx("span", { className: "multi-select-tag-label", children: agent.name }), _jsx(X, { size: 14, className: "multi-select-tag-remove", onClick: (e) => {
                                            e.stopPropagation();
                                            removeAgent(agent.id);
                                        } })] }, agent.id))) })) }), _jsx(ChevronDown, { size: 16, className: `multi-select-chevron${isOpen ? ' multi-select-chevron--open' : ''}` })] }), isOpen && (_jsxs("div", { className: "multi-select-dropdown", children: [_jsxs("div", { className: "multi-select-search", children: [_jsx(Search, { size: 16, className: "multi-select-search-icon" }), _jsx("input", { ref: searchInputRef, type: "text", placeholder: "Search by name, ID, or phone...", value: search, onChange: (e) => setSearch(e.target.value), className: "multi-select-search-input" })] }), _jsx("div", { className: "multi-select-options", ref: optionsRef, role: "listbox", children: isLoading ? (_jsxs("div", { className: "multi-select-empty", children: [_jsx(Loader2, { size: 20, className: "spin" }), _jsx("span", { children: "Loading agents..." })] })) : agents.length === 0 ? (_jsx("div", { className: "multi-select-empty", children: "No agents available" })) : filtered.length === 0 ? (_jsx("div", { className: "multi-select-empty", children: "No agents found" })) : (filtered.map((agent, index) => {
                            const isItemSelected = selected.includes(agent.id);
                            const isHighlighted = index === highlightedIndex;
                            return (_jsxs("div", { className: `multi-select-option${isItemSelected ? ' multi-select-option--selected' : ''}${isHighlighted ? ' multi-select-option--highlighted' : ''}`, onClick: () => toggleAgent(agent.id), onMouseEnter: () => setHighlightedIndex(index), role: "option", "aria-selected": isItemSelected, children: [_jsx("div", { className: "multi-select-option-avatar", style: { backgroundColor: getAvatarColor(agent.name) }, children: getInitials(agent.name) }), _jsxs("div", { className: "multi-select-option-info", children: [_jsx("div", { className: "multi-select-option-name", children: agent.name }), _jsxs("div", { className: "multi-select-option-meta", children: [agent.id && _jsxs("span", { className: "multi-select-option-id", children: ["ID: ", agent.id] }), agent.designation && _jsx("span", { className: "multi-select-option-phone", children: agent.designation })] }), agent.email && _jsx("div", { className: "multi-select-option-email", children: agent.email })] }), _jsx("div", { className: "multi-select-option-check", children: isItemSelected && _jsx(Check, { size: 16 }) })] }, agent.id));
                        })) })] }))] }));
};
export default AgentMultiSelect;
//# sourceMappingURL=AgentMultiSelect.js.map