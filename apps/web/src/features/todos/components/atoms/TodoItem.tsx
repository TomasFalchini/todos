import React from 'react';
import { Card } from 'antd';

import { Todo } from '@shared/lib';
import { TodosToolstip } from './TodosTooltip';
import { useTodosCardMutations } from '../../hooks';
import { TodoItemsDate, TodoItemsText } from './TodoItemsText';
import { TodosPriority } from './PriorityTag';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { handleViewDetail, getPriorityColor } = useTodosCardMutations({
    todo,
  });

  return (
    <Card
      size="small"
      className="w-full cursor-pointer"
      onClick={handleViewDetail}
      style={{
        borderWidth: 5,
        borderStyle: 'solid',
        borderColor: getPriorityColor(todo.priority),
        opacity: todo.completed ? 0.7 : 1,
      }}
    >
      <TodosToolstip todo={todo} />
      <div className="flex flex-col px-4">
        <TodoItemsText
          title={todo.title}
          description={todo.description}
          completed={todo.completed}
        />
        <div className="flex items-center gap-2">
          <TodosPriority priority={todo.priority} />
          <TodoItemsDate date={todo.date} />
        </div>
      </div>
    </Card>
  );
};
