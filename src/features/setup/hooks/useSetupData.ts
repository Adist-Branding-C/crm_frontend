import { useState, useCallback } from 'react';
import { DEFAULT_STAGES } from '../constants';
import type { Stage } from '../types';

export function useSetupData() {
  const [stages, setStages] = useState<Stage[]>(DEFAULT_STAGES);
  const [savedStages, setSavedStages] = useState<Stage[]>(DEFAULT_STAGES);
  const [newStageName, setNewStageName] = useState('');
  const [editingStage, setEditingStage] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  const handleAddStage = useCallback(() => {
    if (!newStageName.trim()) return;
    const newStage: Stage = {
      id: Date.now(),
      name: newStageName.trim(),
      color: 'var(--primary)'
    };
    setStages(prev => [...prev, newStage]);
    setNewStageName('');
  }, [newStageName]);

  const handleDeleteStage = useCallback((id: number) => {
    setStages(prev => prev.filter(s => s.id !== id));
  }, []);

  const handleUpdateStage = useCallback((id: number, name: string, color: string) => {
    setStages(prev => prev.map(s => s.id === id ? { ...s, name, color } : s));
    setEditingStage(null);
  }, []);

  const handleSave = useCallback(() => {
    setSavedStages(stages);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [stages]);

  const handleReset = useCallback(() => {
    setStages(savedStages);
  }, [savedStages]);

  const moveStage = useCallback((index: number, direction: number) => {
    setStages(prev => {
      const newStages = [...prev];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= newStages.length) return prev;
      const temp = newStages[index] as Stage;
      newStages[index] = newStages[targetIndex] as Stage;
      newStages[targetIndex] = temp;
      return newStages;
    });
  }, []);

  return {
    stages, setStages,
    savedStages, setSavedStages,
    newStageName, setNewStageName,
    editingStage, setEditingStage,
    saved, setSaved,
    handleAddStage, handleDeleteStage, handleUpdateStage,
    handleSave, handleReset, moveStage,
  };
}
