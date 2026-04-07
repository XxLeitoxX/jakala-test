FROM node:20-alpine AS deps
WORKDIR /app

# Stage 1: instala dependencias una sola vez para aprovechar cache de Docker.
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app

# Stage 2: compila la aplicacion usando las dependencias del stage anterior.
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

# Stage 3: imagen final minima para runtime (sin toolchain de build).
# Multi-stage reduce tamano final y separa dependencias de build/runtime.
ENV NODE_ENV=production

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3000

CMD ["npm", "run", "start"]

