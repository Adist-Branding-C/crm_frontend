import { useState, useCallback, useRef, useEffect } from 'react';
/**
 * Generic toggle-panel dropdown state: open/close with a brief closing
 * animation window, auto-close on outside click or Escape.
 *
 * Used by:
 * - LeadSortDropdown, LeadActionsDropdown (each owns its own instance, so
 *   opening one naturally closes the other via outside-click - no shared
 *   coordinator needed)
 */
export function useDropdownState() {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const ref = useRef(null);
    const isOpenRef = useRef(false);
    useEffect(() => {
        isOpenRef.current = isOpen;
    }, [isOpen]);
    const close = useCallback(() => {
        if (!isOpenRef.current)
            return;
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
        }, 150);
    }, []);
    const toggle = useCallback(() => {
        if (isOpenRef.current) {
            close();
        }
        else {
            setIsOpen(true);
        }
    }, [close]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                close();
            }
        };
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                close();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [close]);
    return { isOpen, isClosing, ref, close, toggle, setIsOpen };
}
//# sourceMappingURL=useDropdownState.js.map