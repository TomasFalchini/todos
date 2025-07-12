import { Todo, CreateTodoInput, UpdateTodoInput } from './schemas';

// Tipos adicionales para el frontend (props de componentes)
export interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export interface TodoFormProps {
  todo?: Todo;
  onSubmit: (data: CreateTodoInput | UpdateTodoInput) => void;
  onCancel: () => void;
  loading?: boolean;
}

// Alias para mantener compatibilidad
export type CreateTodo = CreateTodoInput;
export type UpdateTodo = UpdateTodoInput;
