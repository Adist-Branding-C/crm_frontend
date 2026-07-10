import type { ChangeEvent } from 'react';

export interface DropdownValuesInputProps {
  currentValue: string;
  values: string[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}
