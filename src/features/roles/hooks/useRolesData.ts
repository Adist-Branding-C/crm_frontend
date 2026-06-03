import { useState, useCallback } from 'react';
import { useCrudData } from '../../../shared/hooks/useCrudData';
import { ROLES_DATA } from '../constants';
import type { Role } from '../types';

export function useRolesData() {
  const crud = useCrudData(ROLES_DATA);
  const [showForm, setShowForm] = useState(false);
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState<Record<string, boolean>>({});

  const handleAddClick = useCallback(() => {
    setShowForm(true);
    crud.setEditingItem(null);
    setRoleName('');
    setPermissions({});
  }, [crud]);

  const handleEditClick = useCallback((role: Role) => {
    setShowForm(true);
    crud.setEditingItem(role);
    setRoleName(role.name);
    setPermissions({});
    crud.setDropdownOpen(null);
  }, [crud]);

  const handleBackClick = useCallback(() => {
    setShowForm(false);
    crud.setEditingItem(null);
    setRoleName('');
    setPermissions({});
  }, [crud]);

  const handlePermissionChange = useCallback((module: string, action: string, checked: boolean) => {
    setPermissions(prev => {
      if (checked) return { ...prev, [module + '-' + action]: true };
      const { [module + '-' + action]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const handleSelectAll = useCallback((module: string, actions: string[]) => {
    const allChecked = actions.every(action => permissions[module + '-' + action]);
    setPermissions(prev => {
      const updated = { ...prev };
      actions.forEach(action => { updated[module + '-' + action] = !allChecked; });
      return updated;
    });
  }, [permissions]);

  const checkAllSelected = useCallback((module: string, actions: string[]) =>
    actions.every(action => permissions[module + '-' + action]), [permissions]);

  const isChecked = useCallback((module: string, action: string) =>
    !!permissions[module + '-' + action], [permissions]);

  return {
    ...crud, showForm, setShowForm, roleName, setRoleName, permissions, setPermissions,
    handleAddClick, handleEditClick, handleBackClick, handlePermissionChange,
    handleSelectAll, checkAllSelected, isChecked,
  };
}
