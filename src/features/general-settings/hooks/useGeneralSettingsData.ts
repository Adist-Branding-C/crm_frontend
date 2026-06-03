import { useState, useCallback } from 'react';
import type { GeneralSettings as GeneralSettingsType } from '../types';
import { DEFAULT_SETTINGS } from '../constants';

export const useGeneralSettingsData = () => {
  const [settings, setSettings] = useState<GeneralSettingsType>(DEFAULT_SETTINGS);
  const [showToast, setShowToast] = useState(false);

  const showSaveToast = useCallback(() => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }, []);

  const handleToggle = (key: keyof GeneralSettingsType) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    showSaveToast();
  };

  const handleSelectChange = (key: keyof GeneralSettingsType, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    showSaveToast();
  };

  return {
    settings,
    showToast,
    setShowToast,
    handleToggle,
    handleSelectChange,
  };
};
