FROM node:12.20.0-alpine

WORKDIR /app
ENV NODE_ENV=production

# copy code
COPY dist/ ./

RUN chown -R node:node /app
USER root
EXPOSE 3000
CMD ["node", "index.js"]
