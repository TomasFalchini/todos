import { Request, Response, NextFunction } from 'express';
import { ITodoService } from '../services';
import { CreateTodoInput, UpdateTodoInput } from '@todos/shared';

export class TodoController {
  constructor(private readonly todoService: ITodoService) {}

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //Si llego aca tiene la validacion de zod previa
      const { next_cursor, limit }: { next_cursor?: string; limit: number } =
        req.query as unknown as { next_cursor?: string; limit: number };

      const todos = await this.todoService.getAllTodos({ next_cursor, limit });
      res.json(todos);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const todo = await this.todoService.getTodoById(id);
      res.json(todo);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createData: CreateTodoInput = req.body;
      const todo = await this.todoService.createTodo(createData);
      res.status(201).json(todo);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updateData: UpdateTodoInput = req.body;
      const todo = await this.todoService.updateTodo(id, updateData);
      res.json(todo);
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.todoService.deleteTodo(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}
