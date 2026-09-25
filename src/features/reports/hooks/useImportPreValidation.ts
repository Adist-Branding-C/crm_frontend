import { useState, useCallback, useRef } from 'react';
import { importHistoryService } from '../services/importHistoryService';
import { getErrorMessage } from '../../../shared/utils/error';
import { IMPORT_UPLOAD_ERRORS } from '../constants/importUpload';
import type { ImportValidationReport } from '../types';

/**
 * Runs the read-only pre-import scan (POST /leads/import/validate) and holds its report.
 * A request sequence guards against a slow response for a previous file overwriting the
 * state after the user picked another file or closed the modal.
 */
export function useImportPreValidation() {
  const [report, setReport] = useState<ImportValidationReport | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestSeqRef = useRef(0);

  const validate = useCallback(async (file: File): Promise<ImportValidationReport | null> => {
    const requestSeq = ++requestSeqRef.current;
    setIsValidating(true);
    setError(null);
    setReport(null);
    try {
      const response = await importHistoryService.validateFile(file);
      if (requestSeq !== requestSeqRef.current) return null;
      if (response.status && response.data) {
        setReport(response.data);
        return response.data;
      }
      setError(response.message || IMPORT_UPLOAD_ERRORS.validateFailed);
      return null;
    } catch (err) {
      if (requestSeq !== requestSeqRef.current) return null;
      setError(getErrorMessage(err, IMPORT_UPLOAD_ERRORS.validateFailed));
      return null;
    } finally {
      if (requestSeq === requestSeqRef.current) setIsValidating(false);
    }
  }, []);

  const reset = useCallback(() => {
    requestSeqRef.current++;
    setReport(null);
    setError(null);
    setIsValidating(false);
  }, []);

  return { report, isValidating, error, validate, reset };
}
