import { Server } from 'http';

import app from './app';
import logger from './logger';
import webserver from './webserver';

const NODE_ENV = process.env.NODE_ENV || 'production';
let server: Server;

async function seed() {
  await app.service('tag-groups').create({ name: 'macio' });
  await app.service('tag-groups').create({ name: 'Weihnachten' });
  await app.service('tag-groups').create({ name: 'Tiere' });

  await app.service('nfc-readers').create({
    _id: '', // use a fixed id to prevent duplicates
    owner: 'aE6IRWdETCdeOGjo',
  });
  await app
    .service('nfc-tags')
    .create({ nfcId: '2589851589', spotifyTrackUri: 'spotify:track:2ej1A2Ze6P2EOW7KfIosZR' });
  await app
    .service('nfc-tags')
    .create({ nfcId: '2589689541', spotifyTrackUri: 'spotify:track:4uLU6hMCjMI75M1A2tKUQC' });
  await app
    .service('nfc-tags')
    .create({ nfcId: '2589928949', spotifyTrackUri: 'spotify:track:6tYlLMni6GwUksie3N6IPA' });
}

function start() {
  logger.info('Application (%s v%s) starting ...', NODE_ENV, 'unkown');

  const hostname = app.get('host');
  const port = app.get('port');
  server = webserver.listen(port);

  server.on('listening', () => {
    logger.info('Application started on http://%s:%d', hostname, port);
  });

  app.setup(server);

  seed().catch((error: Error) => {
    console.log('Seeding failed', error.message);
  });
}

async function stop(): Promise<void> {
  if (!server) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    server.close(() => {
      resolve();
    });
  });
}

async function shutdown(): Promise<void> {
  logger.info('Stopping application ...');

  // wait 3 seconds to kill server
  setTimeout(() => {
    logger.error('Could not close server in time, forcefully shutting down');
    process.exit(1);
  }, 3 * 1000);

  await stop();
  logger.info('Application stopped');
  process.exit(0);
}

function exitHook() {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  shutdown(); // this promise is allowed to be floating
}

process.once('SIGINT', exitHook);
process.once('SIGTERM', exitHook);

process.on('unhandledRejection', (reason, p) => logger.error('Unhandled Rejection at: %s \nReason: %s', p, reason));
process.on('uncaughtException', (error) =>
  logger.error('Uncaught exception %s', error.stack || error.message || error),
);

start();
