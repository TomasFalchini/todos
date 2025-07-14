import * as dotenv from 'dotenv';
import * as path from 'path';

// Carga las variables de entorno al importar el módulo
(() => {
  // Intenta cargar desde .env.local primero, luego .env
  const envFiles = ['.env.local', '.env'];

  for (const envFile of envFiles) {
    const envPath = path.resolve(process.cwd(), 'apps/api', envFile);
    const result = dotenv.config({ path: envPath });
    if (!result.error) {
      console.debug(`📝 Loaded environment variables from: ${envFile}`);
      break;
    }
  }

  if (!process.env.NODE_ENV) {
    dotenv.config();
  }
})();

export enum EnvKey {
  NODE_ENV = 'NODE_ENV',
  PORT = 'PORT',
  DATABASE_URL = 'DATABASE_URL',
  FRONTEND_URL = 'FRONTEND_URL',
  DB_HOST = 'DB_HOST',
  DB_PORT = 'DB_PORT',
  DB_NAME = 'DB_NAME',
  DB_USER = 'DB_USER',
  DB_PASSWORD = 'DB_PASSWORD',
}

const REQUIRED_VARS: EnvKey[] = [EnvKey.NODE_ENV, EnvKey.PORT];

const DATABASE_REQUIRED_GROUPS = [
  [EnvKey.DATABASE_URL],
  [
    EnvKey.DB_HOST,
    EnvKey.DB_PORT,
    EnvKey.DB_NAME,
    EnvKey.DB_USER,
    EnvKey.DB_PASSWORD,
  ],
];

export function getEnvOrFail(key: EnvKey): string {
  const value = process.env[key];

  if (!value || value.trim() === '') {
    const errorMsg = `❌ Missing required environment variable: ${key}`;
    console.error(errorMsg);
    process.exit(1);
  }

  return value.trim();
}

export function getEnvOrDefault(key: EnvKey, defaultValue: string): string {
  const value = process.env[key];
  return value && value.trim() !== '' ? value.trim() : defaultValue;
}

function validateRequiredVars(): void {
  const missing: string[] = [];

  // Validar variables requeridas básicas
  for (const key of REQUIRED_VARS) {
    if (!process.env[key] || process.env[key]!.trim() === '') {
      missing.push(key);
    }
  }

  // Validar que tengamos al menos un grupo completo para la base de datos
  const hasValidDbConfig = DATABASE_REQUIRED_GROUPS.some(group =>
    group.every(key => process.env[key] && process.env[key]!.trim() !== '')
  );

  if (!hasValidDbConfig) {
    missing.push(
      'DATABASE_URL or complete DB_* variables (DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD)'
    );
  }

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(variable => console.error(`   - ${variable}`));
    console.error('\n💡 Check your .env file or environment configuration');
    process.exit(1);
  }
}

/**
 * Configuración centralizada de la aplicación
 */
export class Config {
  // Environment
  public static readonly NODE_ENV = getEnvOrDefault(
    EnvKey.NODE_ENV,
    'development'
  );
  public static readonly IS_DEVELOPMENT = Config.NODE_ENV === 'development';
  public static readonly IS_PRODUCTION = Config.NODE_ENV === 'production';
  public static readonly IS_TEST = Config.NODE_ENV === 'test';

  public static readonly PORT = parseInt(
    getEnvOrDefault(EnvKey.PORT, '3000'),
    10
  );
  public static readonly FRONTEND_URL = getEnvOrDefault(
    EnvKey.FRONTEND_URL,
    'http://localhost:8080'
  );

  public static readonly DATABASE_URL = Config.getDatabaseUrl();

  private static getDatabaseUrl(): string {
    // Si existe DATABASE_URL, usarla directamente
    if (process.env[EnvKey.DATABASE_URL]) {
      return getEnvOrFail(EnvKey.DATABASE_URL);
    }

    const host = getEnvOrFail(EnvKey.DB_HOST);
    const port = getEnvOrFail(EnvKey.DB_PORT);
    const name = getEnvOrFail(EnvKey.DB_NAME);
    const user = getEnvOrFail(EnvKey.DB_USER);
    const password = getEnvOrFail(EnvKey.DB_PASSWORD);

    return `postgresql://${user}:${password}@${host}:${port}/${name}`;
  }

  public static logConfig(): void {
    console.log('⚙️  Application Configuration:');
    console.log(`   NODE_ENV: ${Config.NODE_ENV}`);
    console.log(`   PORT: ${Config.PORT}`);
    console.log(`   FRONTEND_URL: ${Config.FRONTEND_URL}`);
    console.log(
      `   DATABASE: ${Config.DATABASE_URL.replace(/\/\/.*@/, '//***:***@')}`
    );
  }
}

validateRequiredVars();

if (Config.IS_DEVELOPMENT) {
  Config.logConfig();
}
