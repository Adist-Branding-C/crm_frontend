import React from 'react';
import { IMPORT_MESSAGES } from '../constants/importMessages';
import type { ImportInvalidField } from '../types';

interface InvalidFieldRowProps {
  item: ImportInvalidField;
}

const InvalidFieldRow: React.FC<InvalidFieldRowProps> = ({ item }) => (
  <li className="import-review-item">
    <p className="import-review-message">{IMPORT_MESSAGES.invalidField(item.rowCount, item.field)}</p>
    <p className="import-review-example">{item.message}</p>
    <p className="import-review-example">{IMPORT_MESSAGES.exampleRow(item.example.row, item.example.value)}</p>
  </li>
);

export default InvalidFieldRow;
