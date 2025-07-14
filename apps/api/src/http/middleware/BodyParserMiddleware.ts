import { Express } from 'express';
import express from 'express';
import { IMiddleware } from './IMiddleware';

export class BodyParserMiddleware implements IMiddleware {
  configure(app: Express): void {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }
}
