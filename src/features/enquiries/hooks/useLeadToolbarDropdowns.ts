import { useLeadDropdownState } from './useLeadDropdownState';
import type { UseLeadToolbarDropdownsReturn } from '../types/hook.types';

export function useLeadToolbarDropdowns(): UseLeadToolbarDropdownsReturn {
  const sortDropdown = useLeadDropdownState();
  const actionsDropdown = useLeadDropdownState();

  const toggleSort = () => {
    if (sortDropdown.isOpen) {
      sortDropdown.close();
    } else {
      sortDropdown.setIsOpen(true);
      actionsDropdown.setIsOpen(false);
    }
  };

  const toggleActions = () => {
    if (actionsDropdown.isOpen) {
      actionsDropdown.close();
    } else {
      actionsDropdown.setIsOpen(true);
      sortDropdown.setIsOpen(false);
    }
  };

  return { sortDropdown, actionsDropdown, toggleSort, toggleActions };
}
