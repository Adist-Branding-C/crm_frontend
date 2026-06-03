import type { Column } from '../../../shared/types/crud';
import type { Department, Agent } from '../types';

export const columns: Column<Department>[] = [
  { key: 'name', label: 'Department' },
  { key: 'description', label: 'Description', render: (item) => item.description || '-' },
  { key: 'agents', label: 'Agents', render: (item) => item.agents.join(', ') },
];

export const DEPARTMENT_DATA: Department[] = [
  { id: 1, name: 'core', description: '', agents: ['Fida Fathima', 'Nandana K', 'Rameesa', 'Aysha', 'Nesri', 'Rahmath', 'Lana'] },
  { id: 2, name: 'Tamil', description: '', agents: ['Dilshana'] },
];

export const AGENTS_LIST: Agent[] = [
  { id: 7774, name: 'Dr Expert Edulinks' }, { id: 7775, name: 'Fida Fathima' }, { id: 7776, name: 'Nandana K' },
  { id: 7777, name: 'Rameesa' }, { id: 7778, name: 'Aysha' }, { id: 7779, name: 'Nesri' },
  { id: 7789, name: 'Dilshana' }, { id: 8473, name: 'Rahmath' }, { id: 8640, name: 'Lana' },
];
