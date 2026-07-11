import { useState, useCallback } from 'react';
import { DEFAULT_STAGES } from '../constants';
export function useSetupData() {
    const [stages, setStages] = useState(DEFAULT_STAGES);
    const [savedStages, setSavedStages] = useState(DEFAULT_STAGES);
    const [newStageName, setNewStageName] = useState('');
    const [editingStage, setEditingStage] = useState(null);
    const [saved, setSaved] = useState(false);
    const handleAddStage = useCallback(() => {
        if (!newStageName.trim())
            return;
        const newStage = {
            id: Date.now(),
            name: newStageName.trim(),
            color: '#6366f1'
        };
        setStages(prev => [...prev, newStage]);
        setNewStageName('');
    }, [newStageName]);
    const handleDeleteStage = useCallback((id) => {
        setStages(prev => prev.filter(s => s.id !== id));
    }, []);
    const handleUpdateStage = useCallback((id, name, color) => {
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
    const moveStage = useCallback((index, direction) => {
        setStages(prev => {
            const newStages = [...prev];
            const targetIndex = index + direction;
            if (targetIndex < 0 || targetIndex >= newStages.length)
                return prev;
            const temp = newStages[index];
            newStages[index] = newStages[targetIndex];
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
//# sourceMappingURL=useSetupData.js.map