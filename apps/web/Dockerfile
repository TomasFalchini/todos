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
RUN pnpm turbo run build --filter=@todos/frontend

# ========== PRODUCTION STAGE ==========
FROM nginx:alpine AS production

COPY --from=build /app/apps/web/dist /usr/share/nginx/html

COPY apps/web/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

ENV NODE_ENV=production

CMD ["nginx", "-g", "daemon off;"]