import { useState, useRef, useEffect, useCallback } from 'react';
import { useCrudData } from '../../../shared/hooks/useCrudData';
import { DEPARTMENT_DATA, AGENTS_LIST } from '../constants';
import type { Department, Agent } from '../types';

export function useDepartmentData() {
  const crud = useCrudData(DEPARTMENT_DATA);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [selectedAgents, setSelectedAgents] = useState<number[]>([]);
  const [showAgentDropdown, setShowAgentDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ vertical: 'bottom', horizontal: 'right' });
  const actionMenuRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isClickInside = Object.values(actionMenuRefs.current).some(ref => ref && ref.contains(event.target as Node));
      if (!isClickInside) crud.setDropdownOpen(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [crud]);

  const calculateDropdownPosition = useCallback((buttonRef: HTMLButtonElement | null) => {
    if (!buttonRef) return { vertical: 'bottom', horizontal: 'right' };
    const rect = buttonRef.getBoundingClientRect();
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const spaceBelow = vh - rect.bottom;
    const spaceAbove = rect.top;
    const spaceRight = vw - rect.right;
    return {
      vertical: spaceBelow < 150 && spaceAbove > spaceBelow ? 'top' : 'bottom',
      horizontal: spaceRight < 140 && spaceRight < 100 ? 'left' : 'right',
    };
  }, []);

  const toggleAgent = useCallback((agent: Agent) => {
    setSelectedAgents(prev => prev.includes(agent.id) ? prev.filter(id => id !== agent.id) : [...prev, agent.id]);
  }, []);

  const handleAdd = useCallback(() => {
    crud.handleAddClick();
    setFormData({ name: '', description: '' });
    setSelectedAgents([]);
  }, [crud]);

  const handleEdit = useCallback((item: Department) => {
    crud.handleEditClick(item);
    setFormData({ name: item.name, description: item.description || '' });
    const agentIds = item.agents.map(name => AGENTS_LIST.find(a => a.name === name)?.id).filter(Boolean) as number[];
    setSelectedAgents(agentIds);
  }, [crud]);

  const handleSave = useCallback(() => {
    const agentNames = selectedAgents.map(id => AGENTS_LIST.find(a => a.id === id)?.name).filter(Boolean) as string[];
    crud.handleSave({ ...formData, agents: agentNames });
    setSelectedAgents([]);
  }, [crud, formData, selectedAgents]);

  return {
    ...crud,
    formData, setFormData,
    selectedAgents, setSelectedAgents,
    showAgentDropdown, setShowAgentDropdown,
    dropdownPosition, setDropdownPosition,
    actionMenuRefs,
    calculateDropdownPosition,
    toggleAgent,
    handleAdd, handleEdit, handleSave,
  };
}
