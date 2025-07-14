FROM node:20-alpine AS build

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/shared/package.json ./packages/shared/
COPY turbo.json ./
COPY tsconfig.json ./

RUN pnpm install --frozen-lockfile

COPY apps/web/ ./apps/web/
COPY packages/ ./packages/


RUN pnpm turbo run build --filter=@shared/lib
RUN pnpm turbo run build --filter=@web/frontend


# ========== PRODUCTION STAGE ==========
FROM nginx:alpine AS production

RUN apk add --no-cache dumb-init

RUN addgroup -g 1001 -S nginx-app && \
    adduser -S frontend -u 1001 -G nginx-app

COPY --from=build /app/apps/web/dist /usr/share/nginx/html

COPY apps/web/nginx/default.conf /etc/nginx/conf.d/default.conf

RUN chown -R frontend:nginx-app \
    /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html

USER frontend

EXPOSE 8080

ENV NODE_ENV=production

# Health check para Docker/K8s
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

ENTRYPOINT ["dumb-init", "--"]

CMD ["nginx", "-g", "daemon off;"]