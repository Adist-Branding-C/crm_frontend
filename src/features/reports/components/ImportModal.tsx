import React, { useState } from 'react';
import { X } from 'lucide-react';
import '../sub-pages/ReportsSubPages.css';

export interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => Promise<{ success: boolean; error?: string }>;
  onDownloadSample: () => Promise<void>;
}

// Mirrors IMPORT_CONFIG.MAX_FILE_SIZE_BYTES in crm_backend/src/leads/constants/lead-import.constants.ts —
// keep the two in sync if either changes. Client-side check is just for immediate feedback;
// the backend enforces this regardless via FileInterceptor's limits.fileSize.
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const MAX_FILE_SIZE_LABEL = '10 MB';

const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose, onUpload, onDownloadSample }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setUploadError(null);
    if (!file) {
      setSelectedFile(null);
      return;
    }
    if (!file.name.toLowerCase().endsWith('.xlsx')) {
      setSelectedFile(null);
      setUploadError('Only .xlsx files are accepted');
      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setSelectedFile(null);
      setUploadError(`File exceeds the maximum size of ${MAX_FILE_SIZE_LABEL}`);
      return;
    }
    setSelectedFile(file);
  };

  const handleDownloadSample = async () => {
    setIsDownloading(true);
    try {
      await onDownloadSample();
    } finally {
      setIsDownloading(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError('Please choose a file to upload');
      return;
    }
    setIsUploading(true);
    setUploadError(null);
    const result = await onUpload(selectedFile);
    setIsUploading(false);
    if (result.success) {
      setSelectedFile(null);
      onClose();
    } else {
      setUploadError(result.error ?? 'Failed to upload file');
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setUploadError(null);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Upload Contacts</h2>
          <button className="modal-close" onClick={handleClose}><X size={20} /></button>
        </div>
        <div className="modal-body">
          <div className="upload-section">
            <label>Upload File</label>
            <div className="file-input-wrapper">
              <input type="file" accept=".xlsx" onChange={handleFileChange} />
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
            <p>Maximum file size: {MAX_FILE_SIZE_LABEL}. Only .xlsx files are accepted.</p>
            <p>Note: Duplicate phone numbers are not checked — every row is imported as its own lead.</p>
          </div>

          {uploadError && <p className="upload-error-text">{uploadError}</p>}

          <div className="modal-actions">
            <button className="btn btn-primary" onClick={handleUpload} disabled={isUploading} type="button">
              {isUploading ? 'Uploading…' : 'Upload'}
            </button>
            <button className="btn btn-secondary" onClick={handleClose} type="button">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
