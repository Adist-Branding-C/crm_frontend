import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import StageFormDrawer from './StageFormDrawer';
import type { TaskWorkflowStage } from '../types/interface';

describe('StageFormDrawer', () => {
  it('shows the completed-stage toggle and pre-checks the stage when it is already marked complete', () => {
    const editingItem: TaskWorkflowStage = {
      id: '10',
      name: 'Done',
      color: '#00ff00',
      sortOrder: 2,
      isCompletedStage: true,
    };

    render(
      <StageFormDrawer
        editingItem={editingItem}
        initialValues={{ name: editingItem.name, color: editingItem.color, isCompletedStage: true }}
        onSubmit={vi.fn()}
        error=""
        onCancel={vi.fn()}
      />,
    );

    const toggle = screen.getByLabelText('Mark as completed stage');
    expect(toggle).toBeChecked();
  });

  it('shows the warning when another completed stage already exists', () => {
    render(
      <StageFormDrawer
        editingItem={{ id: '11', name: 'Review', color: '#ff0000', sortOrder: 3, isCompletedStage: false }}
        initialValues={{ name: 'Review', color: '#ff0000', isCompletedStage: true }}
        otherCompletedStageName="Done"
        onSubmit={vi.fn()}
        error=""
        onCancel={vi.fn()}
      />,
    );

    expect(screen.getByText(/Another stage \('Done'\) is already marked as completed/i)).toBeInTheDocument();
  });

  it('updates the form state when the checkbox is toggled', async () => {
    const onSubmit = vi.fn();

    render(
      <StageFormDrawer
        editingItem={null}
        initialValues={{ name: 'In Progress', color: '#2563eb', isCompletedStage: false }}
        onSubmit={onSubmit}
        error=""
        onCancel={vi.fn()}
      />,
    );

    const toggle = screen.getByLabelText('Mark as completed stage');
    fireEvent.click(toggle);

    await waitFor(() => {
      expect(toggle).toBeChecked();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ isCompletedStage: true }),
        expect.anything(),
      );
    });
  });
});
