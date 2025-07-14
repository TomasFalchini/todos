FROM node:20-alpine AS build

RUN npm install -g pnpm

WORKDIR /app

# Copiar todo el proyecto
COPY . .

# Instalar todas las dependencias
RUN pnpm install

# Copiar código fuente
COPY apps/api/src ./apps/api/src
COPY apps/api/tsconfig.json ./apps/api/

# Compilar todos los paquetes (primero shared, luego backend)
RUN pnpm turbo run build --filter=@shared/lib
RUN pnpm turbo run build --filter=@todos/backend

# ========== PRODUCTION STAGE ==========
FROM node:20-alpine AS production

RUN npm install -g pnpm && apk add --no-cache dumb-init

RUN addgroup -g 1001 -S nodejs && \
    adduser -S api -u 1001 -G nodejs

WORKDIR /app

# Copiar archivos de configuración del workspace
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/shared/package.json ./packages/shared/

# Instalar dependencias de producción
RUN pnpm install --prod 

# Copiar archivos compilados desde el stage de build
COPY --from=build --chown=api:nodejs /app/apps/api/dist ./apps/api/dist
COPY --from=build --chown=api:nodejs /app/packages/shared/dist ./packages/shared/dist

# Limpiar cache de pnpm
RUN pnpm store prune

USER api

EXPOSE 3000

ENV NODE_ENV=production

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

ENTRYPOINT ["dumb-init", "--"]

CMD ["node", "apps/api/dist/index.js"]