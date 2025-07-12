import { Server } from './server';

// Función principal para iniciar la aplicación
async function main(): Promise<void> {
  try {
    await new Server().build();
  } catch (error) {
    console.error('💥 Error fatal iniciando aplicación:', error);
    process.exit(1);
  }
}

main().catch(error => {
  console.error('💥 Error no manejado:', error);
  process.exit(1);
});
