import feathers, { HookContext as FeathersHookContext } from '@feathersjs/feathers';
import configuration from '@feathersjs/configuration';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';

import { Application } from './declarations';
import middleware from './middleware';
import services from './services';
import appHooks from './app.hooks';
import channels from './channels';

import authentication from './authentication';
// Don't remove this comment. It's needed to format import lines nicely.

const app: Application = express(feathers());
export type HookContext<T = any> = { app: Application } & FeathersHookContext<T>;

// Load app configuration
app.configure(configuration());

// Set up Plugins and providers
app.configure(express.rest());
app.configure(
  socketio({
    path: '/api/v1/socket',
    serveClient: false,
  }),
);

// Configure other middleware (see `middleware/index.ts`)
app.configure(middleware);

app.configure(authentication);

// Set up our services (see `services/index.ts`)
app.configure(services);

// Set up event channels (see channels.ts)
app.configure(channels);

app.hooks(appHooks);

export default app;
