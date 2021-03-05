FROM node:alpine AS build
WORKDIR /app
COPY . ./
RUN ls -la
RUN yarn
RUN yarn build:app

FROM caddy:2.3.0-alpine
WORKDIR /app
COPY --from=build /app/packages/app/dist .
COPY /docker/app/Caddyfile /etc/caddy/Caddyfile
RUN ls -la
