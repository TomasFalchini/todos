import { Pool } from 'pg';
import { IDatabase } from './IDatabase';
import { ITodoRepository, PostgresTodoRepository } from './repositories';
import { Config } from '../config';

export class PostgresDatabase implements IDatabase {
  private pool: Pool;
  public todoRepository: ITodoRepository;

  constructor() {
    this.pool = new Pool({
      connectionString: Config.DATABASE_URL,  
    });

    this.todoRepository = new PostgresTodoRepository(this.pool);
  }

  async connect(): Promise<void> {
    await this.pool.connect();
    console.log('Connected to Postgres');
  }

  async disconnect(): Promise<void> {
    await this.pool.end();
    console.log('Disconnected from Postgres');
  }
}
