FROM node:20-alpine AS build

RUN npm install -g pnpm

WORKDIR /app

# Copiar archivos de configuración necesarios para la instalación
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/*/package.json ./packages/*/
COPY turbo.json ./
COPY tsconfig.json ./

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar el resto del proyecto
COPY apps/web/ ./apps/web/
COPY packages/ ./packages/

# Construir el frontend
RUN pnpm turbo run build --filter=@todos/frontend


# ========== PRODUCTION STAGE ==========
FROM nginx:alpine AS production

# Instalar dumb-init para manejar señales correctamente
RUN apk add --no-cache dumb-init

# Crear usuario sin privilegios
RUN addgroup -g 1001 -S nginx-app && \
    adduser -S frontend -u 1001 -G nginx-app

# Copiar archivos generados desde el build
COPY --from=build /app/apps/web/dist /usr/share/nginx/html

# Copiar la configuración de nginx (ya con el puerto 8080 seteado ahí)
COPY apps/web/nginx/default.conf /etc/nginx/conf.d/default.conf

# Cambiar permisos de los directorios relevantes
RUN chown -R frontend:nginx-app \
    /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html

# Usar el usuario no-root
USER frontend

# Exponer el puerto no privilegiado 8080
EXPOSE 8080

# Definir entorno
ENV NODE_ENV=production

# Health check para Docker/K8s
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

# Usar dumb-init como entrypoint
ENTRYPOINT ["dumb-init", "--"]

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]