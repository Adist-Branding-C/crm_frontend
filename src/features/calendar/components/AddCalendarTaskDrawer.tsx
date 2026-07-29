import Drawer from '../../../shared/components/Drawer';
import GenericTaskForm from '../../task/common/components/GenericTaskForm';
import { addTaskValidationSchema } from '../../task/task/validations/task.validation';
import type { useCalendarAddTask } from '../hooks/useCalendarAddTask';

interface AddCalendarTaskDrawerProps {
  addTask: ReturnType<typeof useCalendarAddTask>;
}

/**
 * Wraps the shared Drawer + GenericTaskForm (the same form TaskPage uses)
 * for Calendar's "Add Task" button, pre-filled with the day being viewed.
 *
 * Used by:
 * - CalendarPage.
 */
const AddCalendarTaskDrawer = ({ addTask }: AddCalendarTaskDrawerProps) => (
  <Drawer isOpen={addTask.isOpen} onClose={addTask.close} title="Add Task">
    <GenericTaskForm
      validationSchema={addTaskValidationSchema}
      initialValues={addTask.initialValues}
      onSubmit={addTask.handleSubmit}
      isLoading={addTask.isSaving}
      error={addTask.error}
      isEditing={false}
      categoryOptions={addTask.categoryOptions}
      categoryLoading={addTask.categoryLoading}
      staffOptions={addTask.staffOptions}
      staffLoading={addTask.staffLoading}
      leadOptions={addTask.leadOptions}
      leadLoading={addTask.leadLoading}
    />
  </Drawer>
);

export default AddCalendarTaskDrawer;
