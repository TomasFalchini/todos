import { NextFunction, Request, Response } from 'express';

export interface IRouteMiddleware {
  (req: Request, res: Response, next: NextFunction): void;
}
