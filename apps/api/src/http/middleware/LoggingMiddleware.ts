import { Express } from 'express';
import morgan from 'morgan';
import { IMiddleware } from './IMiddleware';

//Podria no usar morgan, sino un logger personalizado mas avanzado. Se usa morgan para no complicar el proyecto.
export class LoggingMiddleware implements IMiddleware {
  configure(app: Express): void {
    app.use(morgan('dev'));
  }
}
