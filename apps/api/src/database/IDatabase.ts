import { ITodoRepository } from './repositories';

export interface IDatabase {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  todoRepository: ITodoRepository;
}
