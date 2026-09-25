import { useState, useCallback, useRef } from 'react';
import { useImportPreValidation } from './useImportPreValidation';
import { useImportDecisions } from './useImportDecisions';
import { ImportValidationMapper } from '../mappers/importValidation.mapper';
import {
  IMPORT_MAX_FILE_SIZE_BYTES,
  IMPORT_UPLOAD_ERRORS,
} from '../constants/importUpload';
import type { ImportMasterDecision } from '../types';

export type ImportModalStep = 'select' | 'review';

export interface ImportUploadResult {
  success: boolean;
  error?: string;
  importId?: string;
}

interface UseImportModalFlowParams {
  onUpload: (file: File, createMasters: ImportMasterDecision[]) => Promise<ImportUploadResult>;
  onImported: (importId: string) => void;
  onClose: () => void;
}

/**
 * Orchestrates the upload modal: choose file -> pre-scan -> (review) -> import.
 * With no issues the scan hands straight over to the import, so a clean file costs the
 * user no extra click.
 */
export function useImportModalFlow({ onUpload, onImported, onClose }: UseImportModalFlowParams) {
  const [step, setStep] = useState<ImportModalStep>('select');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const inFlightRef = useRef(false);

  const { report, isValidating, error: validationError, validate, reset: resetValidation } = useImportPreValidation();
  const { choices, createMasters, canContinue, setChoice, reset: resetDecisions } = useImportDecisions(report);

  const isBusy = isValidating || isImporting;

  const resetFlow = useCallback(() => {
    resetValidation();
    resetDecisions();
    setStep('select');
    setImportError(null);
    setIsImporting(false);
    inFlightRef.current = false;
  }, [resetValidation, resetDecisions]);

  const selectFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] ?? null;
      resetFlow();
      setFileError(null);
      if (!file) {
        setSelectedFile(null);
        return;
      }
      if (!file.name.toLowerCase().endsWith('.xlsx')) {
        setSelectedFile(null);
        setFileError(IMPORT_UPLOAD_ERRORS.wrongType);
        return;
      }
      if (file.size > IMPORT_MAX_FILE_SIZE_BYTES) {
        setSelectedFile(null);
        setFileError(IMPORT_UPLOAD_ERRORS.tooLarge);
        return;
      }
      setSelectedFile(file);
    },
    [resetFlow],
  );

  const runImport = useCallback(
    async (file: File, createMasters: ImportMasterDecision[]) => {
      setIsImporting(true);
      setImportError(null);
      const result = await onUpload(file, createMasters);
      setIsImporting(false);
      if (result.success) {
        setSelectedFile(null);
        resetFlow();
        onClose();
        if (result.importId) onImported(result.importId);
      } else {
        setImportError(result.error ?? IMPORT_UPLOAD_ERRORS.uploadFailed);
      }
    },
    [onUpload, onImported, onClose, resetFlow],
  );

  const submitFile = useCallback(async () => {
    if (!selectedFile) {
      setFileError(IMPORT_UPLOAD_ERRORS.noFile);
      return;
    }
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    try {
      resetDecisions();
      const scanned = await validate(selectedFile);
      if (!scanned) return;
      if (ImportValidationMapper.hasIssues(scanned)) {
        setStep('review');
        return;
      }
      await runImport(selectedFile, []);
    } finally {
      inFlightRef.current = false;
    }
  }, [selectedFile, validate, resetDecisions, runImport]);

  const confirmImport = useCallback(async () => {
    if (!selectedFile || !canContinue || inFlightRef.current) return;
    inFlightRef.current = true;
    try {
      await runImport(selectedFile, createMasters);
    } finally {
      inFlightRef.current = false;
    }
  }, [selectedFile, canContinue, createMasters, runImport]);

  const backToSelect = useCallback(() => {
    resetFlow();
  }, [resetFlow]);

  const close = useCallback(() => {
    setSelectedFile(null);
    setFileError(null);
    resetFlow();
    onClose();
  }, [resetFlow, onClose]);

  return {
    step,
    selectedFile,
    fileError,
    importError,
    validationError,
    report,
    isValidating,
    isImporting,
    isBusy,
    choices,
    canContinue,
    setChoice,
    selectFile,
    submitFile,
    confirmImport,
    backToSelect,
    close,
  };
}
