import cors from 'cors';
import { Express } from 'express';
import helmet from 'helmet';
import { IMiddleware } from './IMiddleware';

export class SecurityMiddleware implements IMiddleware {
  configure(app: Express): void {
    app.use(cors());
    app.use(helmet());
  }
}
