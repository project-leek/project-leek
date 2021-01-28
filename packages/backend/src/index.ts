import { Server } from 'http';

import app from './app';
import logger from './logger';
import webserver from './webserver';

const NODE_ENV = process.env.NODE_ENV || 'production';
let server: Server;

async function seed(): Promise<void> {
  await app.service('nfc-readers').create({
    _id: 'BU62UGHufeLvF763', // use a fixed id to prevent duplicates
    owner: 'OGPy2N1spnM2Ov50',
    attachedTagData: null,
  });
}

async function seedTags(): Promise<void> {
  await app.service('nfc-tags').create({
    _id: 'asdfsadfsafd', // use a fixed id to prevent duplicates
    trackUri: 'spotify:track:4ihHWrgHiuSQgU2lwEMO6f',
    nfcData: 'flonke1',
    imageUrl: 'https://cdn.pixabay.com/photo/2020/12/17/14/07/leaves-5839550_960_720.jpg',
    name: 'erster Eintrag',
    group: 'Lieblingstracks',
  });

  await app.service('nfc-tags').create({
    _id: '123jgh123', // use a fixed id to prevent duplicates
    trackUri: 'spotify:track:1m1nkTDqTntuG9HaOo4Jn7',
    imageUrl: 'https://cdn.pixabay.com/photo/2013/08/20/15/47/poppies-174276_960_720.jpg',
    name: ' zweiter Name',
    group: 'Lieblingstracks',
    nfcData: 'flonke2',
  });

  await app.service('nfc-tags').create({
    _id: '1231jh2g31jh3jhd', // use a fixed id to prevent duplicates
    trackUri: 'spotify:track:6BXyD6UUPizpRpA7iOi99r',
    imageUrl: 'https://cdn.pixabay.com/photo/2013/07/21/13/00/rose-165819_960_720.jpg',
    name: 'name aus dem Tag',
    group: 'Entdecken',
    nfcData: 'flonke3',
  });

  await app.service('nfc-tags').create({
    _id: '123babjajdf', // use a fixed id to prevent duplicates
    trackUri: 'spotify:track:3g62kHCCbNwhEKYywx5Xwz',
    imageUrl: 'https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_960_720.jpg',
    group: 'Entdecken',
    name: 'good boy',
    nfcData: 'flonke4',
  });

  await app.service('nfc-tags').create({
    _id: '123babj123123ajdf', // use a fixed id to prevent duplicates
    trackUri: 'spotify:track:5NruCL3mzAlLav6W8WGbpC',
    imageUrl: 'https://cdn.pixabay.com/photo/2020/12/20/04/06/bear-5846065_960_720.jpg',
    group: 'Entdecken',
    name: 'Bär in Kiel',
    nfcData: 'flonke5',
  });
}

async function start(): Promise<void> {
  logger.info('Application (%s v%s) starting ...', NODE_ENV, 'unkown');

  const hostname = app.get('host');
  const port = app.get('port');
  server = webserver.listen(port);

  server.on('listening', () => {
    logger.info('Application started on http://%s:%d', hostname, port);
  });

  app.setup(server);

  try {
    await seed();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error((error as Error).message);
  }

  try {
    await seedTags();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error((error as Error).message);
  }
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
  shutdown(); // this promise is allowed to be floating
}

process.once('SIGINT', exitHook);
process.once('SIGTERM', exitHook);

process.on('unhandledRejection', (reason, p) => logger.error('Unhandled Rejection at: %s \nReason: %s', p, reason));
process.on('uncaughtException', (error) =>
  logger.error('Uncaught exception %s', error.stack || error.message || error),
);

void start();
