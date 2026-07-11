import { useCallback } from 'react';
import { useDeleteConfirmation } from '../../../shared/hooks/useDeleteConfirmation';
import type { CustomPipelineItem } from '../types/interface';
import type { UseCustomPipelineDeleteConfirmParams } from '../types/use-custom-pipeline-delete-confirm.types';

/**
 * Delete-confirmation modal state for the custom-pipeline page.
 *
 * Notes:
 * - Thin wrapper around the shared useDeleteConfirmation, wired to delete by id.
 */
export function useCustomPipelineDeleteConfirm({ handleDeleteCustomPipeline }: UseCustomPipelineDeleteConfirmParams) {
  const deleteCustomPipeline = useCallback((item: CustomPipelineItem) => handleDeleteCustomPipeline(item.id), [handleDeleteCustomPipeline]);

  return useDeleteConfirmation<CustomPipelineItem>(deleteCustomPipeline);
}
