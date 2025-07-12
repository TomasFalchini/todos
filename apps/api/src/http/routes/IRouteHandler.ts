import { Express } from 'express';

export interface IRouteHandler {
  registerRoutes(app: Express): void;
}
