import { CreateTodoInput, UpdateTodoInput } from '@shared/lib';
import { CursorPagination, TodoDbModel } from '../models';

export interface ITodoRepository {
  getAll({
    limit,
    next_cursor,
  }: {
    limit: number;
    next_cursor?: string;
  }): Promise<CursorPagination<TodoDbModel>>;
  getById(todo_id: string): Promise<TodoDbModel | null>;
  create(todo: CreateTodoInput): Promise<void>;
  update(todo_id: string, todo: UpdateTodoInput): Promise<void>;
  delete(todo_id: string): Promise<void>;
}
