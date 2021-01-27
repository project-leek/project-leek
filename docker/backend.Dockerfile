FROM node:alpine AS build
WORKDIR /app
RUN apk add --no-cache make gcc g++ python git linux-headers
COPY . ./
RUN ls -la
RUN yarn
RUN yarn build:backend

FROM node:alpine
ENV NODE_ENV=production
RUN apk --no-cache add ca-certificates
WORKDIR /app
COPY --from=build /app/packages/backend/dist .
COPY --from=build /app/packages/backend/config ./config
COPY --from=build /app/packages/backend/public ./public
RUN chown -R node:node /app
RUN ls -la
USER root
CMD ["node", "index.js"]
