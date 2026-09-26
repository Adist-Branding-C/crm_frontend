import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { DndContext } from '@dnd-kit/core';
import { describe, expect, it } from 'vitest';
import TaskCard from './TaskCard';
import { RepeatType } from '../../common/constants/taskEnums';

const baseTask = {
  id: 12,
  title: 'Follow up on renewal call',
  description: '',
  scheduledDate: '2026-09-20',
  scheduledTime: '09:30',
  priority: 'High',
  status: 'Pending',
  taskType: 'Call',
  assignedTo: { id: 3, name: 'Alicia' },
  repeatType: RepeatType.NEVER,
};

describe('TaskCard recurrence indicator', () => {
  it('does not show the recurring indicator when repeatType is never', () => {
    render(
      <DndContext>
        <TaskCard task={{ ...baseTask }} stageId="stage-1" />
      </DndContext>,
    );

    expect(screen.getByText('Follow up on renewal call')).toBeInTheDocument();
    expect(screen.queryByText('Daily')).not.toBeInTheDocument();
    expect(screen.queryByText('Weekly')).not.toBeInTheDocument();
    expect(screen.queryByText('Monthly')).not.toBeInTheDocument();
  });

  it('shows Daily for daily recurring tasks', () => {
    render(
      <DndContext>
        <TaskCard task={{ ...baseTask, repeatType: RepeatType.DAILY }} stageId="stage-1" />
      </DndContext>,
    );

    expect(screen.getByText('Daily')).toBeInTheDocument();
    expect(screen.getByLabelText('Repeats: Daily')).toHaveAttribute('title', 'Repeats: Daily');
  });

  it('supports snake_case repeat payloads returned by the kanban API', () => {
    render(
      <DndContext>
        <TaskCard task={{ ...baseTask, repeat_type: RepeatType.DAILY } as any} stageId="stage-1" />
      </DndContext>,
    );

    expect(screen.getByText('Daily')).toBeInTheDocument();
  });

  it('shows Weekly for weekly recurring tasks', () => {
    render(
      <DndContext>
        <TaskCard task={{ ...baseTask, repeatType: RepeatType.WEEKLY }} stageId="stage-1" />
      </DndContext>,
    );

    expect(screen.getByText('Weekly')).toBeInTheDocument();
  });

  it('shows Monthly for monthly recurring tasks', () => {
    render(
      <DndContext>
        <TaskCard task={{ ...baseTask, repeatType: RepeatType.MONTHLY }} stageId="stage-1" />
      </DndContext>,
    );

    expect(screen.getByText('Monthly')).toBeInTheDocument();
  });

  it('keeps the normal task data visible when recurring', () => {
    render(
      <DndContext>
        <TaskCard task={{ ...baseTask, repeatType: RepeatType.WEEKLY, priority: 'Medium' }} stageId="stage-1" />
      </DndContext>,
    );

    expect(screen.getByText('Follow up on renewal call')).toBeInTheDocument();
    expect(screen.getByText('Alicia')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Weekly')).toBeInTheDocument();
    expect(screen.getByText('20 Sep 2026')).toBeInTheDocument();
  });

  it('does not crash when repeatType is missing or null', () => {
    render(
      <DndContext>
        <TaskCard task={{ ...baseTask, repeatType: undefined }} stageId="stage-1" />
      </DndContext>,
    );

    expect(screen.getByText('Follow up on renewal call')).toBeInTheDocument();
    expect(screen.getByText('Alicia')).toBeInTheDocument();
  });
});
