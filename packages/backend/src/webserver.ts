import path from 'path';
import { errorHandler, notFound } from '@feathersjs/express';
import favicon from 'serve-favicon';
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import express from 'express';

import app from './app';
import logger from './logger';

const webserver: express.Express = express();

// Enable security, CORS, compression, favicon and body parsing
webserver.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
webserver.use(cors());
webserver.use(compress());
webserver.use(express.json());
webserver.use(express.urlencoded({ extended: true }));
webserver.use(favicon(path.join(app.get('public'), 'favicon.ico')));

// Host the public folder
webserver.use(express.static(app.get('public')));

webserver.use('/', app);

// Configure a middleware for 404s and the error handler
webserver.use(notFound());
webserver.use(errorHandler({ logger }));

export default webserver;
