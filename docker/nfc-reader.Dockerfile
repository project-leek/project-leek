FROM node:alpine AS build
WORKDIR /app
RUN apk add --no-cache make gcc g++ python git linux-headers
COPY . ./
ENV NODE_ENV=production
RUN yarn build:nfc-reader

FROM node:alpine
RUN apk --no-cache add ca-certificates
WORKDIR /app
COPY --from=build /app/packages/nfc-reader/dist .
RUN chown -R node:node /app
USER root
CMD ["node", "index.js"]
