import { Express, Request, Response, NextFunction } from 'express';
import { IMiddleware } from './IMiddleware';
import { ApiError } from '../errors';

export class ErrorHandlingMiddleware implements IMiddleware {
  configure(app: Express): void {
    app.use((req: Request, res: Response, next: NextFunction) => {
      next(ApiError.notFound(`Route ${req.method} ${req.path} not found`));
    });

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {

      res.setHeader('Content-Type', 'application/json');
      if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
          success: false,
          message: err.message,
          code: err.code,
          errors: err.errors,
          context: err.context,
        });
      }

      let context = {error_message: err?.message}

      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        code: 500,
        context,
      });
    });
  }
}
