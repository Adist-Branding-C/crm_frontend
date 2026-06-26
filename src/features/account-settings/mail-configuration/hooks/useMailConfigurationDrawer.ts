import { useState, useMemo, useCallback } from 'react';
import type { MailConfigItem, MailConfigFormData } from '../types';

export function useMailConfigurationDrawer() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [editingItem, setEditingItem] = useState<MailConfigItem | null>(null);

  const openAddDrawer = useCallback(() => {
    setEditingItem(null);
    setShowDrawer(true);
  }, []);

  const openEditDrawer = useCallback((item: MailConfigItem) => {
    setEditingItem(item);
    setShowDrawer(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setShowDrawer(false);
    setEditingItem(null);
  }, []);

  const drawerInitialValues: MailConfigFormData = useMemo(
    () => editingItem
      ? {
          driver: editingItem.driver || '',
          host: editingItem.host || '',
          port: String(editingItem.port || ''),
          encryption: editingItem.encryption || '',
          username: editingItem.username || '',
          password: editingItem.password || '',
          fromEmail: editingItem.fromEmail || '',
          fromName: editingItem.fromName || '',
        }
      : { driver: '', host: '', port: '', encryption: '', username: '', password: '', fromEmail: '', fromName: '' },
    [editingItem]
  );

  return {
    showDrawer,
    editingItem,
    openAddDrawer,
    openEditDrawer,
    closeDrawer,
    drawerInitialValues,
  };
}
