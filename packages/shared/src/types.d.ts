import { Todo, CreateTodoInput, UpdateTodoInput } from './schemas';
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
export type CreateTodo = CreateTodoInput;
export type UpdateTodo = UpdateTodoInput;
//# sourceMappingURL=types.d.ts.map