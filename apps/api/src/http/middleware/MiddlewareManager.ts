import { Express } from 'express';
import { IMiddleware } from './IMiddleware';

export class MiddlewareManager {
  private middlewares: IMiddleware[] = [];
  private finalMiddlewares: IMiddleware[] = [];

  addMiddleware(middleware: IMiddleware): void {
    this.middlewares.push(middleware);
  }

  addFinalsMiddleware(middleware: IMiddleware): void {
    this.finalMiddlewares.push(middleware);
  }

  configureAll(app: Express): void {
    this.middlewares.forEach(middleware => middleware.configure(app));
  }

  configureFinalMiddlewares(app: Express): void {
    this.finalMiddlewares.forEach(middleware => middleware.configure(app));
  }
}
