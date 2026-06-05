import { useState, useCallback, useRef, useEffect } from 'react';
import type { Lead } from '../types';

interface DropdownState {
  show: boolean;
  closing: boolean;
  ref: React.RefObject<HTMLDivElement | null>;
  setShow: (v: boolean) => void;
  open: () => void;
  close: () => void;
}

const DROPDOWN_ANIMATION_MS = 150;

function useDropdownState(): DropdownState {
  const [show, setShow] = useState(false);
  const [closing, setClosing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const close = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setShow(false);
      setClosing(false);
    }, DROPDOWN_ANIMATION_MS);
  }, []);

  const open = useCallback(() => setShow(true), []);

  return { show, closing, ref, setShow, open, close };
}

export interface UseEnquiriesUIResult {
  showFilters: boolean;
  setShowFilters: (v: boolean) => void;
  showSortDropdown: boolean;
  sortDropdownClosing: boolean;
  sortDropdownRef: React.RefObject<HTMLDivElement | null>;
  setShowSortDropdown: (v: boolean) => void;
  closeSortDropdown: () => void;
  showActionsDropdown: boolean;
  actionsDropdownClosing: boolean;
  actionsDropdownRef: React.RefObject<HTMLDivElement | null>;
  setShowActionsDropdown: (v: boolean) => void;
  closeActionsDropdown: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (v: boolean) => void;
  selectedLead: Lead | null;
  setSelectedLead: (v: Lead | null) => void;
  actionMenuOpen: string | null;
  setActionMenuOpen: (v: string | null) => void;
  actionMenuButtonRect: DOMRect | null;
  setActionMenuButtonRect: (v: DOMRect | null) => void;
}

export function useEnquiriesUI(): UseEnquiriesUIResult {
  const [showFilters, setShowFilters] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
  const [actionMenuButtonRect, setActionMenuButtonRect] = useState<DOMRect | null>(null);

  const sortDropdown = useDropdownState();
  const actionsDropdown = useDropdownState();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdown.ref.current && !sortDropdown.ref.current.contains(event.target as Node) && sortDropdown.show) {
        sortDropdown.close();
      }
      if (actionsDropdown.ref.current && !actionsDropdown.ref.current.contains(event.target as Node) && actionsDropdown.show) {
        actionsDropdown.close();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (sortDropdown.show) sortDropdown.close();
        if (actionsDropdown.show) actionsDropdown.close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [sortDropdown.show, sortDropdown.close, actionsDropdown.show, actionsDropdown.close]);

  return {
    showFilters,
    setShowFilters,
    showSortDropdown: sortDropdown.show,
    sortDropdownClosing: sortDropdown.closing,
    sortDropdownRef: sortDropdown.ref,
    setShowSortDropdown: sortDropdown.setShow,
    closeSortDropdown: sortDropdown.close,
    showActionsDropdown: actionsDropdown.show,
    actionsDropdownClosing: actionsDropdown.closing,
    actionsDropdownRef: actionsDropdown.ref,
    setShowActionsDropdown: actionsDropdown.setShow,
    closeActionsDropdown: actionsDropdown.close,
    isDrawerOpen,
    setIsDrawerOpen,
    selectedLead,
    setSelectedLead,
    actionMenuOpen,
    setActionMenuOpen,
    actionMenuButtonRect,
    setActionMenuButtonRect,
  };
}
