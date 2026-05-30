import { DragDropContext } from '@hello-pangea/dnd';
import TaskColumn from './TaskColumn';
import { SkeletonColumn } from '../ui/Loader';
import { STAGE_ORDER } from '../../utils/constants';

export default function TaskBoard({
  tasks,
  loading,
  getTasksByStage,
  onMoveTask,
  onEdit,
  onDelete,
  onAddTask,
}) {
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const taskId = parseInt(draggableId, 10);
    const newStage = destination.droppableId;
    const newPosition = destination.index;

    onMoveTask(taskId, newStage, newPosition);
  };

  if (loading) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <SkeletonColumn />
        <SkeletonColumn />
        <SkeletonColumn />
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {STAGE_ORDER.map((stage) => (
          <TaskColumn
            key={stage}
            stage={stage}
            tasks={getTasksByStage(stage)}
            onEdit={onEdit}
            onDelete={onDelete}
            onAddTask={onAddTask}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
