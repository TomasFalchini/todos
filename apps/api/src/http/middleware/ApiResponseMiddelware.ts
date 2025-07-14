import { Express, Request, Response, NextFunction } from 'express';
import { IMiddleware } from './IMiddleware';
import { ApiResponse } from '@shared/lib';

export class ApiResponseMiddleware implements IMiddleware {
  configure(app: Express): void {
    app.use(this.wrapResponse);
  }

  private wrapResponse = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const originalJson = res.json;

    res.json = function (body: any) {
      if (body && body.success === false) {
        return originalJson.call(this, body);
      }
      const responseBody: ApiResponse = {
        success: true,
        message: 'Success',
        code: res.statusCode,
        data: body,
      };

      return originalJson.call(this, responseBody);
    };

    next();
  };
}
