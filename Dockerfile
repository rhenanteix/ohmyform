# syntax=docker/dockerfile:1

# ---------- Base shared ----------
FROM --platform=linux/amd64 node:20-alpine AS base

RUN apk --update --no-cache add curl bash g++ make libpng-dev python3 py3-setuptools

# Install node-prune once
RUN curl -sf https://gobinaries.com/tj/node-prune | sh

ENV NEXT_TELEMETRY_DISABLED=1 \
    CI=true \
    YARN_ENABLE_NETWORK_CACHE=0 \
    YARN_ENABLE_GLOBAL_CACHE=true \
    YARN_NETWORK_TIMEOUT=600000 \
    YARN_RETRY_CONNECTION_TIMEOUT=120000 \
    YARN_HTTP_TIMEOUT=120000 \
    YARN_REGISTRY=https://registry.npmjs.org/ \
    NPM_CONFIG_REGISTRY=https://registry.npmjs.org/

# ---------- UI Builder ----------
FROM base AS ui

WORKDIR /usr/src/ui

# Copy lockfiles first for dependency caching
COPY ui/package.json ui/yarn.lock ./

# Install all dependencies (including devDeps for build) with retry and cache
RUN yarn install --frozen-lockfile && yarn cache clean

# Copy source
COPY ui/ .

# Build
RUN yarn build

# Prune dev deps
RUN npm prune --production

# Run node-prune
RUN /usr/local/bin/node-prune

# ---------- API Builder ----------
FROM base AS api

WORKDIR /usr/src/api

# Copy lockfiles first
COPY api/package.json api/yarn.lock ./

# Install all dependencies
RUN yarn install --frozen-lockfile && yarn cache clean

# Copy source
COPY api/ .

# Create schema file
RUN touch /usr/src/api/src/schema.gql && chown 9999:9999 /usr/src/api/src/schema.gql

# Build
RUN yarn build

# Prune dev deps
RUN npm prune --production

# Run node-prune
RUN /usr/local/bin/node-prune

# ---------- Production Image ----------
FROM --platform=linux/amd64 node:20-alpine AS production

RUN apk --update add supervisor nginx && rm -rf /var/cache/apk/*
RUN apk --update --no-cache add curl bash g++ make libpng-dev python3 py3-setuptools

WORKDIR /usr/src

# Copy built artifacts
COPY --from=api /usr/src/api /usr/src/api
COPY --from=ui /usr/src/ui /usr/src/ui

# Create user
RUN addgroup --gid 9999 ohmyform && adduser -D --uid 9999 -G ohmyform ohmyform

# Environment
ENV SECRET_KEY=ChangeMe \
    CREATE_ADMIN=FALSE \
    ADMIN_EMAIL=admin@ohmyform.com \
    ADMIN_USERNAME=root \
    ADMIN_PASSWORD=root \
    NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

# Setup runtime dirs
RUN mkdir -p /run/nginx/ && \
    touch /usr/src/supervisord.log && chmod 777 /usr/src/supervisord.log

COPY supervisord.conf /etc/supervisord.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Fix ownership
RUN chown -R 9999:9999 /usr/src

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]