FROM node:alpine AS build
WORKDIR /app
RUN apk add --no-cache make gcc g++ python git linux-headers curl
RUN /bin/ash -c 'set -ex && \
    ARCH=`uname -m` && \
    echo "ARCH=$ARCH" && \
    if [ "$ARCH" == "x86_64" ]; then \
      echo "amd64" && \
      curl -Lo /ngrok.zip https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip; \
    elif [ "$ARCH" == "armv7l" ] || [ "$ARCH" == "armv6l" ]; then \
      echo "arm" && \
      curl -Lo /ngrok.zip https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-arm.zip; \
    elif [ "$ARCH" == "aarch64" ]; then \
      echo "arm64" && \
      curl -Lo /ngrok.zip https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-arm64.zip; \
    else \
      echo "unknown arch" && \
      exit -1; \
    fi && \
    unzip -o /ngrok.zip -d /bin'
COPY . ./
RUN ls -la
RUN yarn
RUN yarn build:backend

FROM node:alpine
ENV NODE_ENV=production
RUN apk --no-cache add ca-certificates
WORKDIR /app
COPY --from=build /app/packages/backend/dist .
COPY --from=build /bin/ngrok /bin/
COPY ./docker/backend/entrypoint.sh .
RUN chmod +x ./entrypoint.sh
RUN chown -R node:node .
RUN ls -la

# TODO workaround to fix dynamic import (https://github.com/simov/request-compose/pull/3)
RUN yarn add request-compose

USER root
CMD ["/app/entrypoint.sh"]
