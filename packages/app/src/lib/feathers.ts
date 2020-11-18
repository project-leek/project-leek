import feathers, { ServiceAddons } from '@feathersjs/feathers';
import { AdapterService } from '@feathersjs/adapter-commons';
import { User } from '@project-leek/commons';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';

type Service<T> = AdapterService<T> & ServiceAddons<T>;

// Add this service to the service type index
interface ServiceTypes {
  users: Service<User>;
}

export const socket = io({
  path: '/api/v1/socket',
  transports: ['websocket'],
  autoConnect: true,
  timeout: 20 * 1000,
});

const feathersClient = feathers<ServiceTypes>();
feathersClient.configure(socketio(socket, { timeout: 20 * 1000 }));

function debug(...str: string[]) {
  // eslint-disable-next-line no-console
  console.log(...str);
}

socket.on('connect', () => {
  debug('Backend: connected ;-)');
});

socket.on('disconnect', () => {
  debug('Backend: disconnected');
});

feathersClient.on('login', () => {
  debug('Backend: authenticated');
});

feathersClient.on('logout', () => {
  debug('Backend: unauthenticated bye bye');
});

feathersClient.on('disconnect', () => {
  socket.disconnect();
});

feathersClient.hooks({
  error({ error }) {
    // TODO: add pretty error toasting
    // eslint-disable-next-line no-console
    console.error('feathers-error:', error);
  },
});

export default feathersClient;