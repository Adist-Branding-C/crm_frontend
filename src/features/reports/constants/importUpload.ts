// Mirrors IMPORT_CONFIG.MAX_FILE_SIZE_BYTES in crm_backend/src/leads/constants/lead-import.constants.ts —
// keep the two in sync if either changes. The client-side check is only for immediate feedback;
// the backend enforces this regardless via FileInterceptor's limits.fileSize.
export const IMPORT_MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
export const IMPORT_MAX_FILE_SIZE_LABEL = '10 MB';

export const IMPORT_UPLOAD_ERRORS = {
  wrongType: 'Only .xlsx files are accepted',
  tooLarge: `File exceeds the maximum size of ${IMPORT_MAX_FILE_SIZE_LABEL}`,
  noFile: 'Please choose a file to upload',
  validateFailed: 'Failed to check the file',
  uploadFailed: 'Failed to upload file',
} as const;
