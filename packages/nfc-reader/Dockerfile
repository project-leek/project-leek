FROM node:12.19.1-alpine

WORKDIR /app
ENV NODE_ENV=production

# copy code
COPY dist/ ./

RUN chown -R node:node /app
USER node
EXPOSE 3000
CMD ["node", "index.js"]
