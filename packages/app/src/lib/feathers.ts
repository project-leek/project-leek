import { ServiceTypes } from '@project-leek/commons';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';

const socket = io({
  transports: ['websocket'],
  autoConnect: false,
  // timeout: 20 * 1000, // uncomment if your network is slow ;)
});

const feathersClient = feathers<ServiceTypes>();
feathersClient.configure(socketio(socket, { timeout: 20 * 1000 }));

export function init(): feathers.Application<ServiceTypes> {
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

  // start first connection attempt after all listeners got registered
  socket.open();

  return feathersClient;
}

export default feathersClient;
