import type { FormikHelpers } from 'formik';
import type { RoleItem, RoleFormData } from './role.types';

export interface UseRoleActionsParams {
  role: {
    handleAddRole: (values: RoleFormData, helpers: FormikHelpers<RoleFormData>) => Promise<boolean>;
    handleUpdateRole: (id: string, values: RoleFormData, helpers: FormikHelpers<RoleFormData>) => Promise<boolean>;
    handleDeleteRole: (id: string) => Promise<boolean>;
    dependencyError: boolean;
    clearDependencyError: () => void;
  };
  drawer: {
    editingItem: RoleItem | null;
    closeDrawer: () => void;
  };
}
