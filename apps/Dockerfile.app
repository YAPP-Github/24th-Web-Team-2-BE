
# Base Stage
FROM node:20-slim AS base

ARG PKG_NAME
ARG PORT

ENV PKG_NAME=$PKG_NAME
ENV PORT=$PORT
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

# Builder Stage
FROM base AS builder
WORKDIR /usr/src/app
COPY . .

# Install dependencies: with dependency cache
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Build shared libraries & Standalone application
RUN pnpm --filter "libs/*" build
RUN pnpm --filter=$PKG_NAME build

# Remove unnecessary dependencies from production
RUN pnpm --filter=$PKG_NAME deploy --prod /prod

# Prod Stage
FROM base AS prod
COPY --from=builder /prod /prod
WORKDIR /prod
EXPOSE $PORT
CMD [ "node", "dist/main" ]