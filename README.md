# Todos App - Monorepo

Una aplicación completa de gestión de tareas (todos) construida con React + AntDesign en el frontend y Node.js + Express en el backend, usando Zod para compartir tipos entre ambos.

## 🏗️ Arquitectura

Este proyecto está organizado como un monorepo con las siguientes partes:

```
├── apps/
│   ├── frontend/        # React + AntDesign + Vite
│   └── backend/         # Node.js + Express + TypeScript
├── packages/
│   ├── shared/          # Tipos y esquemas compartidos (Zod)
└── package.json         # Configuración del workspace
```

---

## 📦 Tecnologías

### Frontend
- **React 18** - Framework de UI
- **AntDesign** - Librería de componentes UI
- **Vite** - Bundler y dev server
- **React Query** - Manejo de estado del servidor
- **Axios** - Cliente HTTP
- **TypeScript** - Tipado estático

### Backend
- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **TypeScript** - Tipado estático

### Shared
- **Zod** - Esquemas y validación compartida
- **TypeScript** - Tipos derivados de esquemas

---

## 🚀 Instalación y Configuración

Para arrancar este proyecto, sigue los siguientes pasos:

### Prerequisitos
- Node.js >= 18.0.0
- npm >= 8.0.0
- **Opcional:** Make (para simplificar los comandos de desarrollo y build).

#### Instalar Make (Opcional)

Si aún no tienes `make` instalado en tu sistema, puedes hacerlo de la siguiente manera:

* **En sistemas basados en Debian/Ubuntu:**
    ```bash
    sudo apt update
    sudo apt install build-essential
    ```
* **En macOS (con Homebrew):**
    ```bash
    brew install make
    ```
* **En Windows:** Se recomienda usar WSL (Windows Subsystem for Linux) para una mejor experiencia con `make`. También puedes instalar `make` a través de herramientas como Chocolatey (`choco install make`).


Para probar la aplicación localmente, necesitás un archivo de entorno (.env) en el directorio raíz de tu proyecto. Este archivo contendrá las variables de configuración necesarias para que la aplicación se conecte a la base de datos y funcione correctamente.

Ejemplo de archivo .env
A continuación, se muestran los valores de ejemplo que deberías incluir en tu archivo .env:

```
PORT=3005
DB_HOST=postgres
DB_PORT=5432
DB_NAME=todos_db
DB_USER=todos_user
DB_PASSWORD=todos_password
DATABASE_URL=postgresql://todos_user:todos_password@localhost:5432/postgres
NODE_ENV=development
```

### IMPORTANTE: El archivo .env debe estar en la raiz de este proyecto, desde donde se corren los comandos correspondientes. Las variables relacionadas a la base de datos, deberian estar definidas de acuerdo a la base de datos sql que se tenga corriendo como servicio. Particularmente suelo usar una imagen de postgres que corro en docker. 

Para correr una imagen de postgres en docker que tenga las variables anteriores definidas para su conexion:

```bash
docker run --name todos-postgres \
  -e POSTGRES_DB=todos_db \
  -e POSTGRES_USER=todos_user \
  -e POSTGRES_PASSWORD=todos_password \
  -p 5432:5432 \
  -d postgres:15
```

Este comando creará un contenedor de PostgreSQL con:
- Nombre del contenedor: `todos-postgres`
- Base de datos: `todos_db`
- Usuario: `todos_user` 
- Contraseña: `todos_password`
- Puerto mapeado: `5432:5432` (host:contenedor)

Lo mejor es combinar esto con docker compose, para que flyway corra las migrations de forma automatizada. Lo dejo provisto en `docker-compose.local.yaml` para que puedan levantar una db y que corra las migraciones de forma automatica para local. Esto se levanta con `docker-compose -f docker-compose.local.yaml up -d postgres` o con `make db-up-and-migrate`.


### Instalación

#### Instalar pnpm

Este proyecto utiliza pnpm como gestor de paquetes. Si no lo tienes instalado, puedes instalarlo con:

```bash
# Con npm --> Instalandolo globalmente. Se debe contar con npm primero.
npm install -g pnpm

# Con curl (recomendado)
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Con Homebrew (macOS)
brew install pnpm
```

Antes de ejecutar cualquier comando de compilación o desarrollo, es crucial instalar todos los paquetes del monorepo:

```bash
# Instalar dependencias de todos los packages
pnpm install

# Muestra todas las opciones!
make help

# Compilar el package frontend
make build-web

# Compilar todos los packetes
#Empaqueta toda la aplicación para producción, compilando el shared, frontend y backend. 
#Este comando aprovecha Turborepo para optimizar el proceso, utilizando un caché inteligente para los builds del monorepo.
make build
```

Iniciar el entorno de desarrollo
Estos valores son para levantar el entorno de desarrollo localmente. Puedes iniciar la aplicación con uno de los siguientes comandos:

```bash

pnpm run dev

# Ejecutar frontend y backend simultáneamente
make dev

# O ejecutar por separado:
make deb:web  # Puerto 3000
make dev:api  # Puerto 3005

```

Usar contenedores con Docker
Si preferís levantar todo en contenedores Docker, no es necesario configurar el archivo .env manualmente, ya que Docker Compose manejará las variables de entorno. Puedes iniciar los contenedores con:


```bash
docker compose up -d

make docker-up

```

### Linting
```bash
#Ejecuta Prettier para formatear automáticamente todos los archivos del proyecto, asegurando un estilo de código consistente.
make format

#Corre ESLint para identificar y corregir posibles errores de linting en el código.
make lint

```


## RESUMIENDO EL PROCESO:

- Se puede instalar make (recomendado).
- Se debe instalar pnpm
- Usando el comando pnpm install se instalan las dependencias
- Para probar en local, se debe tener el .env con las variables de entorno cargadas, como las del ejemplo.
- Para desarrollo, ejectuar pnpm run dev (o make dev)
- Recordar tener una db sql funcionando. 
- Para correr las migrations en desarrollo, levantar flyway en docker compose, con la db alli definida.
- Si se quiere todo esto automatizado y con builds de produccion, ejecutar docker compose up -d (o make docker-up). En este caso las migrations corren de forma automatizada y con control de versiones.



## 📱 Uso

### Frontend (http://localhost:8080)
- Lista de todos con infinity query, con cursor para eficiencia
- Crear nuevos todos con título, descripción y prioridad
- Editar todos existentes
- Marcar todos como completados
- Eliminar todos

### Backend API (http://localhost:3005)
- `GET /api/todos` - Obtener todos los todos con cursor indexado para optimizar query
- `GET /api/todos/:id` - Obtener un todo específico
- `POST /api/todos` - Crear un nuevo todo
- `PUT /api/todos/:id` - Actualizar un todo
- `DELETE /api/todos/:id` - Eliminar un todo
- `GET /health` - Health check


## 📄 Licencia

MIT License