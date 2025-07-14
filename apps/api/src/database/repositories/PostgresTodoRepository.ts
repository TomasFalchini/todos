import { CreateTodoInput, UpdateTodoInput } from '@shared/lib';
import { CursorPagination, TodoDbModel } from '../models';
import { ITodoRepository } from './ITodoRepository';
import { Pool } from 'pg';

interface DecodedCursor {
  timestamp: Date;
  id: string;
}

export class PostgresTodoRepository implements ITodoRepository {
  constructor(private pool: Pool) {}
  //Se podria hacer mas agnostico a la libreria de pg, definiendo la interfaz Pool. No se hace para no complejizar el codigo innecesariamente.

  private createCursor(id: string, createdAt: Date): string {
    const timestampMillis = createdAt.getTime();
    const cursorStr = `${timestampMillis}_${id}`;
    return Buffer.from(cursorStr, 'utf8').toString('base64');
  }

  private decodeCursor(cursor: string): DecodedCursor {
    try {
      const decoded = Buffer.from(cursor, 'base64').toString('utf8');
      const parts = decoded.split('_');

      if (parts.length !== 2) {
        throw new Error('Invalid cursor format');
      }

      const timestampMillis = parseInt(parts[0], 10);
      const id = parts[1];

      if (isNaN(timestampMillis)) {
        throw new Error('Invalid timestamp in cursor');
      }

      const timestamp = new Date(timestampMillis);

      if (isNaN(timestamp.getTime())) {
        throw new Error('Invalid timestamp');
      }

      return {
        timestamp,
        id,
      };
    } catch (error: any) {
      throw new Error(`Failed to decode cursor: ${error.message}`);
    }
  }

  //Podria crear las querys y dejarlas preparadas por nombre para performance. Lo dejo asi para no extenderme en tiempos y sobrearmar el proyecto.
  async getAll({
    limit,
    next_cursor,
  }: {
    limit: number;
    next_cursor?: string;
  }): Promise<CursorPagination<TodoDbModel>> {
    let timestampParam: Date | null = null;
    let idParam: string | null = null;

    if (next_cursor) {
      const decoded = this.decodeCursor(next_cursor);
      timestampParam = decoded.timestamp;
      idParam = decoded.id;
    }

    const query = `
    SELECT id, title, description, completed, priority, date, created_at, updated_at 
    FROM todos 
    WHERE (
      $1::timestamp with time zone IS NULL
      OR $2::uuid IS NULL
      OR (created_at, id) < ($1, $2)
    ) 
    ORDER BY created_at DESC, id DESC 
    LIMIT $3
  `;

    const result = await this.pool.query(query, [
      timestampParam,
      idParam,
      limit,
    ]);
    const todos = result.rows.map(this.mapRowToModel);

    const lastTodo = todos[todos.length - 1];

    const nextCursor =
      todos.length >= limit
        ? this.createCursor(lastTodo.id, lastTodo.created_at)
        : undefined;

    return {
      items: todos,
      next_cursor: nextCursor,
    };
  }

  async getById(id: string): Promise<TodoDbModel | null> {
    const query = `
        SELECT id, title, description, completed, priority, date, created_at, updated_at 
        FROM todos 
        WHERE id = $1
      `;

    const result = await this.pool.query(query, [id]);

    if (result.rows.length === 0) {
      throw new Error('Todo not found');
    }

    return this.mapRowToModel(result.rows[0]);
  }

  async create(todo: CreateTodoInput): Promise<void> {
    const query = `
        INSERT INTO todos (title, description, priority, date, created_at)
        VALUES ($1, $2, $3, $4, NOW())
      `;

    const params = [
      todo.title,
      todo.description || null,
      todo.priority || 'medium',
      todo.date || null,
    ];

    const result = await this.pool.query(query, params);

    if (result.rowCount === 0) {
      throw new Error('Failed to create todo');
    }

    return;
  }

  async update(id: string, todo: UpdateTodoInput): Promise<void> {
    const query = `
        UPDATE todos 
        SET 
          title = COALESCE($1, title),
          description = COALESCE($2, description),
          completed = COALESCE($3, completed),
          priority = COALESCE($4, priority),
          date = COALESCE($5, date)
        WHERE id = $6
        RETURNING id, title, description, completed, priority, date, created_at, updated_at
      `;

    const params = [
      todo.title,
      todo.description,
      todo.completed,
      todo.priority,
      todo.date,
      id,
    ];

    const result = await this.pool.query(query, params);

    if (result.rows.length === 0) {
      throw new Error('Failed to update todo');
    }

    return;
  }

  async delete(id: string): Promise<void> {
    const query = `DELETE FROM todos WHERE id = $1`;
    const result = await this.pool.query(query, [id]);

    if (result.rowCount === 0) {
      throw new Error('Failed to delete todo');
    }

    return;
  }

  private mapRowToModel(row: any): TodoDbModel {
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      completed: row.completed,
      priority: row.priority,
      date: row.date,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }
}
