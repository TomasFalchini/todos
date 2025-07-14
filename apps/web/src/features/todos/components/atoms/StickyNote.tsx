import React from 'react';
import { Card } from 'antd';
import { Todo } from '@shared/lib';
import { useTodosCardMutations } from '@/features/todos';
import { TodosToolstip } from './TodosTooltip';
import { TodoItemsDate, TodoItemsText } from './TodoItemsText';
import { TodosPriority } from './PriorityTag';

interface StickyNoteProps {
  todo: Todo;
}

export const StickyNote: React.FC<StickyNoteProps> = ({ todo }) => {
  const { handleViewDetail, getPriorityColor } = useTodosCardMutations({
    todo,
  });

  const handleCardClick = (e: React.MouseEvent) => {
    if (
      !(e.target as HTMLElement).closest(
        'button, .ant-checkbox-wrapper, .ant-dropdown'
      )
    ) {
      handleViewDetail();
    }
  };

  return (
    <Card
      onClick={handleCardClick}
      className="cursor-pointer w-full min-h-[200px] shadow-2xl hover:shadow-3xl hover:scale-105 hover:rotate-2 transition-all duration-300  rounded-xl relative"
      style={{
        paddingBlock: 10,
        backgroundColor: getPriorityColor(todo.priority),
      }}
    >
      <TodosToolstip todo={todo} />
      <div className="flex flex-col gap-2 flex-grow">
        <TodoItemsText
          title={todo.title}
          description={todo.description}
          completed={todo.completed}
        />
        <div className="flex flex-col items-start gap-2">
          <TodosPriority priority={todo.priority} />
          <TodoItemsDate date={todo.date} />
        </div>
      </div>
    </Card>
  );
};
