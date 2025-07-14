import { Express } from 'express';
import { IRouteHandler } from './IRouteHandler';
import { TodoController } from '../controller';
import { IValidator } from '../middleware';
import {
  CreateTodoSchema,
  GetAllTodosSchema,
  GetTodoByIdSchema,
} from '@shared/lib';

//TODO: Sacar a Shared

export class TodoRoutes implements IRouteHandler {
  constructor(
    private readonly todoController: TodoController,
    private readonly validator: IValidator
  ) {}

  registerRoutes(app: Express): void {
    app.get(
      '/todos',
      this.validator.validateQuery(GetAllTodosSchema),
      this.todoController.getAll.bind(this.todoController)
    );
    app.post(
      '/todos',
      this.validator.validateBody(CreateTodoSchema),
      this.todoController.create.bind(this.todoController)
    );
    app.get(
      '/todos/:id',
      this.validator.validateParams(GetTodoByIdSchema),
      this.todoController.getById.bind(this.todoController)
    );
    app.put(
      '/todos/:id',
      this.validator.validateParams(GetTodoByIdSchema),
      this.todoController.update.bind(this.todoController)
    );
    app.delete(
      '/todos/:id',
      this.validator.validateParams(GetTodoByIdSchema),
      this.todoController.delete.bind(this.todoController)
    );
  }
}
