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
  transports: ['websocket'],
  autoConnect: false,
  // timeout: 20 * 1000, // uncomment if your network is slow ;)
});

const feathersClient = feathers<ServiceTypes>();
feathersClient.configure(socketio(socket, { timeout: 20 * 1000 }));

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
