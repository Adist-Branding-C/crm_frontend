import { useEffect, useRef } from 'react';
import type { TableCheckboxProps } from './types';

const TableCheckbox = ({ checked, indeterminate, onChange }: TableCheckboxProps) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate ?? false;
    }
  }, [indeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
  );
};

export default TableCheckbox;
