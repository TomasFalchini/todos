# Todos App - Monorepo

Una aplicación completa de gestión de tareas (todos) construida con React + AntDesign en el frontend y Node.js + Express en el backend, usando Zod para compartir tipos entre ambos.

## 🏗️ Arquitectura

Este proyecto está organizado como un monorepo con las siguientes partes:

```
├── packages/
│   ├── shared/          # Tipos y esquemas compartidos (Zod)
│   ├── frontend/        # React + AntDesign + Vite
│   └── backend/         # Node.js + Express + TypeScript
└── package.json         # Configuración del workspace
```

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

## 🚀 Instalación y Configuración

### Prerequisitos
- Node.js >= 18.0.0
- npm >= 8.0.0

### Instalación
```bash
# Clonar el repositorio
git clone AGREGAR ACA LA URL DEL REPO
cd todos

# Instalar dependencias de todos los packages
pnpm install

# Compilar el package shared
pnpm run build:shared
```

### Desarrollo
```bash
# Ejecutar frontend y backend simultáneamente
npm run dev

# O ejecutar por separado:
npm run dev:frontend  # Puerto 3000
npm run dev:backend   # Puerto 3001
```

### Build para producción
```bash
# Build completo
npm run build

# Build por separado
npm run build:shared
npm run build:frontend
npm run build:backend
```
8080
## 📱 Uso

### Frontend (http://localhost:8080)
- Lista de todos con filtros por estado, prioridad y búsqueda
- Crear nuevos todos con título, descripción y prioridad
- Editar todos existentes
- Marcar todos como completados
- Eliminar todos

### Backend API (http://localhost:3000)
- `GET /api/todos` - Obtener todos los todos (con filtros opcionales)
- `GET /api/todos/:id` - Obtener un todo específico
- `POST /api/todos` - Crear un nuevo todo
- `PUT /api/todos/:id` - Actualizar un todo
- `DELETE /api/todos/:id` - Eliminar un todo
- `GET /health` - Health check

## 🔧 Scripts Disponibles

### Root


### Frontend


### Backend


### Shared


## 📄 Licencia

MIT License