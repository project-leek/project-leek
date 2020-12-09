import feathers from '@feathersjs/feathers';
import configuration from '@feathersjs/configuration';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';

import { Application } from './declarations';
import middleware from './middleware';
import services from './services';
import appHooks from './app.hooks';
import channels from './channels';

const app: Application = express(feathers());

// Load app configuration
app.configure(configuration());

// Set up Plugins and providers
app.configure(express.rest());
app.configure(
  socketio({
    path: '/api/socket',
    serveClient: false,
  }),
);

// Configure other middleware (see `middleware/index.ts`)
app.configure(middleware);

// Set up our services (see `services/index.ts`)
app.configure(services);

// Set up event channels (see channels.ts)
app.configure(channels);

app.hooks(appHooks);

export default app;
