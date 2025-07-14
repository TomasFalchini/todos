import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { IRouteMiddleware } from './IRouteMiddleware';
import { ApiError } from '../errors';

export interface IValidator {
  validate(schema: AnyZodObject): IRouteMiddleware;
  validateQuery(schema: AnyZodObject): IRouteMiddleware;
  validateBody(schema: AnyZodObject): IRouteMiddleware;
  validateParams(schema: AnyZodObject): IRouteMiddleware;
}

export class ZodValidators implements IValidator {
  validate(schema: AnyZodObject): IRouteMiddleware {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse({
          body: req.body,
          params: req.params,
          query: req.query,
        });
        next();
      } catch (error) {
        throw ApiError.validation('Invalid request');
      }
    };
  }

  validateBody(schema: AnyZodObject): IRouteMiddleware {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = schema.parse(req.body);
        next();
      } catch (error) {
        throw ApiError.validation('Invalid request - body').withContext({
          body: req.body,
          expected: schema.shape,
        });
      }
    };
  }

  validateQuery(schema: AnyZodObject): IRouteMiddleware {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        req.query = schema.parse(req.query) as typeof req.query;
        next();
      } catch (error) {
        throw ApiError.validation('Invalid request - query').withContext({
          query: req.query,
          expected: schema.shape,
        });
      }
    };
  }

  validateParams(schema: AnyZodObject): IRouteMiddleware {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        req.params = schema.parse(req.params) as typeof req.params;
        next();
      } catch (error) {
        throw ApiError.validation('Invalid request - params').withContext({
          params: req.params,
          expected: schema.shape,
        });
      }
    };
  }
}
