import React from 'react';
import MissingMasterRow from './MissingMasterRow';
import InvalidFieldRow from './InvalidFieldRow';
import { IMPORT_MESSAGES, IMPORT_REVIEW_TITLES } from '../constants/importMessages';
import { ImportValidationMapper } from '../mappers/importValidation.mapper';
import type { ImportMasterChoice, ImportValidationReport } from '../types';

interface ImportReviewStepProps {
  report: ImportValidationReport;
  choices: Record<string, ImportMasterChoice>;
  canContinue: boolean;
  disabled: boolean;
  errorMessage: string | null;
  onChoiceChange: (key: string, choice: ImportMasterChoice) => void;
  onContinue: () => void;
  onBack: () => void;
  onCancel: () => void;
}

const ImportReviewStep: React.FC<ImportReviewStepProps> = ({
  report,
  choices,
  canContinue,
  disabled,
  errorMessage,
  onChoiceChange,
  onContinue,
  onBack,
  onCancel,
}) => (
  <div className="import-review">
    <p className="import-review-summary">
      {IMPORT_MESSAGES.readySummary(report.readyRows, report.rowsPendingMasterDecision, report.unfixableRows)}
    </p>

    {report.missingMasters.length > 0 && (
      <section className="import-review-section">
        <h3>{IMPORT_REVIEW_TITLES.missing}</h3>
        <ul>
          {report.missingMasters.map((item) => {
            const key = ImportValidationMapper.masterKey(item.entity, item.value);
            return (
              <MissingMasterRow
                key={key}
                item={item}
                choice={choices[key] ?? 'skip'}
                groupName={`import-master-${key}`}
                maxNewPerType={report.limits.maxNewMastersPerEntity}
                disabled={disabled}
                onChange={(choice) => onChoiceChange(key, choice)}
              />
            );
          })}
        </ul>
      </section>
    )}

    {report.inactiveMasters.length > 0 && (
      <section className="import-review-section">
        <h3>{IMPORT_REVIEW_TITLES.inactive}</h3>
        <ul>
          {report.inactiveMasters.map((item) => (
            <li key={`${item.entity}:${item.value}`} className="import-review-item">
              <p className="import-review-message">
                {IMPORT_MESSAGES.inactiveMaster(item.rowCount, item.columnLabel, item.value)}
              </p>
            </li>
          ))}
        </ul>
      </section>
    )}

    {report.invalidFields.length > 0 && (
      <section className="import-review-section">
        <h3>{IMPORT_REVIEW_TITLES.invalid}</h3>
        <ul>
          {report.invalidFields.map((item) => (
            <InvalidFieldRow key={`${item.field}|${item.code}`} item={item} />
          ))}
        </ul>
      </section>
    )}

    {report.warnings.length > 0 && (
      <section className="import-review-section">
        <h3>{IMPORT_REVIEW_TITLES.warnings}</h3>
        <ul>
          {report.warnings.map((item) => (
            <li key={item.code} className="import-review-item">
              <p className="import-review-message">{IMPORT_MESSAGES.warning(item.rowCount, item.message)}</p>
            </li>
          ))}
        </ul>
      </section>
    )}

    {report.truncated && <p className="import-review-note">{IMPORT_MESSAGES.truncated}</p>}
    {!canContinue && (
      <p className="upload-error-text" role="alert">
        {IMPORT_MESSAGES.nothingToImport}
      </p>
    )}
    {errorMessage && (
      <p className="upload-error-text" role="alert">
        {errorMessage}
      </p>
    )}

    <div className="modal-actions">
      <button className="btn btn-primary" onClick={onContinue} disabled={disabled || !canContinue} type="button">
        {disabled ? 'Importing…' : 'Continue import'}
      </button>
      <button className="btn btn-secondary" onClick={onBack} disabled={disabled} type="button">
        Back
      </button>
      <button className="btn btn-secondary" onClick={onCancel} disabled={disabled} type="button">
        Cancel upload
      </button>
    </div>
  </div>
);

export default ImportReviewStep;
