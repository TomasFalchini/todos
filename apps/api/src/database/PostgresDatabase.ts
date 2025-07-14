import { Pool, PoolClient } from 'pg';
import { IDatabase } from './IDatabase';
import { ITodoRepository, PostgresTodoRepository } from './repositories';
import { Config } from '../config';

export class PostgresDatabase implements IDatabase {
  private pool: Pool;
  public todoRepository: ITodoRepository;
  private isConnected: boolean = false;

  constructor() {
    this.pool = new Pool({
      connectionString: Config.DATABASE_URL,
      max: 20,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 2000,
    });

    this.todoRepository = new PostgresTodoRepository(this.pool);

    this.pool.on('error', err => {
      console.error('Error inesperado en el pool de conexiones:', err);
      throw err;
    });
  }

  async connect(): Promise<void> {
    try {
      const client: PoolClient = await this.pool.connect();
      await client.query('SELECT NOW()');
      client.release();

      this.isConnected = true;
      console.log('Connected to Postgres');
    } catch (error) {
      console.error('Error conectando a PostgreSQL:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (!this.isConnected) {
      console.log('Base de datos ya desconectada');
      return;
    }

    try {
      console.log('Cerrando pool de conexiones...');

      const closePromise = this.pool.end();
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout cerrando pool')), 5000);
      });

      await Promise.race([closePromise, timeoutPromise]);

      this.isConnected = false;
      console.log('Disconnected from Postgres');
    } catch (error) {
      console.error('Error cerrando conexión a PostgreSQL:', error);
      // Forzar cierre si hay timeout
      this.pool.removeAllListeners();
      this.isConnected = false;
    }
  }
}
