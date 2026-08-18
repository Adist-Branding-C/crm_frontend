import { useState } from 'react';

export interface MappingRow {
  localId: string;
  crmFieldCategory: 'core' | 'additional';
  crmFieldKey: string;
  valueTemplate: string;
  isRequired: boolean;
}

const makeLocalId = () => `row_${Math.random().toString(36).slice(2)}_${Date.now()}`;

export const emptyMappingRow = (): MappingRow => ({
  localId: makeLocalId(),
  crmFieldCategory: 'core',
  crmFieldKey: '',
  valueTemplate: '',
  isRequired: false,
});

// Shared row-array state for the field mapping builder, used by both Create
// and Edit Workflow (identical add/update/remove logic either way).
export const useMappingRows = () => {
  const [rows, setRows] = useState<MappingRow[]>(() => [emptyMappingRow()]);

  const addRow = () => setRows((prev) => [...prev, emptyMappingRow()]);

  const updateRow = (localId: string, patch: Partial<MappingRow>) => {
    setRows((prev) => prev.map((row) => (row.localId === localId ? { ...row, ...patch } : row)));
  };

  const removeRow = (localId: string) => {
    setRows((prev) => prev.filter((row) => row.localId !== localId));
  };

  return { rows, setRows, addRow, updateRow, removeRow };
};
