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

### Instalación

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

### Desarrollo
```bash
# Ejecutar frontend y backend simultáneamente
make dev

# O ejecutar por separado:
make deb:web  # Puerto 3000
make dev:api  # Puerto 3005

#Ejecuta Prettier para formatear automáticamente todos los archivos del proyecto, asegurando un estilo de código consistente.
make format

#Corre ESLint para identificar y corregir posibles errores de linting en el código.
make lint

```

### Build para producción
```bash
# Build completo
make build

# Aplicacion en contenedores docker, con postgresql como db
make docker-up
```




## 📱 Uso

### Frontend (http://localhost:3000)
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