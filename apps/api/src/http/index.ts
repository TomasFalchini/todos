import express, { Express } from 'express';
import http from 'http';
import { TodoController } from './controller';
import {
  MiddlewareManager,
  BodyParserMiddleware,
  SecurityMiddleware,
  LoggingMiddleware,
  ApiResponseMiddleware,
  ErrorHandlingMiddleware,
  IValidator,
  ZodValidators,
} from './middleware';
import { ITodoRepository } from '../database';
import { ITodoService, TodoService } from './services';
import { TodoRoutes, RouteManager } from './routes';
import 'express-async-errors';

export interface HttpDeps {
  todoRepository: ITodoRepository;
}

export class HttpServer {
  private app: Express;
  private server?: http.Server;
  private readonly deps: HttpDeps;
  private middlewareManager: MiddlewareManager;
  private routeManager: RouteManager;
  private validator: IValidator;

  // Componentes inyectados
  private todoService!: ITodoService;
  private todoController!: TodoController;

  constructor(deps: HttpDeps) {
    this.app = express();
    this.deps = deps;
    this.middlewareManager = new MiddlewareManager();
    this.routeManager = new RouteManager();
    this.validator = new ZodValidators();
  }

  public init(): void {
    this.configureMiddlewares();
    this.initializeComponents();
    this.registerRoutes();
    this.setupErrorHandling();
    
  }

  public async start(port: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server = this.app.listen(port, (err?: Error) => {
        if (err) {
          reject(err);
          return;
        }
        console.log(`HTTP server listening on port ${port}`);
        resolve();
      });
    });
  }

  public async shutdown(): Promise<void> {
    if (!this.server) return;

    return new Promise((resolve, reject) => {
      this.server!.close((err?: Error) => {
        if (err) {
          reject(err);
          return;
        }
        console.log('HTTP server closed gracefully');
        resolve();
      });
    });
  }

  private configureMiddlewares(): void {
    this.middlewareManager.addMiddleware(new BodyParserMiddleware());
    this.middlewareManager.addMiddleware(new SecurityMiddleware());
    this.middlewareManager.addMiddleware(new LoggingMiddleware());
    this.middlewareManager.addMiddleware(new ApiResponseMiddleware());

    this.middlewareManager.configureAll(this.app);
  }

  //Esto podria resolverse realizando tambien una abstraccion de todos los servicios y controladores.
  private initializeComponents(): void {
    this.todoService = new TodoService(this.deps.todoRepository);
    this.todoController = new TodoController(this.todoService);
  }

  private registerRoutes(): void {
    this.routeManager.addRouteHandler(
      new TodoRoutes(this.todoController, this.validator)
    );
    this.routeManager.registerAll(this.app);

    this.routeManager.addHealtCheckRoute(this.app);
  }

  private setupErrorHandling(): void {
    // Usar el middleware de manejo de errores
    this.middlewareManager.addFinalsMiddleware(new ErrorHandlingMiddleware());
    this.middlewareManager.configureFinalMiddlewares(this.app);
  }
}
