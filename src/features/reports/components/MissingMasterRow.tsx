import React from 'react';
import { IMPORT_MESSAGES } from '../constants/importMessages';
import type { ImportMasterChoice, ImportMissingMaster } from '../types';

interface MissingMasterRowProps {
  item: ImportMissingMaster;
  choice: ImportMasterChoice;
  groupName: string;
  maxNewPerType: number;
  disabled: boolean;
  onChange: (choice: ImportMasterChoice) => void;
}

const MissingMasterRow: React.FC<MissingMasterRowProps> = ({
  item,
  choice,
  groupName,
  maxNewPerType,
  disabled,
  onChange,
}) => (
  <li className="import-review-item">
    <p className="import-review-message">
      {IMPORT_MESSAGES.missingMaster(item.rowCount, item.columnLabel, item.value)}
    </p>
    <p className="import-review-example">Example rows: {item.exampleRows.join(', ')}</p>

    {item.creatable ? (
      <div role="radiogroup" aria-label={`${item.columnLabel} '${item.value}'`} className="import-choice-group">
        <label className="import-choice">
          <input
            type="radio"
            name={groupName}
            checked={choice === 'create'}
            disabled={disabled}
            onChange={() => onChange('create')}
          />
          <span>{IMPORT_MESSAGES.createChoice(item.value)}</span>
        </label>
        <label className="import-choice">
          <input
            type="radio"
            name={groupName}
            checked={choice === 'skip'}
            disabled={disabled}
            onChange={() => onChange('skip')}
          />
          <span>{IMPORT_MESSAGES.skipChoice}</span>
        </label>
      </div>
    ) : (
      <p className="import-review-note">{IMPORT_MESSAGES.notCreatable(item.notCreatableReason, maxNewPerType)}</p>
    )}
  </li>
);

export default MissingMasterRow;
