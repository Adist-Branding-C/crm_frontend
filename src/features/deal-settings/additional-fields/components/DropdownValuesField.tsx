import { useFormikContext } from 'formik';
import { useDropdownValuesInput } from '../../../../shared/hooks/useDropdownValuesInput';
import DropdownValuesInput from '../../../../shared/components/DropdownValuesInput';
import type { DealAdditionalFieldFormData } from '../types/request';

const DropdownValuesField = () => {
  const { values, setValues } = useFormikContext<DealAdditionalFieldFormData>();
  const { handleDropdownValueChange, handleAddDropdownValue, handleRemoveDropdownValue } = useDropdownValuesInput(setValues);

  return (
    <DropdownValuesInput
      currentValue={values.currentDropdownValue}
      values={values.dropdownValues}
      onChange={handleDropdownValueChange}
      onAdd={handleAddDropdownValue}
      onRemove={handleRemoveDropdownValue}
    />
  );
};

export default DropdownValuesField;
