import { Server } from 'http';

import app from './app';
import logger from './logger';
import webserver from './webserver';

const NODE_ENV = process.env.NODE_ENV || 'production';
let server: Server;

function start() {
  logger.info('Application (%s) starting ...', NODE_ENV);

  const hostname = app.get('host');
  const port = app.get('port');
  server = webserver.listen(port);

  server.on('listening', () => {
    logger.info('Application started on http://%s:%d', hostname, port);
  });

  app.setup(server);
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

function exitHook(): void {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  shutdown(); // We don't want to handle this promise
}

process.once('SIGINT', exitHook);
process.once('SIGTERM', exitHook);

process.on('unhandledRejection', (reason, p) => logger.error('Unhandled Rejection at: %s \nReason: %s', p, reason));
process.on('uncaughtException', (error) =>
  logger.error('Uncaught exception %s', error.stack || error.message || error),
);

start();
