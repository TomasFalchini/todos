import { Express } from 'express';
import { IRouteHandler } from './IRouteHandler';

export class RouteManager {
  private routeHandlers: IRouteHandler[] = [];

  addRouteHandler(routeHandler: IRouteHandler): void {
    this.routeHandlers.push(routeHandler);
  }

  registerAll(app: Express): void {
    this.routeHandlers.forEach(handler => handler.registerRoutes(app));
  }
}
