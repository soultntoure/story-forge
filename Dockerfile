# Stage 1: Build the applications
FROM node:18-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy pnpm-workspace and root package.json for dependency installation
COPY pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY package.json ./package.json

# Copy all project files
COPY . .

# Install monorepo dependencies
RUN pnpm install --frozen-lockfile

# Build all applications
RUN pnpm --filter ./apps/api build
RUN pnpm --filter ./apps/web build

# Stage 2: Create a lightweight runtime image for the backend
FROM node:18-alpine AS backend-runner
WORKDIR /app
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder /app/apps/api/dist ./apps/api/dist
EXPOSE 3000
CMD ["node", "apps/api/dist/main.js"]

# Stage 3: Create a lightweight runtime image for the frontend
FROM node:18-alpine AS frontend-runner
WORKDIR /app
COPY --from=builder /app/apps/web/package.json ./apps/web/package.json
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/node_modules ./apps/web/node_modules
COPY --from=builder /app/apps/web/public ./apps/web/public
EXPOSE 3000 # Next.js default port for dev/start
CMD ["pnpm", "--filter", "./apps/web", "start"]
