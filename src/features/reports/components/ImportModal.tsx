import React from 'react';
import { X } from 'lucide-react';
import '../sub-pages/ReportsSubPages.css';
import ImportUploadStep from './ImportUploadStep';
import ImportReviewStep from './ImportReviewStep';
import { useImportModalFlow } from '../hooks/useImportModalFlow';
import type { ImportUploadResult } from '../hooks/useImportModalFlow';
import type { ImportMasterDecision } from '../types';

export interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File, createMasters: ImportMasterDecision[]) => Promise<ImportUploadResult>;
  onImported: (importId: string) => void;
  onDownloadSample: () => Promise<void>;
}

const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose, onUpload, onImported, onDownloadSample }) => {
  const flow = useImportModalFlow({ onUpload, onImported, onClose });

  if (!isOpen) return null;

  const isReview = flow.step === 'review' && flow.report !== null;
  const uploadStepError = flow.fileError ?? flow.validationError ?? flow.importError;

  return (
    <div className="modal-overlay" onClick={flow.isBusy ? undefined : flow.close}>
      <div
        className={`modal-content ${isReview ? 'import-modal-wide' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="import-modal-title"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="import-modal-title">{isReview ? 'Review before importing' : 'Upload Contacts'}</h2>
          <button className="modal-close" onClick={flow.close} disabled={flow.isBusy} aria-label="Close" type="button">
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          {isReview && flow.report ? (
            <ImportReviewStep
              report={flow.report}
              choices={flow.choices}
              canContinue={flow.canContinue}
              disabled={flow.isBusy}
              errorMessage={flow.importError}
              onChoiceChange={flow.setChoice}
              onContinue={flow.confirmImport}
              onBack={flow.backToSelect}
              onCancel={flow.close}
            />
          ) : (
            <ImportUploadStep
              selectedFile={flow.selectedFile}
              errorMessage={uploadStepError}
              isBusy={flow.isBusy}
              busyLabel={flow.isValidating ? 'Checking file…' : 'Uploading…'}
              onSelectFile={flow.selectFile}
              onDownloadSample={onDownloadSample}
              onSubmit={flow.submitFile}
              onCancel={flow.close}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
