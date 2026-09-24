import React, { useState } from 'react';
import { IMPORT_MAX_FILE_SIZE_LABEL } from '../constants/importUpload';

interface ImportUploadStepProps {
  selectedFile: File | null;
  errorMessage: string | null;
  isBusy: boolean;
  busyLabel: string;
  onSelectFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDownloadSample: () => Promise<void>;
  onSubmit: () => void;
  onCancel: () => void;
}

const ImportUploadStep: React.FC<ImportUploadStepProps> = ({
  selectedFile,
  errorMessage,
  isBusy,
  busyLabel,
  onSelectFile,
  onDownloadSample,
  onSubmit,
  onCancel,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadSample = async () => {
    setIsDownloading(true);
    try {
      await onDownloadSample();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <div className="upload-section">
        <label htmlFor="import-file-input">Upload File</label>
        <div className="file-input-wrapper">
          <input id="import-file-input" type="file" accept=".xlsx" onChange={onSelectFile} disabled={isBusy} />
          <button className="btn-link" onClick={handleDownloadSample} disabled={isDownloading} type="button">
            {isDownloading ? 'Preparing…' : 'Download Sample File'}
          </button>
        </div>
        {selectedFile && <p className="selected-file-name">{selectedFile.name}</p>}
      </div>

      <div className="required-fields">
        <p><strong>* Required Fields:</strong></p>
        <p>Name, Mobile Number, Lead Source</p>
        <p>All other fields can be left empty if the information is not available.</p>
      </div>

      <div className="format-note">
        <p>The sheet's columns must match the downloaded sample file exactly.</p>
        <p>Maximum file size: {IMPORT_MAX_FILE_SIZE_LABEL}. Only .xlsx files are accepted.</p>
        <p>
          The file is checked before anything is imported. Values that don't exist yet can be created (admins only),
          and rows with invalid data are skipped.
        </p>
        <p>
          Duplicates: a row with the same phone number and source as an existing lead updates that lead; the same phone
          number under a different source is skipped.
        </p>
      </div>

      {errorMessage && (
        <p className="upload-error-text" role="alert">
          {errorMessage}
        </p>
      )}

      <div className="modal-actions">
        <button className="btn btn-primary" onClick={onSubmit} disabled={isBusy} type="button">
          {isBusy ? busyLabel : 'Upload'}
        </button>
        <button className="btn btn-secondary" onClick={onCancel} disabled={isBusy} type="button">
          Cancel
        </button>
      </div>
    </>
  );
};

export default ImportUploadStep;
