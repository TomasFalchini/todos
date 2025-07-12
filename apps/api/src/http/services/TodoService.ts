import { CreateTodoInput, UpdateTodoInput } from '@shared/lib';
import { CursorPagination, ITodoRepository, TodoDbModel } from '../../database';

export interface ITodoService {
  getAllTodos({
    next_cursor,
    limit,
  }: {
    next_cursor?: string;
    limit: number;
  }): Promise<CursorPagination<TodoDbModel>>;
  getTodoById(id: string): Promise<TodoDbModel | null>;
  createTodo(data: CreateTodoInput): Promise<void>;
  updateTodo(id: string, data: UpdateTodoInput): Promise<void>;
  deleteTodo(id: string): Promise<void>;
}

export class TodoService implements ITodoService {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async getAllTodos({
    next_cursor,
    limit,
  }: {
    next_cursor?: string;
    limit: number;
  }): Promise<CursorPagination<TodoDbModel>> {
    return await this.todoRepository.getAll({ next_cursor, limit });
  }

  async getTodoById(id: string): Promise<TodoDbModel | null> {
    return await this.todoRepository.getById(id);
  }

  async createTodo(data: CreateTodoInput): Promise<void> {
    const todo: CreateTodoInput = {
      title: data.title.trim(),
      description: data.description?.trim(),
      priority: data.priority || 'medium',
      date: data.date || new Date(),
    };

    return await this.todoRepository.create(todo);
  }

  async updateTodo(id: string, data: UpdateTodoInput): Promise<void> {
    return await this.todoRepository.update(id, data);
  }

  async deleteTodo(id: string): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
