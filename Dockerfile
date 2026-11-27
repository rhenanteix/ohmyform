# syntax=docker/dockerfile:1

# Use the native target architecture; pass --platform explicitly for cross-builds.
FROM node:20-alpine AS base
ENV NEXT_TELEMETRY_DISABLED=1 CI=true

FROM base AS build-base
RUN apk add --no-cache g++ make libpng-dev python3 py3-setuptools

# Dependency layers do not depend on application source.
FROM build-base AS ui-deps
WORKDIR /usr/src/ui
COPY ui/package.json ui/yarn.lock ./
RUN --mount=type=cache,id=omf-yarn-ui,target=/usr/local/share/.cache/yarn \
    yarn install --frozen-lockfile --non-interactive --network-timeout 600000

FROM ui-deps AS ui-build
COPY ui/ ./
RUN --mount=type=cache,id=omf-next,target=/usr/src/ui/.next/cache yarn build

FROM ui-deps AS ui-runtime-deps
RUN --mount=type=cache,id=omf-yarn-ui,target=/usr/local/share/.cache/yarn \
    yarn install --frozen-lockfile --production=true --non-interactive --network-timeout 600000

FROM build-base AS api-deps
WORKDIR /usr/src/api
COPY api/package.json api/yarn.lock ./
RUN --mount=type=cache,id=omf-yarn-api,target=/usr/local/share/.cache/yarn \
    yarn install --frozen-lockfile --non-interactive --network-timeout 600000

FROM api-deps AS api-build
COPY api/ ./
RUN yarn build

FROM api-deps AS api-runtime-deps
RUN --mount=type=cache,id=omf-yarn-api,target=/usr/local/share/.cache/yarn \
    yarn install --frozen-lockfile --production=true --non-interactive --network-timeout 600000

FROM base AS production
RUN apk add --no-cache supervisor nginx libstdc++ libpng \
    && addgroup --gid 9999 ohmyform \
    && adduser -D --uid 9999 -G ohmyform ohmyform
WORKDIR /usr/src

COPY --chown=9999:9999 --from=api-runtime-deps /usr/src/api/node_modules ./api/node_modules
COPY --chown=9999:9999 --from=api-build /usr/src/api/dist ./api/dist
COPY --chown=9999:9999 api/package.json ./api/package.json
COPY --chown=9999:9999 api/locales ./api/locales
COPY --chown=9999:9999 api/public ./api/public
COPY --chown=9999:9999 --from=ui-runtime-deps /usr/src/ui/node_modules ./ui/node_modules
COPY --chown=9999:9999 --from=ui-build /usr/src/ui/.next ./ui/.next
COPY --chown=9999:9999 ui/public ./ui/public
COPY --chown=9999:9999 ui/package.json ui/next.config.js ./ui/

ENV SECRET_KEY=ChangeMe \
    CREATE_ADMIN=FALSE \
    ADMIN_EMAIL=admin@ohmyform.com \
    ADMIN_USERNAME=root \
    ADMIN_PASSWORD=root \
    NODE_ENV=production

# GraphQL writes its generated schema here at startup.
RUN mkdir -p /run/nginx /usr/src/api/src \
    && touch /usr/src/api/src/schema.gql /usr/src/supervisord.log \
    && chown -R 9999:9999 /usr/src/api/src \
    && chmod 777 /usr/src/supervisord.log
COPY supervisord.conf /etc/supervisord.conf
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 3000
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
