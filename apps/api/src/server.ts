import { HttpServer } from './http';
import { PostgresDatabase } from './database/PostgresDatabase';
import { IDatabase } from './database';
import { Config } from './config';

export class Server {
  private httpServer?: HttpServer;
  private dbConnection?: IDatabase;
  private isShuttingDown = false;

  constructor() {
    // Configurar manejo de señales de sistema para shutdown limpio
    this.setupSignalHandlers();
  }

  public async build(): Promise<void> {
    try {
      console.log('🔄 Iniciando servidor...');

      await this.initializeDatabase();

      //await this.runMigrations();

      await this.initializeHttpServer();

      console.log('✅ Servidor iniciado correctamente');
    } catch (error) {
      console.error('❌ Error iniciando servidor:', error);
      await this.shutdown();
      process.exit(1);
    }
  }

  private async initializeDatabase(): Promise<void> {
    try {
      console.log('📊 Inicializando conexión a base de datos...');

      this.dbConnection = new PostgresDatabase();

      await this.dbConnection.connect();

      console.log('✅ Conexión a base de datos establecida');
    } catch (error) {
      console.error('❌ Error conectando a base de datos:', error);
      throw error;
    }
  }

  /*  private async runMigrations(): Promise<void> {
    try {
      console.log('🔧 Ejecutando migrations...');
      
      const migrationRunner = new MigrationRunner();
      await migrationRunner.runMigrations();
      
      console.log('✅ Migrations ejecutadas correctamente');
    } catch (error) {
      console.error('❌ Error ejecutando migrations:', error);
      throw error;
    }
  } */

  private async initializeHttpServer(): Promise<void> {
    try {
      console.log('🌐 Inicializando servidor HTTP...');

      if (!this.dbConnection) {
        throw new Error('Base de datos no inicializada');
      }

      this.httpServer = new HttpServer({
        todoRepository: this.dbConnection.todoRepository,
      });

      this.httpServer.init();
      await this.httpServer.start(Config.PORT);

      console.log('✅ Servidor HTTP iniciado correctamente');
    } catch (error) {
      console.error('❌ Error iniciando servidor HTTP:', error);
      throw error;
    }
  }

  private setupSignalHandlers(): void {
    // Manejo de SIGTERM (terminación normal)
    process.on('SIGTERM', () => {
      console.log('📶 Señal SIGTERM recibida, iniciando shutdown limpio...');
      this.shutdown();
    });

    // Manejo de SIGINT (Ctrl+C)
    process.on('SIGINT', () => {
      console.log('📶 Señal SIGINT recibida, iniciando shutdown limpio...');
      this.shutdown();
    });

    // Manejo de errores no capturados
    process.on('uncaughtException', error => {
      console.error('❌ Error no capturado:', error);
      this.shutdown();
    });

    // Manejo de promesas rechazadas no manejadas
    process.on('unhandledRejection', (reason, promise) => {
      console.error('❌ Promesa rechazada no manejada:', reason, 'en', promise);
      this.shutdown();
    });
  }

  public async shutdown(): Promise<void> {
    if (this.isShuttingDown) {
      console.log('⏳ Shutdown ya en progreso...');
      return;
    }

    this.isShuttingDown = true;
    console.log('🔄 Iniciando proceso de shutdown...');

    try {
      console.log('🌐 Cerrando servidor HTTP...');

      if (this.dbConnection) {
        console.log('📊 Cerrando conexión a base de datos...');
        await this.dbConnection.disconnect();
      }

      if (this.httpServer) {
        console.log('🌐 Cerrando servidor HTTP...');
        await this.httpServer.shutdown();
      }

      console.log('✅ Shutdown completado correctamente');
    } catch (error) {
      console.error('❌ Error durante shutdown:', error);
    } finally {
      // Forzar salida después de un timeout
      setTimeout(() => {
        console.log('⏱️ Timeout de shutdown alcanzado, forzando salida...');
        process.exit(1);
      }, 10000); // 10 segundos de timeout

      process.exit(0);
    }
  }
}
